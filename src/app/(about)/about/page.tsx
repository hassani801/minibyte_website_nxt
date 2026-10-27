import AboutScript from '@/components/AboutScript';

export default function AboutPage() {
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
                <a href="/work" data-sec="work">
                  <i>01</i>
                  WORK
                </a>
              </li>
              <li>
                <a href="/capabilities" data-sec="capabilities">
                  <i>02</i>
                  CAPABILITIES
                </a>
              </li>
              <li>
                <a href="/research" data-sec="research">
                  <i>03</i>
                  RESEARCH
                </a>
              </li>
              <li>
                <a href="/about" data-sec="about" className="on" aria-current="page">
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
        {/* MANIFESTO */}
        <section className="ab-hero ink" id="top" aria-labelledby="abH">
          <div className="ab-pin">
            <div className="wrap ab-hin">
              <h1 className="sr" id="abH">About Minibyte</h1>
              <nav className="ab-crumb mono ab-up" aria-label="Breadcrumb" style={{ '--i': '0' } as React.CSSProperties}>
                <a href="/" className="lnk">MINIBYTE</a>
                <span>/</span>
                <b aria-current="page">ABOUT</b>
                <span>MANIFESTO</span>
              </nav>
              <p className="ab-m ab-up" id="abM" style={{ '--i': '1' } as React.CSSProperties} data-t="We are an AI research lab for the physical world. We believe intelligence should not stay on a screen. It should [perceive, reason, adapt and act] in the places where work really happens. So we ask hard questions, build small models, and ship systems that keep running after we leave.">
                We are an AI research lab for the physical world. We believe intelligence should not stay on a screen. It should perceive, reason, adapt and act in the places where work really happens. So we ask hard questions, build small models, and ship systems that keep running after we leave.
              </p>
              <div className="ab-cue mono ab-up" id="abCue" style={{ '--i': '3' } as React.CSSProperties}>
                <i aria-hidden="true" />
                <span>SCROLL TO READ</span>
              </div>
            </div>
          </div>
        </section>
        {/* STORY */}
        <section className="ab-sec paper" id="story" aria-labelledby="stH">
          <div className="wrap ab-st">
            <div className="ab-sticky">
              <div className="ab-eye mono" data-rv="">
                <b>01</b>
                <span>/ OUR STORY</span>
              </div>
              <h2 className="ab-h2" id="stH" data-split="" data-rv="">
                How we
                <br />
                got here.
              </h2>
              <div className="ab-yr" id="abYr" aria-hidden="true">2023</div>
              <p className="mono mut" style={{ fontSize: '.6875rem' }}>PLACEHOLDER HISTORY FOR THIS DESIGN</p>
            </div>
            <div id="abEv" />
          </div>
        </section>
        {/* BELIEFS */}
        <section className="ab-sec ink" id="beliefs" aria-labelledby="blH">
          <div className="wrap">
            <header className="ab-sh">
              <div className="ab-eye mono" data-rv="">
                <b>02</b>
                <span>/ WHAT WE BELIEVE</span>
              </div>
              <h2 className="ab-h2" id="blH" data-split="" data-rv="">
                Five ideas
                <br />
                <em>we build on.</em>
              </h2>
              <p className="ab-lead" data-rv="">
                Hover or tap a panel. These are the ideas we argue about, and the ones that settle the argument.
              </p>
            </header>
            <div className="ab-bl" id="abBl" />
          </div>
        </section>
        {/* TEAMS */}
        <section className="ab-sec paper" id="teams" aria-labelledby="tmH">
          <div className="wrap">
            <header className="ab-sh">
              <div className="ab-eye mono" data-rv="">
                <b>03</b>
                <span>/ HOW WE ARE ORGANISED</span>
              </div>
              <h2 className="ab-h2" id="tmH" data-split="" data-rv="">
                Three teams,
                <br />
                <em>one loop.</em>
              </h2>
              <p className="ab-lead" data-rv="">
                Research asks, engineering builds, the field tells us the truth. Choose a team to see what it does and what it hands on.
              </p>
            </header>
            <div className="ab-lp">
              <div className="ab-loop" id="abLoop" />
              <div className="ab-tp" id="abTp" aria-live="polite" />
            </div>
          </div>
        </section>
        {/* PEOPLE */}
        <section className="ab-sec ink" id="people" aria-labelledby="pplH">
          <div className="wrap">
            <header className="ab-sh">
              <div className="ab-eye mono" data-rv="">
                <b>04</b>
                <span>/ PEOPLE</span>
              </div>
              <h2 className="ab-h2" id="pplH" data-split="" data-rv="">
                Built by people
                <br />
                <em>who think in systems.</em>
              </h2>
              <p className="ab-lead" data-rv="">
                Researchers, engineers and field specialists who each own a programme from the first question to the last deployment.
              </p>
            </header>
            <div className="ab-rs" id="abRs" />
            <div className="ab-more mono">
              <span>AND 24 OTHERS ACROSS RESEARCH, ENGINEERING AND FIELD</span>
              <span>PLACEHOLDER NAMES, ROLES AND PORTRAITS</span>
            </div>
          </div>
        </section>
        {/* JOIN */}
        <section className="ab-sec paper" id="join" aria-labelledby="jnH">
          <div className="wrap ab-jn">
            <div className="ab-jn-l">
              <div className="ab-eye mono" data-rv="">
                <b>05</b>
                <span>/ JOIN THE LAB</span>
              </div>
              <h2 className="ab-h2" id="jnH" data-split="" data-rv="">
                Work on
                <br />
                hard things.
              </h2>
              <ul className="ab-cul" id="abCul" />
            </div>
            <div>
              <div className="ab-eye mono" style={{ marginBottom: '18px' }}>
                <span>OPEN ROLES</span>
                <span>PLACEHOLDER LISTINGS</span>
              </div>
              <div className="ab-rl" id="abRl" />
            </div>
          </div>
        </section>
        {/* CONTACT */}
        <section className="ab-sec ink" id="contact" aria-labelledby="ctH">
          <div className="wrap">
            <header className="ab-sh" style={{ marginBottom: '0' }}>
              <div className="ab-eye mono" data-rv="">
                <b>06</b>
                <span>/ CONTACT</span>
              </div>
              <h2 className="ab-h2" id="ctH" data-split="" data-rv="">Say hello.</h2>
              <p className="ab-lead" data-rv="">Tell us what you are trying to do. A person will reply, usually within two working days.</p>
            </header>
            <div className="ab-ct" data-rv="">
              <div>
                <span className="t mono">GENERAL AND PROJECTS</span>
                <span className="big" id="mailTxt">hello@minibyte.ai</span>
                <button type="button" className="cp" id="copyMail">COPY</button>
                <p>New projects, partnerships and general questions.</p>
              </div>
              <div>
                <span className="t mono">RESEARCH</span>
                <a className="big" href="/research#contact">Collaborate with the lab →</a>
                <p>Joint studies, academic partnerships and residencies.</p>
              </div>
              <div>
                <span className="t mono">STUDIO</span>
                <span className="big">Placeholder city, country</span>
                <p>Visits by appointment. Address and opening details to be added.</p>
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
      <AboutScript />
    </>
  );
}
