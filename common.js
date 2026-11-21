/**
 * File:        common.js
 * Project:     Jo Cichon Portfolio (https://jocichon.github.io/portfolio/)
 * Author:      Jo Cichon
 * Description: Helpers shared by the project listing (script.js) and the
 *              project detail page (project-page.js): element creation,
 *              date formatting, and project URL/thumbnail lookup.
 *              Load after projects.js and before either page script.
 */

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

/** "Jan 2026 – Apr 2026", a single month, or "" when undated. */
function dateRange(project) {
    const { start, end } = project;
    if (start && end) return `${formatMonth(start)} – ${formatMonth(end)}`;
    return start || end ? formatMonth(start || end) : "";
}

/** Detail page URL: project.page, else the shared template. */
function detailPage(project) {
    return project.page || `project.html?id=${encodeURIComponent(project.id)}`;
}

/** Card/header image: project.thumbnail, else the first asset image. */
function thumbnailOf(project) {
    const images = (project.assets && project.assets.images) || [];
    return project.thumbnail || images[0] || null;
}

/** Builds an <a>; external URLs open in a new tab. */
function link(label, href) {
    const a = el("a", null, label);
    a.href = href;
    if (/^https?:\/\//.test(href)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.append(el("span", "visually-hidden", " (opens in a new tab)"));
    }
    return a;
}
