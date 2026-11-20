/**
 * File:        script.js
 * Project:     Jo Cichon Portfolio (https://jocichon.github.io/portfolio/)
 * Author:      Jo Cichon
 * Description: Renders project preview cards and filter buttons from
 *              PROJECTS (projects.js) into index.html. Each card links to
 *              the project's detail page. "Chronological" shows every
 *              project newest first; each category button shows only
 *              projects whose categories include it.
 */

document.addEventListener("DOMContentLoaded", () => {
    const filterNav = document.querySelector(".project-filters");
    const list = document.getElementById("project-list");
    const emptyMessage = document.querySelector(".no-projects");

    /* ---------- Helpers ---------- */

    /** Creates an element with optional class and text content. */
    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    /** True for a non-empty string or non-empty array. */
    function has(value) {
        return Array.isArray(value) ? value.length > 0 : Boolean(value);
    }

    /** "2026-04" -> "Apr 2026"; "present" -> "Present". */
    function formatMonth(value) {
        if (value === "present") return "Present";
        const [year, month] = value.split("-").map(Number);
        return new Date(year, month - 1).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
        });
    }

    function dateRange(project) {
        const { start, end } = project;
        if (start && end) return `${formatMonth(start)} – ${formatMonth(end)}`;
        return start || end ? formatMonth(start || end) : "";
    }

    /** Sort key: end date (ongoing first), else start; "" when undated. */
    function sortKey(project) {
        if (project.end === "present") return "9999-99";
        return project.end || project.start || "";
    }

    /** Newest first; undated projects last, keeping data-file order. */
    function byDate(a, b) {
        const keyA = sortKey(a.project);
        const keyB = sortKey(b.project);
        if (keyA && !keyB) return -1;
        if (!keyA && keyB) return 1;
        if (keyA !== keyB) return keyB.localeCompare(keyA);
        return a.order - b.order;
    }

    /* ---------- Card rendering ---------- */

    const TECH_PREVIEW_COUNT = 4; // items shown before "+N more"

    /** Detail page URL: project.page, else projects/<id>.html. */
    function detailPage(project) {
        return project.page || `projects/${project.id}.html`;
    }

    /** Card image: project.thumbnail, else the first asset image. */
    function thumbnailOf(project) {
        const images = (project.assets && project.assets.images) || [];
        return project.thumbnail || images[0] || null;
    }

    /** Decorative placeholder tile (forest-spiral artwork, see CSS). */
    function placeholder() {
        const tile = el("div", "project-thumb-placeholder");
        tile.setAttribute("aria-hidden", "true");
        return tile;
    }

    function renderThumbnail(project) {
        const frame = el("div", "project-thumb");
        const image = thumbnailOf(project);
        if (!image) {
            frame.append(placeholder());
            return frame;
        }
        const img = el("img");
        img.src = image.src;
        img.alt = ""; // decorative: the card title names the project
        img.loading = "lazy";
        img.addEventListener("error", () => img.replaceWith(placeholder()));
        frame.append(img);
        return frame;
    }

    /** "C++ · OpenCV · CMake +2 more" from technologies, then methods. */
    function techSummary(project) {
        const items = [...(project.technologies || []), ...(project.methods || [])];
        if (!has(items)) return "";
        const shown = items.slice(0, TECH_PREVIEW_COUNT).join(" · ");
        const extra = items.length - TECH_PREVIEW_COUNT;
        return extra > 0 ? `${shown} +${extra} more` : shown;
    }

    /**
     * Preview card. The title link is stretched over the whole card
     * (see .project-link::after in style.css), so the card is one
     * click target and one Tab stop, announced by its title.
     */
    function renderCard(project) {
        const card = el("article", "project");
        card.id = project.id;
        card.append(renderThumbnail(project));

        const body = el("div", "project-body");

        const title = el("h2", "project-title");
        const anchor = el("a", "project-link", project.title);
        anchor.href = detailPage(project);
        title.append(anchor);
        body.append(title);

        const dates = dateRange(project);
        if (dates) body.append(el("p", "project-date", dates));

        body.append(el("p", "project-summary", project.summary));

        const categories = el("ul", "project-categories");
        categories.setAttribute("aria-label", "Categories");
        project.categories.forEach((category) => categories.append(el("li", null, category)));
        body.append(categories);

        const tech = techSummary(project);
        if (tech) {
            const line = el("p", "project-tech");
            line.append(el("span", "visually-hidden", "Technologies and methods: "));
            line.append(document.createTextNode(tech));
            body.append(line);
        }

        card.append(body);
        return card;
    }

    /* ---------- Filters ---------- */

    const entries = PROJECTS.map((project, order) => ({
        project,
        order,
        card: renderCard(project),
        categories: project.categories.map((c) => c.toLowerCase()),
    }));

    // One button per category in use, alphabetical, after "Chronological".
    const categories = [...new Set(PROJECTS.flatMap((p) => p.categories))].sort();
    const buttons = ["Chronological", ...categories].map((label) => {
        const button = el("button", null, label);
        button.type = "button";
        button.dataset.filter = label.toLowerCase();
        filterNav.append(button);
        return button;
    });

    function applyFilter(key) {
        let visibleCount = 0;

        entries.sort(byDate).forEach((entry) => {
            const matches = key === "chronological" || entry.categories.includes(key);
            entry.card.hidden = !matches;
            if (matches) visibleCount++;
            list.append(entry.card); // re-append in sorted order
        });

        emptyMessage.hidden = visibleCount > 0;

        buttons.forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.filter === key));
        });
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => applyFilter(button.dataset.filter));
    });

    applyFilter("chronological");
});
