/**
 * File:        project-page.js
 * Project:     Jo Cichon Portfolio (https://jocichon.github.io/portfolio/)
 * Author:      Jo Cichon
 * Description: Renders project.html for the project named by the ?id=
 *              query parameter. Every project uses the same layout:
 *              header (title, role, dates, categories, image), a code
 *              access notice (repo link, or restricted with demos on
 *              request), then Overview, My Contribution, Technologies &
 *              Methods, Deliverables, Assets, and Reflection. Sections whose
 *              fields are empty are left out. The back link returns to
 *              this project's card on the listing. Gallery images link
 *              to their full-size files.
 * Depends:     projects.js, common.js (load both first).
 */

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("project-detail");
    const backLink = document.querySelector(".back-link");

    const id = new URLSearchParams(window.location.search).get("id");
    const project = PROJECTS.find((p) => p.id === id);

    if (!project) {
        document.title = "Project not found · Jo Cichon Portfolio";
        main.append(el("h1", null, "Project not found"));
        main.append(el("p", null, "There is no project at this address."));
        return;
    }

    document.title = `${project.title} · Jo Cichon Portfolio`;
    backLink.href = `index.html#${encodeURIComponent(project.id)}`;

    /* ---------- Helpers ---------- */

    /** Text field as paragraphs: a string is one, an array is several. */
    function paragraphs(value) {
        const fragment = document.createDocumentFragment();
        [].concat(value || []).forEach((text) => fragment.append(el("p", null, text)));
        return fragment;
    }

    /** <section> with an <h2> heading, linked by aria-labelledby. */
    function section(key, heading, ...children) {
        const node = el("section", "detail-section");
        const h2 = el("h2", null, heading);
        h2.id = `section-${key}`;
        node.setAttribute("aria-labelledby", h2.id);
        node.append(h2, ...children);
        return node;
    }

    function chipList(items, label) {
        const ul = el("ul", "chips");
        if (label) ul.setAttribute("aria-label", label);
        items.forEach((item) => ul.append(el("li", null, item)));
        return ul;
    }

    function linkList(items) {
        const ul = el("ul", "detail-links");
        items.forEach((item) => {
            const li = el("li");
            li.append(item.href ? link(item.label, item.href) : document.createTextNode(item.label));
            ul.append(li);
        });
        return ul;
    }

    /* ---------- Header ---------- */

    const header = el("header", "detail-header");
    header.append(el("h1", null, project.title));

    const meta = el("dl", "detail-meta");
    [["Role", project.role], ["Dates", dateRange(project)]].forEach(([term, value]) => {
        if (!value) return;
        const row = el("div");
        row.append(el("dt", null, term), el("dd", null, value));
        meta.append(row);
    });
    if (meta.children.length) header.append(meta);

    header.append(chipList(project.categories, "Categories"));

    const image = project.headerImage || thumbnailOf(project);
    if (image) {
        const img = el("img", "detail-image");
        img.src = image.src;
        img.alt = image.alt || "";
        img.addEventListener("error", () => img.remove());
        header.append(img);
    }
    main.append(header);

    /* ---------- Code access notice ---------- */

    const DEMO_CONTACT = "https://www.linkedin.com/in/jo-cichon/";

    if (project.code) {
        const { repo, repoLabel, demo, demoLabel, restricted, reason } = project.code;
        const notice = el("aside", "code-access");
        notice.setAttribute("aria-label", "Code access");

        if (repo || demo) {
            const p = el("p");
            p.append(el("strong", null, "Code: "));
            if (repo) p.append(link(repoLabel || "View source on GitHub", repo));
            if (repo && demo) p.append(document.createTextNode(" · "));
            if (demo) p.append(link(demoLabel || "Live demo", demo));
            notice.append(p);
        }

        if (restricted) {
            notice.classList.add("code-access--restricted");
            const p = el("p");
            p.append(el("strong", null, "Code restricted: "));
            const why = reason ? ` ${reason.replace(/\.?$/, ".")}` : "";
            p.append(document.createTextNode(
                `The source isn't public due to ownership.${why} ` +
                "A live demo is available on request: "));
            p.append(link("contact me on LinkedIn", DEMO_CONTACT));
            p.append(document.createTextNode("."));
            notice.append(p);
        }

        main.append(notice);
    }

    /* ---------- Sections (fixed order; empty ones omitted) ---------- */

    // Overview: the long description, else the card summary, plus notes.
    const overview = section("overview", "Overview", paragraphs(project.overview || project.summary));
    if (has(project.notes)) overview.append(el("p", "detail-notes", project.notes));
    main.append(overview);

    if (has(project.contribution)) {
        main.append(section("contribution", "My Contribution", paragraphs(project.contribution)));
    }

    // One section, two groups: the fields stay distinct in the data.
    const techGroups = [
        ["Technologies", project.technologies],
        ["Methods", project.methods],
    ].filter(([, items]) => has(items));
    if (techGroups.length) {
        const groups = techGroups.map(([heading, items]) => {
            const group = el("div", "tech-group");
            group.append(el("h3", null, heading), chipList(items));
            return group;
        });
        main.append(section("tech", "Technologies & Methods", ...groups));
    }

    if (has(project.deliverables)) {
        main.append(section("deliverables", "Deliverables", linkList(project.deliverables)));
    }

    // Assets: gallery of images (the header image is not repeated),
    // then files and external links.
    const assets = project.assets || {};
    const gallery = (assets.images || []).filter((img) => img !== image);
    const assetLinks = [...(assets.files || []), ...(assets.links || [])];
    if (has(gallery) || has(assetLinks)) {
        const parts = [];
        if (has(gallery)) {
            const grid = el("div", "detail-gallery");
            gallery.forEach((item) => {
                const figure = el("figure");
                // Link to the full-size image so detailed diagrams are readable.
                const full = el("a");
                full.href = item.src;
                full.target = "_blank";
                full.rel = "noopener";
                const img = el("img");
                img.src = item.src;
                img.alt = item.alt || "";
                img.loading = "lazy";
                full.append(img, el("span", "visually-hidden", " (full size, opens in a new tab)"));
                figure.append(full);
                if (item.caption) figure.append(el("figcaption", null, item.caption));
                grid.append(figure);
            });
            parts.push(grid);
        }
        if (has(assetLinks)) parts.push(linkList(assetLinks));
        main.append(section("assets", "Assets", ...parts));
    }

    if (has(project.reflection)) {
        main.append(section("reflection", "Reflection", paragraphs(project.reflection)));
    }
});
