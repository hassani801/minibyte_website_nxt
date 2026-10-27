import HomeScript from '@/components/HomeScript';

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <symbol id="logo" viewBox="0 0 92 20">
            <circle cx="6" cy="10" r="2.4" />
            <circle cx="17.4" cy="10" r="5" />
            <circle cx="28.8" cy="10" r="5" />
            <circle cx="40.2" cy="10" r="2.4" />
            <circle cx="51.6" cy="10" r="5" />
            <circle cx="63" cy="10" r="5" />
            <circle cx="74.4" cy="10" r="2.4" />
            <circle cx="85.8" cy="10" r="5" fill="#4654FF" />
          </symbol>
          <filter id="fx" x="-6%" y="-6%" width="112%" height="112%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011 0.028" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap id="fxmap" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      {/* loader */}
      <div id="loader" role="status" aria-label="Loading Minibyte">
        <div className="ld-in">
          <div className="ld-row" id="ldRow" aria-hidden="true" />
          <div className="ld-name">
            <b>MINIBYTE</b>
            <span className="mono mut">AI RESEARCH LAB</span>
          </div>
          <div>
            <div className="ld-bar">
              <i id="ldBar" />
            </div>
            <div className="ld-meta mono" style={{ marginTop: '10px' }}>
              <span>LOADING SYSTEM</span>
              <span id="ldPct">000</span>
            </div>
          </div>
        </div>
        <div className="ld-skip mono">PRESS ANY KEY OR CLICK TO SKIP</div>
      </div>
      <div className="cur-dot" id="curDot" aria-hidden="true" />
      <div className="cur-ring" id="curRing" aria-hidden="true">
        <span id="curLbl" />
      </div>
      <div className="svc-pv" id="svcPv" aria-hidden="true">
        <img id="svcImg" alt="" />
      </div>
      {/* header */}
      <header className="hdr" id="hdr">
        <div className="hdr-in">
          <a className="brand" href="#top" aria-label="Minibyte, back to top">
            <svg className="logo" aria-hidden="true">
              <use href="#logo" />
            </svg>
            <span className="bn">
              <b>MINIBYTE</b>
            </span>
          </a>
          <nav className="nav" aria-label="Primary">
            <ul>
              <li>
                <a href="/work" data-sec="work">
                  WORK
                </a>
              </li>
              <li>
                <a href="/capabilities" data-sec="capabilities">
                  CAPABILITIES
                </a>
              </li>
              <li>
                <a href="/research" data-sec="research">
                  RESEARCH
                </a>
              </li>
              <li>
                <a href="/about" data-sec="about">
                  ABOUT
                </a>
              </li>
              <li>
                <a href="#contact" data-sec="contact">
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>
          <button className="mbtn" id="mbtn" aria-expanded="false" aria-controls="menu">MENU</button>
        </div>
      </header>
      <div id="menu" aria-hidden="true" inert>
        <ol>
          <li>
            <a href="/work">
              Work
            </a>
          </li>
          <li>
            <a href="/capabilities">
              Capabilities
            </a>
          </li>
          <li>
            <a href="/research">
              Research
            </a>
          </li>
          <li>
            <a href="/about">
              About
            </a>
          </li>
          <li>
            <a href="#contact">
              Contact
            </a>
          </li>
        </ol>
        <div className="menu-foot mono">
          <span>hello@minibyte.ai</span>
          {' '}
          <span>01101101 / THINKING IN BYTES</span>
        </div>
      </div>
      <main id="main">
        {/* 1 HERO */}
        <section className="hero ink" id="top" aria-label="Introduction">
          <div className="hero-in wrap">
            <div className="hero-mid">
              <h1 className="hero-h">
                <span className="hl hero-r" style={{ '--i': '0' } as React.CSSProperties}>Building</span>
                {' '}
                <span className="hl hero-r" style={{ '--i': '1' } as React.CSSProperties}>Intelligence</span>
                {' '}
                <span className="hl dim hero-r" style={{ '--i': '2' } as React.CSSProperties}>for the real world.</span>
              </h1>
              <div className="hero-sub">
                <p className="hero-r" style={{ '--i': '3' } as React.CSSProperties}>
                  We research and build intelligent systems across AI, robotics, automation, computer vision and embedded intelligence.
                </p>
                <div className="ctas hero-r" style={{ '--i': '4' } as React.CSSProperties}>
                  <a className="btn pri mag" href="/work">
                    {'Explore our work '}
                    <span className="ar">→</span>
                  </a>
                  {' '}
                  <a className="btn sec2 mag" href="#contact">Start a conversation</a>
                </div>
              </div>
            </div>
            <div className="hero-foot mono hero-r" style={{ '--i': '5' } as React.CSSProperties}>
              <a href="#idea" className="lnk">Scroll to explore ↓</a>
            </div>
          </div>
        </section>
        {/* 2 IDEA */}
        <section className="sec paper" id="idea" aria-labelledby="ideaH">
          <div className="wrap">
            <div className="lbl mono" data-rv="">
              <i />
              <span>
                <b>01</b>
                {' / THE IDEA'}
              </span>
            </div>
            <h2 className="h2 idea-h" id="ideaH" data-split="" data-rv="">
              Big questions.
              <br />
              Real systems.
            </h2>
            <div className="idea-grid">
              <div className="idea-copy">
                <p className="lead" data-rv="">Minibyte is an AI research lab building intelligent systems that move beyond the screen.</p>
                <p className="body" data-rv="" style={{ '--i': '1' } as React.CSSProperties}>
                  We work where software meets the physical world — combining artificial intelligence, robotics, embedded intelligence and automation to solve complex operational problems.
                </p>
              </div>
              <div className="grid-box" id="gridBox" data-rv="">
                <canvas id="gridCv" aria-hidden="true" />
                <div className="grid-cap mono">
                  <span>8 × 8 / SIGNAL FIELD</span>
                  <span className="eq">01101101 = m</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 3 CAPABILITIES */}
        <section className="sec ink" id="capabilities" aria-labelledby="capH" style={{ paddingBottom: '0' }}>
          <div className="wrap byte-intro">
            <div className="lbl mono" data-rv="">
              <i />
              <span>
                <b>02</b>
                {' / CAPABILITIES'}
              </span>
            </div>
            <h2 className="h2" id="capH" data-split="" data-rv="">
              Intelligence,
              <br />
              engineered.
            </h2>
            <p className="body" data-rv="">
              Eight domains, eight bits. Scroll to build the byte one capability at a time, or pick a bit.
            </p>
            <a className="btn pri mag" href="/capabilities" data-rv="">
              {'Explore all capabilities '}
              <span className="ar">→</span>
            </a>
          </div>
          <div className="byte" id="byte">
            <div className="byte-pin">
              <div className="wrap byte-top mono">
                <span id="capNo">01 / 08</span>
                <span id="byteTop">BUILDING THE BYTE</span>
              </div>
              <div className="wrap byte-main">
                <div className="byte-l in" id="byteL">
                  <div className="byte-n" id="byteN" aria-hidden="true">01</div>
                  <div className="byte-t">
                    <h3 id="byteT">ARTIFICIAL INTELLIGENCE</h3>
                    <p id="byteD">Research and development of intelligent systems, machine learning models and applied AI.</p>
                    <p className="mono" id="byteC">CLASS / LEARNING SYSTEMS</p>
                    <a className="lnk mono" id="byteLink" href="/capabilities#c-01">VIEW THIS CAPABILITY →</a>
                  </div>
                </div>
                <div className="byte-vis in" id="byteVis" data-cursor="explore">
                  <canvas id="byteCv" aria-hidden="true" />
                  <span className="tag mono" id="byteTag">MODULE 01 / LIVE</span>
                </div>
              </div>
              <div className="wrap">
                <div className="byte-row" id="byteRow" role="group" aria-label="Capabilities" />
              </div>
            </div>
          </div>
        </section>
        {/* 4 SERVICES */}
        <section className="sec paper" id="services" aria-labelledby="svcH">
          <div className="wrap">
            <div className="svc-head">
              <div className="lbl mono" data-rv="">
                <i />
                <span>
                  <b>03</b>
                  {' / WHAT WE BUILD'}
                </span>
              </div>
              <h2 className="h2" id="svcH" data-split="" data-rv="">
                From research
                <br />
                to deployment.
              </h2>
              <p className="body" data-rv="">
                Every service sits somewhere between a first question and a running system. The bars show where we work.
              </p>
            </div>
            <div className="svc-cols mono" aria-hidden="true">
              <span />
              <span>SERVICE</span>
              <div className="phases">
                <span>RESEARCH</span>
                <span>BUILD</span>
                <span>DEPLOY</span>
              </div>
            </div>
            <ul className="svc" id="svcList" />
          </div>
        </section>
        {/* 5 WORK */}
        <section className="sec ink" id="work" aria-labelledby="workH">
          <div className="wrap">
            <div className="tz-head">
              <div className="tz-l">
                <div className="lbl mono" data-rv="">
                  <i />
                  <span>
                    <b>04</b>
                    {' / SELECTED WORK'}
                  </span>
                </div>
                <h2 className="h2" id="workH" data-split="" data-rv="">
                  Systems
                  <br />
                  in the wild.
                </h2>
              </div>
              <div className="tz-r">
                <p className="body" data-rv="">
                  Ten case files across research and software development. Each one shows why we built it, how, how long it took and the results.
                </p>
                <a className="btn pri mag" href="/work" data-rv="">
                  {'View all work '}
                  <span className="ar">→</span>
                </a>
              </div>
            </div>
            <div className="tz-grid">
              <a className="tz" href="/work#p-01" data-cursor="project" data-rv="" aria-label="Project 01: Intelligent Operations">
                <div className="ph">
                  <img data-kind="arm" data-w="700" data-h="875" data-seed="131" data-tint="0.5" width="700" height="875" alt="Placeholder image for Intelligent Operations" />
                </div>
                <div className="cap">
                  <span className="mono mut">
                    01 / AI &amp; AUTOMATION
                  </span>
                  <h3>Intelligent Operations</h3>
                </div>
              </a>
              {' '}
              <a className="tz" href="/work#p-02" data-cursor="project" data-rv="" style={{ '--i': '1' } as React.CSSProperties} aria-label="Project 02: Autonomous Systems">
                <div className="ph">
                  <img data-kind="vehicle" data-w="700" data-h="875" data-seed="132" data-tint="0.2" width="700" height="875" alt="Placeholder image for Autonomous Systems" />
                </div>
                <div className="cap">
                  <span className="mono mut">02 / ROBOTICS</span>
                  <h3>Autonomous Systems</h3>
                </div>
              </a>
              {' '}
              <a className="tz" href="/work#p-04" data-cursor="project" data-rv="" style={{ '--i': '2' } as React.CSSProperties} aria-label="Project 04: Intelligence at the Edge">
                <div className="ph">
                  <img data-kind="board" data-w="700" data-h="875" data-seed="134" data-tint="0.7" width="700" height="875" alt="Placeholder image for Intelligence at the Edge" />
                </div>
                <div className="cap">
                  <span className="mono mut">04 / EDGE AI</span>
                  <h3>Intelligence at the Edge</h3>
                </div>
              </a>
            </div>
            <a className="tz-all" href="/work" data-rv="">
              <span className="mono mut">ALL CASE FILES / 10</span>
              <span className="t">Browse the full index</span>
              <span className="ar" aria-hidden="true">→</span>
            </a>
          </div>
        </section>
        {/* 7 RESEARCH */}
        <section className="sec paper" id="research" aria-labelledby="resH">
          <div className="wrap res-grid">
            <aside className="res-side">
              <div className="lbl mono" data-rv="">
                <i />
                <span>
                  <b>05</b>
                  {' / RESEARCH'}
                </span>
              </div>
              <h2 className="h2 s" id="resH" data-split="" data-rv="">
                We don't just
                <br />
                use technology.
                <br />
                We question it.
              </h2>
              <p className="bq mono" data-rv="">
                <span>BIG QUESTIONS.</span>
                <span>SMALL MODELS.</span>
              </p>
              <a className="btn pri mag" href="/research" data-rv="">
                {'Explore all research '}
                <span className="ar">→</span>
              </a>
              <ol className="toc" id="toc" aria-label="Research index" />
            </aside>
            <div className="res-main" id="resList" />
          </div>
        </section>
        {/* 8 STACK */}
        <section className="sec ink" id="stack" aria-labelledby="stackH" style={{ paddingBottom: '0' }}>
          <div className="wrap stack-head">
            <div className="lbl mono" data-rv="">
              <i />
              <span>SYSTEM MAP</span>
            </div>
            <h2 className="h2" id="stackH" data-split="" data-rv="">
              The stack
              <br />
              is the system.
            </h2>
          </div>
          <div className="stack-stage" id="stackStage" data-cursor="explore">
            <canvas id="glStack" aria-label="Interactive network of eight technology domains" role="img" />
            <div className="lbls" id="lbls" aria-hidden="true" />
            <div className="stack-ui">
              <ul id="stList" aria-label="Choose a node" />
              <div className="panel" aria-live="polite">
                <h3 id="stName">AI</h3>
                <p id="stDesc" />
                <p className="mono lk" id="stLinks" />
              </div>
            </div>
          </div>
        </section>
        {/* 9 PROCESS */}
        <section className="paper" id="process" aria-labelledby="procH">
          <div className="sec" style={{ paddingBottom: 'clamp(40px,6vw,80px)' }}>
            <div className="wrap proc-head">
              <div className="lbl mono" data-rv="">
                <i />
                <span>PROCESS</span>
              </div>
              <h2 className="h2" id="procH" data-split="" data-rv="">
                From question
                <br />
                to system.
              </h2>
            </div>
          </div>
          <ol className="proc2">
            <li className="ps paper" style={{ '--bg': '#F3F4F1' } as React.CSSProperties}>
              <div className="wrap ps-in">
                <div className="ps-n" aria-hidden="true">01</div>
                <div className="ps-t">
                  <div className="prail mono">
                    <span className="pr" aria-hidden="true">
                      <i className="on" />
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>STEP 01 / 04</span>
                  </div>
                  <h3>Discover</h3>
                  <p>Understand the environment, problem and constraints.</p>
                  <div className="outs mono">
                    <span>OUTPUTS</span>
                    <ul>
                      <li>Site and constraint survey</li>
                      <li>Problem brief</li>
                      <li>Success criteria</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="ps paper" style={{ '--bg': '#ECEEEA' } as React.CSSProperties}>
              <div className="wrap ps-in">
                <div className="ps-n" aria-hidden="true">02</div>
                <div className="ps-t">
                  <div className="prail mono">
                    <span className="pr" aria-hidden="true">
                      <i className="past" />
                      <i className="on" />
                      <i />
                      <i />
                    </span>
                    <span>STEP 02 / 04</span>
                  </div>
                  <h3>Research</h3>
                  <p>Investigate the technical path and validate assumptions.</p>
                  <div className="outs mono">
                    <span>OUTPUTS</span>
                    <ul>
                      <li>Prior art and feasibility tests</li>
                      <li>Candidate approaches</li>
                      <li>Evaluation plan</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="ps paper" style={{ '--bg': '#E4E7E1' } as React.CSSProperties}>
              <div className="wrap ps-in">
                <div className="ps-n" aria-hidden="true">03</div>
                <div className="ps-t">
                  <div className="prail mono">
                    <span className="pr" aria-hidden="true">
                      <i className="past" />
                      <i className="past" />
                      <i className="on" />
                      <i />
                    </span>
                    <span>STEP 03 / 04</span>
                  </div>
                  <h3>Build</h3>
                  <p>Prototype, engineer and integrate the system.</p>
                  <div className="outs mono">
                    <span>OUTPUTS</span>
                    <ul>
                      <li>Working prototype</li>
                      <li>Integrated system</li>
                      <li>Test harness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="ps ink">
              <div className="wrap ps-in">
                <div className="ps-n" aria-hidden="true">04</div>
                <div className="ps-t">
                  <div className="prail mono">
                    <span className="pr" aria-hidden="true">
                      <i className="past" />
                      <i className="past" />
                      <i className="past" />
                      <i className="on" />
                    </span>
                    <span>STEP 04 / 04</span>
                  </div>
                  <h3>Deploy</h3>
                  <p>Measure, refine and move into real-world operation.</p>
                  <div className="outs mono">
                    <span>OUTPUTS</span>
                    <ul>
                      <li>Field validation</li>
                      <li>Monitoring and metrics</li>
                      <li>Handover and iteration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </section>
        {/* 10 TEAM */}
        <section className="sec ink" id="people" aria-labelledby="teamH">
          <div className="wrap">
            <div className="team-head">
              <div className="lbl mono" data-rv="">
                <i />
                <span>
                  <b>06</b>
                  {' / PEOPLE'}
                </span>
              </div>
              <h2 className="h2 m" id="teamH" data-split="" data-rv="">
                Built by
                <br />
                people who
                <br />
                think in systems.
              </h2>
              <a className="btn sec2 mag" href="/about#people" data-rv="" style={{ justifySelf: 'start' }}>
                {'Meet the team '}
                <span className="ar">→</span>
              </a>
            </div>
            <div className="team" id="teamGrid" />
          </div>
        </section>
        {/* 11 ABOUT */}
        <section className="sec paper" id="about" aria-labelledby="aboutH" style={{ paddingBottom: 'clamp(56px,8vw,110px)' }}>
          <div className="wrap">
            <div className="lbl mono" data-rv="">
              <i />
              <span>ABOUT</span>
            </div>
            <div className="about-grid">
              <h2 className="h2" id="aboutH" data-split="" data-rv="">
                Intelligence
                <br />
                should move.
              </h2>
              <div style={{ display: 'grid', gap: '24px' }}>
                <p className="lead" data-rv="">
                  Minibyte is an AI research lab focused on turning advanced computation into useful systems for the physical and operational world.
                </p>
                <p className="body" data-rv="" style={{ '--i': '1' } as React.CSSProperties}>
                  We combine research, engineering and experimentation to create technology that can perceive, reason, adapt and act.
                </p>
                <a className="btn pri mag" href="/about" data-rv="" style={{ justifySelf: 'start' }}>
                  {'Read our story '}
                  <span className="ar">→</span>
                </a>
              </div>
            </div>
            <div className="word" id="word" data-rv="">
              <canvas id="wordCv" role="img" aria-label="The word Intelligence, breaking into particles" />
            </div>
            <div className="word-note mono">
              <span>MOVE THE CURSOR OVER THE WORD</span>
              <span>01101101</span>
            </div>
          </div>
        </section>
        {/* 12 NUMBERS */}
        <section className="sec paper nums" id="numbers" aria-label="By the numbers" style={{ paddingBottom: 'clamp(72px,10vw,140px)' }}>
          <div className="wrap">
            <div className="num-grid">
              <div className="num" data-rv="">
                <b data-count="8" data-pad="2" data-suffix="+">08+</b>
                <span className="mono mut">RESEARCH DOMAINS</span>
              </div>
              <div className="num" data-rv="" style={{ '--i': '1' } as React.CSSProperties}>
                <b data-count="24" data-suffix="/7">24/7</b>
                <span className="mono mut">SYSTEM THINKING</span>
              </div>
              <div className="num" data-rv="" style={{ '--i': '2' } as React.CSSProperties}>
                <b>
                  <span className="inf">∞</span>
                </b>
                <span className="mono mut">POSSIBILITIES TO EXPLORE</span>
              </div>
              <div className="num" data-rv="" style={{ '--i': '3' } as React.CSSProperties}>
                <b data-count="1" data-pad="2">01</b>
                <span className="mono mut">CORE IDEA</span>
              </div>
            </div>
            <p className="num-note mono" data-rv="">Figures describe how we work, not company statistics.</p>
          </div>
        </section>
        {/* 13 CTA */}
        <section className="sec ink cta" id="contact" aria-labelledby="ctaH">
          <div className="cta-gl" data-cursor="explore">
            <canvas id="glCta" aria-hidden="true" />
          </div>
          <div className="wrap cta-in">
            <div className="lbl mono" data-rv="">
              <i />
              <span>
                <b>CONTACT</b>
                {' / 01101101'}
              </span>
            </div>
            <h2 className="cta-h" id="ctaH" data-split="" data-rv="">
              Have a
              <br />
              complex
              <br />
              problem?
            </h2>
            <p className="lead" data-rv="">Let's build the system that solves it.</p>
            <div className="ctas" data-rv="">
              <a className="btn pri mag" href="mailto:hello@minibyte.ai">
                {'Start a conversation '}
                <span className="ar">→</span>
              </a>
              {' '}
              <a className="btn sec2 mag" href="/work">View our work</a>
            </div>
            <div className="mail mono" data-rv="">
              <span>OR WRITE TO</span>
              <code id="mailTxt">hello@minibyte.ai</code>
              <button className="copy" id="copyMail" type="button">COPY</button>
            </div>
          </div>
        </section>
      </main>
      {/* FOOTER */}
      <footer className="foot ink">
        <div className="wrap">
          <div className="foot-grid">
            <div style={{ display: 'grid', gap: '14px', alignContent: 'start' }}>
              <svg className="logo" aria-hidden="true" style={{ width: '110px', height: '24px' }}>
                <use href="#logo" />
              </svg>
              <div className="big">MINIBYTE</div>
              <div className="mono mut">AI RESEARCH LAB</div>
            </div>
            <nav aria-label="Footer">
              <h4 className="mono">NAVIGATE</h4>
              <ul className="mono">
                <li>
                  <a className="lnk" href="/work">WORK</a>
                </li>
                <li>
                  <a className="lnk" href="/capabilities">CAPABILITIES</a>
                </li>
                <li>
                  <a className="lnk" href="/research">RESEARCH</a>
                </li>
                <li>
                  <a className="lnk" href="/about">ABOUT</a>
                </li>
                <li>
                  <a className="lnk" href="#contact">CONTACT</a>
                </li>
              </ul>
            </nav>
            <div style={{ display: 'grid', gap: '28px', alignContent: 'start' }}>
              <div>
                <h4 className="mono">CONTACT</h4>
                <a className="lnk mono" href="mailto:hello@minibyte.ai">hello@minibyte.ai</a>
              </div>
              <div>
                <h4 className="mono">WEBSITE</h4>
                <span className="mono">minibyte.ai</span>
              </div>
              <div>
                <h4 className="mono">SOCIAL</h4>
                <ul className="mono" style={{ display: 'flex', gap: '22px', flexWrap: 'wrap' }}>
                  <li>
                    <a className="lnk" href="https://www.linkedin.com" rel="noopener">LINKEDIN</a>
                  </li>
                  <li>
                    <a className="lnk" href="https://x.com" rel="noopener">X</a>
                  </li>
                  <li>
                    <a className="lnk" href="https://github.com" rel="noopener">GITHUB</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="foot-word" aria-hidden="true">MINIBYTE</div>
          <div className="foot-bot mono">
            <span style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="bits drift" aria-hidden="true">
                <i className="z" style={{ '--k': '0' } as React.CSSProperties} />
                <i style={{ '--k': '1' } as React.CSSProperties} />
                <i style={{ '--k': '2' } as React.CSSProperties} />
                <i className="z" style={{ '--k': '3' } as React.CSSProperties} />
                <i style={{ '--k': '4' } as React.CSSProperties} />
                <i style={{ '--k': '5' } as React.CSSProperties} />
                <i className="z" style={{ '--k': '6' } as React.CSSProperties} />
                <i style={{ '--k': '7' } as React.CSSProperties} />
              </span>
              01101101
            </span>
            {' '}
            <span>THINKING IN BYTES</span>
            {' '}
            <span>© 2026 MINIBYTE</span>
          </div>
        </div>
      </footer>
      <HomeScript />
    </>
  );
}
