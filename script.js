/**
 * File:        script.js
 * Project:     Jo Cichon Portfolio (https://jocichon.github.io/portfolio/)
 * Author:      Jo Cichon
 * Description: Project filter buttons for index.html. "Chronological" shows
 *              every project sorted newest first by data-date; each category
 *              button shows only projects whose data-categories include it.
 */

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("projects");
    const buttons = document.querySelectorAll(".project-filters button");
    const emptyMessage = container.querySelector(".no-projects");
    const projects = Array.from(container.querySelectorAll(".project"));

    // Remember page order so undated projects keep a stable position.
    projects.forEach((project, index) => {
        project.dataset.order = index;
    });

    /** Returns the project's categories as a lowercase array. */
    function categoriesOf(project) {
        return (project.dataset.categories || "")
            .split(",")
            .map((category) => category.trim().toLowerCase())
            .filter(Boolean);
    }

    /** Newest first; projects without a date go last, in page order. */
    function byDate(a, b) {
        const dateA = a.dataset.date || "";
        const dateB = b.dataset.date || "";
        if (dateA && !dateB) return -1;
        if (!dateA && dateB) return 1;
        if (dateA !== dateB) return dateB.localeCompare(dateA);
        return a.dataset.order - b.dataset.order;
    }

    function applyFilter(filter) {
        const key = filter.toLowerCase();
        let visibleCount = 0;

        projects.sort(byDate).forEach((project) => {
            const matches = key === "chronological" || categoriesOf(project).includes(key);
            project.hidden = !matches;
            if (matches) visibleCount++;
            container.appendChild(project); // re-append in sorted order
        });

        emptyMessage.hidden = visibleCount > 0;

        buttons.forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
        });
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => applyFilter(button.dataset.filter));
    });

    applyFilter("chronological");
});
