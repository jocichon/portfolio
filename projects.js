/**
 * File:        projects.js
 * Project:     Jo Cichon Portfolio (https://jocichon.github.io/portfolio/)
 * Author:      Jo Cichon
 * Description: Single source of truth for portfolio projects. script.js
 *              renders preview cards and category filter buttons from
 *              this array; index.html holds no project content. Cards
 *              show thumbnail, title, date, summary, categories, and a
 *              technologies & methods summary; the remaining fields are
 *              for each project's detail page.
 *
 * PROJECT SCHEMA (only id, title, summary, categories are required;
 * omit or leave empty any optional field and it is not rendered)
 *
 *   id            string    Unique, URL-safe slug ("aurafx").
 *   title         string    Card heading.
 *   summary       string    What the project is (one short paragraph).
 *                           Cards clamp it to three lines.
 *   page          string    Detail page URL. Defaults to
 *                           "projects/<id>.html" when omitted.
 *   thumbnail     object    Card image { src, alt }. Defaults to the
 *                           first assets.images entry; with neither, the
 *                           card shows the forest-spiral artwork.
 *   categories    string[]  Filter categories. Filter buttons are built
 *                           from these, so spelling must be consistent.
 *   start         string    "YYYY-MM". Start date.
 *   end           string    "YYYY-MM", or "present" for ongoing work.
 *                           Chronological sort uses end, then start;
 *                           undated projects sort last.
 *   role          string    Your title on the project ("Scrum Master").
 *   contribution  string    What you personally did.
 *   technologies  string[]  Tools, languages, frameworks, services.
 *   methods       string[]  Practices and techniques. Displayed together
 *                           with technologies, stored separately.
 *   deliverables  object[]  What the project produced.
 *                           { label: string, href?: string }
 *   assets        object    Supporting media, each list optional:
 *     images      object[]  { src: string, alt: string, caption?: string }
 *     files       object[]  { label: string, href: string }
 *     links       object[]  { label: string, href: string }
 *   notes         string    Context such as advisors or venues.
 *
 * Rule against duplication: a file or link that IS a deliverable goes on
 * the deliverable's href only, not also in assets.
 */

const PROJECTS = [
    {
        id: "ai4hc",
        title: "AI4HC: AI-Powered Virtual Assistant for Healthcare Providers",
        summary:
            "An AI assistant that converts nurses' spoken observations into " +
            "structured, reviewable patient data. The system transcribes " +
            "audio, extracts clinical events with an LLM, and generates shift " +
            "handover summaries, with the nurse confirming results at each step.",
        categories: ["Applications", "NLP", "Machine Learning"],
        start: "",
        end: "2026-04",
        role: "",
        contribution:
            "Built by an 11-person graduate team; I led sprint planning, " +
            "architecture decision records, GitHub workflows, " +
            "cross-component integration, and the showcase poster.",
        technologies: [
            "React Native",
            "Spring Boot",
            "RabbitMQ",
            "AWS Transcribe",
            "Claude Haiku 4.5 on AWS Bedrock",
            "PostgreSQL",
        ],
        methods: ["Project Management", "Agile Methodologies"],
        deliverables: [{ label: "Showcase poster" }],
        assets: {},
        notes:
            "Faculty advisor: Ian Gorton. Presented at the Khoury Spring " +
            "MS CS Showcase, April 2026.",
    },
    {
        id: "mirror-or-self-portrait",
        title: "Mirror or Self-Portrait: A Systematic Review of AI Ethics Literature",
        summary:
            "An ongoing systematic review, with Dr. Brianna Dym, of how AI " +
            "ethics literature constructs ethical meaning. From 219 screened " +
            "ACM papers, 62 were coded by how their language expresses ethics, " +
            "producing an emergent two-axis framework: AI as mirror vs. " +
            "self-portrait, and ethics as checklist vs. situated. Grounded in " +
            "existentialism, the framework treats AI systems as expressions of " +
            "their creators' decisions. Next phases: a labeled dataset and an " +
            "ML classifier to automate classification across the AI lifecycle.",
        categories: ["Research"],
        start: "",
        end: "present",
        role: "",
        contribution: "",
        technologies: [],
        methods: ["Systematic Reviews", "AI Ethics"],
        deliverables: [],
        assets: {},
        notes: "Presented at the Khoury Spring MS CS Showcase, April 2026.",
    },
    {
        id: "aurafx",
        title: "AuraFx",
        summary:
            "A real-time migraine aura simulator that applies adjustable " +
            "visual effects to a live webcam feed.",
        categories: ["Applications", "Computer Vision"],
        page: "projects/aura_fx/index.html",
        start: "",
        end: "",
        role: "",
        contribution: "",
        technologies: ["C++", "OpenCV", "CMake"],
        methods: ["Computer Vision", "UX Design", "Accessibility"],
        deliverables: [],
        assets: {
            images: [{ src: "images/aurafx-placeholder.png", alt: "AuraFx screenshot" }],
        },
        notes: "",
    },
    {
        id: "gamily",
        title: "Gamily",
        summary: "Tournament management platform built with Spring Boot and MySQL.",
        categories: ["Applications"],
        start: "",
        end: "",
        role: "",
        contribution: "",
        technologies: ["Java", "Spring Boot", "MySQL"],
        methods: [],
        deliverables: [],
        assets: {
            images: [{ src: "images/gamily-placeholder.png", alt: "Gamily screenshot" }],
        },
        notes: "",
    },
];
