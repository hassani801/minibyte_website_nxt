import WorkScript from '@/components/WorkScript';

export default function WorkPage() {
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
      <div id="curtain" aria-hidden="true">
        <span className="bits">
          <i className="z" />
          <i />
          <i />
          <i className="z" />
          <i />
          <i />
          <i className="z" />
          <i />
        </span>
      </div>
      <div className="cur-dot" id="curDot" aria-hidden="true" />
      <div className="cur-ring" id="curRing" aria-hidden="true">
        <span id="curLbl" />
      </div>
      <div className="svc-pv" id="wkPv" aria-hidden="true">
        <img id="wkImg" alt="" />
      </div>
      <div className="pd" id="pd" role="dialog" aria-modal="true" aria-labelledby="pdTitle" aria-hidden="true" inert>
        <div className="pd-bar">
          <span className="pd-pos mono">
            <i aria-hidden="true" />
            <span id="pdPos">PROJECT 01 / 10</span>
          </span>
          <div className="pd-nav">
            <button type="button" id="pdPrev" aria-label="Previous project">
              ←
              <span className="lb">{' PREV'}</span>
            </button>
            {' '}
            <button type="button" id="pdNext" aria-label="Next project">
              <span className="lb">{'NEXT '}</span>
              →
            </button>
            {' '}
            <button type="button" id="pdClose">CLOSE ✕</button>
          </div>
        </div>
        <div className="pd-scroll" id="pdScroll" tabIndex={-1}>
          <div className="pd-body" id="pdBody" />
        </div>
      </div>
      <header className="hdr" id="hdr">
        <div className="hdr-in">
          <a className="brand" href="/" aria-label="Minibyte, home">
            <svg className="logo" aria-hidden="true">
              <use href="#logo" />
            </svg>
            <span className="bn">
              <b>MINIBYTE</b>
              <small>AI RESEARCH LAB</small>
            </span>
          </a>
          <nav className="nav" aria-label="Primary">
            <ul>
              <li>
                <a href="/work" data-sec="work" className="on" aria-current="page">
                  <i>01</i>
                  WORK
                </a>
              </li>
              <li>
                <a href="/capabilities">
                  <i>02</i>
                  CAPABILITIES
                </a>
              </li>
              <li>
                <a href="/research">
                  <i>03</i>
                  RESEARCH
                </a>
              </li>
              <li>
                <a href="/about">
                  <i>04</i>
                  ABOUT
                </a>
              </li>
              <li>
                <a href="#contact">
                  <i>05</i>
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>
          <div className="status" aria-label="System status">
            <i />
            SYSTEM ONLINE
          </div>
          <button className="mbtn" id="mbtn" aria-expanded="false" aria-controls="menu">MENU</button>
        </div>
      </header>
      <div id="menu" aria-hidden="true" inert>
        <ol>
          <li>
            <a href="/work">
              <i>01</i>
              Work
            </a>
          </li>
          <li>
            <a href="/capabilities">
              <i>02</i>
              Capabilities
            </a>
          </li>
          <li>
            <a href="/research">
              <i>03</i>
              Research
            </a>
          </li>
          <li>
            <a href="/about">
              <i>04</i>
              About
            </a>
          </li>
          <li>
            <a href="#contact">
              <i>05</i>
              Contact
            </a>
          </li>
        </ol>
        <div className="menu-foot mono">
          <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <i className="pulse" style={{ display: 'block', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--blue)' }} />
            SYSTEM ONLINE
          </span>
          {' '}
          <span>hello@minibyte.ai</span>
          {' '}
          <span>01101101 / THINKING IN BYTES</span>
        </div>
      </div>
      <main id="main">
        {/* HERO */}
        <section className="wh ink" id="top" aria-labelledby="whH">
          <div className="wrap wh-in">
            <div className="wh-copy">
              <nav className="crumb mono wh-r" aria-label="Breadcrumb" style={{ '--i': '0' } as React.CSSProperties}>
                <a href="/" className="lnk">MINIBYTE</a>
                <span>/</span>
                <b aria-current="page">WORK</b>
                <span>10 CASE FILES</span>
              </nav>
              <h1 className="wh-h" id="whH">
                <span className="wl wh-r" style={{ '--i': '1' } as React.CSSProperties}>Research</span>
                <span className="wl dim wh-r" style={{ '--i': '2' } as React.CSSProperties}>that ships.</span>
              </h1>
              <p className="wh-p wh-r" style={{ '--i': '3' } as React.CSSProperties}>
                Ten case files across research and software development. For each one: why we built it, how it was made, how long it took and how it performed.
              </p>
              <div className="ctas wh-r" style={{ '--i': '4' } as React.CSSProperties}>
                <a className="btn pri mag" href="#projects">
                  {'Browse all projects '}
                  <span className="ar">↓</span>
                </a>
                {' '}
                <a className="btn sec2 mag" href="#contact">Start a conversation</a>
              </div>
            </div>
            <div className="wh-show wh-r" style={{ '--i': '3' } as React.CSSProperties}>
              <div className="sc" id="sc">
                <div className="sc-frame" id="scFrame" data-cursor="project">
                  <div className="sc-imgs" id="scImgs" />
                  <div className="sc-top mono">
                    <span id="scNo">FEATURED 01 / 10</span>
                    <span className="pill mono live" id="scPill">
                      <i />
                      <b>IN OPERATION</b>
                    </span>
                  </div>
                  <div className="sc-bot" id="scBot">
                    <div className="sc-t" id="scTitle">Intelligent Operations</div>
                    <div className="sc-cat mono" id="scCat">
                      AI &amp; AUTOMATION
                    </div>
                    <button className="sc-open mono" type="button" id="scOpen">
                      {'OPEN CASE FILE '}
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                  <i className="sc-bar" id="scBar" />
                </div>
                <div className="sc-dots" id="scDots" role="tablist" aria-label="Featured projects" />
              </div>
            </div>
          </div>
          <div className="wrap">
            <dl className="wh-stats wh-r" style={{ '--i': '5' } as React.CSSProperties}>
              <div>
                <dt className="mono">CASE FILES</dt>
                <dd data-count="10" data-pad="2">10</dd>
              </div>
              <div>
                <dt className="mono">DISCIPLINES</dt>
                <dd data-count="7" data-pad="2">07</dd>
              </div>
              <div>
                <dt className="mono">RUNNING IN THE FIELD</dt>
                <dd data-count="3" data-pad="2">03</dd>
              </div>
              <div>
                <dt className="mono">NOTE</dt>
                <dd className="note">Counts describe the placeholder projects on this page.</dd>
              </div>
            </dl>
          </div>
        </section>
        {/* 6 CASE STUDY */}
        <section className="case ink" id="case" aria-labelledby="caseH">
          <div className="case-pin">
            <div className="wrap case-in">
              <div className="case-l">
                <div className="lbl mono">
                  <i />
                  <span>
                    <b>FEATURED CASE STUDY</b>
                    {' / PROJECT 01'}
                  </span>
                </div>
                <h2 id="caseH">Intelligent operations</h2>
                <p className="body">
                  Coordinated AI agents that run an industrial site's workflows around the clock, with people directing the system instead of chasing it.
                </p>
                <button type="button" className="lnk mono" data-open="0" style={{ justifySelf: 'start' }}>OPEN FULL CASE FILE →</button>
                <div className="ticks" id="ticks" aria-hidden="true">
                  <i className="on" />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <p className="mono mut" id="stageName">STAGE 01 / IMAGE</p>
              </div>
              <div className="stage-wrap" id="stages">
                <div className="stage" data-st="0">
                  <div className="st-t mono">
                    <span>01 / THE SITE</span>
                    <span>PLACEHOLDER IMAGE</span>
                  </div>
                  <div className="ph">
                    <img data-kind="arm" data-w="1100" data-h="700" data-seed="21" data-tint="0.5" alt="Placeholder image of an industrial robotic arm in a dark laboratory" width="1100" height="700" />
                  </div>
                </div>
                <div className="stage" data-st="1">
                  <div className="st-t mono">
                    <span>02 / TECHNICAL SPECIFICATION</span>
                    <span>PLACEHOLDER VALUES</span>
                  </div>
                  <dl className="specs">
                    <div>
                      <dt className="mono">DOMAIN</dt>
                      <dd>Industrial logistics operations</dd>
                    </div>
                    <div>
                      <dt className="mono">APPROACH</dt>
                      <dd>Multi-agent orchestration, edge first</dd>
                    </div>
                    <div>
                      <dt className="mono">SENSING</dt>
                      <dd>Camera, lidar and inertial arrays</dd>
                    </div>
                    <div>
                      <dt className="mono">COMPUTE</dt>
                      <dd>On-site edge modules, cloud for coordination</dd>
                    </div>
                    <div>
                      <dt className="mono">DEPLOYMENT</dt>
                      <dd>Continuous, supervised by operators</dd>
                    </div>
                    <div>
                      <dt className="mono">DURATION</dt>
                      <dd>One research phase, one build phase</dd>
                    </div>
                  </dl>
                </div>
                <div className="stage" data-st="2">
                  <div className="st-t mono">
                    <span>03 / SYSTEM ARCHITECTURE</span>
                    <span>SIGNAL FLOW</span>
                  </div>
                  <svg className="arch" id="arch" viewBox="0 0 800 380" role="img" aria-label="Architecture diagram: sensors feed an edge inference node, then an agent orchestrator, then workflows, robots and operators.">
                    <g>
                      <rect x="0" y="30" width="170" height="64" />
                      <text x="14" y="66">CAMERA ARRAY</text>
                      <rect x="0" y="158" width="170" height="64" />
                      <text x="14" y="194">LIDAR</text>
                      <rect x="0" y="286" width="170" height="64" />
                      <text x="14" y="322">INERTIAL / IOT</text>
                      <rect className="hot" x="250" y="130" width="150" height="120" />
                      <text x="266" y="186">EDGE</text>
                      <text x="266" y="204">INFERENCE</text>
                      <rect className="hot" x="470" y="130" width="150" height="120" />
                      <text x="486" y="186">AGENT</text>
                      <text x="486" y="204">ORCHESTRATOR</text>
                      <rect x="680" y="30" width="120" height="64" />
                      <text x="692" y="66">WORKFLOWS</text>
                      <rect x="680" y="158" width="120" height="64" />
                      <text x="692" y="194">ROBOTS</text>
                      <rect x="680" y="286" width="120" height="64" />
                      <text x="692" y="322">OPERATORS</text>
                      <path d="M170 62 L250 170 M170 190 L250 190 M170 318 L250 210 M400 190 L470 190 M620 170 L680 62 M620 190 L680 190 M620 210 L680 318" />
                      <path id="archPath" d="M170 190 L250 190 L400 190 L470 190 L620 190 L680 190" style={{ stroke: 'rgba(70,84,255,.6)', strokeDasharray: '3 5' }} />
                      <circle className="sig" r="5">
                        <animateMotion dur="3.6s" repeatCount="indefinite" path="M170 190 L250 190 L400 190 L470 190 L620 190 L680 190" />
                      </circle>
                    </g>
                  </svg>
                </div>
                <div className="stage" data-st="3">
                  <div className="st-t mono">
                    <span>04 / PERFORMANCE</span>
                    <span>ILLUSTRATIVE, REPLACE WITH PROJECT DATA</span>
                  </div>
                  <div className="mets">
                    <div className="met">
                      <span className="mono mut">PROCESSING</span>
                      <b data-count="92" data-suffix="%">92%</b>
                    </div>
                    <div className="met">
                      <span className="mono mut">LATENCY</span>
                      <b data-count="38" data-prefix="↓ " data-suffix="%">↓ 38%</b>
                    </div>
                    <div className="met">
                      <span className="mono mut">AUTONOMY</span>
                      <b data-count="24" data-suffix=" / 7">24 / 7</b>
                    </div>
                  </div>
                </div>
                <div className="stage" data-st="4">
                  <div className="st-t mono">
                    <span>05 / OUTCOME</span>
                    <span>PLACEHOLDER COPY</span>
                  </div>
                  <p className="outcome">Operations that keep running, with people directing instead of chasing.</p>
                  <div>
                    <a className="btn pri mag" href="#contact">
                      {'Discuss a similar system '}
                      <span className="ar">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="case-pad" />
          </div>
        </section>
        {/* PROJECTS */}
        <section className="sec paper" id="projects" aria-labelledby="pjH">
          <div className="wrap">
            <div className="pj-head">
              <div className="l">
                <div className="lbl mono" data-rv="">
                  <i />
                  <span>
                    <b>ALL PROJECTS</b>
                  </span>
                </div>
                <h2 className="h2 m" id="pjH" data-split="" data-rv="">
                  Every system,
                  <br />
                  on file.
                </h2>
              </div>
              <p className="body" data-rv="">
                Filter by discipline, or switch to the index. Open any project for the brief, the architecture and the results.
              </p>
            </div>
            <div className="pj-bar" id="wkBar">
              <div className="flt mono" id="wkFlt" role="group" aria-label="Filter projects by discipline" />
              <div className="wk-end">
                <span className="wk-count mono" id="wkCount" aria-live="polite">SHOWING 10 / 10</span>
                <div className="vt mono" role="group" aria-label="Change view">
                  <button type="button" id="vGrid" aria-pressed="true">GRID</button>
                  <button type="button" id="vIdx" aria-pressed="false">INDEX</button>
                </div>
              </div>
            </div>
            <div className="pc-grid" id="pcGrid" />
            <div id="wkIdx" hidden>
              <div className="widx-h mono" aria-hidden="true">
                <span>NO.</span>
                <span>PROJECT</span>
                <span>DISCIPLINE</span>
                <span>YEAR</span>
                <span>STATUS</span>
                <span />
              </div>
              <ol className="widx" id="wkList" />
            </div>
            <p className="pc-note mono mut">Names, images and figures are placeholders until final case material is supplied.</p>
          </div>
        </section>
        {/* COVERAGE */}
        <section className="sec ink" id="coverage" aria-labelledby="cvH">
          <div className="wrap cv">
            <div className="cv-l">
              <div className="lbl mono" data-rv="">
                <i />
                <span>COVERAGE</span>
              </div>
              <h2 className="h2 m" id="cvH" data-split="" data-rv="">
                Where each
                <br />
                discipline
                <br />
                shows up.
              </h2>
              <p className="body" data-rv="">Most systems cross several disciplines. Choose a row to filter the projects above.</p>
            </div>
            <div className="cv-r">
              <div className="mx-w" data-rv="">
                <table className="mx" id="mx" />
              </div>
              <ol className="mx-key mono" id="mxKey" aria-label="Project key" />
            </div>
          </div>
        </section>
        {/* ENGAGEMENT */}
        <section className="sec paper" id="engage" aria-labelledby="engH">
          <div className="wrap">
            <div className="eng-head">
              <div className="lbl mono" data-rv="">
                <i />
                <span>WORKING WITH US</span>
              </div>
              <h2 className="h2 m" id="engH" data-split="" data-rv="">
                Three ways
                <br />
                to start.
              </h2>
            </div>
            <div className="eng">
              <div data-rv="">
                <span className="mono mut">MODEL / RESEARCH</span>
                <h3>Research partnership</h3>
                <p>
                  Open-ended investigation with measurable milestones. Best when the technical path is not yet known.
                </p>
                <ul className="mono">
                  <li>Feasibility report</li>
                  <li>Evaluation set</li>
                  <li>Prototype plan</li>
                </ul>
              </div>
              <div data-rv="" style={{ '--i': '1' } as React.CSSProperties}>
                <span className="mono mut">MODEL / VALIDATE</span>
                <h3>Prototype and validate</h3>
                <p>
                  A working system tested against your own data and environment before anything is committed.
                </p>
                <ul className="mono">
                  <li>Working prototype</li>
                  <li>Test results</li>
                  <li>Go or no-go review</li>
                </ul>
              </div>
              <div data-rv="" style={{ '--i': '2' } as React.CSSProperties}>
                <span className="mono mut">MODEL / OPERATE</span>
                <h3>Build and operate</h3>
                <p>Engineering, integration and monitored deployment, with handover to your team.</p>
                <ul className="mono">
                  <li>Production system</li>
                  <li>Monitoring and metrics</li>
                  <li>Handover</li>
                </ul>
              </div>
            </div>
            <p className="mono mut" style={{ marginTop: 'clamp(28px,4vw,48px)' }}>Placeholder copy. Replace with your actual engagement models.</p>
          </div>
        </section>
        {/* CTA */}
        <section className="sec ink wcta" id="contact" aria-labelledby="ctaH">
          <div className="wrap wcta-in">
            <div className="l">
              <span className="bits big drift" aria-hidden="true">
                <i className="z" style={{ '--k': '0' } as React.CSSProperties} />
                <i style={{ '--k': '1' } as React.CSSProperties} />
                <i style={{ '--k': '2' } as React.CSSProperties} />
                <i className="z" style={{ '--k': '3' } as React.CSSProperties} />
                <i style={{ '--k': '4' } as React.CSSProperties} />
                <i style={{ '--k': '5' } as React.CSSProperties} />
                <i className="z" style={{ '--k': '6' } as React.CSSProperties} />
                <i style={{ '--k': '7' } as React.CSSProperties} />
              </span>
              <h2 className="wcta-h" id="ctaH" data-split="" data-rv="">
                Have a similar
                <br />
                problem?
              </h2>
              <p className="lead" data-rv="">
                Tell us about the environment and the constraint. We will tell you whether research or engineering comes first.
              </p>
            </div>
            <div className="r" data-rv="">
              <div className="ctas">
                <a className="btn pri mag" href="mailto:hello@minibyte.ai">
                  {'Start a conversation '}
                  <span className="ar">→</span>
                </a>
                <a className="btn sec2 mag" href="/">Back to home</a>
              </div>
              <div className="mail mono">
                <span>OR WRITE TO</span>
                <code id="mailTxt">hello@minibyte.ai</code>
                <button className="copy" id="copyMail" type="button">COPY</button>
              </div>
            </div>
          </div>
        </section>
      </main>
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
      <WorkScript />
    </>
  );
}
