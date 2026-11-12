// Catalogo prodotti e pagine di categoria: dati dal sito di sviluppo, card generate qui.
// .cats → card delle categorie (data-current = categoria della pagina)
// .grid → prodotti (data-cat = solo quella categoria); con .flt accanto i bottoni filtrano anche dall'indirizzo (#raccorderia)
(() => {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DEV = "https://fgsdrill.nb4dev.it/prodotti/";
  // [nome, slug, icona, [prodotto, slug, disegno, dati]]
  const DATA = [
    ["Aste di perforazione", "aste-di-perforazione", "aste", [
      ["Aste forgiate a frizione", "aste-forgiate-a-frizione", "aste-forgiate-a-frizione-768x444.jpg", "Ø42–152 · 31 filettature"],
      ["Aste Upset", "aste-upset", "disegno-aste-upset-768x200.png", "Ø76–152 · 6 filettature"],
      ["Aste T4 (RD20)", "aste-t4-rd20", "disegno-aste-t4-768x205.png", "Ø114–140 · esagono e quadro"],
      ["Aste Hausherr", "aste-hausherr", "disegno-aste-hausherr-768x187.png", "Ø76–140 · 4 filettature"],
      ["Aste Atlas", "aste-atlas", "disegno-aste-atlas-768x170.png", "Ø76–114 · L 1000–6000 mm"],
      ["Aste doppia chiave", "aste-doppia-chiave", "disegno-aste-doppia-chiave-768x153.png", "Ø63–95 · 6 filettature"],
      ["Aste Craelius", "aste-craelius", "disegno-aste-craelius-768x150.png", "Ø54–60 · 2 filettature"]]],
    ["Astoni e stabilizzatori", "astoni-e-stabilizzatori", "astoni", [
      ["Astoni", "astoni", "disegno-astoni-768x241.png", "Ø76–273 · 13 filettature"],
      ["Stabilizzatori", "stabilizzatori", "disegno-stabilizzatori-768x372.png", "Ø76–273 · 6 tipi (ST.1–ST.6)"]]],
    ["Ammortizzatori", "ammortizzatori", "ammortizzatori", [
      ["Ammortizzatori da 3″ a 12″", "ammortizzatori", "ammortizzatore-sezione.png", "3″–12″ · Ø80–260 · 7 modelli"]]],
    ["Tubi di manovra", "tubi-di-manovra", "tubi", [
      ["Tubi di manovra", "tubi-di-manovra", "disegno-tubi-di-manovra.png", "Ø90–323 · L 1–3 m"],
      ["Corone", "corone", "disegno-corone.png", "Ø101–323"]]],
    ["Raccorderia", "raccorderia", "raccorderia", [
      ["Raccordi", "raccordi", "disegno-raccordi-768x139.png", "Ø42–273 · F-F, F-M, M-M"],
      ["Valvole di non ritorno", "valvole-di-non-ritorno", "disegno-valvole-non-ritorno.png", "Ø76–273 · reversibili"]]],
    ["Accessori di perforazione", "accessori-di-perforazione", "accessori", [
      ["Testine di sollevamento", "testine-di-sollevamento", "disegno-testine-sollevamento.png", "Ø76–220 · fino a 8000 kg a 90°"],
      ["Chiavi di smontaggio", "chiavi-di-smontaggio", "disegno-chiavi-smontaggio.png", "Per aste Ø54–152"],
      ["Pescanti maschio e femmina", "pescanti", "disegno-pescanti-768x188.png", "Ø60–152"]]],
  ];
  const LOCAL = ["aste-forgiate-a-frizione"];
  const $ = q => document.querySelector(q);

  const cats = $(".cats");
  if (cats) cats.innerHTML = DATA.map(([t, s, ico]) => `<a class="cat" href="${s}.html"${s === cats.dataset.current ? ' aria-current="page"' : ""}><span class="ico"><img src="img/icone/${ico}.svg" alt=""></span><span class="tx"><h3>${t}</h3><span class="ar" aria-hidden="true"></span></span></a>`).join("");

  const grid = $(".grid");
  if (grid) {
    // data-exclude e data-limit servono ai prodotti correlati della scheda prodotto
    const { cat: only, exclude, limit } = grid.dataset;
    const list = DATA.filter(c => !only || c[1] === only).flatMap(([, s, , ps]) => ps.map(p => [s, ...p])).filter(p => p[2] !== exclude).slice(0, +limit || undefined);
    // le schede già nel prototipo si aprono qui, le altre sul sito di sviluppo
    const href = slug => LOCAL.includes(slug) ? `${slug}.html` : `${DEV}${slug}/`;
    grid.innerHTML = list.map(([s, pt, ps2, img]) => `<a class="pr" href="${href(ps2)}" data-cat="${s}"><span class="pic"><img src="img/prodotti/${img}" alt="" loading="lazy"></span><h3>${pt}</h3><span class="go">Scopri di più</span></a>`).join("");
    const flt = $(".flt");
    if (flt) {
      flt.innerHTML = `<button type="button" data-cat="" aria-pressed="true">Tutti</button>` + DATA.map(([t, s]) => `<button type="button" data-cat="${s}" aria-pressed="false">${t}</button>`).join("");
      const filter = cat => {
        if (!DATA.some(c => c[1] === cat)) cat = "";
        flt.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === cat));
        grid.querySelectorAll(".pr").forEach(p => { p.hidden = !!cat && p.dataset.cat !== cat; });
      };
      flt.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { filter(b.dataset.cat); history.replaceState(null, "", b.dataset.cat ? "#" + b.dataset.cat : location.pathname); } });
      addEventListener("hashchange", () => filter(location.hash.slice(1)));
      filter(location.hash.slice(1));
      if (location.hash.length > 1) addEventListener("load", () => $("#catalogo").scrollIntoView());
    }
  }

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  // Titoli che si colorano parola per parola (come le altre pagine)
  document.querySelectorAll(".srt").forEach(el => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="word">${w}</span>`).join(" ");
    const to = el.dataset.theme === "dark" ? "#ffffff" : "#1a1a1a";
    if (still) return gsap.set(el.querySelectorAll(".word"), { color: to });
    gsap.to(el.querySelectorAll(".word"), { color: to, stagger: .05, scrollTrigger: { trigger: el, start: "top 80%", end: "top 20%", scrub: true } });
  });
  document.querySelectorAll(".image-reveal").forEach(el => {
    if (still) return;
    gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" } });
  });
})();
