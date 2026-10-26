import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, X } from '@phosphor-icons/react';

const greetings = [
  { text: 'Hello', language: 'English', code: 'en' },
  { text: 'Ndeewo', language: 'Igbo', code: 'ig' },
  { text: 'Ẹ ǹlẹ́ o', language: 'Yorùbá', code: 'yo' },
  { text: 'Sannu', language: 'Hausa', code: 'ha' },
];

const projects = [
  {
    number: '01', name: 'Rotimax', category: 'Environmental services',
    description: 'A digital home for professional pest management and environmental services.',
    overview: 'Rotimax brings pest control, cleaning, environmental services, products, and professional training into one digital home.',
    challenge: 'The offer is broad, and visitors often arrive with a specific problem. They need to recognise the right service and know how to request help quickly.',
    approach: 'I organised the services into clear routes, surfaced quote and assessment actions, and used a pest selector and four-step process to explain what happens next.',
    image: '/assets/rotimax.png', url: 'https://rotimax.com/', imageAlt: 'Rotimax homepage showing pest management and environmental services',
  },
  {
    number: '02', name: 'Haus of Gianni', category: 'Streetwear commerce',
    description: 'A bold storefront for premium streetwear, limited drops, and an unmistakable brand voice.',
    overview: 'A streetwear storefront built around limited drops, a lookbook, and a distinct point of view.',
    challenge: 'The experience needed the energy of a fashion drop while keeping the collection and shopping routes easy to follow.',
    approach: 'I built a strong typographic identity and clear paths into new drops, the collection, the lookbook, and early access.',
    image: null, brandPreview: true, url: 'https://hausofgianni.xyz/',
  },
  {
    number: '03', name: 'Shobab Farm', category: 'Agriculture',
    description: 'A website presenting the farm and its approach to agriculture.',
    overview: 'Shobab Farm presents crops, livestock, and a commitment to sustainable farming in Ondo State.',
    challenge: 'A first-time visitor needs to understand what the farm produces and why its growing practices matter.',
    approach: 'I separated crops, livestock, and sustainability into clear sections, then paired product highlights with contact and location details.',
    image: '/assets/shobab.png', url: 'https://shobabceowale.com/', imageAlt: 'Shobab Farm homepage with a green agricultural landscape',
  },
  {
    number: '04', name: 'FIF & Co', category: 'Fashion commerce',
    description: 'An online store where culture, fashion, and custom orders meet.',
    overview: 'A commerce experience for modern Nigerian womenswear, rooted in Adire and custom pieces.',
    challenge: 'The store needed to express the label’s story while making collections and custom-order routes easy to find.',
    approach: 'I made collection categories the entry points, gave the brand story room to breathe, and kept shop and enquiry actions close to the products.',
    image: '/assets/fif-and-co.png', url: 'https://shopfifandco.com/', imageAlt: 'FIF & Co fashion store homepage',
  },
  {
    number: '05', name: 'Pullover', category: 'Automotive platform',
    description: 'A product experience focused on finding the right vehicle parts.',
    overview: 'Pullover helps drivers identify their vehicle and find parts that match its exact configuration.',
    challenge: 'Finding a replacement part involves uncertainty about fit. The experience needed to turn technical compatibility into a clear, trustworthy journey.',
    approach: 'I presented the journey as three steps: identify the vehicle, confirm compatibility, then find or request the part. VIN and OEM references support the explanation.',
    image: '/assets/pullover.png', url: 'https://pullover.ng/', imageAlt: 'Pullover homepage for vehicle parts discovery',
  },
];

function WelcomeIntro({ onComplete }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef([]);
  const finished = useRef(false);

  function finish() {
    if (finished.current) return;
    finished.current = true;
    timers.current.forEach(clearTimeout);
    setLeaving(true);
    timers.current.push(setTimeout(onComplete, 680));
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onComplete(); return; }
    timers.current = [
      setTimeout(() => setStep(1), 850),
      setTimeout(() => setStep(2), 1700),
      setTimeout(() => setStep(3), 2550),
      setTimeout(() => finish(), 3650),
    ];
    return () => timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') finish(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const greeting = greetings[step];
  return <div className={`welcome ${leaving ? 'welcome--leaving' : ''}`} role="dialog" aria-modal="true" aria-label="Welcome to Peter Gianni's portfolio">
    <div className="welcome__top"><span className="welcome__brand">Peter Gianni<span>.</span></span><button type="button" className="welcome__skip" onClick={finish}>Skip intro <ArrowUpRight size={16} weight="light" aria-hidden="true" /></button></div>
    <div className="welcome__center"><p className="eyebrow welcome__eyebrow">A welcome in four languages</p><p className="welcome__word" key={step} lang={greeting.code} aria-hidden="true">{greeting.text}<span>.</span></p><p className="welcome__language" aria-hidden="true"><span>{greeting.language}</span><span>{String(step + 1).padStart(2, '0')} / 04</span></p><p className="sr-only">Hello, Ndeewo, Ẹ ǹlẹ́ o, Sannu. Welcome to Peter Gianni's portfolio.</p></div>
    <div className="welcome__bottom"><span>Design · Research · Security</span><span className="welcome__track" aria-hidden="true"><span style={{ transform: `scaleX(${(step + 1) / greetings.length})` }} /></span><span>{String(step + 1).padStart(2, '0')} / 04</span></div>
  </div>;
}

function Project({ project }) {
  const available = Boolean(project.url);
  return <article className={`project ${available ? '' : 'project--pending'}`}>
    <div className="project__intro" data-reveal><span className="project__number">{project.number} / 05</span><div><p className="eyebrow project__category">{project.category}</p><h3>{project.name}</h3><p className="project__description">{project.description}</p><p className="project__role">My role <span>Design · Frontend · Backend</span></p>{available ? <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">Visit live site <ArrowUpRight size={18} weight="light" aria-hidden="true" /></a> : <span className="text-link text-link--muted">Link being updated</span>}</div></div>
    {project.image ? <a className="project__visual" data-reveal href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} website`}><img src={project.image} alt={project.imageAlt} loading="lazy" /><span className="project__visual-link" aria-hidden="true"><ArrowUpRight size={24} weight="light" /></span></a> : project.brandPreview ? <a className="project__visual project__brand-preview" data-reveal href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} website`}><span className="project__brand-top">HOG · EST. 2026 <span>STREETWEAR</span></span><span className="project__brand-title">WEAR<br /><em>YOUR</em><br />TRUTH.</span><span className="project__brand-bottom">HAUS OF GIANNI</span><span className="project__visual-link" aria-hidden="true"><ArrowUpRight size={24} weight="light" /></span></a> : <div className="project__pending-visual" data-reveal aria-label={`${project.name} visual coming soon`}><span className="eyebrow">Project {project.number} / 05</span><span>{project.name}</span><span className="project__pending-bottom">Visual coming soon</span></div>}
    <div className="project__story" data-reveal aria-label={`${project.name} project story`}>
      <p className="eyebrow project__story-title">Inside the project</p>
      <div className="project__story-grid">
        <section><h4>Overview</h4><p>{project.overview}</p></section>
        <section><h4>The challenge</h4><p>{project.challenge}</p></section>
        <section><h4>My approach</h4><p>{project.approach}</p></section>
      </div>
    </div>
  </article>;
}

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDiscipline, setActiveDiscipline] = useState(0);
  const motionRef = useRef(null);

  useEffect(() => {
    if (showIntro) return;
    const targets = document.querySelectorAll('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { targets.forEach((el) => el.classList.add('in-view')); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), { threshold: 0.14, rootMargin: '0px 0px -3% 0px' });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showIntro]);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--page-progress', max > 0 ? window.scrollY / max : 0);
      document.documentElement.style.setProperty('--hero-shift', Math.min(window.scrollY * 0.16, 120) + 'px');
      if (motionRef.current) {
        const box = motionRef.current.getBoundingClientRect();
        const scrollable = Math.max(1, box.height - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -box.top / scrollable));
        motionRef.current.style.setProperty('--motion-progress', progress);
        motionRef.current.style.setProperty('--motion-scale', 1 + progress * 0.16);
        motionRef.current.style.setProperty('--motion-y', `${progress * -5}%`);
        setActiveDiscipline(Math.min(2, Math.floor(progress * 3)));
      }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => { document.body.style.overflow = showIntro || menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [showIntro, menuOpen]);
  useEffect(() => { const onKeyDown = (event) => { if (event.key === 'Escape') setMenuOpen(false); }; window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown); }, []);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="page-progress" aria-hidden="true"><span /></div>
    <div className="site-shell" inert={showIntro ? true : undefined} aria-hidden={showIntro ? 'true' : undefined}>
      <header className="site-header"><a className="logo" href="#top" onClick={() => setMenuOpen(false)}>Peter Gianni<span>.</span></a><nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Main navigation"><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#practice" onClick={() => setMenuOpen(false)}>Skills</a><a href="#process" onClick={() => setMenuOpen(false)}>Process</a><a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav><button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} weight="light" /> : <span>Menu</span>}</button></header>
      <main id="main">
        <section id="top" className={`hero ${!showIntro ? 'hero--ready' : ''}`} aria-labelledby="hero-title">
          <div className="hero__art-frame"><img className="hero__art" src="/assets/hero-art.png" alt="" fetchPriority="high" /></div>
          <div className="hero__content">
            <p className="eyebrow hero__overline" data-reveal>Peter Gianni / UI/UX designer</p>
            <h1 id="hero-title" className="hero__title" data-reveal>Every idea<br />deserves to<br />feel <em>alive.</em></h1>
            <div className="hero__meta" data-reveal><span className="hero__rule" /><p>UI/UX design with a cybersecurity mindset.</p></div>
            <a className="hero__contact" href="#contact" data-reveal>Contact me <ArrowUpRight size={17} weight="light" aria-hidden="true" /></a>
          </div>
          <a href="#about" className="hero__scroll" aria-label="Scroll to About section"><span>Scroll to explore</span><ArrowDown size={19} weight="light" aria-hidden="true" /></a>
          <p className="hero__side-note">Intuitive by design.<br />Thoughtful about trust.</p>
        </section>

        <section id="about" className="about section-wrap" aria-labelledby="about-title">
          <div className="section-kicker" data-reveal><span>01 / About me</span><span className="section-kicker__line" /></div>
          <div className="about__lead">
            <h2 id="about-title" data-reveal>I take an idea<br />from design<br />through to a<br />working product.</h2>
            <div className="about__summary" data-reveal>
              <p>I’m Peter, a UI/UX designer with a strong interest in cybersecurity.</p>
              <span className="short-rule" />
              <p>I create digital experiences that feel clear and useful, while paying attention to the trust people place in them.</p>
            </div>
          </div>
          <div className="about__story" data-reveal>
            <p className="eyebrow">Design with security in mind</p>
            <div>
              <p>My work begins with the person using the product. I study what they are trying to do, where the experience becomes confusing, and what information they need to feel confident at each step.</p>
              <p>Cybersecurity changes the questions I ask. I think about privacy, secure authentication, data protection, and the small interface decisions that help people understand what is happening to their information.</p>
              <p>On recent projects, I’ve carried ideas from research and interface design into frontend and backend implementation. That helps the finished experience stay close to the original design intent.</p>
            </div>
          </div>
          <div className="practice-steps" aria-label="My creative process">
            <div className="practice-step practice-step--one" data-reveal><span className="practice-step__number">01</span><img src="/assets/imagine.png" alt="Abstract charcoal arch in pale stone" loading="lazy" /><h3>Imagine</h3><span className="practice-step__rule" /></div>
            <div className="practice-step practice-step--two" data-reveal><span className="practice-step__number">02</span><img src="/assets/shape.png" alt="Abstract architectural curve in cobalt blue" loading="lazy" /><h3>Shape</h3><span className="practice-step__rule" /></div>
            <div className="practice-step practice-step--three" data-reveal><span className="practice-step__number">03</span><img src="/assets/build.png" alt="Light entering a dark architectural space" loading="lazy" /><h3>Build</h3><span className="practice-step__rule" /></div>
          </div>
        </section>

        <section id="practice" className="expertise section-wrap" aria-labelledby="expertise-title">
          <div className="section-kicker" data-reveal><span>02 / What I can do</span><span className="section-kicker__line" /></div>
          <div className="expertise__heading" data-reveal>
            <p className="eyebrow">Design, research, security, implementation</p>
            <h2 id="expertise-title">Useful. Beautiful.<br /><em>Trustworthy.</em></h2>
            <p>I work across the experience: understanding the problem, shaping the interface, checking the moments that need trust, and helping the product make it into the world.</p>
          </div>
          <div className="expertise__grid">
            <div className="expertise__column" data-reveal><span>01 / Interface design</span><h3>Make it feel effortless.</h3><p>I turn complex journeys into clear flows, responsive layouts, visual systems, and interaction patterns people can understand without a manual.</p><p className="expertise__tools">Figma · Adobe XD · Sketch · Principle</p></div>
            <div className="expertise__column" data-reveal><span>02 / Research & prototypes</span><h3>Test the right things.</h3><p>Interviews, journey maps, wireframes, and interactive prototypes help expose friction before development makes it expensive to change.</p><p className="expertise__tools">User interviews · Usability testing · Framer · ProtoPie</p></div>
            <div className="expertise__column" data-reveal><span>03 / Security thinking</span><h3>Design for trust.</h3><p>I consider privacy, authentication, error states, and data protection as part of the experience, so important decisions are understandable to users.</p><p className="expertise__tools">Privacy design · Secure authentication · Security audits</p></div>
            <div className="expertise__column" data-reveal><span>04 / Product build</span><h3>Carry it through.</h3><p>For the projects below I handled the design, frontend, and backend work, then refined the responsive experience in the browser.</p><p className="expertise__tools">React · HTML · CSS · Frontend · Backend</p></div>
          </div>
        </section>

        <section id="process" className="process section-wrap" aria-labelledby="process-title">
          <div className="section-kicker" data-reveal><span>03 / My process</span><span className="section-kicker__line" /></div>
          <div className="process__intro" data-reveal>
            <h2 id="process-title">From question<br />to working product.</h2>
            <p>Every project has different needs, but this is the rhythm I use to make decisions visible, test them early, and carry them through to a usable result.</p>
          </div>
          <div className="process__steps">
            <article data-reveal><span>01 / Discover</span><h3>Understand the people and the problem.</h3><p>I learn what the audience is trying to accomplish, what the business needs, and where the current journey breaks down. Interviews, competitor reviews, and journey maps give the work a direction.</p><small>User interviews · Goals · Journey maps</small></article>
            <article data-reveal><span>02 / Shape</span><h3>Make the idea testable.</h3><p>I map the information and main flows, sketch wireframes, and build prototypes. Testing the key tasks early helps me simplify the experience before polishing the surface.</p><small>Flows · Wireframes · Prototypes</small></article>
            <article data-reveal><span>03 / Design for trust</span><h3>Resolve the details that matter.</h3><p>I define the visual system and interactive states while checking accessibility, privacy, authentication, and the moments where the interface needs to explain itself clearly.</p><small>UI systems · Usability · Security thinking</small></article>
            <article data-reveal><span>04 / Build & refine</span><h3>Make it work across screens.</h3><p>On projects I build, I translate the design into frontend and backend work, check the responsive experience, and refine what feels unclear once it runs in a real browser.</p><small>Implementation · Responsive QA · Iteration</small></article>
          </div>
        </section>

        <section className="motion" ref={motionRef} aria-labelledby="motion-title"><div className="motion__scene"><img className="motion__art" src="/assets/motion-art.png" alt="" loading="lazy" /><div className="motion__inner"><div className="motion__top"><p>Design around<br />real people.</p><p>Think carefully about<br />the trust behind it.</p></div><div className="motion__stack" id="motion-title" aria-label="Design, research, security">{['DESIGN', 'RESEARCH', 'SECURITY'].map((word, index) => <span key={word} className={activeDiscipline === index ? 'is-active' : ''}>{word}</span>)}</div><div className="motion__footer" aria-hidden="true"><span>Scroll to explore</span><span className="motion__track"><span /></span><span>0{activeDiscipline + 1} / 03</span></div><a href="#work" className="motion__next" aria-label="Scroll to selected work"><ArrowDown size={23} weight="light" /></a></div></div></section>

        <section id="work" className="work section-wrap" aria-labelledby="work-title"><div className="section-kicker" data-reveal><span>04 / Selected work</span><span className="section-kicker__line" /></div><div className="work__intro" data-reveal><h2 id="work-title">Selected<br /><em>work.</em></h2><p>Five projects I shaped from interface design into implementation. Explore the overview, the challenge, and the decisions behind each one.</p></div><nav className="work__index" aria-label="Jump to a project" data-reveal>{projects.map((project) => <a href={`#project-${project.number}`} key={project.number}>{project.name}</a>)}</nav><div className="work__projects">{projects.map((project) => <div id={`project-${project.number}`} key={project.number}><Project project={project} /></div>)}</div></section>

        <section className="unpublished section-wrap" aria-labelledby="unpublished-title"><div className="section-kicker" data-reveal><span>05 / In progress</span><span className="section-kicker__line" /></div><div className="unpublished__content" data-reveal><h2 id="unpublished-title">Unpublished<br /><em>designs.</em></h2><div><p>A reserved space for work that isn’t ready to share yet.</p><span>More to come.</span></div></div></section>

        <section id="contact" className="contact section-wrap" aria-labelledby="contact-title">
          <div className="section-kicker" data-reveal><span>06 / Contact</span><span className="section-kicker__line" /></div>
          <div className="contact__body" data-reveal>
            <p className="eyebrow">Have something in mind?</p>
            <h2 id="contact-title">Let’s make it<br /><em>feel alive.</em></h2>
            <p className="contact__intro">Tell me about the product, the problem, or the experience you want to improve. I’m happy to talk through the first idea with you.</p>
            <a href="mailto:Peterchinedum708@gmail.com?subject=Let's%20work%20together" className="contact__link">Start a conversation <ArrowUpRight size={30} weight="light" aria-hidden="true" /></a>
          </div>
          <div className="contact__details" data-reveal>
            <div><span>Email</span><a href="mailto:Peterchinedum708@gmail.com">Peterchinedum708@gmail.com</a></div>
            <div><span>Location</span><p>Lagos, Nigeria</p></div>
            <div><span>Work with me on</span><p>UI/UX design · Digital products · Security-conscious experiences</p></div>
          </div>
          <footer className="footer"><span>Peter Gianni / UI/UX designer</span><span>Lagos, Nigeria</span><a href="#top">Back to top <ArrowRight size={17} weight="light" aria-hidden="true" /></a></footer>
        </section>
      </main>
    </div>
    {showIntro && <WelcomeIntro onComplete={() => setShowIntro(false)} />}
  </>;
}
