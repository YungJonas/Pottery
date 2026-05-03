// Main app for Lesley / Ceramics — modern brutalist pottery shop.

const { useState, useEffect, useMemo, useRef } = React;

// ─── Helpers ──────────────────────────────────────────────────────────
function VaseFor({ shape, fill, style, className }) {
  const C = window.Vase[shape] || window.Vase.Amphora;
  return <C fill={fill} style={style} className={className} />;
}

function fmt(n) { return "€" + n.toFixed(0); }

// ─── Top bar ──────────────────────────────────────────────────────────
function TopBar({ P, cartCount, onCartOpen, onJump }) {
  return (
    <header className="lp-top" style={{ background: P.bg, color: P.ink, borderColor: P.ink }}>
      <div className="lp-top-row">
        <button className="lp-mark" onClick={() => onJump("hero")}>
          <span className="lp-mark-glyph" style={{ color: P.terracotta }}>
            <window.Vase.Spiral fill={P.terracotta} size={28} />
          </span>
          <span className="lp-mark-word">LESLEY <span className="lp-slash">/</span> CERAMICS</span>
        </button>
        <nav className="lp-nav">
          <button onClick={() => onJump("shop")}>Shop</button>
          <button onClick={() => onJump("about")}>Studio</button>
          <button onClick={() => onJump("process")}>Process</button>
          <button onClick={() => onJump("journal")}>Journal</button>
        </nav>
        <div className="lp-top-right">
          <span className="lp-loc">BERLIN ⟶ 52.5°N</span>
          <button className="lp-cart-btn" onClick={onCartOpen} aria-label="Open bag">
            <span>BAG</span>
            <span className="lp-cart-pill" style={{ background: P.terracotta, color: P.paper }}>
              {cartCount.toString().padStart(2, "0")}
            </span>
          </button>
        </div>
      </div>
      <div className="lp-marquee" style={{ borderColor: P.ink }}>
        <div className="lp-marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>
              HAND-THROWN IN BERLIN-NEUKÖLLN <em>·</em> SPRING COLLECTION 26 <em>·</em> WORKSHOP DROPS 1ST OF EVERY MONTH <em>·</em> FREE SHIPPING WITHIN EU OVER €120 <em>·</em>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────
function Hero({ P, density }) {
  return (
    <section id="hero" className="lp-hero" style={{ background: P.paper, color: P.ink, borderColor: P.ink }}>
      <div className="lp-hero-meta">
        <span>EST. 2019</span>
        <span>NO. 047</span>
        <span>SPRING / 26</span>
      </div>

      <div className="lp-hero-grid">
        <div className="lp-hero-shape" style={{ background: P.terracotta }}>
          <window.Vase.Bottle fill={P.paper} className="lp-hero-vase" />
          <span className="lp-hero-tag" style={{ color: P.paper }}>HAND<br/>MADE</span>
        </div>

        <div className="lp-hero-text">
          <h1 className="lp-hero-h1">
            <span>Made</span>
            <span className="lp-hero-amp" style={{ color: P.terracotta }}>by</span>
            <span>hand,</span>
            <span className="lp-hero-italic">slowly.</span>
          </h1>
          <p className="lp-hero-lede">
            A small studio in Berlin firing limited runs of stoneware vessels,
            tableware and rough-edged sculpture. Every piece carries the mark
            of the hand that pulled it.
          </p>
          <div className="lp-hero-cta">
            <a href="#shop" className="lp-btn lp-btn-solid" style={{ background: P.ink, color: P.paper }}>
              Shop the collection
              <span aria-hidden>→</span>
            </a>
            <a href="#process" className="lp-btn lp-btn-ghost" style={{ borderColor: P.ink, color: P.ink }}>
              From clay to kiln
            </a>
          </div>
        </div>

        <div className="lp-hero-side" style={{ background: P.olive, color: P.paper }}>
          <div className="lp-hero-side-rot">
            THE FUSION OF IMAGINATION AND CLAY
          </div>
        </div>

        <div className="lp-hero-stats" style={{ borderColor: P.ink }}>
          <div><b>062</b><span>UNIQUE PIECES, 2026</span></div>
          <div><b>14</b><span>WORKSHOP SEATS / MONTH</span></div>
          <div><b>01</b><span>POTTER. ONE PAIR OF HANDS.</span></div>
        </div>
      </div>
    </section>
  );
}

// ─── Categories — 4 brutal swatches like moodboard 1 ─────────────────
function Categories({ P, onPick }) {
  const swatchColor = {
    terracotta: P.terracotta,
    navy: P.navy,
    olive: P.olive,
    sand: P.sand,
    sage: P.sage,
    charcoal: P.charcoal,
  };
  const featured = ["Vases", "Pots", "Bowls", "Plates"];
  const rows = featured.map(k => CATEGORIES.find(c => c.key === k));
  return (
    <section id="categories" className="lp-cats" style={{ background: P.bg, color: P.ink, borderColor: P.ink }}>
      <div className="lp-section-hd">
        <span className="lp-eyebrow">[ 02 ] CATEGORIES</span>
        <h2 className="lp-h2">Four families<br/>of objects.</h2>
        <p className="lp-section-sub">Each family is small on purpose. Pieces are batch-fired and rotate seasonally.</p>
      </div>

      <div className="lp-cat-grid">
        {rows.map((c, i) => (
          <button key={c.key} className="lp-cat-card" style={{ background: swatchColor[c.swatch], color: c.swatch === "sand" ? P.ink : P.paper }} onClick={() => onPick(c.key)}>
            <div className="lp-cat-top">
              <span className="lp-cat-num">{String(i + 1).padStart(2, "0")} / 04</span>
              <span className="lp-cat-mark">
                <window.Vase.Spiral fill="currentColor" size={22} />
                <em>LESLEY</em>
              </span>
            </div>
            <h3 className="lp-cat-title">CERAMIC<br/>{c.key.toUpperCase()}</h3>
            <div className="lp-cat-vase">
              <VaseFor shape={c.shape} fill="currentColor" style={{ opacity: .85 }} />
            </div>
            <div className="lp-cat-foot">
              <div>
                <div className="lp-cat-meta">Material</div>
                <div className="lp-cat-meta-v">Baked Clay</div>
              </div>
              <div>
                <div className="lp-cat-meta">Edition</div>
                <div className="lp-cat-meta-v">{c.count}× pieces</div>
              </div>
              <div className="lp-cat-year">'26</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── Manifesto strip — Clayeria-style oversized serif ─────────────────
function Manifesto({ P }) {
  return (
    <section className="lp-manifesto" style={{ background: P.paper, color: P.ink, borderColor: P.ink }}>
      <div className="lp-manifesto-vase" aria-hidden>
        <window.Vase.Amphora fill={P.terracotta} />
      </div>
      <div className="lp-manifesto-words">
        <h2 className="lp-display">
          <span>Hands,</span>
          <span className="lp-display-it">clay,</span>
          <span>fire.</span>
        </h2>
        <p>
          CURATED EDITIONS OF CERAMICS FOR EVERYDAY USE. WE BELIEVE WELL-MADE
          OBJECTS REQUIRE WAVERING ATTENTION TO DETAIL — QUALITY IS OUR PASSION,
          AND WE DEMONSTRATE IT THROUGH PRECISION.
        </p>
      </div>
    </section>
  );
}

// ─── Product Shop ─────────────────────────────────────────────────────
function Shop({ P, filter, setFilter, onAdd }) {
  const filters = ["All", "Vases", "Pots", "Bowls", "Plates", "Cups", "Sculpt"];
  const list = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <section id="shop" className="lp-shop" style={{ background: P.bg, color: P.ink, borderColor: P.ink }}>
      <div className="lp-shop-hd">
        <div>
          <span className="lp-eyebrow">[ 03 ] CATALOGUE</span>
          <h2 className="lp-h2">Twelve pieces,<br/>currently in the kiln-shop.</h2>
        </div>
        <div className="lp-filters" role="tablist">
          {filters.map(f => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={"lp-filter " + (filter === f ? "is-on" : "")}
              style={filter === f ? { background: P.ink, color: P.paper, borderColor: P.ink } : { borderColor: P.ink }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="lp-shop-grid">
        {list.map((p, i) => (
          <ProductCard key={p.id} p={p} P={P} idx={i} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ p, P, idx, onAdd }) {
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const fill = colorOf(p, P);
  const dark = ["navy", "charcoal", "olive"].includes(p.color);
  // pick a frame bg that contrasts with the vase fill
  let bg = P.cream;
  if (dark) bg = P.paper;
  else if (p.color === "cream" || p.color === "sand") bg = P.sage;
  else if (p.color === "sage") bg = P.cream;

  function handleAdd(e) {
    e.stopPropagation();
    onAdd(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  }

  return (
    <article
      className="lp-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ borderColor: P.ink }}
    >
      <div className="lp-card-frame" style={{ background: bg, borderColor: P.ink }}>
        <div className="lp-card-meta-top">
          <span>{String(idx + 1).padStart(2, "0")}</span>
          <span>{p.edition.toUpperCase()}</span>
        </div>
        <div className="lp-card-vase" style={{ transform: hover ? "translateY(-6px) rotate(-1.5deg)" : "translateY(0)" }}>
          <VaseFor shape={p.shape} fill={fill} />
        </div>
        <div className="lp-card-meta-bot" style={{ color: P.ink }}>
          <span>H {30 + ((idx * 3) % 18)} · W {12 + (idx % 6)}cm</span>
          <span>{p.year}</span>
        </div>
      </div>
      <div className="lp-card-body">
        <div className="lp-card-row">
          <h3 className="lp-card-name">{p.name}</h3>
          <span className="lp-card-price">{fmt(p.price)}</span>
        </div>
        <p className="lp-card-desc">{p.desc}</p>
        <div className="lp-card-actions">
          <span className="lp-card-tag" style={{ borderColor: P.ink }}>{p.category}</span>
          <button
            className="lp-card-add"
            onClick={handleAdd}
            style={{ background: added ? P.olive : P.ink, color: P.paper }}
          >
            {added ? "✓ Added" : "Add — " + fmt(p.price)}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Process — three-step ─────────────────────────────────────────────
function Process({ P }) {
  const steps = [
    { n: "01", t: "Wedge",  d: "Local stoneware is cut, wedged and rested for forty-eight hours before it sees the wheel." },
    { n: "02", t: "Throw",  d: "Each form is pulled from a single ball. No moulds, no slipcasting — fingerprints stay." },
    { n: "03", t: "Fire",   d: "Two firings. Bisque at 980°C, glaze at 1240°C in a gas kiln we built ourselves." },
  ];
  return (
    <section id="process" className="lp-process" style={{ background: P.ink, color: P.paper }}>
      <div className="lp-section-hd lp-section-hd-dark">
        <span className="lp-eyebrow" style={{ color: P.sand }}>[ 04 ] PROCESS</span>
        <h2 className="lp-h2">From wet clay<br/>to fired form,<br/>in <em>three</em> moves.</h2>
      </div>
      <div className="lp-proc-grid">
        {steps.map(s => (
          <div key={s.n} className="lp-proc" style={{ borderColor: P.paper }}>
            <span className="lp-proc-n" style={{ color: P.terracotta }}>{s.n}</span>
            <h3 className="lp-proc-t">{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── About / Studio ───────────────────────────────────────────────────
function About({ P }) {
  return (
    <section id="about" className="lp-about" style={{ background: P.bg, color: P.ink, borderColor: P.ink }}>
      <div className="lp-about-grid">
        <div className="lp-about-portrait" style={{ background: P.sage, color: P.paper, borderColor: P.ink }}>
          <window.Vase.Wavy fill={P.paper} className="lp-about-vase" />
          <div className="lp-about-portrait-meta">
            <span>L. Halverson</span>
            <span>FOUNDER · POTTER</span>
          </div>
        </div>
        <div className="lp-about-words">
          <span className="lp-eyebrow">[ 05 ] STUDIO</span>
          <h2 className="lp-h2 lp-h2-tight">A two-room studio<br/>on Sonnenallee.</h2>
          <p>
            Lesley Halverson trained in Bornholm, fired her first kiln in 2017,
            and opened the Berlin studio two years later. The shelves hold
            roughly two hundred pieces at a time. When they sell, she throws more.
          </p>
          <dl className="lp-about-dl">
            <div><dt>Founded</dt><dd>2019, Berlin</dd></div>
            <div><dt>Output</dt><dd>~ 60 pieces / month</dd></div>
            <div><dt>Clay</dt><dd>Iron-rich Westerwald stoneware</dd></div>
            <div><dt>Workshops</dt><dd>1st Saturday / month, 4 seats</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

// ─── Journal teasers ──────────────────────────────────────────────────
function Journal({ P }) {
  const posts = [
    { tag: "WORKSHOP", t: "How to centre a kilo of clay (and why it matters)", d: "8 min read", color: P.terracotta },
    { tag: "DROP",     t: "Spring / 26 — twelve new pieces, photographed",     d: "Look book",   color: P.navy },
    { tag: "ESSAY",    t: "Notes on imperfection: the kiln decides last",      d: "5 min read", color: P.olive },
  ];
  return (
    <section id="journal" className="lp-journal" style={{ background: P.paper, color: P.ink, borderColor: P.ink }}>
      <div className="lp-section-hd">
        <span className="lp-eyebrow">[ 06 ] JOURNAL</span>
        <h2 className="lp-h2">From the<br/>studio diary.</h2>
      </div>
      <div className="lp-journal-grid">
        {posts.map((p, i) => (
          <a key={i} className="lp-journal-card" style={{ borderColor: P.ink }}>
            <div className="lp-journal-img" style={{ background: p.color }}>
              <span className="lp-journal-num" style={{ color: P.paper }}>0{i + 1}</span>
            </div>
            <div className="lp-journal-body">
              <span className="lp-journal-tag" style={{ borderColor: P.ink }}>{p.tag}</span>
              <h3>{p.t}</h3>
              <span className="lp-journal-meta">{p.d} <em>↗</em></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────
function Footer({ P }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="lp-footer" style={{ background: P.terracotta, color: P.paper }}>
      <div className="lp-foot-top">
        <h2 className="lp-foot-h">
          <span>Drops, twice</span>
          <span>a year. No</span>
          <span className="lp-foot-it">spam, ever.</span>
        </h2>
        <form
          className="lp-foot-form"
          onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) { setSent(true); setEmail(""); } }}
          style={{ borderColor: P.paper }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => { setEmail(e.target.value); setSent(false); }}
            style={{ color: P.paper }}
          />
          <button type="submit" style={{ background: P.paper, color: P.terracotta }}>
            {sent ? "✓ Subscribed" : "Subscribe →"}
          </button>
        </form>
      </div>

      <div className="lp-foot-grid">
        <div className="lp-foot-col">
          <span className="lp-foot-mark">
            <window.Vase.Spiral fill={P.paper} size={36} />
            LESLEY <span style={{ opacity: .5 }}>/</span> CERAMICS
          </span>
          <p>Sonnenallee 184, 12059 Berlin. Open Thurs–Sat, 11–6. Or by appointment.</p>
        </div>
        <div className="lp-foot-col">
          <h4>Shop</h4>
          <a>Vases</a><a>Pots</a><a>Bowls</a><a>Plates</a><a>Cups</a>
        </div>
        <div className="lp-foot-col">
          <h4>Studio</h4>
          <a>About Lesley</a><a>Workshops</a><a>Wholesale</a><a>Press</a>
        </div>
        <div className="lp-foot-col">
          <h4>Elsewhere</h4>
          <a>Instagram ↗</a><a>Are.na ↗</a><a>Journal RSS ↗</a>
        </div>
      </div>

      <div className="lp-foot-rule" style={{ borderColor: P.paper }}>
        <span>© 2026 LESLEY HALVERSON STUDIO</span>
        <span>VAT DE-3409 11 887</span>
        <span>BAKED · GLAZED · SHIPPED</span>
      </div>

      <div className="lp-foot-mega" aria-hidden>LESLEY</div>
    </footer>
  );
}

// ─── Cart drawer ──────────────────────────────────────────────────────
function CartDrawer({ open, onClose, items, onRemove, onChangeQty, P }) {
  const total = items.reduce((s, it) => s + it.p.price * it.q, 0);
  return (
    <>
      <div
        className={"lp-scrim " + (open ? "is-on" : "")}
        onClick={onClose}
      />
      <aside
        className={"lp-drawer " + (open ? "is-on" : "")}
        style={{ background: P.paper, color: P.ink, borderColor: P.ink }}
      >
        <div className="lp-drawer-hd" style={{ borderColor: P.ink }}>
          <div>
            <span className="lp-eyebrow">YOUR BAG</span>
            <h3>{items.length} {items.length === 1 ? "piece" : "pieces"}</h3>
          </div>
          <button className="lp-drawer-x" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="lp-drawer-list">
          {items.length === 0 && (
            <div className="lp-drawer-empty">
              <window.Vase.Bowl fill={P.sand} style={{ width: 120, height: 120, opacity: .6 }} />
              <p>Bag's empty.</p>
              <p className="lp-drawer-empty-sub">Pieces wait quietly on the shelf.</p>
            </div>
          )}
          {items.map((it, i) => (
            <div key={it.p.id} className="lp-drawer-item" style={{ borderColor: P.ink }}>
              <div className="lp-drawer-thumb" style={{ background: P.cream, borderColor: P.ink }}>
                <VaseFor shape={it.p.shape} fill={colorOf(it.p, P)} />
              </div>
              <div className="lp-drawer-body">
                <div className="lp-drawer-row">
                  <h4>{it.p.name}</h4>
                  <button onClick={() => onRemove(it.p.id)} aria-label="Remove">×</button>
                </div>
                <span className="lp-drawer-cat">{it.p.category} · {it.p.edition}</span>
                <div className="lp-drawer-foot">
                  <div className="lp-qty" style={{ borderColor: P.ink }}>
                    <button onClick={() => onChangeQty(it.p.id, -1)}>−</button>
                    <span>{it.q}</span>
                    <button onClick={() => onChangeQty(it.p.id, +1)}>+</button>
                  </div>
                  <span className="lp-drawer-price">{fmt(it.p.price * it.q)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lp-drawer-foot-sum" style={{ borderColor: P.ink }}>
          <div className="lp-drawer-sum-row">
            <span>Subtotal</span>
            <span><b>{fmt(total)}</b></span>
          </div>
          <div className="lp-drawer-sum-row lp-mute">
            <span>Shipping</span>
            <span>{total > 120 ? "Free" : "Calc. at checkout"}</span>
          </div>
          <button
            className="lp-drawer-checkout"
            disabled={!items.length}
            style={{ background: items.length ? P.ink : "rgba(0,0,0,.12)", color: P.paper, borderColor: P.ink }}
          >
            Checkout — {fmt(total)}
            <span aria-hidden>→</span>
          </button>
        </div>
      </aside>
    </>
  );
}

window.LP = { TopBar, Hero, Categories, Manifesto, Shop, Process, About, Journal, Footer, CartDrawer };
