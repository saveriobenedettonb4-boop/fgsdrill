// Header, menu mobile, footer e barra del prototipo condivisi tra le pagine.
// Le pagine non ancora prototipate puntano al sito di sviluppo.
const SITE = "https://fgsdrill.nb4dev.it";
const PAGE = document.body.dataset.page;
const cur = p => (p === PAGE ? ' aria-current="page"' : "");

const MENU = [
  ["Applicazioni", `${SITE}/applicazioni/`],
  ["Soluzioni su misura", `${SITE}/soluzioni-su-misura-per-la-perforazione/`],
];
const AZIENDA = [
  ["Chi siamo", "chi-siamo-a.html", "chi-siamo-a"],
  ["Team", `${SITE}/team-fgs-drill/`],
  ["Certificazioni", `${SITE}/certificazioni/`],
  ["Sostenibilità", `${SITE}/sostenibilita/`],
  ["Presenza internazionale", `${SITE}/presenza-internazionale/`],
];
const AFTER = [["News", `${SITE}/news/`], ["Contatti", `${SITE}/contatti/`]];
const PREVENTIVO = `${SITE}/richiesta-preventivo/`;
// Mega menu Prodotti: categorie a sinistra, prodotti della categoria a destra (nomi e disegni dal sito)
const P = "img/prodotti/";
const CATS = [
  ["Aste di perforazione", "aste-di-perforazione", [["Aste forgiate a frizione", "aste-forgiate-a-frizione", "aste-forgiate-a-frizione-768x444.jpg"], ["Aste Upset", "aste-upset", "disegno-aste-upset-768x200.png"], ["Aste T4 (RD20)", "aste-t4-rd20", "disegno-aste-t4-768x205.png"], ["Aste Hausherr", "aste-hausherr", "disegno-aste-hausherr-768x187.png"], ["Aste Atlas", "aste-atlas", "disegno-aste-atlas-768x170.png"], ["Aste doppia chiave", "aste-doppia-chiave", "disegno-aste-doppia-chiave-768x153.png"], ["Aste Craelius", "aste-craelius", "disegno-aste-craelius-768x150.png"]]],
  ["Astoni e stabilizzatori", "astoni-e-stabilizzatori", [["Astoni", "astoni", "disegno-astoni-768x241.png"], ["Stabilizzatori", "stabilizzatori", "disegno-stabilizzatori-768x372.png"]]],
  ["Ammortizzatori", "ammortizzatori", [["Ammortizzatori da 3″ a 12″", "ammortizzatori", "ammortizzatore-sezione.png"]]],
  ["Tubi di manovra", "tubi-di-manovra", [["Tubi di manovra", "tubi-di-manovra", "disegno-tubi-di-manovra.png"], ["Corone", "corone", "disegno-corone.png"]]],
  ["Raccorderia", "raccorderia", [["Raccordi", "raccordi", "disegno-raccordi-768x139.png"], ["Valvole di non ritorno", "valvole-di-non-ritorno", "disegno-valvole-non-ritorno.png"]]],
  ["Accessori di perforazione", "accessori-di-perforazione", [["Testine di sollevamento", "testine-di-sollevamento", "disegno-testine-sollevamento.png"], ["Chiavi di smontaggio", "chiavi-di-smontaggio", "disegno-chiavi-smontaggio.png"], ["Pescanti maschio e femmina", "pescanti", "disegno-pescanti-768x188.png"]]],
];
const MEGA = `<div class="dd mega"><button type="button" aria-haspopup="true">Prodotti</button>
  <div class="mg"><div class="mg-in">
    <ul class="mg-cats">${CATS.map(([t, s], i) => `<li${i ? "" : ' class="on"'}><a href="${SITE}/prodotti/#${s}">${t}</a></li>`).join("")}</ul>
    <div class="mg-panels">${CATS.map(([, , items], i) => `<ul class="mg-items"${i ? " hidden" : ""}>${items.map(([t, s, img]) => `<li><a href="${SITE}/prodotti/${s}/"><img src="${P}${img}" alt="" loading="lazy"><span>${t}</span></a></li>`).join("")}</ul>`).join("")}</div>
  </div></div></div>`;
// Mega menu Azienda (come lovece.it): una frase fissa e le voci a sinistra, una sola foto a destra; nulla cambia all'hover
const MEGA_AZ = `<div class="dd mega"><button type="button" aria-haspopup="true"${PAGE === "chi-siamo-a" ? ' aria-current="page"' : ""}>Azienda</button>
  <div class="mg"><div class="mg-in az">
    <div class="az-l"><p class="az-p">Progettiamo e produciamo aste e attrezzature per la perforazione partendo dalle condizioni reali in cui verranno usate.</p>
      <ul class="az-list">${AZIENDA.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
    <div class="az-media"><img src="img/operai.webp" alt="" loading="lazy"></div>
  </div></div></div>`;
const a = ([t, h, p]) => `<a href="${h}"${cur(p)}>${t}</a>`;

document.body.insertAdjacentHTML("afterbegin", `
<div class="proto"><div class="wrap">
  <span><b>Prototipo</b> · F.G.S. Drill</span>
  <nav aria-label="Pagine del prototipo"><a href="index.html">Indice</a><a href="home-a.html"${cur("home-a")}>Home(A)</a><a href="nuova/index.html"${cur("home-b")}>Home(B)</a><a href="chi-siamo-a.html"${cur("chi-siamo-a")}>Chi siamo(A)</a><a href="nuova/chi-siamo.html"${cur("chi-siamo-b")}>Chi siamo(B)</a></nav>
</div></div>
<header class="site"><div class="wrap">
  <a class="logo" href="home-a.html" aria-label="F.G.S. Drill, home"><img src="img/logo.svg" alt="F.G.S. Drill" width="300" height="209"></a>
  <nav class="main" aria-label="Menu principale">
    ${MEGA}
    ${MENU.map(a).join("")}
    ${MEGA_AZ}
    ${AFTER.map(a).join("")}
  </nav>
  <a class="btn" href="${PREVENTIVO}">Richiedi preventivo</a>
  <button class="burger" type="button" aria-label="Apri il menu" aria-expanded="false" aria-controls="mnav"><span></span></button>
</div></header>
<nav class="mnav" id="mnav" aria-label="Menu">
  <a href="${SITE}/prodotti/">Prodotti</a>
  ${MENU.map(a).join("")}
  <a href="chi-siamo-a.html"${cur("chi-siamo-a")}>Azienda</a>
  <div class="sub">${AZIENDA.slice(1).map(a).join("")}</div>
  ${AFTER.map(a).join("")}
  <a class="btn btn-y" href="${PREVENTIVO}">Richiedi preventivo</a>
</nav>`);

document.body.insertAdjacentHTML("beforeend", `
<footer class="site"><div class="wrap">
  <div class="co"><p><b>F.G.S. Drill S.r.l.</b>Via dei Gerani, 36<br>Modugno (BA)</p><p>T. <a href="tel:+390805311111">+39 080 531 1111</a><br><a href="mailto:info@fgsdrill.it">info@fgsdrill.it</a></p></div>
  <div><h4>Prodotti</h4><ul>${["Aste di perforazione", "Astoni e stabilizzatori", "Ammortizzatori", "Tubi di manovra", "Raccorderia", "Accessori di perforazione"].map(t => `<li><a href="${SITE}/prodotti/">${t}</a></li>`).join("")}</ul></div>
  <div><h4>Applicazioni</h4><ul>${[["Ricerca idrica", "ricerca-idrica"], ["Geotermia", "geotermia"], ["Consolidamenti", "consolidamenti"], ["Cave e miniere", "cave-e-miniere"], ["Ingegneria civile", "ingegneria-civile"], ["Geognostica", "geognostica"]].map(([t, s]) => `<li><a href="${SITE}/applicazioni/${s}/">${t}</a></li>`).join("")}</ul></div>
  <div><h4>Azienda</h4><ul><li><a href="chi-siamo-a.html">Chi siamo</a></li><li><a href="${SITE}/team-fgs-drill/">Team</a></li><li><a href="${SITE}/certificazioni/">Certificazioni</a></li><li><a href="${SITE}/sostenibilita/">Sostenibilità</a></li><li><a href="${SITE}/presenza-internazionale/">Nel mondo</a></li></ul></div>
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

// Mega menu: passando su una categoria (o col tasto) cambia il pannello dei prodotti
document.querySelectorAll(".mega").forEach(m => {
  const cats = [...m.querySelectorAll(".mg-cats li")], panels = [...m.querySelectorAll(".mg-items")];
  const show = i => { cats.forEach((c, k) => c.classList.toggle("on", k === i)); panels.forEach((p, k) => (p.hidden = k !== i)); };
  cats.forEach((c, i) => { c.addEventListener("mouseenter", () => show(i)); c.addEventListener("focusin", () => show(i)); });
});
