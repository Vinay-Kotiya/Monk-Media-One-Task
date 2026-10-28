import { useEffect, useRef, useState } from "react";
import { FaSquareInstagram } from "react-icons/fa6";
import * as THREE from "three";

import {
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "framer-motion";
import type { Variants } from "framer-motion";

const site = "https://monkmediaone.tech";

const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.12,
    },
  },
};

const heroFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const heroTitleStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.13,
    },
  },
};

const heroTitleLine: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const heroVisualReveal: Variants = {
  hidden: {
    opacity: 0,
    x: 38,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.15,
      delay: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const heroImmediate: Variants = {
  hidden: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0,
    },
  },
};

const heroImmediateStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      duration: 0,
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

const problemContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

const problemRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const problemTitleLineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "110%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const problemCardVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index === 0 ? -38 : index === 2 ? 38 : 0,
    y: index === 1 ? 30 : 15,
    scale: 0.985,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
// ==========================================
// MONK MEDIA ONE — SHARED MOTION SYSTEM
// ==========================================

const motionEase = [0.22, 1, 0.36, 1] as const;

const motionVariants: Record<string, Variants> = {
  // Parent: coordinates the entrance of child elements.
  section: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  },

  // Nested grids: slightly slower stagger for individual cards.
  stagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.04,
      },
    },
  },

  // Default: elegant upward reveal.
  fadeUp: {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: motionEase,
      },
    },
  },

  // Headings and larger visual blocks.
  fadeIn: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: "easeOut",
      },
    },
  },

  // Small illustrations, icons and visual accents.
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: motionEase,
      },
    },
  },

  // Alternating entrance directions for cards.
  directionalCard: {
    hidden: (index: number = 0) => ({
      opacity: 0,
      x: index % 3 === 0 ? -28 : index % 3 === 2 ? 28 : 0,
      y: index % 3 === 1 ? 26 : 16,
    }),

    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.75,
        ease: motionEase,
      },
    },
  },

  // Abstract portfolio visuals.
  visual: {
    hidden: {
      opacity: 0,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: motionEase,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  },

  // Individual decorative shapes inside WorkVisual.
  visualPart: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  },
};

const revealViewport = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -35px 0px",
} as const;

const ctaLineVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    scaleY: 0.05,
    x: index === 0 ? -24 : index === 2 ? 24 : 0,
    y: index === 1 ? -22 : 0,
  }),

  visible: (index: number) => ({
    opacity: 0.78,
    scaleY: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1.15,
      delay: 0.15 + index * 0.24,
      ease: motionEase,
    },
  }),
};

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

          <span className="brand-name">Monk Media One</span>
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

  const shouldReduceMotion = useReducedMotion() ?? false;

  const containerVariants = shouldReduceMotion
    ? heroImmediateStagger
    : heroStagger;

  const itemVariants = shouldReduceMotion ? heroImmediate : heroFadeUp;

  const titleContainerVariants = shouldReduceMotion
    ? heroImmediateStagger
    : heroTitleStagger;

  const titleLineVariants = shouldReduceMotion ? heroImmediate : heroTitleLine;

  const visualVariants = shouldReduceMotion ? heroImmediate : heroVisualReveal;

  return (
    <section
      className="hero hero--refined"
      id="top"
      aria-labelledby="hero-title"
    >
      {/* Background grid fades in first */}
      <motion.div
        className="hero-gridlines"
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.2,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="hero-grid shell"
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
      >
        {/* LEFT: Staggered text and CTA reveal */}
        <motion.div className="hero-content" variants={containerVariants}>
          <motion.div className="hero-kicker" variants={itemVariants}>
            <span className="hero-kicker-index">01</span>
            <span className="hero-kicker-rule" aria-hidden="true" />
            <span>PRIVATE AI</span>
            <span className="hero-kicker-separator" aria-hidden="true">
              /
            </span>
            <span>AUTONOMOUS SYSTEMS</span>
          </motion.div>

          {/* Each line reveals upward inside a clipping mask */}
          <motion.h1
            className="hero-title"
            id="hero-title"
            variants={titleContainerVariants}
          >
            <span className="hero-title-line-mask">
              <motion.span
                className="hero-title-line"
                variants={titleLineVariants}
              >
                Intelligence,
              </motion.span>
            </span>

            <span className="hero-title-line-mask">
              <motion.span
                className="hero-title-line"
                variants={titleLineVariants}
              >
                without giving up
              </motion.span>
            </span>

            <span className="hero-title-line-mask">
              <motion.span
                className="hero-title-accent"
                variants={titleLineVariants}
              >
                control.
              </motion.span>
            </span>
          </motion.h1>

          <motion.p className="hero-copy" variants={itemVariants}>
            Build AI around your business—not the other way around. We engineer
            private AI infrastructure and intelligent workflows around your
            data, systems, and operational needs.
          </motion.p>

          <motion.div className="hero-actions" variants={containerVariants}>
            <motion.a
              className="button hero-button hero-button--primary"
              href={`${site}/contact/`}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <span>Book a Discovery Call</span>

              <span className="hero-button-icon" aria-hidden="true">
                <Arrow />
              </span>
            </motion.a>

            <motion.a
              className="button button-secondary hero-button hero-button--secondary"
              href="#services"
              variants={itemVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <span>Explore capabilities</span>

              <span className="hero-button-icon" aria-hidden="true">
                ↘
              </span>
            </motion.a>
          </motion.div>

          <motion.div className="hero-audience" variants={itemVariants}>
            <div className="hero-audience-heading">
              <span className="hero-audience-mark" aria-hidden="true" />
              <p>BUILT FOR REAL-WORLD BUSINESS</p>
            </div>

            <div className="hero-audience-list">
              {audiences.map((audience, index) => (
                <motion.span
                  key={audience}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : 0.75 + index * 0.07,
                    ease: "easeOut",
                  }}
                >
                  {audience}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: Cinematic 3D visual entrance */}
        <motion.div
          className="hero-visual"
          aria-hidden="true"
          variants={visualVariants}
        >
          <motion.div className="hero-visual-topline" variants={itemVariants}>
            <span className="hero-visual-index">MMO / CORE-01</span>

            <span className="hero-visual-label">
              <span className="hero-visual-indicator" />
              PRIVATE AI SYSTEMS
            </span>
          </motion.div>

          <motion.div className="hero-stage" variants={itemVariants}>
            <div className="hero-stage-grid" />

            {/* Orbital guides use the continuous CSS animation below */}
            <div className="hero-orbit hero-orbit--outer" />
            <div className="hero-orbit hero-orbit--inner" />
            <div className="hero-stage-crosshair" />

            {/* Preserve your existing Three.js / React Three Fiber component */}
            <div className="hero-core-mount">
              <SovereignCore />
            </div>

            <motion.div
              className="hero-scene-note hero-scene-note--top"
              variants={itemVariants}
            >
              <span>01 / ARCHITECTURE</span>
              <span>Private by design</span>
            </motion.div>

            <motion.div
              className="hero-scene-note hero-scene-note--bottom"
              variants={itemVariants}
            >
              <span>02 / INTELLIGENCE</span>
              <span>Built around your world</span>
            </motion.div>

            <span className="hero-scene-cross hero-scene-cross--one" />
            <span className="hero-scene-cross hero-scene-cross--two" />
          </motion.div>

          <motion.div className="hero-visual-footer" variants={itemVariants}>
            <span>MODELS / AGENTS / WORKFLOWS</span>
            <span>ENGINEERED WITH INTENT ↗</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue enters last */}
      <motion.a
        className="hero-scroll"
        href="#services"
        aria-label="Scroll to explore our capabilities"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.65,
          delay: shouldReduceMotion ? 0 : 1.15,
          ease: "easeOut",
        }}
      >
        <span>SCROLL TO EXPLORE</span>
        <span className="hero-scroll-line" aria-hidden="true" />
        <span className="hero-scroll-arrow" aria-hidden="true">
          ↓
        </span>
      </motion.a>
    </section>
  );
}

// function Problem() {
//   return (
//     <section
//       className="problem section problem--editorial"
//       id="about"
//       aria-labelledby="problem-title"
//     >
//       <div className="shell problem-shell">
//         <div className="problem-intro">
//           <p className="eyebrow problem-eyebrow">
//             <span>02</span>
//             <span className="problem-eyebrow-line" aria-hidden="true" />
//             THE REAL CHALLENGE
//           </p>

//           <div className="problem-intro-grid">
//             <h2 id="problem-title">
//               AI isn’t the hard part.
//               <br />
//               <em>Making it work together is.</em>
//             </h2>

//             <div className="problem-intro-copy">
//               <span className="problem-copy-index">
//                 THE GAP BETWEEN TOOLS AND OUTCOMES
//               </span>

//               <p>
//                 Adding AI tools is easy. Making them work securely and reliably
//                 across your business is harder. Disconnected systems, unclear
//                 data boundaries, and repetitive work can keep promising
//                 technology from delivering its full value.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="problem-cards">
//           <article className="problem-card problem-card--fragmented">
//             <div className="problem-card-top">
//               <span className="problem-card-number">01</span>
//               <span className="problem-card-category">FRAGMENTATION</span>
//             </div>

//             <div
//               className="problem-visual problem-visual--fragmented"
//               aria-hidden="true"
//             >
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//             </div>

//             <div className="problem-card-copy">
//               <h3>
//                 Intelligence
//                 <br />
//                 in silos.
//               </h3>

//               <p>
//                 Disconnected tools create disconnected workflows. Teams lose
//                 context, repeat tasks, and spend time moving information instead
//                 of acting on it.
//               </p>
//             </div>

//             <div className="problem-card-footer">
//               <span>01 / 03</span>
//               <span className="problem-card-indicator" />
//             </div>
//           </article>

//           <article className="problem-card problem-card--boundaries">
//             <div className="problem-card-top">
//               <span className="problem-card-number">02</span>
//               <span className="problem-card-category">DATA CONTROL</span>
//             </div>

//             <div
//               className="problem-visual problem-visual--boundaries"
//               aria-hidden="true"
//             >
//               <span className="boundary-ring boundary-ring--outer" />
//               <span className="boundary-ring boundary-ring--middle" />
//               <span className="boundary-ring boundary-ring--inner" />
//               <span className="boundary-core" />
//             </div>

//             <div className="problem-card-copy">
//               <h3>
//                 Unclear
//                 <br />
//                 boundaries.
//               </h3>

//               <p>
//                 Sensitive business knowledge needs thoughtful access controls,
//                 deployment decisions, and governance as AI becomes part of
//                 everyday operations.
//               </p>
//             </div>

//             <div className="problem-card-footer">
//               <span>02 / 03</span>
//               <span className="problem-card-indicator" />
//             </div>
//           </article>

//           <article className="problem-card problem-card--manual">
//             <div className="problem-card-top">
//               <span className="problem-card-number">03</span>
//               <span className="problem-card-category">
//                 OPERATIONAL FRICTION
//               </span>
//             </div>

//             <div
//               className="problem-visual problem-visual--flow"
//               aria-hidden="true"
//             >
//               <span className="flow-node flow-node--one" />
//               <span className="flow-node flow-node--two" />
//               <span className="flow-node flow-node--three" />
//               <span className="flow-line flow-line--one" />
//               <span className="flow-line flow-line--two" />
//               <span className="flow-line flow-line--three" />
//             </div>

//             <div className="problem-card-copy">
//               <h3>
//                 Work that
//                 <br />
//                 stays manual.
//               </h3>

//               <p>
//                 Document handling, data entry, handoffs, and follow-ups consume
//                 valuable time when routine processes cannot communicate or
//                 coordinate.
//               </p>
//             </div>

//             <div className="problem-card-footer">
//               <span>03 / 03</span>
//               <span className="problem-card-indicator" />
//             </div>
//           </article>
//         </div>

//         <div className="problem-transition">
//           <span className="problem-transition-mark" aria-hidden="true">
//             ↘
//           </span>

//           <p>
//             The answer isn’t another tool.
//             <strong>
//               {" "}
//               It’s intelligence designed around how your business works.
//             </strong>
//           </p>

//           <span className="problem-transition-label">A BETTER WAY FORWARD</span>
//         </div>
//       </div>
//     </section>
//   );
// }

function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.18,
    margin: "0px 0px -40px 0px",
  });

  const shouldReduceMotion = useReducedMotion() ?? false;
  const animationState = shouldReduceMotion || isInView ? "visible" : "hidden";

  return (
    <section
      ref={sectionRef}
      className={`problem section problem--editorial ${
        isInView ? "is-visible" : ""
      }`}
      id="about"
      aria-labelledby="problem-title"
    >
      <motion.div
        className="shell problem-shell"
        variants={problemContainerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        animate={animationState}
      >
        <motion.div
          className="problem-intro"
          variants={problemContainerVariants}
        >
          <motion.p
            className="eyebrow problem-eyebrow"
            variants={problemRevealVariants}
          >
            <span>02</span>
            <span className="problem-eyebrow-line" aria-hidden="true" />
            THE REAL CHALLENGE
          </motion.p>

          <motion.div
            className="problem-intro-grid"
            variants={problemContainerVariants}
          >
            <motion.h2 id="problem-title" variants={problemContainerVariants}>
              <span className="problem-title-mask">
                <motion.span variants={problemTitleLineVariants}>
                  AI isn’t the hard part.
                </motion.span>
              </span>

              <span className="problem-title-mask">
                <motion.em variants={problemTitleLineVariants}>
                  Making it work together is.
                </motion.em>
              </span>
            </motion.h2>

            <motion.div
              className="problem-intro-copy"
              variants={problemRevealVariants}
            >
              <span className="problem-copy-index">
                THE GAP BETWEEN TOOLS AND OUTCOMES
              </span>

              <p>
                Adding AI tools is easy. Making them work securely and reliably
                across your business is harder. Disconnected systems, unclear
                data boundaries, and repetitive work can keep promising
                technology from delivering its full value.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="problem-cards"
          variants={problemContainerVariants}
        >
          <motion.article
            className="problem-card problem-card--fragmented"
            custom={0}
            variants={problemCardVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          >
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
          </motion.article>

          <motion.article
            className="problem-card problem-card--boundaries"
            custom={1}
            variants={problemCardVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          >
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
          </motion.article>

          <motion.article
            className="problem-card problem-card--manual"
            custom={2}
            variants={problemCardVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          >
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
          </motion.article>
        </motion.div>

        <motion.div
          className="problem-transition"
          variants={problemRevealVariants}
        >
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
        </motion.div>
      </motion.div>
    </section>
  );
}
// --------------
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
    <motion.section
      className="approach section approach--refined"
      id="approach"
      aria-labelledby="approach-title"
      variants={motionVariants.section}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <motion.div className="shell" variants={motionVariants.stagger}>
        <motion.div
          className="approach-intro"
          variants={motionVariants.stagger}
        >
          <motion.p className="eyebrow" variants={motionVariants.fadeUp}>
            <span>03</span>
            <span className="approach-eyebrow-line" aria-hidden="true" />
            HOW WE WORK
          </motion.p>

          <div className="approach-intro-grid">
            <motion.h2 id="approach-title" variants={motionVariants.fadeUp}>
              Good AI starts with
              <br />
              <em>the right problem.</em>
            </motion.h2>

            <motion.p variants={motionVariants.fadeUp}>
              Technology comes second. We start with the business challenge,
              design an architecture around it, and build a solution that fits
              the way your organization works.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="approach-steps"
          variants={motionVariants.stagger}
        >
          {approach.map((step, index) => (
            <motion.article
              className="approach-step"
              key={step.n}
              custom={index}
              variants={motionVariants.directionalCard}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <div className="approach-step-top">
                <span className="approach-step-number">{step.n}</span>
                <span className="approach-step-tag">{step.tag}</span>
              </div>

              <motion.div
                className={`approach-visual approach-visual--${step.visual}`}
                aria-hidden="true"
                variants={motionVariants.scaleIn}
              >
                <span className="approach-visual-shape shape-one" />
                <span className="approach-visual-shape shape-two" />
                <span className="approach-visual-shape shape-three" />
                <span className="approach-visual-shape shape-four" />
                <span className="approach-visual-shape shape-five" />
                <span className="approach-visual-shape shape-six" />
              </motion.div>

              <div className="approach-step-copy">
                <h3>{step.title}</h3>
                <h4>{step.heading}</h4>
                <p>{step.copy}</p>
              </div>

              <div className="approach-step-footer">
                <span>PHASE {step.n}</span>
                <span aria-hidden="true">↗</span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="approach-outcome"
          variants={motionVariants.fadeUp}
        >
          <span className="approach-outcome-mark" aria-hidden="true">
            ↳
          </span>
          <p>
            <strong>One connected process.</strong> From the first question to a
            system built around real business needs.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
function ServiceIcon({ type }: { type: string }) {
  return (
    <motion.span
      className={`service-icon ${type}`}
      aria-hidden="true"
      variants={motionVariants.scaleIn}
    >
      <i />
      <b />
      <em />
    </motion.span>
  );
}

function Services() {
  return (
    <motion.section
      className="services section services--bento"
      id="services"
      aria-labelledby="services-title"
      variants={motionVariants.section}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <motion.div className="shell" variants={motionVariants.stagger}>
        <motion.div
          className="services-intro"
          variants={motionVariants.stagger}
        >
          <motion.p className="eyebrow" variants={motionVariants.fadeUp}>
            <span>04</span>
            <span className="services-eyebrow-line" aria-hidden="true" />
            WHAT WE BUILD
          </motion.p>

          <div className="services-intro-grid">
            <motion.h2 id="services-title" variants={motionVariants.fadeUp}>
              Intelligence engineered
              <br />
              <em>for your business.</em>
            </motion.h2>

            <motion.p variants={motionVariants.fadeUp}>
              No one-size-fits-all AI stack. Just purposeful systems, carefully
              selected technologies, and integrations designed around the work
              that matters.
            </motion.p>
          </div>
        </motion.div>

        <motion.div className="services-grid" variants={motionVariants.stagger}>
          {services.map((service, index) => (
            <motion.a
              href={`${site}/services/`}
              className={`service-card service-${index + 1}`}
              key={service.n}
              aria-label={`Explore ${service.title}`}
              variants={motionVariants.directionalCard}
              custom={index}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
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
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="services-bottom-note"
          variants={motionVariants.fadeUp}
        >
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
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function Differentiators() {
  return (
    <motion.section
      className="differentiators section differentiators--refined"
      id="why-monk"
      aria-labelledby="difference-title"
      variants={motionVariants.section}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <motion.div className="shell" variants={motionVariants.stagger}>
        <motion.div
          className="difference-top"
          variants={motionVariants.stagger}
        >
          <div className="difference-heading">
            <motion.p className="eyebrow" variants={motionVariants.fadeUp}>
              <span>05</span>
              <span className="difference-eyebrow-line" aria-hidden="true" />
              WHY MONK
            </motion.p>

            <motion.h2 id="difference-title" variants={motionVariants.fadeUp}>
              Built around business realities.
              <br />
              <em>Engineered with intent.</em>
            </motion.h2>
          </div>

          <motion.div
            className="difference-intro-copy"
            variants={motionVariants.fadeUp}
          >
            <span className="difference-intro-index">BEYOND THE MODEL</span>

            <p>
              Useful AI takes more than a powerful model. It takes sound
              architecture, thoughtful integration, and engineering decisions
              grounded in the realities of your business.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="difference-grid"
          variants={motionVariants.stagger}
        >
          {differentiators.map(([n, title, copy], index) => (
            <motion.article
              className="difference-card"
              key={n}
              custom={index}
              variants={motionVariants.directionalCard}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.995 }}
            >
              <div className="difference-card-top">
                <span className="difference-number">{n}</span>

                <motion.span
                  className="difference-card-visual"
                  aria-hidden="true"
                  variants={motionVariants.scaleIn}
                >
                  <i />
                  <b />
                  <em />
                </motion.span>
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
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="difference-closing"
          variants={motionVariants.fadeUp}
        >
          <span className="difference-closing-mark" aria-hidden="true">
            +
          </span>
          <p>
            <strong>Technology is the means.</strong> Making it useful to your
            business is the point.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function WorkVisual({ index }: { index: number }) {
  return (
    <motion.div
      className={`work-visual visual-${index}`}
      aria-hidden="true"
      variants={motionVariants.visual}
    >
      <motion.div
        className="work-visual-grid"
        variants={motionVariants.fadeIn}
      />

      <motion.span
        className="work-visual-label"
        variants={motionVariants.visualPart}
      >
        PROJECT / {String(index).padStart(2, "0")}
      </motion.span>

      <motion.i variants={motionVariants.visualPart} />
      <motion.i variants={motionVariants.visualPart} />
      <motion.i variants={motionVariants.visualPart} />
      <motion.b variants={motionVariants.visualPart} />
      <motion.em variants={motionVariants.visualPart} />

      <motion.span
        className="work-visual-corner work-visual-corner--tl"
        variants={motionVariants.visualPart}
      />

      <motion.span
        className="work-visual-corner work-visual-corner--br"
        variants={motionVariants.visualPart}
      />
    </motion.div>
  );
}
// ------------------
function CaseStudies() {
  return (
    <motion.section
      className="case-studies section case-studies--refined"
      id="portfolio"
      aria-labelledby="case-title"
      variants={motionVariants.section}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <div className="shell">
        <motion.div className="case-intro" variants={motionVariants.fadeUp}>
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
        </motion.div>

        <motion.div className="case-grid" variants={motionVariants.stagger}>
          {caseStudies.map(([n, title, category, copy], index) => (
            <motion.a
              href={`${site}/portfolio/`}
              key={n}
              className={`case-card case-${index + 1}`}
              aria-label={`Explore portfolio: ${title}`}
              custom={index}
              variants={motionVariants.directionalCard}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
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
              </div>{" "}
            </motion.a>
          ))}
        </motion.div>

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
    </motion.section>
  );
}

function TrustedBy() {
  const brands = [
    {
      name: "MB",
      file: "mb.webp",
      accent: "yellow",
    },
    {
      name: "Verity",
      file: "verity.webp",
      accent: "coral",
    },
    {
      name: "Malav C. Sheth & Co.",
      file: "ca.webp",
      accent: "blue",
    },
    {
      name: "ACS Innovative Automation",
      file: "acs.webp",
      accent: "blue",
    },
    {
      name: "Biotane Naturals",
      file: "ChatGPT.webp",
      accent: "yellow",
    },
    {
      name: "CosmoGuru",
      file: "cosmo.webp",
      accent: "coral",
    },
  ] as const;

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
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
        threshold: 0.15,
        rootMargin: "0px 0px -35px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`trusted-by section ${isVisible ? "is-visible" : ""}`}
      id="trusted-by"
      aria-labelledby="trusted-by-title"
    >
      <div className="shell">
        <div className="trusted-by-heading">
          <p className="eyebrow">
            <span>07</span>
            <span className="trusted-by-eyebrow-line" aria-hidden="true" />
            TRUSTED BY
          </p>

          <h2 id="trusted-by-title">
            Built around real
            <br />
            <em>business needs.</em>
          </h2>

          <p className="trusted-by-copy">
            Technology matters most when it solves meaningful problems. We're
            proud to showcase the businesses and teams connected with our work.
          </p>
        </div>

        <div className="trusted-by-grid">
          {brands.map((brand, index) => (
            <div
              className={`trusted-logo trusted-logo--${brand.accent}`}
              key={brand.file}
            >
              <div className="trusted-logo-inner">
                <img
                  src={`/brands/${brand.file}`}
                  alt={brand.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <span className="trusted-logo-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        <div className="trusted-by-footer">
          <span className="trusted-by-footer-mark" aria-hidden="true" />

          <p>Technology with purpose. Partnerships built on real work.</p>

          <span className="trusted-by-footer-label">
            MONK MEDIA ONE / COLLABORATION
          </span>
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
            <span>08</span>
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
// -----------
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
    <motion.section
      className="technology section technology--refined"
      id="technology"
      aria-labelledby="technology-title"
      variants={motionVariants.section}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <motion.div className="shell" variants={motionVariants.stagger}>
        <motion.div className="tech-head" variants={motionVariants.stagger}>
          <motion.div className="tech-heading" variants={motionVariants.fadeUp}>
            <p className="eyebrow">
              <span>09</span>
              <span className="tech-eyebrow-line" aria-hidden="true" />
              THE TOOLS BEHIND THE SYSTEMS
            </p>

            <h2 id="technology-title">
              A considered stack.
              <br />
              <em>Chosen for the problem.</em>
            </h2>
          </motion.div>

          <motion.div
            className="tech-intro-copy"
            variants={motionVariants.fadeUp}
          >
            <span className="tech-intro-label">TECHNOLOGY WITH PURPOSE</span>

            <p>
              From models and retrieval systems to orchestration and deployment,
              every technology has a role in building dependable,
              business-specific AI systems.
            </p>
          </motion.div>
        </motion.div>

        <motion.div className="tech-matrix" variants={motionVariants.stagger}>
          {groups.map(([title, items], idx) => (
            <motion.div
              className="tech-group"
              key={title}
              custom={idx}
              variants={motionVariants.directionalCard}
            >
              <motion.div
                className="tech-group-heading"
                variants={motionVariants.fadeUp}
              >
                <span className="tech-group-number">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3>{title}</h3>
              </motion.div>

              <motion.div
                className="tech-items"
                variants={motionVariants.stagger}
              >
                {items.map((item) => (
                  <motion.span
                    className="tech-chip"
                    key={item}
                    variants={motionVariants.scaleIn}
                    whileHover={{ y: -2 }}
                  >
                    <span className="tech-chip-dot" aria-hidden="true" />
                    {item}
                  </motion.span>
                ))}
              </motion.div>

              <span className="tech-row-indicator" aria-hidden="true">
                ↗
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="tech-footer" variants={motionVariants.fadeUp}>
          <span className="tech-footer-mark" aria-hidden="true" />
          <p>The right technology is the one that serves the problem.</p>
          <span className="tech-footer-label">FLEXIBLE BY DESIGN</span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <motion.section
      className="faq section faq--refined"
      id="faq"
      aria-labelledby="faq-title"
      variants={motionVariants.section}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <motion.div
        className="shell faq-layout"
        variants={motionVariants.stagger}
      >
        <motion.div className="faq-intro" variants={motionVariants.stagger}>
          <motion.p className="eyebrow" variants={motionVariants.fadeUp}>
            <span>10</span>
            <span className="faq-eyebrow-line" aria-hidden="true" />
            COMMON QUESTIONS
          </motion.p>

          <motion.h2 id="faq-title" variants={motionVariants.fadeUp}>
            Clarity before
            <br />
            <em>complexity.</em>
          </motion.h2>

          <motion.p className="faq-intro-copy" variants={motionVariants.fadeUp}>
            Good decisions start with the right context. Here are answers to
            common questions about private AI, integrations, and business
            automation.
          </motion.p>

          <motion.div variants={motionVariants.fadeUp}>
            <a className="text-link faq-contact-link" href={`${site}/contact/`}>
              Ask a different question
              <Arrow />
            </a>
          </motion.div>

          <motion.div
            className="faq-aside-note"
            variants={motionVariants.fadeUp}
          >
            <span className="faq-aside-mark" aria-hidden="true" />
            <span>START WITH WHAT MATTERS TO YOUR BUSINESS</span>
          </motion.div>
        </motion.div>

        <motion.div className="faq-list" variants={motionVariants.stagger}>
          {faqs.map(([question, answer], index) => {
            const isOpen = open === index;
            const answerId = `faq-answer-${index}`;
            const questionId = `faq-question-${index}`;

            return (
              <motion.article
                className={`faq-item ${isOpen ? "active" : ""}`}
                key={question}
                variants={motionVariants.fadeUp}
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
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function FinalCTA() {
  return (
    <motion.section
      className="final-cta final-cta--refined"
      id="contact-cta"
      aria-labelledby="final-cta-title"
      variants={motionVariants.section}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {/* Three logo-inspired strokes animate individually */}
      <motion.div
        className="cta-lines"
        aria-hidden="true"
        variants={motionVariants.fadeIn}
      >
        {[0, 1, 2].map((index) => (
          <motion.i
            key={index}
            custom={index}
            variants={ctaLineVariants}
            style={{ transformOrigin: "top center" }}
          />
        ))}
      </motion.div>

      <motion.div className="shell" variants={motionVariants.stagger}>
        <motion.div
          className="final-cta-content"
          variants={motionVariants.stagger}
        >
          <motion.p className="eyebrow" variants={motionVariants.fadeUp}>
            <span>11</span>
            <span className="cta-eyebrow-line" aria-hidden="true" />
            START WITH THE RIGHT QUESTION
          </motion.p>

          <motion.h2 id="final-cta-title" variants={motionVariants.fadeUp}>
            Where could better intelligence
            <br className="cta-desktop-break" />
            change the way your business works?
          </motion.h2>

          <motion.p className="final-cta-copy" variants={motionVariants.fadeUp}>
            Bring us a process that consumes time, a workflow that feels
            disconnected, or a business problem worth solving. Let’s explore
            whether private AI, connected agents, or purposeful automation is
            the right fit.
          </motion.p>

          <motion.div
            className="hero-actions final-cta-actions"
            variants={motionVariants.stagger}
          >
            <motion.a
              className="button final-cta-primary"
              href={`${site}/contact/`}
              variants={motionVariants.fadeUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Book a Discovery Call</span>
              <Arrow />
            </motion.a>

            <motion.a
              className="button button-secondary final-cta-secondary"
              href="#services"
              variants={motionVariants.fadeUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore our services</span>
              <Arrow />
            </motion.a>
          </motion.div>

          <motion.div
            className="final-cta-footnote"
            variants={motionVariants.fadeUp}
          >
            <span className="final-cta-status" aria-hidden="true" />
            <span>LET'S START WITH THE PROBLEM, NOT THE TECHNOLOGY.</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
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
    <motion.footer
      className="site-footer"
      variants={motionVariants.section}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <motion.div className="shell" variants={motionVariants.stagger}>
        <motion.div className="footer-main" variants={motionVariants.stagger}>
          {/* Brand */}
          <motion.div
            className="footer-brand-column"
            variants={motionVariants.directionalCard}
            custom={0}
          >
            <a
              className="brand footer-brand"
              href="#top"
              aria-label="Monk Media One — back to top"
            >
              <BrandMark />

              <span className="footer-brand-name">
                Monk Media One
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
          </motion.div>

          {/* Services */}
          <motion.nav
            className="footer-column footer-services"
            aria-label="Services"
            variants={motionVariants.directionalCard}
            custom={1}
          >
            <div className="footer-column-heading">
              <span>01</span>
              <h2>Services</h2>
            </div>

            <ul>
              {serviceLinks.map(([label, href], index) => (
                <motion.li
                  key={label}
                  variants={motionVariants.fadeUp}
                  custom={index}
                >
                  <a href={href}>{label}</a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Company */}
          <motion.nav
            className="footer-column footer-company"
            aria-label="Company"
            variants={motionVariants.directionalCard}
            custom={2}
          >
            <div className="footer-column-heading">
              <span>02</span>
              <h2>Company</h2>
            </div>

            <ul>
              {companyLinks.map(([label, href], index) => (
                <motion.li
                  key={label}
                  variants={motionVariants.fadeUp}
                  custom={index}
                >
                  <a href={href}>{label}</a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact */}
          <motion.div
            className="footer-column footer-contact"
            variants={motionVariants.directionalCard}
            custom={3}
          >
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
          </motion.div>
        </motion.div>

        {/* Copyright bar */}
        <motion.div className="footer-bottom" variants={motionVariants.fadeUp}>
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
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <>
        <Header />
        <main>
          <Hero />
          <Problem />
          <Approach />
          <Services />
          <Differentiators />
          <CaseStudies />
          <TrustedBy />
          <Testimonials />
          <Technology />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </>
    </MotionConfig>
  );
}
