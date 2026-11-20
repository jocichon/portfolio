/**
 * File:        script.js
 * Project:     Jo Cichon Portfolio (https://jocichon.github.io/portfolio/)
 * Author:      Jo Cichon
 * Description: Renders project cards and filter buttons from PROJECTS
 *              (projects.js) into index.html. "Chronological" shows every
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

    /** Builds an <a> that opens external URLs in a new tab. */
    function link(label, href) {
        const a = el("a", null, label);
        a.href = href;
        if (/^https?:\/\//.test(href)) {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
        }
        return a;
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

    function renderList(heading, items, renderItem) {
        const fragment = document.createDocumentFragment();
        fragment.append(el("h3", null, heading));
        const ul = el("ul");
        items.forEach((item) => {
            const li = el("li");
            li.append(renderItem(item));
            ul.append(li);
        });
        fragment.append(ul);
        return fragment;
    }

    function renderCard(project) {
        const card = el("section", "project");
        card.id = project.id;
        const info = el("div", "project-info");

        info.append(el("h2", null, project.title));

        const meta = [project.role, dateRange(project)].filter(Boolean).join(" · ");
        if (meta) info.append(el("p", "project-meta", meta));

        info.append(el("p", null, project.summary));

        if (has(project.contribution)) {
            info.append(el("h3", null, "My Contribution"));
            info.append(el("p", null, project.contribution));
        }

        // Technologies and methods: one display list, two data fields.
        const techAndMethods = [
            ...(project.technologies || []),
            ...(project.methods || []),
        ];
        if (has(techAndMethods)) {
            info.append(renderList("Technologies & Methods", techAndMethods, (t) =>
                document.createTextNode(t)));
        }

        if (has(project.deliverables)) {
            info.append(renderList("Deliverables", project.deliverables, (d) =>
                d.href ? link(d.label, d.href) : document.createTextNode(d.label)));
        }

        const assets = project.assets || {};
        const resources = [...(assets.files || []), ...(assets.links || [])];
        if (has(resources)) {
            info.append(renderList("Resources", resources, (r) => link(r.label, r.href)));
        }

        if (has(project.notes)) info.append(el("p", "project-notes", project.notes));

        card.append(info);

        if (has(assets.images)) {
            const visual = el("div", "project-visual");
            assets.images.forEach((image) => {
                const figure = el("figure");
                const img = el("img");
                img.src = image.src;
                img.alt = image.alt;
                img.loading = "lazy";
                figure.append(img);
                if (image.caption) figure.append(el("figcaption", null, image.caption));
                visual.append(figure);
            });
            card.append(visual);
        }

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
