// Header, menu mobile, footer e barra del prototipo condivisi tra le pagine.
// Le pagine non ancora prototipate puntano al sito di sviluppo.
const SITE = "https://fgsdrill.nb4dev.it";
const PAGE = document.body.dataset.page;
const cur = p => (p === PAGE ? ' aria-current="page"' : "");

// Catalogo: [nome, Ø min, Ø max, nota, pagina]. Lo usano il mega menu, il menu mobile, il footer e la home
// shortcut: i disegni tecnici stanno al posto dei 3D che arriveranno, img è l'unico campo da cambiare se saranno render
const BASE = `${SITE}/prodotti/`;
const CAT = [
  { n: "Aste di perforazione", img: "upset.png", r: 3.846, rows: [["Aste forgiate a frizione", 42, 152, "31 filettature", "aste-forgiate-a-frizione"], ["Aste Upset", 76, 152, "6 filettature", "aste-upset"], ["Aste T4 (RD20)", 114, 140, "Esagono e quadro", "aste-t4-rd20"], ["Aste Hausherr", 76, 140, "4 filettature", "aste-hausherr"], ["Aste Atlas", 76, 114, "L 1000–6000 mm", "aste-atlas"], ["Aste doppia chiave", 63, 95, "6 filettature", "aste-doppia-chiave"], ["Aste Craelius", 54, 60, "2 filettature", "aste-craelius"]] },
  { n: "Astoni e stabilizzatori", img: "astoni.png", r: 3.185, rows: [["Astoni", 76, 273, "13 filettature", "astoni"], ["Stabilizzatori", 76, 273, "6 tipi (ST.1–ST.6)", "stabilizzatori"]] },
  { n: "Ammortizzatori", img: "ammortizzatore-pulito.png", r: 4.543, rows: [["Ammortizzatori da 3″ a 12″", 80, 260, "7 modelli", "ammortizzatori"]] },
  { n: "Tubi di manovra", img: "tubi-pulito-3x.png", r: 2.132, rows: [["Tubi di manovra", 90, 323, "L 1–3 m", "tubi-di-manovra"], ["Corone", 101, 323, "", "corone"]] },
  { n: "Raccorderia", img: "raccordi.png", r: 5.543, rows: [["Raccordi", 42, 273, "F-F, F-M, M-M", "raccordi"], ["Valvole di non ritorno", 76, 273, "Reversibili", "valvole-di-non-ritorno"]] },
  { n: "Accessori di perforazione", img: "testine-3x.png", r: 1.117, rows: [["Testine di sollevamento", 76, 220, "Fino a 8000 kg a 90°", "testine-di-sollevamento"], ["Chiavi di smontaggio", 54, 152, "Per aste", "chiavi-di-smontaggio"], ["Pescanti maschio e femmina", 60, 152, "", "pescanti"]] },
];
console.assert(CAT.flatMap(f => f.rows).length === 17 && Math.min(...CAT.flatMap(f => f.rows.map(r => r[1]))) === 42 && Math.max(...CAT.flatMap(f => f.rows.map(r => r[2]))) === 323, "Catalogo: le pagine dichiarano 17 prodotti, Ø da 42 a 323");
const catSpan = f => [Math.min(...f.rows.map(r => r[1])), Math.max(...f.rows.map(r => r[2]))];
const catRow = ([n, a, b, note, slug]) => `<li><a href="${BASE}${slug}/"><b>${n}</b><span>Ø ${a}–${b}</span><span>${note}</span></a></li>`;

const MENU = [
  ["Applicazioni", `${SITE}/applicazioni/`],
  ["Soluzioni su misura", `${SITE}/soluzioni-su-misura-per-la-perforazione/`],
];
const AZIENDA = [
  ["Chi siamo", "chi-siamo.html", "chi-siamo-b"],
  ["Team", `${SITE}/team-fgs-drill/`],
  ["Certificazioni", `${SITE}/certificazioni/`],
  ["Sostenibilità", `${SITE}/sostenibilita/`],
  ["Presenza internazionale", `${SITE}/presenza-internazionale/`],
];
const AFTER = [["News", `${SITE}/news/`], ["Contatti", `${SITE}/contatti/`]];
const PREVENTIVO = `${SITE}/richiesta-preventivo/`;
const a = ([t, h, p]) => `<a href="${h}"${cur(p)}>${t}</a>`;
const MEGA = `<div class="mm">
      <button class="mm-b" type="button" aria-expanded="false" aria-controls="mega">Prodotti</button>
      <div class="mm-panel" id="mega">
        <ul class="mm-fams">${CAT.map((f, i) => `<li class="mm-f${i ? "" : " on"}"><a href="${BASE}">${f.n}</a><ul class="mm-l" style="--n:${f.rows.length}">${f.rows.map(catRow).join("")}</ul></li>`).join("")}</ul>
        <div class="mm-bar light"><p>17 prodotti, Ø da 42 a 323 mm</p><a class="link" href="${SITE}/soluzioni-su-misura-per-la-perforazione/">Richiedi un pezzo speciale</a><a class="btn" href="${BASE}">Vedi tutti i prodotti</a></div>
      </div>
    </div>`;

document.body.insertAdjacentHTML("afterbegin", `
<div class="proto"><div class="wrap">
  <span><b>Prototipo</b> · F.G.S. Drill</span>
  <nav aria-label="Pagine del prototipo"><a href="../index.html">Indice</a><a href="../home-a.html"${cur("home-a")}>Home(A)</a><a href="index.html"${cur("home-b")}>Home(B)</a><a href="../chi-siamo-a.html"${cur("chi-siamo-a")}>Chi siamo(A)</a><a href="chi-siamo.html"${cur("chi-siamo-b")}>Chi siamo(B)</a></nav>
</div></div>
<header class="site"><div class="wrap">
  <a class="logo" href="index.html" aria-label="F.G.S. Drill, home"><img src="img/logo.svg" alt="F.G.S. Drill" width="300" height="209"></a>
  <nav class="main" aria-label="Menu principale">
    ${MEGA}
    ${MENU.map(a).join("")}
    <div class="dd"><button type="button" aria-haspopup="true"${PAGE === "chi-siamo-b" ? ' aria-current="page"' : ""}>Azienda</button><ul>${AZIENDA.map(i => `<li>${a(i)}</li>`).join("")}</ul></div>
    ${AFTER.map(a).join("")}
  </nav>
  <a class="btn" href="${PREVENTIVO}">Richiedi preventivo</a>
  <button class="burger" type="button" aria-label="Apri il menu" aria-expanded="false" aria-controls="mnav"><span></span></button>
</div></header>
<nav class="mnav" id="mnav" aria-label="Menu">
  <a href="${BASE}">Prodotti</a>
  <div class="sub">${CAT.map(f => `<details><summary>${f.n}</summary>${f.rows.map(r => `<a href="${BASE}${r[4]}/">${r[0]}</a>`).join("")}</details>`).join("")}</div>
  ${MENU.map(a).join("")}
  <a href="chi-siamo.html"${cur("chi-siamo-b")}>Azienda</a>
  <div class="sub">${AZIENDA.slice(1).map(a).join("")}</div>
  ${AFTER.map(a).join("")}
  <a class="btn btn-y" href="${PREVENTIVO}">Richiedi preventivo</a>
</nav>`);

document.body.insertAdjacentHTML("beforeend", `
<footer class="site"><div class="wrap">
  <div class="co"><p><b>F.G.S. Drill S.r.l.</b>Via dei Gerani, 36<br>Modugno (BA)</p><p>T. <a href="tel:+390805311111">+39 080 531 1111</a><br><a href="mailto:info@fgsdrill.it">info@fgsdrill.it</a></p></div>
  <div><h4>Prodotti</h4><ul>${CAT.map(f => `<li><a href="${BASE}">${f.n}</a></li>`).join("")}</ul></div>
  <div><h4>Applicazioni</h4><ul>${[["Ricerca idrica", "ricerca-idrica"], ["Geotermia", "geotermia"], ["Consolidamenti", "consolidamenti"], ["Cave e miniere", "cave-e-miniere"], ["Ingegneria civile", "ingegneria-civile"], ["Geognostica", "geognostica"]].map(([t, s]) => `<li><a href="${SITE}/applicazioni/${s}/">${t}</a></li>`).join("")}</ul></div>
  <div><h4>Azienda</h4><ul><li><a href="chi-siamo.html">Chi siamo</a></li><li><a href="${SITE}/team-fgs-drill/">Team</a></li><li><a href="${SITE}/certificazioni/">Certificazioni</a></li><li><a href="${SITE}/sostenibilita/">Sostenibilità</a></li><li><a href="${SITE}/presenza-internazionale/">Nel mondo</a></li></ul></div>
  <div><h4>Link utili</h4><ul><li><a href="${SITE}/contatti/">Contatti</a></li><li><a href="${SITE}/news/">News</a></li><li><a href="${SITE}/lavora-con-noi/">Lavora con noi</a></li></ul></div>
  <div class="fbar"><span>Privacy policy – Cookie policy</span><a class="fb" href="https://www.facebook.com/profile.php?id=100063616750282" target="_blank" rel="noopener" aria-label="F.G.S. Drill su Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg></a></div>
  <div class="legal"><span>© 2026 F.G.S. Drill S.r.l. – Tutti i diritti riservati.<br>Sede legale: Via dei Gerani, 36 – Modugno (BA)<br>P. IVA 06047400723 | REA: 458839<br>Capitale sociale: € 500.000,00<br>PEC: collisimona@postecert.it</span><span>Made in Never Before Italia</span></div>
</div></footer>`);

// Header: bianco dopo lo scroll (pagine con hero scura)
const onScroll = () => document.body.classList.toggle("scrolled", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menu mobile
const burger = document.querySelector(".burger");
burger.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
});

// Mega menu Prodotti: si apre al passaggio del mouse o al clic, Esc chiude
const mm = document.querySelector(".mm"), mmB = mm.querySelector(".mm-b"), fams = [...mm.querySelectorAll(".mm-f")];
let mmT = 0, famT = 0, mmY = 0, mmPtr = "";
const mega = open => {
  clearTimeout(mmT);
  document.body.classList.toggle("mega-open", open);
  mmB.setAttribute("aria-expanded", open);
  if (open) mmY = scrollY;
};
const isOpen = () => mmB.getAttribute("aria-expanded") === "true";
mm.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") mega(true); });
mm.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") { clearTimeout(famT); mmT = setTimeout(() => mega(false), 200); } });
mmB.addEventListener("pointerdown", e => { mmPtr = e.pointerType; });
mmB.addEventListener("click", () => { mega(mmPtr === "mouse" || !isOpen()); mmPtr = ""; }); // col mouse è già aperto: il clic non deve richiuderlo
mm.addEventListener("focusout", e => { if (e.relatedTarget && !mm.contains(e.relatedTarget)) mega(false); });
addEventListener("keydown", e => { if (e.key === "Escape" && isOpen()) { mega(false); mmB.focus(); } });
addEventListener("scroll", () => { if (isOpen() && Math.abs(scrollY - mmY) > 80) mega(false); }, { passive: true });
const pickFam = f => fams.forEach(x => x.classList.toggle("on", x === f));
fams.forEach(f => {
  // Un attimo di attesa: andando in diagonale verso i prodotti non si cambia famiglia
  f.addEventListener("pointerenter", () => { clearTimeout(famT); famT = setTimeout(() => pickFam(f), 90); });
  f.addEventListener("focusin", () => pickFam(f));
});

// Barra del prototipo: spinge giù la prima schermata, col sito vero vale 0
const protoH = () => document.querySelector(".proto")?.offsetHeight || 0;
const syncProto = () => {
  document.documentElement.style.setProperty("--proto", protoH() + "px");
  document.documentElement.style.setProperty("--htop", Math.max(10, protoH() + 10 - scrollY) + "px");
};
syncProto();
addEventListener("resize", syncProto);
addEventListener("scroll", syncProto, { passive: true });

// Parole di una frase, una per una: le immagini in mezzo restano dove sono
const wordSpans = el => [...el.childNodes].forEach(n => {
  if (n.nodeType !== 3 || !n.nodeValue.trim()) return;
  const f = document.createDocumentFragment();
  n.nodeValue.split(/(\s+)/).forEach(p => {
    if (!p) return;
    if (/^\s+$/.test(p)) { f.append(" "); return; }
    const w = document.createElement("span");
    w.className = "n-mw";
    w.textContent = p;
    f.append(w);
  });
  n.replaceWith(f);
});

// Scroll fluido e lamelle fra due fondi: home e chi siamo. Da chiamare dopo aver caricato GSAP e Lenis
const smoothScroll = () => {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  const lenis = new Lenis({ lerp: .1, anchors: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.documentElement.style.scrollBehavior = "auto";
  return lenis;
};
const shutter = sh => {
  sh.innerHTML = "<i></i>".repeat(10);
  gsap.to(sh.querySelectorAll("i"), {
    scaleY: 1, ease: "none", stagger: { each: .07, from: "end" },
    scrollTrigger: { trigger: sh.parentElement, start: "top 82%", end: "top 12%", scrub: true },
  });
};

// Comparsa allo scroll: .rv (blocchi) e .lines (titoli riga per riga)
// Ogni parola in una maschera; la riga (--i) si calcola dalla posizione reale, quindi regge ogni larghezza.
function splitWords(el) {
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
  while (walk.nextNode()) if (walk.currentNode.nodeValue.trim()) nodes.push(walk.currentNode);
  nodes.forEach(n => {
    const frag = document.createDocumentFragment();
    n.nodeValue.split(/(\s+)/).forEach(part => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        frag.append(" ");
        return;
      }
      const w = document.createElement("span"), i = document.createElement("span");
      w.className = "w"; i.textContent = part; w.append(i); frag.append(w);
    });
    n.replaceWith(frag);
  });
}
function lineIndex(el) {
  let top = null, i = -1;
  el.querySelectorAll(".w").forEach(w => { if (w.offsetTop !== top) { top = w.offsetTop; i++; } w.firstChild.style.setProperty("--i", i); });
}
const titles = [...document.querySelectorAll(".lines")];
titles.forEach(splitWords);
const relineAll = () => titles.forEach(lineIndex);
document.fonts ? document.fonts.ready.then(relineAll) : relineAll();
addEventListener("resize", relineAll);
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { rootMargin: "0px 0px -12% 0px" });
document.querySelectorAll(".rv, .lines").forEach(el => io.observe(el));
