import CapabilitiesScript from '@/components/CapabilitiesScript';

export default function CapabilitiesPage() {
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
      <nav className="cp-rail" aria-label="Page sections">
        <ol id="rail">
          <li>
            <a href="#top" data-s="top">
              <i />
              <span>A / OVERVIEW</span>
            </a>
          </li>
          <li>
            <a href="#explorer" data-s="explorer">
              <i />
              <span>B / EXPLORER</span>
            </a>
          </li>
          <li>
            <a href="#method" data-s="method">
              <i />
              <span>C / METHOD</span>
            </a>
          </li>
          <li>
            <a href="#depth" data-s="depth">
              <i />
              <span>D / DEPTH</span>
            </a>
          </li>
          <li>
            <a href="#tooling" data-s="tooling">
              <i />
              <span>E / TOOLING</span>
            </a>
          </li>
          <li>
            <a href="#standards" data-s="standards">
              <i />
              <span>F / STANDARDS</span>
            </a>
          </li>
          <li>
            <a href="#contact" data-s="contact">
              <i />
              <span>G / BRIEF</span>
            </a>
          </li>
        </ol>
      </nav>
      <main id="main">
        {/* A HERO */}
        <section className="cp-hero paper" id="top" aria-labelledby="cpH">
          <div className="wrap cp-hero-in">
            <div className="cp-hero-copy">
              <nav className="cp-crumb mono cp-up" aria-label="Breadcrumb" style={{ '--i': '0' } as React.CSSProperties}>
                <a href="/" className="lnk">MINIBYTE</a>
                <span>/</span>
                <b aria-current="page">CAPABILITIES</b>
                <span>REV 2026.10</span>
              </nav>
              <h1 className="cp-h1 cp-up" id="cpH" style={{ '--i': '1' } as React.CSSProperties}>
                Eight disciplines,
                <br />
                {'one '}
                <u>engineering</u>
                <br />
                standard.
              </h1>
              <p className="cp-hero-p cp-up" style={{ '--i': '2' } as React.CSSProperties}>
                Every system we ship stacks four layers: it perceives, reasons, acts and runs on real hardware. Pick a layer to see what sits in it.
              </p>
              <div className="cp-cta cp-up" style={{ '--i': '3' } as React.CSSProperties}>
                <a className="btn pri mag" href="#explorer">
                  {'Explore the capabilities '}
                  <span className="ar">↓</span>
                </a>
                {' '}
                <a className="btn sec2 mag" href="#contact">Brief a capability</a>
              </div>
            </div>
            <div className="cp-iso-w cp-up" style={{ '--i': '2' } as React.CSSProperties}>
              <div className="cp-iso" id="iso" role="group" aria-label="Capability layer stack">
                <div className="cp-iso-s" id="isoS" />
              </div>
              <ol className="cp-leg" id="isoLeg" />
            </div>
          </div>
          <div className="wrap">
            <dl className="cp-facts mono cp-up" style={{ '--i': '4' } as React.CSSProperties}>
              <div>
                <dt>DISCIPLINES</dt>
                <dd>08</dd>
              </div>
              <div>
                <dt>LAYERS</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>CASE FILES</dt>
                <dd>10</dd>
              </div>
              <div>
                <dt>TYPICAL FIRST PROTOTYPE</dt>
                <dd>6 WK</dd>
              </div>
            </dl>
            <p className="mono mut" style={{ padding: '12px 0 28px', fontSize: '.6875rem' }}>ALL FIGURES ARE PLACEHOLDERS</p>
          </div>
        </section>
        {/* B EXPLORER */}
        <section className="cp-sec cp-ex ink" id="explorer" aria-labelledby="exH">
          <div className="wrap">
            <header className="cp-sh">
              <div className="cp-eyebrow mono" data-rv="">
                <b>B</b>
                <span>/ CAPABILITY EXPLORER</span>
              </div>
              <h2 className="cp-h2" id="exH" data-split="" data-rv="">
                Choose a discipline.
                <br />
                <em>Read the spec.</em>
              </h2>
              <p className="cp-lead" data-rv="">
                Each entry lists what we do, what you receive, the tools we reach for, how deep we go and where it has already run.
              </p>
            </header>
            <div className="cp-ex-g">
              <div className="cp-list" id="cpList" role="tablist" aria-orientation="vertical" aria-label="Capabilities" />
              <article className="cp-panel cp-corners" id="cpPanel" role="tabpanel" aria-live="polite" tabIndex={-1} />
            </div>
          </div>
        </section>
        {/* C METHOD */}
        <section className="cp-sec paper" id="method" aria-labelledby="mtH">
          <div className="wrap">
            <header className="cp-sh">
              <div className="cp-eyebrow mono" data-rv="">
                <b>C</b>
                <span>/ HOW WORK MOVES</span>
              </div>
              <h2 className="cp-h2" id="mtH" data-split="" data-rv="">
                From a question
                <br />
                <em>to a running system.</em>
              </h2>
              <p className="cp-lead" data-rv="">
                Six stages, each ending in a gate question that someone on your side signs off before we spend the next week.
              </p>
            </header>
            <div className="cp-mt" id="cpMt" data-rv="" />
          </div>
        </section>
        {/* D DEPTH */}
        <section className="cp-sec ink" id="depth" aria-labelledby="dpH">
          <div className="wrap cp-dp">
            <div>
              <div className="cp-eyebrow mono" data-rv="">
                <b>D</b>
                <span>/ DEPTH PROFILE</span>
              </div>
              <h2 className="cp-h2" id="dpH" data-split="" data-rv="" style={{ marginTop: 'clamp(18px,2.4vw,30px)' }}>
                Where we go
                <br />
                <em>deepest.</em>
              </h2>
              <div className="cp-lens" role="group" aria-label="Lens" id="cpLens">
                <button type="button" data-v="0" aria-pressed="true">RESEARCH</button>
                {' '}
                <button type="button" data-v="1" aria-pressed="false">ENGINEERING</button>
                {' '}
                <button type="button" data-v="2" aria-pressed="false">OPERATIONS</button>
              </div>
              <p className="cp-lead" id="cpLensD" aria-live="polite" />
              <ol className="cp-rank mono" id="cpRank" />
              <p className="mono mut" style={{ marginTop: '14px', fontSize: '.6875rem' }}>SELF-ASSESSED SCORES OUT OF 10, PLACEHOLDER VALUES</p>
            </div>
            <svg className="cp-radar" id="cpRadar" viewBox="-310 -300 620 600" role="img" aria-label="Radar chart of capability depth across eight disciplines" />
          </div>
        </section>
        {/* E TOOLING */}
        <section className="cp-sec paper" id="tooling" aria-labelledby="tlH">
          <div className="wrap">
            <header className="cp-sh">
              <div className="cp-eyebrow mono" data-rv="">
                <b>E</b>
                <span>/ TOOLING</span>
              </div>
              <h2 className="cp-h2" id="tlH" data-split="" data-rv="">
                What we reach for,
                <br />
                <em>and what we build.</em>
              </h2>
              <p className="cp-lead" data-rv="">We start from your stack where we can. These are the tools we use most often.</p>
            </header>
            <div className="cp-tb" id="cpTb" />
            <p className="cp-note mono" style={{ fontSize: '.6875rem' }}>REPRESENTATIVE, NOT EXHAUSTIVE. PLACEHOLDER LIST FOR THIS DESIGN.</p>
          </div>
        </section>
        {/* F STANDARDS + FAQ */}
        <section className="cp-sec paper" id="standards" aria-labelledby="sfH" style={{ paddingTop: '0' }}>
          <div className="wrap cp-sf">
            <div>
              <div className="cp-eyebrow mono" data-rv="">
                <b>F</b>
                <span>/ STANDARDS</span>
              </div>
              <h2 className="cp-h2" id="sfH" data-split="" data-rv="" style={{ marginTop: 'clamp(18px,2.4vw,30px)' }}>
                How we hold
                <br />
                <em>the work.</em>
              </h2>
              <ol className="cp-std" id="cpStd" />
            </div>
            <div>
              <div className="cp-eyebrow mono" data-rv="" style={{ marginBottom: 'clamp(18px,2.4vw,30px)' }}>
                <span>COMMON QUESTIONS</span>
              </div>
              <div className="cp-faq" id="cpFaq" data-rv="" />
            </div>
          </div>
        </section>
        {/* G BRIEF */}
        <section className="cp-sec ink" id="contact" aria-labelledby="bfH">
          <div className="wrap cp-bf">
            <div className="cp-bf-l">
              <div className="cp-eyebrow mono" data-rv="">
                <b>G</b>
                <span>/ BRIEF</span>
              </div>
              <h2 className="cp-h2" id="bfH" data-split="" data-rv="">
                Scope a
                <br />
                capability.
              </h2>
              <p className="cp-lead" data-rv="">
                Choose what you need and we will draft the first message for you. It opens in your own email app, so nothing is sent until you send it.
              </p>
              <div className="cp-mail" data-rv="">
                <span className="mono mut">OR WRITE DIRECTLY</span>
                <div className="row">
                  <span id="mailTxt">hello@minibyte.ai</span>
                  <button type="button" id="copyMail">COPY</button>
                </div>
                <span className="mono mut" style={{ fontSize: '.6875rem' }}>WE ANSWER WITHIN TWO WORKING DAYS</span>
              </div>
            </div>
            <form className="cp-form cp-corners" id="cpForm" aria-label="Capability brief">
              <fieldset>
                <legend className="mono">
                  <span>01 / CAPABILITIES</span>
                  <span id="cpCount">0 SELECTED</span>
                </legend>
                <div className="cp-chips" id="cpChips" />
              </fieldset>
              <fieldset>
                <legend className="mono">
                  <span>02 / WHERE ARE YOU NOW</span>
                </legend>
                <div className="cp-chips" id="cpStage">
                  <label>
                    <input type="radio" name="stage" value="Exploring an idea" defaultChecked />
                    <span>Exploring an idea</span>
                  </label>
                  {' '}
                  <label>
                    <input type="radio" name="stage" value="Prototype exists" />
                    <span>Prototype exists</span>
                  </label>
                  {' '}
                  <label>
                    <input type="radio" name="stage" value="Running in production" />
                    <span>Running in production</span>
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <legend className="mono">
                  <span>03 / TIMEFRAME</span>
                </legend>
                <div className="cp-chips" id="cpTime">
                  <label>
                    <input type="radio" name="time" value="Under 3 months" />
                    <span>Under 3 months</span>
                  </label>
                  {' '}
                  <label>
                    <input type="radio" name="time" value="3 to 6 months" />
                    <span>3 to 6 months</span>
                  </label>
                  {' '}
                  <label>
                    <input type="radio" name="time" value="6 months or more" />
                    <span>6 months or more</span>
                  </label>
                  {' '}
                  <label>
                    <input type="radio" name="time" value="Not sure yet" defaultChecked />
                    <span>Not sure yet</span>
                  </label>
                </div>
              </fieldset>
              <div className="cp-two">
                <div className="cp-f">
                  <label className="mono" htmlFor="bfName">YOUR NAME</label>
                  <input id="bfName" type="text" autoComplete="name" placeholder="Optional" />
                </div>
                <div className="cp-f">
                  <label className="mono" htmlFor="bfOrg">ORGANISATION</label>
                  <input id="bfOrg" type="text" autoComplete="organization" placeholder="Optional" />
                </div>
              </div>
              <div className="cp-f">
                <label className="mono" htmlFor="bfGoal">WHAT ARE YOU TRYING TO ACHIEVE</label>
                <textarea id="bfGoal" rows={3} placeholder="A sentence or two is plenty" />
              </div>
              <div>
                <span className="mono mut" style={{ display: 'block', marginBottom: '10px' }}>PREVIEW</span>
                <pre className="cp-pre" id="briefPre" aria-live="polite" />
              </div>
              <div className="cp-act">
                <a className="btn pri mag" id="briefSend" href="mailto:hello@minibyte.ai">
                  {'Open in email '}
                  <span className="ar">→</span>
                </a>
                {' '}
                <button className="btn sec2" type="button" id="briefCopy">Copy brief</button>
              </div>
            </form>
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
      <CapabilitiesScript />
    </>
  );
}
