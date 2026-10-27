import ResearchScript from '@/components/ResearchScript';

export default function ResearchPage() {
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
                <a href="/research" data-sec="research" className="on" aria-current="page">
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
      <div className="rs-prog" id="prog" aria-hidden="true" />
      <main id="main">
        {/* HERO */}
        <section className="rs-hero ink" id="top" aria-labelledby="rsH">
          <svg className="rs-orbit" viewBox="0 0 1000 1000" aria-hidden="true" focusable="false">
            <circle className="r" cx="500" cy="500" r="480" />
            <circle className="r d" cx="500" cy="500" r="380" />
            <circle className="r" cx="500" cy="500" r="280" />
            <circle className="r d" cx="500" cy="500" r="180" />
            <g className="a">
              <circle className="n" cx="980" cy="500" r="5" />
              <circle className="n bl" cx="140" cy="840" r="7" />
            </g>
            <g className="b">
              <circle className="n" cx="500" cy="120" r="4" />
              <circle className="n" cx="770" cy="770" r="5" />
            </g>
            <g className="c">
              <circle className="n bl" cx="220" cy="500" r="5" />
              <circle className="n" cx="500" cy="680" r="4" />
            </g>
          </svg>
          <div className="wrap rs-hero-in">
            <div className="rs-copy">
              <nav className="rs-crumb mono rs-up" aria-label="Breadcrumb" style={{ '--i': '0' } as React.CSSProperties}>
                <a href="/" className="lnk">MINIBYTE</a>
                <span>/</span>
                <b aria-current="page">RESEARCH</b>
                <span>LAB NOTEBOOK</span>
              </nav>
              <h1 className="rs-h1 rs-up" id="rsH" style={{ '--i': '1' } as React.CSSProperties}>
                {'Big '}
                <span className="o">questions,</span>
                <br />
                small models.
              </h1>
              <p className="rs-hp rs-up" style={{ '--i': '2' } as React.CSSProperties}>
                Six research programmes, a public record of what we have published and released, and the standard every result has to meet before it reaches a customer.
              </p>
              <div className="rs-cta rs-up" style={{ '--i': '3' } as React.CSSProperties}>
                <a className="btn pri mag" href="#programmes">
                  {'Browse the programmes '}
                  <span className="ar">↓</span>
                </a>
                {' '}
                <a className="btn sec2 mag" href="#publications">Read the publications</a>
              </div>
            </div>
            <aside className="rs-q rs-corners rs-up cp-corners" style={{ '--i': '3' } as React.CSSProperties} aria-label="Open questions">
              <div className="top mono">
                <span>
                  {'OPEN QUESTION '}
                  <b id="qNo">01</b>
                  {' / 06'}
                </span>
                <span id="qSt">ONGOING</span>
              </div>
              <p className="rs-qt" id="qT" aria-live="polite" />
              <div className="rs-qbar" aria-hidden="true">
                <i id="qBar" />
              </div>
              <div className="rs-qm mono">
                <a className="lnk" id="qLink" href="#p-01">OPEN PROGRAMME →</a>
                <div className="rs-qd" id="qD" role="tablist" aria-label="Choose a question" />
              </div>
            </aside>
          </div>
          <div className="rs-marq mono" aria-label="Recent publications">
            <div className="rs-mt" id="marq" />
          </div>
        </section>
        {/* PROGRAMMES */}
        <section className="rs-sec paper" id="programmes" aria-labelledby="pgH">
          <div className="wrap">
            <header className="rs-sh">
              <div className="rs-eye mono" data-rv="">
                <b>01</b>
                <span>/ RESEARCH PROGRAMMES</span>
              </div>
              <h2 className="rs-h2" id="pgH" data-split="" data-rv="">
                One question
                <br />
                at a time.
              </h2>
              <p className="rs-lead" data-rv="">
                Each programme starts with a question we cannot yet answer. Open one to see why it matters, how we study it and what we have found so far.
              </p>
            </header>
            <div className="rs-pg" id="pgList" />
          </div>
        </section>
        {/* PUBLICATIONS */}
        <section className="rs-sec ink" id="publications" aria-labelledby="pbH">
          <div className="wrap">
            <header className="rs-sh">
              <div className="rs-eye mono" data-rv="">
                <b>02</b>
                <span>/ PUBLICATIONS</span>
              </div>
              <h2 className="rs-h2" id="pbH" data-split="" data-rv="">
                The public
                <br />
                <em>record.</em>
              </h2>
              <p className="rs-lead" data-rv="">
                Papers, preprints, reports and open datasets. Search, filter by type or programme, and open any entry for the abstract and a ready-made citation.
              </p>
            </header>
            <div className="rs-tb" role="search">
              <div className="rs-tbr">
                <label className="rs-search">
                  <span className="mono mut">SEARCH</span>
                  <input id="pbQ" type="search" placeholder="Title, author or keyword" autoComplete="off" />
                </label>
                <span className="rs-cnt mono" id="pbCnt" aria-live="polite" />
              </div>
              <div className="rs-tbr" id="pbType" role="group" aria-label="Filter by type">
                <span className="mono">TYPE</span>
              </div>
              <div className="rs-tbr" id="pbProg" role="group" aria-label="Filter by programme">
                <span className="mono">PROGRAMME</span>
              </div>
            </div>
            <div className="rs-tbl" id="pbList" />
            <p className="rs-empty mono" id="pbNone" hidden>NO PUBLICATIONS MATCH THESE FILTERS.</p>
            <p className="mono mut" style={{ marginTop: '18px', fontSize: '.6875rem' }}>ALL TITLES, AUTHORS AND ABSTRACTS ARE PLACEHOLDERS FOR THIS DESIGN.</p>
          </div>
        </section>
        {/* FEATURED STUDY */}
        <section className="rs-sec paper" id="study" aria-labelledby="stH">
          <div className="wrap rs-study">
            <aside className="rs-toc">
              <div className="rs-eye mono">
                <b>03</b>
                <span>/ FEATURED STUDY</span>
              </div>
              <ol className="mono" id="stToc" />
              <div className="rs-meta mono">
                <span>PROGRAMME P-01</span>
                <span>2026 / PAPER</span>
                <span>READING TIME 6 MIN</span>
              </div>
            </aside>
            <article className="rs-art">
              <p className="mono mut" style={{ marginBottom: '16px' }}>ILLUSTRATIVE STUDY, PLACEHOLDER CONTENT</p>
              <h2 id="stH" data-split="" data-rv="">
                Small models,
                <br />
                honest limits.
              </h2>
              <p className="rs-by mono">
                <span>L. BRANDT</span>
                <span>M. SATO</span>
                <span>A. OKOYE</span>
                <span>2026</span>
              </p>
              <div className="rs-abs cp-corners" data-rv="">
                <span className="mono mut">ABSTRACT</span>
                <p>
                  Compressing a model usually costs accuracy, and the cost is rarely reported where it matters: on data that has shifted since training. We compare standard compression with a shift-aware recipe across five model sizes and report where each stops being trustworthy.
                </p>
              </div>
              <section className="rs-sx" id="s1">
                <h3>
                  <span className="mono">01</span>
                  The question
                </h3>
                <p>
                  When a team compresses a model to fit a device, they usually test it on the same kind of data it was trained on. In the field the data drifts: new lighting, new sensors, a different season.
                  <sup>[1]</sup>
                  {' We asked how much of a model\'s accuracy survives both shrinking and shifting at once.'}
                </p>
              </section>
              <section className="rs-sx" id="s2">
                <h3>
                  <span className="mono">02</span>
                  Method
                </h3>
                <p>
                  We took five reference models and shrank each to 100, 50, 25, 12 and 6 percent of its original size. For every size we trained two versions: one with a standard recipe, one with a shift-aware recipe that distils from the full model under simulated drift.
                  <sup>[2]</sup>
                  {' Each result is the mean of five seeds, tested on held-out data from a different site.'}
                </p>
                <p className="rs-pq">Report the number the customer will actually experience.</p>
              </section>
              <section className="rs-sx" id="s3">
                <h3>
                  <span className="mono">03</span>
                  Results
                </h3>
                <figure className="rs-fig" id="stFig" data-rv="">
                  <div className="rs-lg mono">
                    <span className="a">
                      <i />
                      STANDARD RECIPE
                    </span>
                    <span className="b">
                      <i />
                      SHIFT-AWARE RECIPE
                    </span>
                  </div>
                  <svg id="stSvg" viewBox="0 0 640 330" role="img" aria-label="Grouped bar chart of accuracy under data shift at five model sizes. Standard recipe: 92, 88, 79, 64 and 46 percent. Shift-aware recipe: 92, 90, 86, 79 and 68 percent." />
                  <figcaption className="mono">FIG. 1 / ACCURACY UNDER DATA SHIFT BY MODEL SIZE / ILLUSTRATIVE, NOT MEASURED DATA</figcaption>
                </figure>
                <p>
                  At full size the two recipes agree. The gap opens as the model shrinks: at a quarter of the original size the shift-aware version keeps seven points more accuracy, and at six percent it keeps twenty-two.
                </p>
              </section>
              <section className="rs-sx" id="s4">
                <h3>
                  <span className="mono">04</span>
                  Limits
                </h3>
                <ul className="rs-lim">
                  <li>
                    <span className="mono">L1</span>
                    Only one type of shift was simulated. Sensor failure and adversarial change are untested.
                  </li>
                  <li>
                    <span className="mono">L2</span>
                    Five seeds give a rough interval, not a tight one.
                  </li>
                  <li>
                    <span className="mono">L3</span>
                    Results come from vision models and may not transfer to speech or language.
                  </li>
                </ul>
              </section>
              <section className="rs-sx" id="s5">
                <h3>
                  <span className="mono">05</span>
                  What happens next
                </h3>
                <p>
                  We are extending the study to speech models, adding sensor-failure shifts, and releasing the evaluation harness so others can reproduce the numbers.
                  <sup>[3]</sup>
                </p>
              </section>
            </article>
          </div>
        </section>
        {/* STANDARD */}
        <section className="rs-sec ink" id="standard" aria-labelledby="sdH">
          <div className="wrap">
            <header className="rs-sh">
              <div className="rs-eye mono" data-rv="">
                <b>04</b>
                <span>/ THE STANDARD</span>
              </div>
              <h2 className="rs-h2" id="sdH" data-split="" data-rv="">
                Six rules
                <br />
                every result
                <br />
                <em>must pass.</em>
              </h2>
              <p className="rs-lead" data-rv="">
                A result that has not passed all six does not reach a customer, and does not go in a paper.
              </p>
            </header>
            <div className="rs-sd" id="sdList" />
          </div>
        </section>
        {/* RELEASES */}
        <section className="rs-sec paper" id="releases" aria-labelledby="rlH">
          <div className="wrap">
            <header className="rs-sh">
              <div className="rs-eye mono" data-rv="">
                <b>05</b>
                <span>/ OPEN RELEASES</span>
              </div>
              <h2 className="rs-h2" id="rlH" data-split="" data-rv="">
                Tools and data
                <br />
                we give away.
              </h2>
              <p className="rs-lead" data-rv="">
                When the work allows it, we release the harness and the data behind a result so others can check it.
              </p>
            </header>
            <div className="rs-rl" id="rlList" />
            <p className="mono mut" style={{ marginTop: '18px', fontSize: '.6875rem' }}>PLACEHOLDER PACKAGE NAMES AND COMMANDS, NOT REAL RELEASES.</p>
          </div>
        </section>
        {/* COLLABORATE */}
        <section className="rs-sec ink" id="contact" aria-labelledby="coH">
          <div className="wrap">
            <header className="rs-sh">
              <div className="rs-eye mono" data-rv="">
                <b>06</b>
                <span>/ WORK WITH THE LAB</span>
              </div>
              <h2 className="rs-h2" id="coH" data-split="" data-rv="">
                Bring us
                <br />
                {'a hard '}
                <em>question.</em>
              </h2>
              <p className="rs-lead" data-rv="">
                We collaborate with universities, industry labs and teams with a problem nobody has solved yet.
              </p>
            </header>
            <div className="rs-co" data-rv="">
              <div>
                <span className="n mono">A</span>
                <h3>Joint research</h3>
                <p>Share a question and a dataset. We design the study together and publish what we learn.</p>
              </div>
              <div>
                <span className="n mono">B</span>
                <h3>Academic partnerships</h3>
                <p>
                  Co-supervised projects, visiting researchers and shared benchmarks with university groups.
                </p>
              </div>
              <div>
                <span className="n mono">C</span>
                <h3>Residencies</h3>
                <p>Three to six months embedded with a programme, working on a question of your choosing.</p>
              </div>
            </div>
            <div className="rs-mail" data-rv="">
              <div className="row">
                <span id="mailTxt">hello@minibyte.ai</span>
                <button type="button" className="cp" id="copyMail">COPY</button>
              </div>
              <a className="btn pri mag" href="mailto:hello@minibyte.ai?subject=Research%20collaboration">
                {'Start a conversation '}
                <span className="ar">→</span>
              </a>
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
      <ResearchScript />
    </>
  );
}
