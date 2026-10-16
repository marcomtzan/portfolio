import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const experience = [
  {
    company: 'FUJIFILM Healthcare Americas Corporation',
    role: 'Senior Software Engineer',
    dates: 'Mar 2025 – Present',
    bullets: [
      'Built centralized observability infrastructure on Kubernetes using OpenTelemetry, Loki, Tempo, and Prometheus, with a reusable .NET logging library to standardize telemetry across applications.',
      'Delivered a full-stack third-party application integration using C#, .NET, and TypeScript, including deployment scripts and backups, to support a major customer sales opportunity.',
      'Built and integrated a shared dialog UI library using TypeScript, JavaScript, HTML, and CSS across multiple web applications and a C++ desktop client, standardizing dialog behavior across teams.',
      'Redesigned chat creation in a SignalR-based application to identify conversations by title and participants, preventing duplicate chats and enabling reuse of existing conversations.',
      'Optimized chat participant selection using SQL query improvements and client-side caching, reducing dropdown load times from ~6 seconds to near-instant for large datasets.',
      'Diagnosed and fixed a long-standing JavaScript memory leak caused by Chrome extension interactions, resolving a customer-impacting production issue.',
    ],
    tech: ['C#', '.NET', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'Kubernetes', 'OpenTelemetry', 'Loki', 'Tempo', 'Prometheus', 'SignalR'],
  },
  {
    company: 'LexisNexis',
    role: 'Software Engineer II',
    dates: 'May 2023 – Mar 2025',
    bullets: [
      'Migrated backend functionality from legacy Java services to C#/.NET, modernizing application components while preserving existing behavior.',
      'Designed and built a .NET authentication flow, allowing JWT-authenticated users to create and use API keys for Power BI access to on-premises reporting data.',
      'Led offshore engineers implementing OData endpoints, assigning work around repeatable application patterns and establishing implementation conventions.',
      'Diagnosed and resolved production issues in Azure using Application Insights to identify root causes, implementing and deploying fixes through CI/CD pipelines.',
    ],
    tech: ['C#', '.NET', 'Java', 'Azure', 'Application Insights', 'CI/CD', 'OData', 'Power BI', 'JWT'],
  },
  {
    company: 'LexisNexis',
    role: 'Software Engineer I',
    dates: 'Feb 2022 – May 2023',
    bullets: [
      'Built a reusable Angular component guard using JWT module claims to control access to subscription-based features, with authorization enforced by backend services.',
      'Developed and extended cloud-hosted GraphQL and on-premises OData endpoints using C#, .NET, Entity Framework, and SQL Server.',
      'Built a GraphQL telemetry framework using schema-level annotations to log request properties in the cloud, with configurable PII obfuscation to improve post-deployment troubleshooting.',
    ],
    tech: ['C#', '.NET', 'Java', 'GraphQL', 'OData', 'Entity Framework', 'SQL Server', 'Azure'],
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
    subtitle: 'Repository-Aware AI & Developer Tools',
    icon: '/assets/yavria-icon.png',
    summary: 'A self-hosted AI workspace for exploring code and technical knowledge. Its retrieval pipeline combines hybrid ranking, persistent conversation context, and execution diagnostics, with a VS Code extension for repository-aware assistance.',
    tech: ['C#', '.NET 10', 'PostgreSQL', 'pgvector', 'RAG', 'React', 'Docker', 'Kubernetes'],
    images: [
      '/assets/yavria/yavria-1.png',
      '/assets/yavria/yavria-2.png',
    ],
    liveUrl: 'https://yavria.com',
    caseStudy: {
      intro: 'I built Yavria to explore what makes AI assistance useful when answers depend on private repositories and accumulated context, not just a single prompt. It brings together knowledge ingestion, retrieval, model orchestration, and inspectable diagnostics behind a web app and VS Code extension.',
      sections: [
        {
          title: 'Retrieval beyond vector similarity',
          body: 'Content is indexed into PostgreSQL with pgvector and retrieved through a pipeline that considers semantic relevance, source authority, and query intent. Coverage planning and context compression help assemble the evidence sent to the model.',
        },
        {
          title: 'Orchestration and diagnostics',
          body: 'Knowledge retrieval, conversation context, model calls, and authentication have distinct service responsibilities. Persisted execution traces expose individual pipeline stages, making response quality and failures easier to investigate.',
        },
        {
          title: 'Developer workflow',
          body: 'A VS Code extension brings repository-aware assistance directly into the editor. The web client supports authenticated conversations, persistent context, and streaming model responses.',
        },
        {
          title: 'Self-hosting and deployment',
          body: 'Docker and Kubernetes configurations support a multi-service stack with PostgreSQL, S3-compatible object storage, and edge routing. Self-hosting gives the application control over its data, infrastructure, and integration boundaries.',
        },
      ],
    },
  },
  {
    slug: 'nextproblem',
    title: 'NextProblem',
    subtitle: 'Adaptive Coding Practice & AI Coach',
    icon: '/assets/nextproblem-icon.svg',
    summary: 'A coding interview practice platform that turns LeetCode history into focused daily plans. It tracks pattern mastery and retention, syncs progress through a Chrome extension, and integrates Yavria for context-aware coaching.',
    tech: ['C#', '.NET 10', 'ASP.NET Core', 'React', 'TypeScript', 'Docker', 'Kubernetes'],
    images: [
      '/assets/next-problem/next-problem-1.png',
      '/assets/next-problem/next-problem-2.png',
      '/assets/next-problem/next-problem-3.png',
    ],
    liveUrl: 'https://nextproblem.app',
    caseStudy: {
      intro: 'I built NextProblem around a question: how do you decide what to practice next when completing more problems does not necessarily mean making progress? It combines practice history, self-assessment, and targeted review into daily plans, with AI coaching available when needed.',
      sections: [
        {
          title: 'Pattern-first practice planning',
          body: 'The planner creates daily queues and longer-term schedules using solved history, focus areas, difficulty, and pattern proficiency. It can concentrate on one problem-solving pattern while periodically reinforcing concepts from earlier sessions.',
        },
        {
          title: 'Feedback and retention',
          body: 'Self-assessments, session debriefs, and retention checks help distinguish a completed problem from a mastered pattern. Explanations for recommended problems make the intent of each practice session visible.',
        },
        {
          title: 'Browser extension and progress',
          body: 'A Chrome extension synchronizes completed LeetCode problems and keeps practice history current. Planning and progress tracking remain first-class application features, rather than being delegated to an LLM.',
        },
        {
          title: 'AI integration and service boundaries',
          body: 'NextProblem supplies relevant practice context to Yavria for personalized coaching while retaining ownership of its planning logic and user progress. The two applications remain independently deployable, with Docker and Kubernetes options for the platform.',
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
          I'm a senior software engineer building and maintaining enterprise applications with C#/.NET, Java, and TypeScript.
          My experience spans full-stack development, cloud infrastructure, backend modernization, and production troubleshooting.
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
        <div className="education-list">
          <div className="education-row">
            <div>
              <h3>B.S. Computer Science</h3>
              <p>Southern New Hampshire University</p>
            </div>
          </div>
          <div className="education-row">
            <div>
              <h3>A.S. Computer Science</h3>
              <p>Sacramento City College</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about section-compact" id="about">
        <h2>About Me</h2>
        <div className="about-body">
          <div className="about-copy">
            <p>
              I enjoy solving complex technical problems, evaluating different approaches, and building reliable software. My work spans full-stack development, cloud infrastructure, backend modernization, and production troubleshooting.
            </p>
            <p>
              Outside of work, I enjoy building personal projects, experimenting with AI and new technologies, and spending time with my family.
            </p>
            <a className="text-link" href="mailto:marcomtzan@gmail.com">Get in touch <ArrowIcon /></a>
          </div>
          <address className="contact-list">
            <span><strong>⌖</strong> Raleigh, NC</span>
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
