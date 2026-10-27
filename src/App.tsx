import { useEffect, useRef, useState } from "react";
import { FaSquareInstagram } from "react-icons/fa6";
import * as THREE from "three";

const site = "https://monkmediaone.tech";

const navItems = [
  { label: "Services", href: `${site}/services/` },
  { label: "Portfolio", href: `${site}/portfolio/` },
  { label: "About", href: `${site}/about/` },
  { label: "Our Team", href: `${site}/our-team/` },
  { label: "Contact", href: `${site}/contact/` },
  { label: "Blogs", href: `${site}/blog/` },
];

const services = [
  {
    n: "01",
    title: "Private LLM Deployments",
    copy: "Run language models in environments aligned with your infrastructure and data-control requirements, including private cloud and on-premise deployments.",
    stack: "Ollama · Mistral · LLaMA · Docker · ChromaDB",
    icon: "core",
  },
  {
    n: "02",
    title: "Autonomous AI Agents",
    copy: "Build AI agents that coordinate multi-step tasks, use connected tools, and support defined business workflows.",
    stack: "LangGraph · CrewAI · LangChain · n8n",
    icon: "nodes",
  },
  {
    n: "03",
    title: "Custom AI & RAG",
    copy: "Connect business knowledge and documents to AI-powered retrieval experiences designed around your organisation’s information.",
    stack: "OpenAI · Anthropic · ChromaDB",
    icon: "layers",
  },
  {
    n: "04",
    title: "AI-Powered CRM / ERP",
    copy: "Connect intelligence to sales, operations, and service workflows, from follow-ups and data enrichment to operational visibility.",
    stack: "Systems · Workflows · Visibility",
    icon: "grid",
  },
  {
    n: "05",
    title: "AI Calling Agents",
    copy: "Build voice-based workflows for eligible inbound and outbound interactions, lead qualification, customer support, and appointment scheduling.",
    stack: "Deepgram · ElevenLabs · Twilio",
    icon: "voice",
  },
  {
    n: "06",
    title: "Compliance Automation",
    copy: "Automate repetitive business processes with attention to permissions, information flow, governance, and applicable compliance requirements.",
    stack: "n8n · Zapier · PostgreSQL",
    icon: "guard",
  },
  {
    n: "07",
    title: "Proprietary AI Products",
    copy: "Develop purpose-built AI applications and software for industry-specific workflows, business problems, and operational requirements.",
    stack: "Private LLMs · ChromaDB · AWS",
    icon: "shape",
  },
];

const differentiators = [
  [
    "01",
    "Data sovereignty by design",
    "Consider deployment location, access, information flow, and data boundaries from the beginning.",
  ],
  [
    "02",
    "Production-oriented engineering",
    "Move beyond a promising demonstration toward a solution designed for real workflows and operational constraints.",
  ],
  [
    "03",
    "Outcome-led strategy",
    "Start with a business problem and define what a useful result should look like before choosing the technology.",
  ],
  [
    "04",
    "Flexible architecture",
    "Evaluate tools, models, and infrastructure based on the use case instead of assuming one stack fits every problem.",
  ],
  [
    "05",
    "Integrated systems",
    "Connect AI capabilities to existing tools and processes wherever practical, rather than creating another isolated destination.",
  ],
  [
    "06",
    "Continuous improvement",
    "Treat deployment as part of the process, with opportunities to refine workflows and improve the experience over time.",
  ],
];

const caseStudies = [
  [
    "01",
    "AI WhatsApp Document Assistant",
    "Document delivery",
    "A workflow designed to help clients request and receive files without the repeated manual search.",
  ],
  [
    "02",
    "AI Banking Support Chatbot",
    "Customer support",
    "An automated assistance layer for policy and account-support workflows.",
  ],
  [
    "03",
    "Private AI Chatbot for Cosmo Guru Institute",
    "Private AI",
    "A custom-trained assistant concept for a specialised knowledge experience.",
  ],
  [
    "04",
    "Custom Project Management System",
    "Operations",
    "A clearer workspace for project coordination, visibility, and workflow tracking.",
  ],
  [
    "05",
    "Shopify AI SEO Description Automation",
    "E-commerce",
    "A way to streamline product-description work and support consistent publishing.",
  ],
  [
    "06",
    "AI Reddit Lead Discovery System",
    "Lead research",
    "A system to find and organise relevant conversation opportunities for business teams.",
  ],
];

const faqs = [
  [
    "What is an AI agent, and how can it help my business?",
    "AI agents can assist with defined tasks and multi-step workflows. The right role depends on the model, tools, permissions, and system architecture around it.",
  ],
  [
    "Can you develop an AI solution specifically for my business?",
    "Yes. Custom solutions can be designed around your processes, data requirements, existing systems, and the practical outcomes you need from the workflow.",
  ],
  [
    "Can AI integrate with an existing CRM or ERP?",
    "Integration depends on the system’s APIs, data structures, permissions, and the specific workflow. A discovery process helps identify the most practical approach.",
  ],
  [
    "What is an AI calling agent?",
    "It is a voice-enabled system that can support defined inbound or outbound interactions, such as qualification, support, or scheduling, where the use case and integrations are suitable.",
  ],
  [
    "Can repetitive business workflows be automated?",
    "Suitable workflows can be assessed for automation, taking account of exceptions, quality control, approvals, and where human judgement remains important.",
  ],
  [
    "Can you build software beyond ready-made AI products?",
    "Custom software and integrations can be appropriate when existing tools do not adequately solve the business problem or fit the operating environment.",
  ],
  [
    "Do I need technical expertise to use an AI solution?",
    "The intended user experience can be designed around the business team. Administration, maintenance, and training needs will vary with the system.",
  ],
  [
    "How do we choose the right starting point?",
    "A discovery conversation can clarify the problem, available systems, constraints, and the most practical next step before any architecture is chosen.",
  ],
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-label="Monk Media One logo" role="img">
      <i />
      <i />
      <i />
    </span>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span className={diagonal ? "arrow diagonal" : "arrow"} aria-hidden="true">
      →
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header ${open ? "menu-open" : ""}`}>
      <div className="nav shell">
        {/* Brand */}
        <a
          className="brand"
          href="#top"
          onClick={closeMenu}
          aria-label="Monk Media One home"
        >
          <BrandMark />

          <span className="brand-name">
            Monk Media <em>One</em>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          className="button button-small desktop-cta"
          href={`${site}/contact/`}
        >
          <span>Book a Discovery Call</span>
          <span className="header-cta-arrow" aria-hidden="true">
            <Arrow />
          </span>
        </a>

        {/* Mobile menu toggle */}
        <button
          ref={menuButtonRef}
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((previous) => !previous)}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Mobile navigation overlay */}
      <div
        className={`mobile-panel ${open ? "open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a
              href={item.href}
              key={item.label}
              onClick={closeMenu}
              tabIndex={open ? 0 : -1}
            >
              <span className="mobile-nav-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="mobile-nav-label">{item.label}</span>

              <span className="mobile-nav-arrow" aria-hidden="true">
                <Arrow />
              </span>
            </a>
          ))}
        </nav>

        <div className="mobile-panel-bottom">
          <p>PRIVATE AI. PRACTICAL AUTOMATION.</p>

          <a
            className="button mobile-book"
            href={`${site}/contact/`}
            onClick={closeMenu}
            tabIndex={open ? 0 : -1}
          >
            <span>Book a Discovery Call</span>
            <span aria-hidden="true">
              <Arrow />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

function SovereignCore() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
      if (!renderer.getContext()) throw new Error("WebGL unavailable");
    } catch {
      return;
    }

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.35 : 1.75),
    );
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "core-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0, 9.4);
    const system = new THREE.Group();
    system.rotation.set(0.22, -0.38, 0);
    scene.add(system);

    scene.add(new THREE.HemisphereLight(0xdde6ff, 0x111116, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(-4, 5, 6);
    scene.add(key);
    const blueLight = new THREE.PointLight(0x5276ff, 4.4, 20);
    blueLight.position.set(4, -1, 3);
    scene.add(blueLight);
    const goldLight = new THREE.PointLight(0xffc44d, 3.1, 18);
    goldLight.position.set(-4, -2.5, 2);
    scene.add(goldLight);
    const coralLight = new THREE.PointLight(0xff5d65, 1.8, 14);
    coralLight.position.set(0, 3, -3);
    scene.add(coralLight);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1.65, 56, 56),
      new THREE.MeshStandardMaterial({
        color: 0x14151a,
        metalness: 0.92,
        roughness: 0.23,
      }),
    );
    system.add(core);
    const lattice = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.69, 3),
      new THREE.MeshBasicMaterial({
        color: 0xbec9df,
        wireframe: true,
        transparent: true,
        opacity: 0.075,
      }),
    );
    system.add(lattice);
    const innerCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.44, 28, 28),
      new THREE.MeshBasicMaterial({
        color: 0xffc44d,
        transparent: true,
        opacity: 0.92,
      }),
    );
    system.add(innerCore);
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.71, 40, 40),
      new THREE.MeshBasicMaterial({
        color: 0x5276ff,
        transparent: true,
        opacity: 0.04,
        side: THREE.BackSide,
      }),
    );
    system.add(halo);

    const createOrbit = (
      radius: number,
      tube: number,
      color: number,
      rotation: [number, number, number],
      opacity = 0.34,
    ) => {
      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 8, 112),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity }),
      );
      orbit.rotation.set(...rotation);
      system.add(orbit);
      return orbit;
    };
    const rings = [
      createOrbit(2.55, 0.012, 0xffffff, [1.15, 0.2, 0], 0.28),
      createOrbit(3.12, 0.01, 0x5276ff, [0.32, -0.62, 0.42], 0.48),
      createOrbit(3.66, 0.01, 0xff5d65, [-0.9, 0.55, -0.18], 0.42),
    ];
    const ringBaseRotation = rings.map((ring) => ring.rotation.z);
    const trailSpecs: Array<
      [number, number, number, [number, number, number], number]
    > = [
      [2.55, 0.042, 0xffc44d, [1.15, 0.2, 0], 2.16],
      [3.12, 0.035, 0x5276ff, [0.32, -0.62, 0.42], 2.45],
      [3.66, 0.032, 0xff5d65, [-0.9, 0.55, -0.18], 1.88],
    ];
    const trails = trailSpecs.map(([radius, tube, color, rotation, arc]) => {
      const trail = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 10, 120, arc),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }),
      );
      trail.rotation.set(...rotation);
      system.add(trail);
      return trail;
    });
    const trailBaseRotation = trails.map((trail) => trail.rotation.z);

    const particleCount = window.innerWidth < 700 ? 30 : 70;
    const positions = new Float32Array(particleCount * 3);
    const phases = Array.from({ length: particleCount }, () => [
      Math.random() * Math.PI * 2,
      2.5 + Math.random() * 1.45,
      Math.random() * Math.PI * 2,
    ]);
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.035,
        transparent: true,
        opacity: 0.62,
        sizeAttenuation: true,
      }),
    );
    system.add(particles);

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", onPointerLeave);

    const resize = () => {
      const size = Math.min(stage.clientWidth, stage.clientHeight);
      if (!size) return;
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    resize();

    let frame = 0;
    let visible = true;
    const startedAt = performance.now();
    const render = (now: number) => {
      const time = (now - startedAt) / 1000;
      system.rotation.y +=
        (-0.38 + time * 0.075 + pointerX * 0.16 - system.rotation.y) * 0.04;
      system.rotation.x += (0.22 - pointerY * 0.09 - system.rotation.x) * 0.04;
      rings[0].rotation.z = ringBaseRotation[0] + time * 0.05;
      rings[1].rotation.z = ringBaseRotation[1] - time * 0.042;
      rings[2].rotation.z = ringBaseRotation[2] + time * 0.032;
      trails[0].rotation.z = trailBaseRotation[0] + time * 0.05;
      trails[1].rotation.z = trailBaseRotation[1] - time * 0.042;
      trails[2].rotation.z = trailBaseRotation[2] + time * 0.032;
      innerCore.material.opacity = 0.74 + Math.sin(time * 1.25) * 0.16;
      phases.forEach(([phase, radius, depth], index) => {
        const angle = phase + time * (0.075 + depth * 0.015);
        positions[index * 3] = Math.cos(angle) * radius;
        positions[index * 3 + 1] = Math.sin(angle) * radius * 0.38;
        positions[index * 3 + 2] =
          Math.sin(angle * 1.25 + depth) * radius * 0.48;
      });
      particleGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      if (visible) frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    setIsLive(true);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          frame = requestAnimationFrame(render);
        }
        if (!entry.isIntersecting) {
          visible = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0.06 },
    );
    visibilityObserver.observe(stage);

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      particleGeometry.dispose();
      [core, lattice, innerCore, halo, ...rings, ...trails].forEach((mesh) => {
        mesh.geometry.dispose();
        const material = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        material.forEach((item) => item.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={`core-stage ${isLive ? "is-live" : ""}`} ref={stageRef}>
      <div className="core-orbit core-orbit-one" />
      <div className="core-orbit core-orbit-two" />
      <div className="core-orbit core-orbit-three" />
      <div className="core-scene" aria-hidden="true">
        <div className="ambient" />
        <div className="ring ring-one">
          <b />
        </div>
        <div className="ring ring-two">
          <b />
        </div>
        <div className="ring ring-three">
          <b />
        </div>
        <div className="trail trail-yellow" />
        <div className="trail trail-blue" />
        <div className="trail trail-coral" />
        <div className="core-shell">
          <div className="core-reflection" />
          <div className="core-grid" />
          <div className="core-center">
            <span />
          </div>
        </div>
        <div className="core-dot dot-one" />
        <div className="core-dot dot-two" />
        <div className="core-dot dot-three" />
      </div>
      <div className="core-label label-a">
        <span />
        PRIVATE AI
      </div>
      <div className="core-label label-b">
        <span />
        CONNECTED WORKFLOWS
      </div>
      <p className="core-caption">
        <i /> SOVEREIGN AI CORE <b>01</b>
      </p>
    </div>
  );
}

function Hero() {
  const audiences = [
    "D2C & E-commerce",
    "Industrial",
    "Professional Services",
    "SaaS",
    "Real Estate",
  ];

  return (
    <section
      className="hero hero--refined"
      id="top"
      aria-labelledby="hero-title"
    >
      {/* Subtle background texture */}
      <div className="hero-gridlines" aria-hidden="true" />

      <div className="hero-grid shell">
        {/* LEFT: Copy and conversion */}
        <div className="hero-content">
          <div className="hero-kicker">
            <span className="hero-kicker-index">01</span>
            <span className="hero-kicker-rule" aria-hidden="true" />
            <span>PRIVATE AI</span>
            <span className="hero-kicker-separator" aria-hidden="true">
              /
            </span>
            <span>AUTONOMOUS SYSTEMS</span>
          </div>

          <h1 className="hero-title" id="hero-title">
            <span>Intelligence,</span>
            <span>without giving up</span>
            <span className="hero-title-accent">control.</span>
          </h1>

          <p className="hero-copy">
            Build AI around your business—not the other way around. We engineer
            private AI infrastructure and intelligent workflows around your
            data, systems, and operational needs.
          </p>

          <div className="hero-actions">
            <a
              className="button hero-button hero-button--primary"
              href={`${site}/contact/`}
            >
              <span>Book a Discovery Call</span>
              <span className="hero-button-icon" aria-hidden="true">
                <Arrow />
              </span>
            </a>

            <a
              className="button button-secondary hero-button hero-button--secondary"
              href="#services"
            >
              <span>Explore capabilities</span>
              <span className="hero-button-icon" aria-hidden="true">
                ↘
              </span>
            </a>
          </div>

          <div className="hero-audience">
            <div className="hero-audience-heading">
              <span className="hero-audience-mark" aria-hidden="true" />
              <p>BUILT FOR REAL-WORLD BUSINESS</p>
            </div>

            <div className="hero-audience-list">
              {audiences.map((audience) => (
                <span key={audience}>{audience}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Existing custom 3D component */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-topline">
            <span className="hero-visual-index">MMO / CORE-01</span>

            <span className="hero-visual-label">
              <span className="hero-visual-indicator" />
              PRIVATE AI SYSTEMS
            </span>
          </div>

          <div className="hero-stage">
            <div className="hero-stage-grid" />

            {/* Decorative orbital guides */}
            <div className="hero-orbit hero-orbit--outer" />
            <div className="hero-orbit hero-orbit--inner" />
            <div className="hero-stage-crosshair" />

            {/* Keep your existing 3D implementation */}
            <div className="hero-core-mount">
              <SovereignCore />
            </div>

            {/* Small annotations, not another technology diagram */}
            <div className="hero-scene-note hero-scene-note--top">
              <span>01 / ARCHITECTURE</span>
              <span>Private by design</span>
            </div>

            <div className="hero-scene-note hero-scene-note--bottom">
              <span>02 / INTELLIGENCE</span>
              <span>Built around your world</span>
            </div>

            <span className="hero-scene-cross hero-scene-cross--one" />
            <span className="hero-scene-cross hero-scene-cross--two" />
          </div>

          <div className="hero-visual-footer">
            <span>MODELS / AGENTS / WORKFLOWS</span>
            <span>ENGINEERED WITH INTENT ↗</span>
          </div>
        </div>
      </div>

      {/* Bottom navigation cue */}
      <a
        className="hero-scroll"
        href="#services"
        aria-label="Scroll to explore our capabilities"
      >
        <span>SCROLL TO EXPLORE</span>
        <span className="hero-scroll-line" aria-hidden="true" />
        <span className="hero-scroll-arrow" aria-hidden="true">
          ↓
        </span>
      </a>
    </section>
  );
}

function Problem() {
  return (
    <section
      className="problem section problem--editorial"
      id="about"
      aria-labelledby="problem-title"
    >
      <div className="shell problem-shell">
        <div className="problem-intro">
          <p className="eyebrow problem-eyebrow">
            <span>02</span>
            <span className="problem-eyebrow-line" aria-hidden="true" />
            THE REAL CHALLENGE
          </p>

          <div className="problem-intro-grid">
            <h2 id="problem-title">
              AI isn’t the hard part.
              <br />
              <em>Making it work together is.</em>
            </h2>

            <div className="problem-intro-copy">
              <span className="problem-copy-index">
                THE GAP BETWEEN TOOLS AND OUTCOMES
              </span>

              <p>
                Adding AI tools is easy. Making them work securely and reliably
                across your business is harder. Disconnected systems, unclear
                data boundaries, and repetitive work can keep promising
                technology from delivering its full value.
              </p>
            </div>
          </div>
        </div>

        <div className="problem-cards">
          <article className="problem-card problem-card--fragmented">
            <div className="problem-card-top">
              <span className="problem-card-number">01</span>
              <span className="problem-card-category">FRAGMENTATION</span>
            </div>

            <div
              className="problem-visual problem-visual--fragmented"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="problem-card-copy">
              <h3>
                Intelligence
                <br />
                in silos.
              </h3>

              <p>
                Disconnected tools create disconnected workflows. Teams lose
                context, repeat tasks, and spend time moving information instead
                of acting on it.
              </p>
            </div>

            <div className="problem-card-footer">
              <span>01 / 03</span>
              <span className="problem-card-indicator" />
            </div>
          </article>

          <article className="problem-card problem-card--boundaries">
            <div className="problem-card-top">
              <span className="problem-card-number">02</span>
              <span className="problem-card-category">DATA CONTROL</span>
            </div>

            <div
              className="problem-visual problem-visual--boundaries"
              aria-hidden="true"
            >
              <span className="boundary-ring boundary-ring--outer" />
              <span className="boundary-ring boundary-ring--middle" />
              <span className="boundary-ring boundary-ring--inner" />
              <span className="boundary-core" />
            </div>

            <div className="problem-card-copy">
              <h3>
                Unclear
                <br />
                boundaries.
              </h3>

              <p>
                Sensitive business knowledge needs thoughtful access controls,
                deployment decisions, and governance as AI becomes part of
                everyday operations.
              </p>
            </div>

            <div className="problem-card-footer">
              <span>02 / 03</span>
              <span className="problem-card-indicator" />
            </div>
          </article>

          <article className="problem-card problem-card--manual">
            <div className="problem-card-top">
              <span className="problem-card-number">03</span>
              <span className="problem-card-category">
                OPERATIONAL FRICTION
              </span>
            </div>

            <div
              className="problem-visual problem-visual--flow"
              aria-hidden="true"
            >
              <span className="flow-node flow-node--one" />
              <span className="flow-node flow-node--two" />
              <span className="flow-node flow-node--three" />
              <span className="flow-line flow-line--one" />
              <span className="flow-line flow-line--two" />
              <span className="flow-line flow-line--three" />
            </div>

            <div className="problem-card-copy">
              <h3>
                Work that
                <br />
                stays manual.
              </h3>

              <p>
                Document handling, data entry, handoffs, and follow-ups consume
                valuable time when routine processes cannot communicate or
                coordinate.
              </p>
            </div>

            <div className="problem-card-footer">
              <span>03 / 03</span>
              <span className="problem-card-indicator" />
            </div>
          </article>
        </div>

        <div className="problem-transition">
          <span className="problem-transition-mark" aria-hidden="true">
            ↘
          </span>

          <p>
            The answer isn’t another tool.
            <strong>
              {" "}
              It’s intelligence designed around how your business works.
            </strong>
          </p>

          <span className="problem-transition-label">A BETTER WAY FORWARD</span>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const approach = [
    {
      n: "01",
      tag: "UNDERSTAND",
      title: "Discover",
      heading: "Find the work worth improving.",
      copy: "Map the process, uncover friction, and understand the data, people, and systems involved.",
      visual: "discover",
    },
    {
      n: "02",
      tag: "PLAN",
      title: "Architect",
      heading: "Design before you build.",
      copy: "Choose the right models, deployment approach, integrations, and access boundaries for the job.",
      visual: "architect",
    },
    {
      n: "03",
      tag: "EXECUTE",
      title: "Build & Integrate",
      heading: "Put intelligence to work.",
      copy: "Build, connect, test, and refine the solution against real workflows and operational needs.",
      visual: "build",
    },
  ];

  return (
    <section
      className="approach section approach--refined"
      id="approach"
      aria-labelledby="approach-title"
    >
      <div className="shell">
        <div className="approach-intro">
          <p className="eyebrow">
            <span>03</span>
            <span className="approach-eyebrow-line" aria-hidden="true" />
            HOW WE WORK
          </p>

          <div className="approach-intro-grid">
            <h2 id="approach-title">
              Good AI starts with
              <br />
              <em>the right problem.</em>
            </h2>

            <p>
              Technology comes second. We start with the business challenge,
              design an architecture around it, and build a solution that fits
              the way your organization works.
            </p>
          </div>
        </div>

        <div className="approach-steps">
          {approach.map((step) => (
            <article className="approach-step" key={step.n}>
              <div className="approach-step-top">
                <span className="approach-step-number">{step.n}</span>
                <span className="approach-step-tag">{step.tag}</span>
              </div>

              <div
                className={`approach-visual approach-visual--${step.visual}`}
                aria-hidden="true"
              >
                <span className="approach-visual-shape shape-one" />
                <span className="approach-visual-shape shape-two" />
                <span className="approach-visual-shape shape-three" />
                <span className="approach-visual-shape shape-four" />
                <span className="approach-visual-shape shape-five" />
                <span className="approach-visual-shape shape-six" />
              </div>

              <div className="approach-step-copy">
                <h3>{step.title}</h3>
                <h4>{step.heading}</h4>
                <p>{step.copy}</p>
              </div>

              <div className="approach-step-footer">
                <span>PHASE {step.n}</span>
                <span aria-hidden="true">↗</span>
              </div>
            </article>
          ))}
        </div>

        <div className="approach-outcome">
          <span className="approach-outcome-mark" aria-hidden="true">
            ↳
          </span>
          <p>
            <strong>One connected process.</strong> From the first question to a
            system built around real business needs.
          </p>
        </div>
      </div>
    </section>
  );
}
function ServiceIcon({ type }: { type: string }) {
  return (
    <span className={`service-icon ${type}`} aria-hidden="true">
      <i />
      <b />
      <em />
    </span>
  );
}

function Services() {
  return (
    <section
      className="services section services--bento"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="shell">
        <div className="services-intro">
          <p className="eyebrow">
            <span>04</span>
            <span className="services-eyebrow-line" aria-hidden="true" />
            WHAT WE BUILD
          </p>

          <div className="services-intro-grid">
            <h2 id="services-title">
              Intelligence engineered
              <br />
              <em>for your business.</em>
            </h2>

            <p>
              No one-size-fits-all AI stack. Just purposeful systems, carefully
              selected technologies, and integrations designed around the work
              that matters.
            </p>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <a
              href={`${site}/services/`}
              className={`service-card service-${index + 1}`}
              key={service.n}
              aria-label={`Explore ${service.title}`}
            >
              <div className="service-top">
                <span className="service-number">
                  {service.n}
                  <span aria-hidden="true"> / 07</span>
                </span>

                <ServiceIcon type={service.icon} />

                <span className="service-arrow" aria-hidden="true">
                  <Arrow diagonal />
                </span>
              </div>

              <div className="service-card-copy">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>

              <div className="service-card-bottom">
                <small>{service.stack}</small>
                <span className="service-card-link">EXPLORE SERVICE</span>
              </div>
            </a>
          ))}
        </div>

        <div className="services-bottom-note">
          <span className="services-bottom-mark" aria-hidden="true">
            +
          </span>
          <p>
            Not sure where to start?{" "}
            <a href={`${site}/contact/`}>
              Let's identify the right opportunity.
              <span aria-hidden="true"> ↗</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  return (
    <section
      className="differentiators section differentiators--refined"
      id="why-monk"
      aria-labelledby="difference-title"
    >
      <div className="shell">
        <div className="difference-top">
          <div className="difference-heading">
            <p className="eyebrow">
              <span>05</span>
              <span className="difference-eyebrow-line" aria-hidden="true" />
              WHY MONK
            </p>

            <h2 id="difference-title">
              Built around business realities.
              <br />
              <em>Engineered with intent.</em>
            </h2>
          </div>

          <div className="difference-intro-copy">
            <span className="difference-intro-index">BEYOND THE MODEL</span>

            <p>
              Useful AI takes more than a powerful model. It takes sound
              architecture, thoughtful integration, and engineering decisions
              grounded in the realities of your business.
            </p>
          </div>
        </div>

        <div className="difference-grid">
          {differentiators.map(([n, title, copy]) => (
            <article className="difference-card" key={n}>
              <div className="difference-card-top">
                <span className="difference-number">{n}</span>

                <span className="difference-card-visual" aria-hidden="true">
                  <i />
                  <b />
                  <em />
                </span>
              </div>

              <div className="difference-card-content">
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>

              <div className="difference-card-footer">
                <span>PRINCIPLE {n}</span>
                <span className="difference-card-index" aria-hidden="true">
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="difference-closing">
          <span className="difference-closing-mark" aria-hidden="true">
            +
          </span>
          <p>
            <strong>Technology is the means.</strong> Making it useful to your
            business is the point.
          </p>
        </div>
      </div>
    </section>
  );
}

function WorkVisual({ index }: { index: number }) {
  return (
    <div className={`work-visual visual-${index}`} aria-hidden="true">
      <div className="work-visual-grid" />

      <span className="work-visual-label">
        PROJECT / {String(index).padStart(2, "0")}
      </span>

      <i />
      <i />
      <i />
      <b />
      <em />

      <span className="work-visual-corner work-visual-corner--tl" />
      <span className="work-visual-corner work-visual-corner--br" />
    </div>
  );
}

function CaseStudies() {
  return (
    <section
      className="case-studies section case-studies--refined"
      id="portfolio"
      aria-labelledby="case-title"
    >
      <div className="shell">
        <div className="case-intro">
          <div className="case-heading">
            <p className="eyebrow">
              <span>06</span>
              <span className="case-eyebrow-line" aria-hidden="true" />
              SELECTED WORK
            </p>

            <h2 id="case-title">
              AI applied to real
              <br />
              <em>business workflows.</em>
            </h2>
          </div>

          <div className="case-intro-copy">
            <span className="case-intro-index">
              FROM PROBLEM TO IMPLEMENTATION
            </span>

            <p>
              Explore examples of AI and software designed to connect systems,
              simplify repetitive work, and make business information more
              useful.
            </p>
          </div>
        </div>

        <div className="case-grid">
          {caseStudies.map(([n, title, category, copy], index) => (
            <a
              href={`${site}/portfolio/`}
              key={n}
              className={`case-card case-${index + 1}`}
              aria-label={`Explore portfolio: ${title}`}
            >
              <WorkVisual index={index + 1} />

              <div className="case-content">
                <div className="case-meta">
                  <span className="case-number">{n}</span>
                  <span className="case-category">{category}</span>
                </div>

                <h3>{title}</h3>

                <div className="case-card-bottom">
                  <p>{copy}</p>

                  <span className="case-arrow" aria-hidden="true">
                    <Arrow diagonal />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="case-footer">
          <p>
            <span className="case-footer-mark" aria-hidden="true" />
            PURPOSE-BUILT SYSTEMS. REAL BUSINESS CONTEXT.
          </p>

          <a
            className="text-link case-portfolio-link"
            href={`${site}/portfolio/`}
          >
            View the portfolio
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    [
      "“Zero API bills. That was our main goal. We have full control over our chatbot system now, running it locally without worrying about recurring fees. Brilliant execution.”",
      "Maulik Bhatt",
      "CosmoGuru",
    ],
    [
      "“Our engineers are out in the field all day. The WhatsApp chatbot handles those queries instantly now. Huge relief for the support team.”",
      "Satish Nagar",
      "ACS Engineering",
    ],
    [
      "“Clients just message our WhatsApp, and their documents are sent instantly from Google Drive. I don’t have to manually look up files and email them anymore.”",
      "CA Malav Sheth",
      "Malav C. Seth & Co.",
    ],
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    // Respect reduced-motion preferences.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    // Fallback for browsers without IntersectionObserver.
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`testimonials section ${isVisible ? "is-visible" : ""}`}
      id="testimonials"
      aria-labelledby="testimonial-title"
    >
      <div className="shell">
        <div className="testimonial-heading">
          {/* <p className="eyebrow">
            <span>07</span> PERSPECTIVES
          </p> */}
          <p className="eyebrow">
            <span>07</span>
            <span className="testimonial-eyebrow-line" aria-hidden="true" />
            PERSPECTIVES
          </p>

          <h2 id="testimonial-title">
            The value is
            <br />
            <em>in the work.</em>
          </h2>

          <div className="quote-mark" aria-hidden="true">
            “
          </div>

          <p className="testimonial-heading-copy">
            Real business challenges. Thoughtful engineering. Solutions built
            around the way people work.
          </p>

          <span className="testimonial-section-index">TRUST / 03 VOICES</span>
        </div>

        <div className="testimonial-grid">
          {testimonials.map(([quote, name, company], index) => (
            <figure
              className={`testimonial-card testimonial-card--${index + 1}`}
              key={name}
            >
              <div className="testimonial-card-top">
                <span className="testimonial-card-number">
                  0{index + 1} / 03
                </span>

                <span className="testimonial-card-mark" aria-hidden="true">
                  “
                </span>
              </div>

              <blockquote>{quote}</blockquote>

              <figcaption>
                <span className="testimonial-avatar" aria-hidden="true">
                  {name.charAt(0)}
                </span>

                <div className="testimonial-author">
                  <b>{name}</b>
                  <small>{company}</small>
                </div>

                <span className="testimonial-author-arrow" aria-hidden="true">
                  ↗
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Technology() {
  const groups: [string, string[]][] = [
    [
      "AI models & infrastructure",
      ["OpenAI", "Anthropic", "Ollama", "Gemini", "Mistral"],
    ],
    ["Orchestration & automation", ["LangGraph", "CrewAI", "LangChain", "n8n"]],
    ["Voice & communication", ["Deepgram", "ElevenLabs", "Twilio"]],
    [
      "Data & retrieval",
      ["ChromaDB", "Pinecone", "Supabase", "PostgreSQL", "Redis"],
    ],
    [
      "Engineering & infrastructure",
      ["Node.js", "FastAPI", "Docker", "AWS", "Cloudflare"],
    ],
  ];

  return (
    <section
      className="technology section technology--refined"
      id="technology"
      aria-labelledby="technology-title"
    >
      <div className="shell">
        <div className="tech-head">
          <div className="tech-heading">
            <p className="eyebrow">
              <span>08</span>
              <span className="tech-eyebrow-line" aria-hidden="true" />
              THE TOOLS BEHIND THE SYSTEMS
            </p>

            <h2 id="technology-title">
              A considered stack.
              <br />
              <em>Chosen for the problem.</em>
            </h2>
          </div>

          <div className="tech-intro-copy">
            <span className="tech-intro-label">TECHNOLOGY WITH PURPOSE</span>

            <p>
              From models and retrieval systems to orchestration and deployment,
              every technology has a role in building dependable,
              business-specific AI systems.
            </p>
          </div>
        </div>

        <div className="tech-matrix">
          {groups.map(([title, items], idx) => (
            <div className="tech-group" key={title}>
              <div className="tech-group-heading">
                <span className="tech-group-number">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <h3>{title}</h3>
              </div>

              <div className="tech-items">
                {items.map((item) => (
                  <span className="tech-chip" key={item}>
                    <span className="tech-chip-dot" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>

              <span className="tech-row-indicator" aria-hidden="true">
                ↗
              </span>
            </div>
          ))}
        </div>

        <div className="tech-footer">
          <span className="tech-footer-mark" aria-hidden="true" />

          <p>The right technology is the one that serves the problem.</p>

          <span className="tech-footer-label">FLEXIBLE BY DESIGN</span>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="faq section faq--refined"
      id="faq"
      aria-labelledby="faq-title"
    >
      <div className="shell faq-layout">
        <div className="faq-intro">
          <p className="eyebrow">
            <span>09</span>
            <span className="faq-eyebrow-line" aria-hidden="true" />
            COMMON QUESTIONS
          </p>

          <h2 id="faq-title">
            Clarity before
            <br />
            <em>complexity.</em>
          </h2>

          <p className="faq-intro-copy">
            Good decisions start with the right context. Here are answers to
            common questions about private AI, integrations, and business
            automation.
          </p>

          <a className="text-link faq-contact-link" href={`${site}/contact/`}>
            Ask a different question
            <Arrow />
          </a>

          <div className="faq-aside-note">
            <span className="faq-aside-mark" aria-hidden="true" />
            <span>START WITH WHAT MATTERS TO YOUR BUSINESS</span>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map(([question, answer], index) => {
            const isOpen = open === index;
            const answerId = `faq-answer-${index}`;
            const questionId = `faq-question-${index}`;

            return (
              <article
                className={`faq-item ${isOpen ? "active" : ""}`}
                key={question}
              >
                <button
                  className="faq-trigger"
                  id={questionId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="faq-question-text">{question}</span>

                  <span className="faq-toggle" aria-hidden="true">
                    +
                  </span>
                </button>

                <div
                  className="faq-answer"
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  <div className="faq-answer-inner">
                    <p>{answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      className="final-cta final-cta--refined"
      id="contact-cta"
      aria-labelledby="final-cta-title"
    >
      <div className="cta-lines" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="shell">
        <div className="final-cta-content">
          <p className="eyebrow">
            <span>10</span>
            <span className="cta-eyebrow-line" aria-hidden="true" />
            START WITH THE RIGHT QUESTION
          </p>

          <h2 id="final-cta-title">
            Where could better intelligence
            <br className="cta-desktop-break" />
            change the way your business works?
          </h2>

          <p className="final-cta-copy">
            Bring us a process that consumes time, a workflow that feels
            disconnected, or a business problem worth solving. Let's explore
            whether private AI, connected agents, or purposeful automation is
            the right fit.
          </p>

          <div className="hero-actions final-cta-actions">
            <a className="button final-cta-primary" href={`${site}/contact/`}>
              <span>Book a Discovery Call</span>
              <Arrow />
            </a>

            <a
              className="button button-secondary final-cta-secondary"
              href="#services"
            >
              <span>Explore our services</span>
              <Arrow />
            </a>
          </div>

          <div className="final-cta-footnote">
            <span className="final-cta-status" aria-hidden="true" />
            <span>LET'S START WITH THE PROBLEM, NOT THE TECHNOLOGY.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const serviceLinks = [
    ["Autonomous AI Agents", `${site}/autonomous-ai-agents/`],
    ["Custom AI Solutions", `${site}/custom-ai-solutions/`],
    ["AI-Powered CRM / ERP", `${site}/ai-powered-crm-erp/`],
    ["AI Calling Agents", `${site}/ai-calling-agents/`],
    ["Workflow Automation", `${site}/ai-workflow-automation/`],
    ["Custom Software", `${site}/custom-ai-software/`],
    ["Proprietary AI Products", `${site}/proprietary-ai-products/`],
  ];

  const companyLinks = [
    ["About Us", `${site}/about/`],
    ["Case Studies", `${site}/case-studies/`],
    ["AI Insights", `${site}/#what-we-do`],
    ["Contact", `${site}/contact/`],
  ];

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          {/* Brand and social links */}
          <div className="footer-brand-column">
            <a
              className="brand footer-brand"
              href="#top"
              aria-label="Monk Media One — back to top"
            >
              <BrandMark />

              <span className="footer-brand-name">
                Monk Media <em>One</em>
                <small>AI & SOFTWARE INNOVATION LAB</small>
              </span>
            </a>

            <p className="footer-brand-copy">
              Building intelligent systems that redefine how businesses scale.
              Private AI, practical automation, and software engineered around
              your business.
            </p>

            <a
              className="footer-division-link"
              href="https://monkmediaone.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Visit Creatives Division</span>
              <span aria-hidden="true">↗</span>
            </a>

            <div className="footer-socials">
              <a
                href="https://in.linkedin.com/company/monk-media-one"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Monk Media One on LinkedIn"
              >
                <span className="footer-social-icon" aria-hidden="true">
                  in
                </span>
                LinkedIn
                <span className="footer-external" aria-hidden="true">
                  ↗
                </span>
              </a>

              <a
                href="https://www.instagram.com/monkmediaone/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Monk Media One on Instagram"
              >
                <span
                  className="footer-social-icon footer-instagram-icon"
                  aria-hidden="true"
                >
                  <FaSquareInstagram />
                </span>
                Instagram
                <span className="footer-external" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Services */}
          <nav className="footer-column footer-services" aria-label="Services">
            <div className="footer-column-heading">
              <span>01</span>
              <h2>Services</h2>
            </div>

            <ul>
              {serviceLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav className="footer-column footer-company" aria-label="Company">
            <div className="footer-column-heading">
              <span>02</span>
              <h2>Company</h2>
            </div>

            <ul>
              {companyLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact information */}
          <div className="footer-column footer-contact">
            <div className="footer-column-heading">
              <span>03</span>
              <h2>Get in touch</h2>
            </div>

            <div className="footer-contact-group">
              <div className="footer-location">
                <span className="footer-contact-label">HQ / INDIA</span>
                <p>Ahmedabad, Gujarat, India</p>
              </div>

              <div className="footer-location">
                <span className="footer-contact-label">BRANCH / CANADA</span>
                <p>Ontario, Canada</p>
              </div>
            </div>

            <div className="footer-contact-links">
              <a href="tel:+918866819349" className="footer-contact-link">
                <span className="footer-contact-symbol" aria-hidden="true">
                  ↗
                </span>
                <span>+91 88668 19349</span>
              </a>

              <a
                href="mailto:hello@monkmediaone.tech"
                className="footer-contact-link footer-email"
              >
                <span className="footer-contact-symbol" aria-hidden="true">
                  @
                </span>
                <span>hello@monkmediaone.tech</span>
              </a>
            </div>

            <a className="footer-contact-cta" href={`${site}/contact/`}>
              <span>Have a problem worth solving?</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Monk Media One Tech.
            <span> All rights reserved.</span>
          </p>

          <p className="footer-bottom-tagline">
            Built for better business systems.
          </p>

          <a className="footer-back-top" href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Approach />
        <Services />
        <Differentiators />
        <CaseStudies />
        <Testimonials />
        <Technology />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
