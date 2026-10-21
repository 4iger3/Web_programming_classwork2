import React, { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion"
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Github,
  Linkedin,
  Menu,
  MoveUpRight,
  Sparkles,
  X,
} from "lucide-react"
import underwaterVideo from "../4023639833-preview.mp4"
import profileOne from "./assets/profile-1.jpg"
import profileTwo from "./assets/profile-2.jpg"
import profileThree from "./assets/profile-3.jpg"
import aboutPortrait from "./assets/about-portrait.jpg"
import projectNorth from "./assets/project-north.jpg"
import projectStill from "./assets/project-still.jpg"
import projectObjects from "./assets/project-objects.jpg"
import underwaterPoster from "./assets/underwater-poster.jpg"

const profileUrl = "https://github.com/4iger3"

const portraitImages = [
  {
    src: profileOne,
    alt: "Portrait of a creative professional",
  },
  {
    src: profileTwo,
    alt: "Portrait of a creative professional seated in a studio",
  },
  {
    src: profileThree,
    alt: "Portrait of a creative professional against a vivid blue backdrop",
  },
]

const services = [
  {
    number: "01",
    title: "Digital experiences",
    description:
      "From a first sketch to a polished product, I create intuitive interfaces that make complex things feel simple — and keep people coming back.",
    tags: ["Product thinking", "UI/UX", "Prototyping"],
  },
  {
    number: "02",
    title: "Web design & build",
    description:
      "Distinctive, responsive websites designed with purpose and brought to life with clean, considered front-end code.",
    tags: ["Art direction", "React", "Responsive"],
  },
  {
    number: "03",
    title: "Interfaces that scale",
    description:
      "Thoughtful design systems and reusable components that help teams move quickly without losing the little details.",
    tags: ["Design systems", "Components", "Accessibility"],
  },
  {
    number: "04",
    title: "Ideas into prototypes",
    description:
      "I turn the early what-ifs into tangible, testable experiences — so good ideas can find their shape sooner.",
    tags: ["Wireframes", "Interaction", "Motion"],
  },
]

const projects = [
  {
    number: "01",
    title: "NŌRTH / FORM",
    type: "Digital flagship",
    description: "A quieter kind of commerce for objects made to last.",
    tags: ["E-commerce", "Art direction"],
    image: projectNorth,
    imageAlt: "Sculptural modern interior with warm natural light",
    className: "project-image-one",
  },
  {
    number: "02",
    title: "STILL / SPACE",
    type: "Wellness platform",
    description: "A more human way to make room for a little stillness.",
    tags: ["Product design", "Mobile"],
    image: projectStill,
    imageAlt: "Minimal architectural shapes against a clear sky",
    className: "project-image-two",
  },
  {
    number: "03",
    title: "OBJECTS / 01",
    type: "Creative studio",
    description: "A digital home for the curious and the collectible.",
    tags: ["Creative development", "Web"],
    image: projectObjects,
    imageAlt: "Minimal still life with a sculptural object",
    className: "project-image-three",
  },
]

const appear = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={appear}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

function GlassCard({ children, className = "", ...props }) {
  return (
    <div className={`glass-card ${className}`} {...props}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <span className="section-label">
      <Asterisk size={14} strokeWidth={2.5} aria-hidden="true" />
      {children}
    </span>
  )
}

function HoverImageCarousel({ images, interval = 500, touchInterval = 3000 }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const touchStartX = useRef(null)

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: coarse)")
    const updatePointer = () => setIsTouchDevice(pointerQuery.matches)

    updatePointer()
    pointerQuery.addEventListener("change", updatePointer)
    return () => pointerQuery.removeEventListener("change", updatePointer)
  }, [])

  useEffect(() => {
    if (!isHovered && !isTouchDevice) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length)
    }, isHovered ? interval : touchInterval)

    return () => window.clearInterval(timer)
  }, [images.length, interval, isHovered, isTouchDevice, touchInterval])

  const handlePointerDown = (event) => {
    if (event.pointerType === "touch") touchStartX.current = event.clientX
  }

  const handlePointerUp = (event) => {
    if (event.pointerType !== "touch" || touchStartX.current === null) return

    const deltaX = event.clientX - touchStartX.current
    if (Math.abs(deltaX) > 40) {
      setActiveIndex((index) => (index + (deltaX < 0 ? 1 : -1) + images.length) % images.length)
    }
    touchStartX.current = null
  }

  return (
    <div
      className={`portrait-carousel${isHovered ? " is-hovered" : ""}`}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setIsHovered(true)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "touch") return

        setIsHovered(false)
        setActiveIndex(0)
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        touchStartX.current = null
      }}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={images[activeIndex].src}
          className="portrait-image"
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          fetchpriority="high"
          initial={{ opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.975 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          draggable="false"
        />
      </AnimatePresence>
    </div>
  )
}

function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const pointerX = useMotionValue(-20)
  const pointerY = useMotionValue(-20)
  const x = useSpring(pointerX, { stiffness: 420, damping: 34, mass: 0.45 })
  const y = useSpring(pointerY, { stiffness: 420, damping: 34, mass: 0.45 })

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    const updatePointerSupport = () => {
      setEnabled(pointerQuery.matches)
      document.body.classList.toggle("custom-cursor-enabled", pointerQuery.matches)
    }
    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return

      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
      setIsVisible(true)
      setIsInteractive(
        event.target instanceof Element &&
          Boolean(event.target.closest("a, button, [role='button'], .project-card, .portrait-carousel")),
      )
    }
    const hideCursor = () => {
      setIsVisible(false)
      setIsInteractive(false)
    }

    updatePointerSupport()
    pointerQuery.addEventListener("change", updatePointerSupport)
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("blur", hideCursor)
    document.documentElement.addEventListener("pointerleave", hideCursor)

    return () => {
      pointerQuery.removeEventListener("change", updatePointerSupport)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("blur", hideCursor)
      document.documentElement.removeEventListener("pointerleave", hideCursor)
      document.body.classList.remove("custom-cursor-enabled")
    }
  }, [pointerX, pointerY])

  if (!enabled) return null

  return (
    <motion.div
      className="custom-cursor"
      aria-hidden="true"
      style={{ x, y }}
      animate={{
        scale: isInteractive ? 3 : 1,
        opacity: isVisible ? (isInteractive ? 0.58 : 0.92) : 0,
      }}
      transition={{
        scale: { type: "spring", stiffness: 300, damping: 22 },
        opacity: { duration: 0.18 },
      }}
    />
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Work", "#work"],
    ["Contact", "#contact"],
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#home" aria-label="4iger3 home">
          4iger3<span className="wordmark-dot">.</span>
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="button button-small header-cta" href="#contact">
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <motion.div
          className="availability"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="availability-dot" />
          Independent creative developer
        </motion.div>
        <motion.p
          className="hero-greeting"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Hi, I&apos;m 4iger3 <span aria-hidden="true">✳</span>
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          I make digital
          <br />
          feel <span className="headline-accent">different.</span>
        </motion.h1>
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
        >
          Creative developer and digital designer turning thoughtful ideas into experiences
          people love to use.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
        >
          <a className="button" href="#work">
            Explore my work <ArrowDownRight size={17} />
          </a>
          <a className="text-link" href="#about">
            A little about me <ArrowRight size={15} />
          </a>
        </motion.div>
        <motion.div
          className="hero-footnote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>DESIGN-LED. DETAIL-OBSESSED.</span>
          <span>SCROLL TO EXPLORE <ArrowDown size={12} /></span>
        </motion.div>
      </div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.96, x: 12 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
      >
        <div className="portrait-frame">
          <HoverImageCarousel images={portraitImages} />
          <div className="portrait-shade" />
          <div className="portrait-caption">
            <span>MAKING THE INTERNET</span>
            <strong>A little more human.</strong>
          </div>
          <div className="portrait-index">IND. — 01</div>
        </div>
        <motion.div
          className="float-badge badge-top"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={14} /> Open to good ideas
        </motion.div>
        <motion.div
          className="float-badge badge-bottom"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="badge-mark">✳</span> Design <span className="badge-divider">/</span>{" "}
          Development
        </motion.div>
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <section className="about section-wrap" id="about">
      <Reveal className="about-visual">
        <div className="about-orbit orbit-one" />
        <div className="about-orbit orbit-two" />
        <GlassCard className="about-note">
          <span className="about-note-mark">✳</span>
          <span>Curiosity first.<br />Always.</span>
        </GlassCard>
        <div className="about-photo">
          <img
            src={aboutPortrait}
            alt="Creative portrait in a sunlit studio"
            loading="lazy"
          />
          <div className="photo-coordinate">EST. IN CURIOSITY</div>
        </div>
      </Reveal>
      <Reveal className="about-copy" delay={0.12}>
        <SectionLabel>Behind the pixels</SectionLabel>
        <h2>
          A good idea
          <br />
          deserves a <span className="serif-accent">great feeling.</span>
        </h2>
        <p>
          I&apos;m an independent creative developer who cares as much about how something feels
          as how it works. I bring design and code together to make digital experiences feel
          effortless, distinctive, and a little unexpected.
        </p>
        <p>
          My process starts with curiosity, gets better with collaboration, and always leaves room
          for the details that make a product feel unmistakably yours.
        </p>
        <div className="about-bottom">
          <a
            className="button button-outline"
            href="data:text/plain;charset=utf-8,4iger3%0ACreative%20Developer%20%26%20Digital%20Designer%0A%0APROFILE%0AIndependent%20creative%20developer%20focused%20on%20thoughtful%20digital%20design%20and%20front-end%20experiences.%0A%0APORTFOLIO%0Ahttps%3A%2F%2Fgithub.com%2F4iger3%0A%0AContact%3A%20hello%404iger3.dev%0A%0AUpdate%20this%20starter%20resume%20with%20your%20experience%20and%20contact%20details."
            download="4iger3-resume.txt"
          >
            Download résumé <ArrowDown size={15} />
          </a>
          <span className="about-signature">A little intention goes a long way.</span>
        </div>
      </Reveal>
    </section>
  )
}

function Expertise() {
  const [active, setActive] = useState(0)

  return (
    <section className="expertise section-wrap" id="expertise">
      <Reveal className="section-heading">
        <div>
          <SectionLabel>My expertise</SectionLabel>
          <h2>
            From first spark
            <br />
            to <span className="serif-accent">final detail.</span>
          </h2>
        </div>
        <p>Good work comes from asking better questions — then making every answer count.</p>
      </Reveal>
      <Reveal className="services-list" delay={0.1}>
        {services.map((service, index) => {
          const isActive = active === index
          return (
            <motion.div
              className={`service-row${isActive ? " is-active" : ""}`}
              key={service.number}
              layout
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <button
                type="button"
                className="service-trigger"
                aria-expanded={isActive}
                onClick={() => setActive(isActive ? -1 : index)}
              >
                <span className="service-number">{service.number}</span>
                <span className="service-title">{service.title}</span>
                <span className="service-plus">{isActive ? "−" : "+"}</span>
              </button>
              {isActive && (
                <motion.div
                  className="service-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.28 }}
                >
                  <p>{service.description}</p>
                  <div className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </Reveal>
    </section>
  )
}

function Projects() {
  return (
    <section className="work section-wrap" id="work">
      <Reveal className="section-heading work-heading">
        <div>
          <SectionLabel>Selected explorations</SectionLabel>
          <h2>
            Less ordinary,
            <br />
            <span className="serif-accent">by design.</span>
          </h2>
        </div>
        <a className="text-link github-link" href={profileUrl} target="_blank" rel="noreferrer">
          More on GitHub <Github size={16} /> <MoveUpRight size={14} />
        </a>
      </Reveal>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal key={project.number} className="project-reveal" delay={index * 0.08}>
            <motion.article
              className="project-card"
              whileHover={{ y: -7 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <a
                className="project-image-link"
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} concept — visit 4iger3 on GitHub`}
              >
                <img
                  className={project.className}
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                />
                <span className="project-view">View concept <ArrowUpRight size={15} /></span>
              </a>
              <div className="project-meta">
                <div className="project-heading">
                  <div>
                    <span className="project-type">{project.type}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <span className="project-number">{project.number}</span>
                </div>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
      <p className="projects-note">
        Concept work — exploring ideas, interactions, and the details in between.
      </p>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact section-wrap" id="contact">
      <Reveal className="contact-panel">
        <span className="contact-spark">✳</span>
        <SectionLabel>Have a good one?</SectionLabel>
        <h2>
          Let&apos;s make
          <br />
          <span className="serif-accent">something matter.</span>
        </h2>
        <p>Have a project in mind, a question, or just want to say hello?</p>
        <a className="button" href="mailto:hello@4iger3.dev">
          Start a conversation <ArrowUpRight size={17} />
        </a>
        <span className="contact-decoration" aria-hidden="true">4 / 3</span>
      </Reveal>
      <footer className="site-footer">
        <a className="wordmark" href="#home">
          4iger3<span className="wordmark-dot">.</span>
        </a>
        <span className="footer-note">MADE WITH INTENTION & A LITTLE BIT OF ✳</span>
        <div className="social-links">
          <a href={profileUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={17} />
          </a>
          <a href="mailto:hello@4iger3.dev" aria-label="Email">
            <ArrowUpRight size={17} />
          </a>
        </div>
        <span className="copyright">© 2025 4iger3</span>
      </footer>
    </section>
  )
}

function App() {
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 641px) and (prefers-reduced-motion: no-preference)")
    const updateVideoPreference = () => setShouldPlayVideo(mediaQuery.matches)

    updateVideoPreference()
    mediaQuery.addEventListener("change", updateVideoPreference)
    return () => mediaQuery.removeEventListener("change", updateVideoPreference)
  }, [])

  return (
    <>
      <CustomCursor />
      <div className="underwater-backdrop" aria-hidden="true">
        {shouldPlayVideo && (
          <video
            className="underwater-video"
            autoPlay
            muted
            loop
            playsInline
            poster={underwaterPoster}
          >
            <source src={underwaterVideo} type="video/mp4" />
          </video>
        )}
        <div className="grain-overlay" />
      </div>
      <Header />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

export default App
