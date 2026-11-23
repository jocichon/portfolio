/**
 * File:        projects.js
 * Project:     Jo Cichon Portfolio (https://jocichon.github.io/portfolio/)
 * Author:      Jo Cichon
 * Description: Single source of truth for portfolio projects. script.js
 *              renders preview cards and category filter buttons from
 *              this array, and project-page.js renders each project's
 *              detail page (project.html?id=<id>) from it; no HTML file
 *              holds project content. Cards show thumbnail, title, date,
 *              summary, categories, and a technologies & methods
 *              summary; the detail page shows every field.
 *
 * PROJECT SCHEMA (only id, title, summary, categories are required;
 * omit or leave empty any optional field and it is not rendered)
 *
 *   id            string    Unique, URL-safe slug ("aurafx").
 *   title         string    Card heading.
 *   summary       string    What the project is (one short paragraph).
 *                           Cards clamp it to three lines.
 *   overview      string | string[]
 *                           Detail page Overview, one string per
 *                           paragraph. Falls back to summary.
 *   page          string    Detail page URL override. Omit to use the
 *                           shared template, project.html?id=<id>.
 *   thumbnail     object    Card image { src, alt }. Defaults to the
 *                           first assets.images entry; with neither, the
 *                           card shows the forest-spiral artwork.
 *   headerImage   object    Detail page header image { src, alt }.
 *                           Defaults to the card thumbnail.
 *   categories    string[]  Filter categories. Filter buttons are built
 *                           from these, so spelling must be consistent.
 *   start         string    "YYYY-MM". Start date.
 *   end           string    "YYYY-MM", or "present" for ongoing work.
 *                           Chronological sort uses end, then start;
 *                           undated projects sort last.
 *   role          string    Your title on the project ("Scrum Master").
 *   contribution  string | string[]
 *                           What you personally did (My Contribution).
 *   technologies  string[]  Tools, languages, frameworks, services.
 *   methods       string[]  Practices and techniques. Displayed together
 *                           with technologies, stored separately.
 *   deliverables  object[]  What the project produced.
 *                           { label: string, href?: string }
 *   assets        object    Supporting media, each list optional:
 *     images      object[]  { src: string, alt: string, caption?: string }
 *     files       object[]  { label: string, href: string }
 *     links       object[]  { label: string, href: string }
 *   notes         string    Context such as advisors or venues; shown
 *                           at the end of the Overview.
 *   reflection    string | string[]
 *                           What you learned or would do differently.
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
        reflection: "",
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
        reflection: "",
        notes: "Presented at the Khoury Spring MS CS Showcase, April 2026.",
    },
    {
        id: "aurafx",
        title: "AuraFx",
        summary:
            "A real-time migraine aura simulator that applies adjustable " +
            "visual effects to a live webcam feed.",
        categories: ["Applications", "Computer Vision"],
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
        reflection: "",
        notes: "",
    },
    {
        id: "indigenous-scholar",
        title: "Indigenous Scholar: Holistic Case Management for Indigenous Students",
        summary:
            "A PHP and MySQL case management app, built with the Indigenous " +
            "Student Success Center, that helps guidance counselors track " +
            "student well-being through check-ins across seven dimensions: " +
            "physical, spiritual, mental, emotional, academic, social, and " +
            "financial.",
        overview: [
            "Indigenous Scholar supports the needs of Indigenous students " +
                "through individualized guidance, student engagement, and " +
                "holistic well-being assessments. It gives guidance counselors " +
                "one place to monitor student well-being, document individual " +
                "circumstances, and coordinate ongoing support.",
            "Its core feature is a student check-in based on the Seven Bodies " +
                "of Well-Being, a framework developed by the client: physical, " +
                "spiritual, mental, emotional, academic, social, and financial. " +
                "Students rate their current \"temperature\" in each dimension " +
                "on interactive sliding scales, which opens an individualized " +
                "conversation with their counselor. Rather than judging students " +
                "by academic performance alone, the app supports a fuller view " +
                "of what shapes student success.",
            "Features include student profiles, case management for " +
                "documenting concerns and follow-ups, reporting on student and " +
                "check-in data, and user authentication.",
        ],
        categories: ["Applications"],
        start: "2024-02",
        end: "2024-06",
        role: "",
        contribution: "",
        technologies: [
            "PHP",
            "MySQL",
            "PDO",
            "Fat-Free Framework",
            "Composer",
            "HTML",
            "CSS",
            "JavaScript",
        ],
        methods: ["MVC Architecture", "CRUD", "UML Design", "Client Collaboration"],
        deliverables: [
            {
                label: "Capstone presentation recording (19:18–30:50)",
                href: "https://www.youtube.com/watch?v=YYl66j6zhwQ&t=1158s",
            },
        ],
        thumbnail: {
            src: "images/indigenous-scholar/wheel-thumb.webp",
            alt: "Indigenous Scholar app icon: a segmented color wheel",
        },
        headerImage: {
            src: "images/indigenous-scholar/seven-bodies-muted.png",
            alt: "The Seven Bodies of Well-Being: physical, spiritual, mental, " +
                "emotional, academic, social, and financial, arranged around " +
                "Indigenous Scholar",
        },
        assets: {
            images: [
                {
                    src: "images/indigenous-scholar/design-uml-overview.webp",
                    alt: "Design-phase UML: Profile links a Student record to " +
                        "many Cases and many CheckIns, with review notes on " +
                        "open design questions",
                    caption: "Data model with design review notes",
                },
                {
                    src: "images/indigenous-scholar/design-profile.webp",
                    alt: "Profile UML class beside case manager user stories " +
                        "grouped by read, create, update, and delete",
                    caption: "Profile: class and CRUD user stories",
                },
                {
                    src: "images/indigenous-scholar/design-case.webp",
                    alt: "Case UML class beside case manager user stories for " +
                        "listing, sorting, creating, closing, and archiving cases",
                    caption: "Case: class and CRUD user stories",
                },
                {
                    src: "images/indigenous-scholar/design-check-in.webp",
                    alt: "CheckIn UML class, with the emotional indicator expanded " +
                        "into seven fields, beside check-in user stories",
                    caption: "Check-in: seven well-being fields and user stories",
                },
            ],
        },
        reflection: "",
        notes:
            "Green River College capstone, built by a team of five for the " +
            "Indigenous Student Success Center.",
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
        reflection: "",
        notes: "",
    },
];
