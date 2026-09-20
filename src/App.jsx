import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const experience = [
  {
    company: 'FUJIFILM Healthcare Americas Corporation',
    role: 'Senior Software Engineer — Research & Development',
    dates: 'Aug 2026 – Present',
    bullets: [
      'Modernized legacy per-service file logging by designing and implementing a centralized observability platform, providing a multi-target NuGet package for shared telemetry instrumentation and routing telemetry through an OpenTelemetry Collector deployed to Kubernetes.',
      'Deployed and configured Loki and Tempo with S3-compatible object storage for centralized logs and distributed traces, alongside Prometheus for time-series metrics.',
    ],
    tech: ['C#', '.NET 10', 'ASP.NET Core', 'Kubernetes', 'OpenTelemetry', 'Loki', 'Tempo', 'Prometheus'],
  },
  {
    company: 'FUJIFILM Healthcare Americas Corporation',
    role: 'Senior Software Engineer — Product Development',
    dates: 'Mar 2025 – Aug 2026',
    bullets: [
      'Designed and delivered a third-party application integration POC that contributed to a successful $10M customer sale.',
      'Built a shared UI library standardizing dialog behavior and styling across 5+ web applications.',
      'Redesigned an enterprise chat application around participant-based conversation identity.',
      'Optimized chat data retrieval, reducing response times from 6 seconds to near-instant in high-load environments.',
      'Diagnosed and resolved a production memory leak caused by unbounded event-listener registration.',
    ],
    tech: ['C#', '.NET 10', '.NET Framework 4.8', 'TypeScript', 'Razor Pages', 'PL/SQL'],
  },
  {
    company: 'LexisNexis',
    role: 'Software Engineer II',
    dates: 'May 2023 – Mar 2025',
    bullets: [
      'Designed data access and API-key authentication for an OData reporting integration consumed by Power BI.',
      'Led authentication integrations and guided application teams through API-key and token-based flows.',
      'Led offshore engineers implementing OData endpoints around repeatable application patterns.',
      'Built a key event relationship framework for GraphQL request telemetry.',
      'Implemented an in-application query builder for dynamic data retrieval workflows.',
    ],
    tech: ['C#', '.NET 8', 'OData', 'GraphQL', 'Azure', 'T-SQL'],
  },
  {
    company: 'LexisNexis',
    role: 'Software Engineer I',
    dates: 'Feb 2022 – May 2023',
    bullets: [
      'Migrated multiple applications from implicit-flow authentication to PKCE code flow.',
      'Developed logout functionality for a shared authentication server.',
      'Implemented custom CORS and host-filtering middleware for cloud environments.',
      'Exposed OData endpoints and optimized GraphQL data retrieval workflows.',
      'Implemented legacy Java override configurations to support cloud deployments.',
    ],
    tech: ['C#', '.NET 8', 'Java', 'OData', 'GraphQL', 'Azure'],
  },
  {
    company: 'Infosys (Client: Walmart)',
    role: 'Systems Engineer',
    dates: 'Nov 2021 – Feb 2022',
    bullets: [
      'Fixed bugs across enterprise applications using Java, Spring Boot, Kubernetes, and PL/SQL.',
      'Applied object-oriented design patterns and established application conventions while implementing Spring Boot services.',
    ],
    tech: ['Java', 'Spring Boot', 'PL/SQL'],
  },
]

const projects = [
  {
    slug: 'yavria',
    title: 'Yavria',
    subtitle: 'AI Context & Knowledge Platform',
    mark: 'Y',
    summary: 'A self-hosted, multi-service AI platform for persistent conversation context, semantic retrieval, file-based context, and external integrations. Built with PostgreSQL/pgvector, provider-agnostic embeddings, containerized deployment, and explicit service boundaries.',
    tech: ['C#', '.NET', 'PostgreSQL', 'pgvector', 'React', 'Docker'],
    image: '/assets/yavria.png',
    liveUrl: 'https://yavria.com',
    caseStudy: {
      intro: 'Yavria is a multi-service AI platform built around persistent conversation context, semantic knowledge retrieval, file-based context, and external application integrations.',
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
    mark: '</>',
    summary: 'A full-stack coding practice platform that tracks problem history and generates personalized daily practice queues using mastery, completion state, focus-first pattern practice, and spaced repetition. AI coaching is integrated through Yavria.',
    tech: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'AI'],
    image: '/assets/nextproblem.png',
    liveUrl: 'https://nextproblem.app',
    caseStudy: {
      intro: 'NextProblem is a full-stack coding-practice platform designed to turn problem history into a focused daily practice plan rather than a static problem list.',
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
        <div className={`project-mark ${project.slug}`}>{project.mark}</div>
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
        <p className="eyebrow">Software Engineer</p>
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
              I'm a software engineer with experience in distributed systems, cloud infrastructure, and developer tools.
              I care about clean architecture, maintainable code, and practical solutions. Outside of work, I enjoy working
              on personal projects, learning new technologies, and solving interesting problems.
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
  return (
    <main className="case-study-page">
      <div className="case-back-row">
        <Link className="text-link" to="/#projects">← Back to projects</Link>
      </div>
      <section className="case-hero">
        <p className="eyebrow">Case Study</p>
        <div className="case-title-row">
          <div className={`project-mark large ${project.slug}`}>{project.mark}</div>
          <div>
            <h1>{project.title}</h1>
            <p>{project.subtitle}</p>
          </div>
        </div>
        <p className="case-intro">{project.caseStudy.intro}</p>
        <TechPills items={project.tech} />
      </section>

      <section className="case-screenshot-block">
        <img src={project.image} alt={`${project.title} application screenshot`} />
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
        <span>Always learning. Always building.</span>
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
