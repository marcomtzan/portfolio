import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const experience = [
  {
    company: 'FUJIFILM Healthcare Americas Corporation',
    role: 'Senior Software Engineer — Research & Development',
    dates: 'Aug 2026 – Present',
    bullets: [
      'Built a centralized observability platform replacing fragmented file logging with container-native logging, metrics, and distributed tracing across .NET services.',
      'Developed reusable telemetry instrumentation and deployed telemetry collection infrastructure to Kubernetes using OpenTelemetry, Loki, Tempo, Prometheus, and S3-compatible storage.',
    ],
    tech: ['C#', '.NET 10', 'ASP.NET Core', 'Kubernetes', 'OpenTelemetry', 'Loki', 'Tempo', 'Prometheus'],
  },
  {
    company: 'FUJIFILM Healthcare Americas Corporation',
    role: 'Senior Software Engineer — Product Development',
    dates: 'Mar 2025 – Aug 2026',
    bullets: [
      'Delivered a full-stack third-party application integration using C#, .NET, TypeScript, and Razor Pages, including customer-specific deployment scripting, protected backups, and recovery safeguards, contributing to a successful $10M customer sale.',
      'Designed and rolled out a shared TypeScript/Razor Pages UI library across 5+ web applications, standardizing dialog behavior and driving cross-team adoption of a common implementation.',
      'Redesigned a C#/.NET enterprise chat application around participant-based conversation identity to prevent duplicate chats and automatically resume existing conversations.',
      'Optimized PL/SQL chat queries by moving filtering and sorting into the database and limiting result sets, reducing response times from ~6 seconds to near-instant.',
      'Diagnosed and fixed a long-standing JavaScript memory leak caused by Chrome extension interactions that bypassed normal QA coverage, resolving a customer-impacting production issue.',
    ],
    tech: ['C#', '.NET 10', '.NET Framework 4.8', 'TypeScript', 'Razor Pages', 'PL/SQL'],
  },
  {
    company: 'LexisNexis',
    role: 'Software Engineer II',
    dates: 'May 2023 – Mar 2025',
    bullets: [
      'Designed the T-SQL authentication data model and implemented schema migrations with FluentMigrator, securely storing API credentials using unique salts and cryptographic hashes.',
      'Designed and built a C#/.NET OData authentication flow, allowing JWT-authenticated users to provision API keys for Power BI access to on-premises reporting data.',
      'Served as the primary technical point of contact for authentication integrations, guiding application and automation teams through API-key and token-based authentication flows.',
      'Led offshore engineers implementing OData/.NET endpoints, assigning work around repeatable application patterns and establishing implementation conventions.',
      'Built a GraphQL telemetry framework using schema-level annotations to log request properties in the cloud, with configurable PII obfuscation to improve post-deployment troubleshooting.',
    ],
    tech: ['C#', '.NET 8', 'OData', 'GraphQL', 'T-SQL', 'FluentMigrator', 'Power BI'],
  },
  {
    company: 'LexisNexis',
    role: 'Software Engineer I',
    dates: 'Feb 2022 – May 2023',
    bullets: [
      'Migrated multiple C#/.NET applications from implicit-flow authentication to PKCE.',
      'Implemented custom C#/.NET CORS and host-filtering middleware to secure applications in load-balanced cloud environments.',
      'Built and supported Angular/TypeScript application workflows backed by OData endpoints and optimized GraphQL data retrieval using data loaders.',
    ],
    tech: ['C#', '.NET 6', 'Angular', 'TypeScript', 'OData', 'GraphQL'],
  },
  {
    company: 'Infosys (Client: Walmart)',
    role: 'Systems Engineer',
    dates: 'Nov 2021 – Feb 2022',
    bullets: [
      'Fixed bugs across enterprise applications using Java, Spring Boot, Kubernetes, and PL/SQL.',
      'Applied object-oriented design patterns and established application conventions while implementing Spring Boot services.',
    ],
    tech: ['Java', 'Spring Boot', 'Kubernetes', 'PL/SQL'],
  },
]

const projects = [
  {
    slug: 'yavria',
    title: 'Yavria',
    subtitle: 'AI Context & Knowledge Platform',
    icon: '/assets/yavria-icon.png',
    summary: 'A self-hosted, multi-service AI platform for persistent conversation context, semantic retrieval, file-based context, and external integrations. Its VS Code extension brings Yavria into the editor with workspace synchronization, file attachment, and repository-aware chat.',
    tech: ['C#', '.NET', 'PostgreSQL', 'pgvector', 'React', 'VS Code', 'Docker'],
    images: [
      '/assets/yavria/yavria-1.png',
      '/assets/yavria/yavria-2.png',
    ],
    liveUrl: 'https://yavria.com',
    caseStudy: {
      intro: 'Yavria is a multi-service AI platform built around persistent conversation context, semantic knowledge retrieval, file-based context, and external application integrations. A companion VS Code extension can synchronize a workspace, attach files directly from the editor, and use that repository context in chat.',
      sections: [
        {
          title: 'Retrieval architecture',
          body: 'The platform uses PostgreSQL with pgvector for semantic retrieval, provider-agnostic embeddings, and streaming LLM responses. Conversation orchestration and knowledge storage are intentionally separated into explicit service boundaries.',
        },
        {
          title: 'Deployment and platform concerns',
          body: 'The application is containerized and deployed with ingress routing through Cloudflare Tunnel, centralized authentication and API access, database migrations, and diagnostics.',
        },
      ],
    },
  },
  {
    slug: 'nextproblem',
    title: 'NextProblem',
    subtitle: 'Adaptive Coding Interview Practice',
    icon: '/assets/nextproblem-icon.svg',
    summary: 'A full-stack coding practice platform that turns LeetCode history into personalized daily practice queues using mastery, completion state, focus-first pattern practice, and spaced repetition. Its Chrome extension passively synchronizes submissions and adds in-page text, screenshot, and voice coaching powered through Yavria.',
    tech: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'Chrome Extension', 'AI'],
    images: [
      '/assets/next-problem/next-problem-1.png',
      '/assets/next-problem/next-problem-2.png',
      '/assets/next-problem/next-problem-3.png',
    ],
    liveUrl: 'https://nextproblem.app',
    caseStudy: {
      intro: 'NextProblem is a full-stack coding-practice platform designed to turn LeetCode history into a focused daily practice plan rather than a static problem list. Its Chrome extension synchronizes solved problems and submission details in the background while also exposing contextual text, screenshot, and voice coaching on LeetCode.',
      sections: [
        {
          title: 'Practice planning',
          body: 'The application generates personalized daily practice queues from mastery, completion state, and spaced repetition. Its focus-first planning system concentrates practice on individual problem-solving patterns while periodically resurfacing previously learned material.',
        },
        {
          title: 'AI coaching boundary',
          body: 'Yavria is integrated as an external AI coaching service. NextProblem supplies practice history and progress as context for personalized guidance while keeping the two applications independently deployable.',
        },
      ],
    },
  },
]

function ArrowIcon() {
  return (
    <svg className="inline-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function Header() {
  return (
    <header className="topbar">
      <Link className="brand" to="/">Marco Martinez</Link>
      <nav className="nav" aria-label="Primary navigation">
        <a href="/#home">Home</a>
        <a href="/#experience">Experience</a>
        <a href="/#projects">Projects</a>
        <a href="/#about">About</a>
        <a href="mailto:marcomtzan@gmail.com">Contact</a>
      </nav>
    </header>
  )
}

function TechPills({ items }) {
  return (
    <div className="pills" aria-label="Technologies">
      {items.map((item) => <span key={item}>{item}</span>)}
    </div>
  )
}

function ExperienceItem({ item }) {
  return (
    <article className="experience-item">
      <span className="timeline-dot" aria-hidden="true" />
      <div className="experience-topline">
        <div>
          <h3>{item.company}</h3>
          <p className="role">{item.role}</p>
        </div>
        <time>{item.dates}</time>
      </div>
      <ul>
        {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
      </ul>
      <TechPills items={item.tech} />
    </article>
  )
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-head">
        <div className={`project-mark ${project.slug}`}><img src={project.icon} alt="" aria-hidden="true" /></div>
        <div className="project-title-wrap">
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
        </div>
      </div>
      <p className="project-summary">{project.summary}</p>
      <TechPills items={project.tech} />
      <Link className="text-link project-link" to={`/projects/${project.slug}`}>
        View {project.title} case study <ArrowIcon />
      </Link>
    </article>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero" id="home">
        <h1>Tools, Platforms, Products</h1>
        <p className="hero-copy">
          I build across the software stack, from developer tools and shared infrastructure to full applications.
          My experience includes C#/.NET, TypeScript, distributed systems, observability, cloud infrastructure,
          and modern web development.
        </p>
      </section>

      <section className="section" id="experience">
        <div className="section-heading-row">
          <h2>Professional Experience</h2>
          <a className="text-link" href="/assets/Marco_Martinez_Resume.pdf" target="_blank" rel="noreferrer">
            View Resume <ArrowIcon />
          </a>
        </div>
        <div className="experience-list">
          {experience.map((item) => <ExperienceItem item={item} key={`${item.company}-${item.role}`} />)}
        </div>
      </section>

      <section className="section project-section" id="projects">
        <div className="section-heading-row">
          <h2>Selected Projects</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => <ProjectCard project={project} key={project.slug} />)}
        </div>
      </section>

      <section className="education section-compact" id="education">
        <h2>Education</h2>
        <div className="education-row">
          <div>
            <h3>B.S. Computer Science</h3>
            <p>Southern New Hampshire University</p>
          </div>
        </div>
      </section>

      <section className="about section-compact" id="about">
        <h2>About Me</h2>
        <div className="about-body">
          <div className="about-copy">
            <p>
              I'm a software engineer who likes solving complex problems, designing systems, and building software that is reliable and maintainable. I’m especially interested in backend development, distributed systems, and understanding how software works beneath the surface.
            </p>
            <p>
              Outside of work, I spend time building personal projects, exploring new technologies, and being with my family.
            </p>
            <a className="text-link" href="mailto:marcomtzan@gmail.com">Get in touch <ArrowIcon /></a>
          </div>
          <address className="contact-list">
            <span><strong>⌖</strong> Holly Springs, NC</span>
            <a href="mailto:marcomtzan@gmail.com"><strong>✉</strong> marcomtzan@gmail.com</a>
            <a href="https://linkedin.com/in/marcomtzan" target="_blank" rel="noreferrer"><strong>in</strong> linkedin.com/in/marcomtzan</a>
            <a href="https://github.com/marcomtzan" target="_blank" rel="noreferrer"><strong>◉</strong> github.com/marcomtzan</a>
          </address>
        </div>
      </section>
    </>
  )
}

function CaseStudyPage({ project }) {
  const [imageIndex, setImageIndex] = useState(0)
  const imageCount = project.images.length

  const showPreviousImage = () => {
    setImageIndex((current) => (current - 1 + imageCount) % imageCount)
  }

  const showNextImage = () => {
    setImageIndex((current) => (current + 1) % imageCount)
  }

  useEffect(() => {
    setImageIndex(0)
  }, [project.slug])

  return (
    <main className="case-study-page">
      <div className="case-back-row">
        <Link className="text-link" to="/#projects">← Back to projects</Link>
      </div>
      <section className="case-hero">
        <p className="eyebrow">Case Study</p>
        <div className="case-title-row">
          <div className={`project-mark large ${project.slug}`}><img src={project.icon} alt="" aria-hidden="true" /></div>
          <div>
            <h1>{project.title}</h1>
            <p>{project.subtitle}</p>
          </div>
        </div>
        <p className="case-intro">{project.caseStudy.intro}</p>
        <TechPills items={project.tech} />
      </section>

      <section className="case-screenshot-block" aria-label={`${project.title} screenshots`}>
        <button
          className="case-screenshot-arrow previous"
          type="button"
          onClick={showPreviousImage}
          aria-label={`View previous ${project.title} screenshot`}
        >
          <span aria-hidden="true">←</span>
        </button>
        <img
          src={project.images[imageIndex]}
          alt={`${project.title} application screenshot ${imageIndex + 1} of ${imageCount}`}
        />
        <button
          className="case-screenshot-arrow next"
          type="button"
          onClick={showNextImage}
          aria-label={`View next ${project.title} screenshot`}
        >
          <span aria-hidden="true">→</span>
        </button>
        <span className="case-screenshot-count" aria-live="polite">
          {imageIndex + 1} / {imageCount}
        </span>
      </section>

      <section className="case-detail-list">
        {project.caseStudy.sections.map((section) => (
          <article className="case-detail" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="case-next">
        <div>
          <p>Explore the other project</p>
          <Link className="text-link" to={`/projects/${project.slug === 'yavria' ? 'nextproblem' : 'yavria'}`}>
            {project.slug === 'yavria' ? 'NextProblem' : 'Yavria'} <ArrowIcon />
          </Link>
        </div>
        <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">
          View Live Project ↗
        </a>
      </section>
    </main>
  )
}

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.pathname, location.hash])

  return null
}

function Layout() {
  return (
    <div className="site-shell">
      <Header />
      <Routes>
        <Route path="/" element={<main><HomePage /></main>} />
        {projects.map((project) => (
          <Route path={`/projects/${project.slug}`} element={<CaseStudyPage project={project} />} key={project.slug} />
        ))}
      </Routes>
      <footer className="footer">
        <span>© 2026 Marco Martinez</span>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Layout />
    </>
  )
}
