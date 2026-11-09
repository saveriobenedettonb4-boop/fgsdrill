// Home nuova F.G.S. Drill. Dati dei prodotti dal sito di sviluppo.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const anim = window.gsap && window.ScrollTrigger && !reduce;
  const phone = matchMedia("(max-width: 900px)").matches; // shortcut: si decide al caricamento, ruotando il telefono resta la scelta iniziale
  const N = CAT.length;
  const piece = f => {
    const [lo, hi] = catSpan(f);
    return `<figure class="n-pz" style="--r:${f.r}"><img src="img/${f.img}" alt="Disegno tecnico: ${f.n}"></figure><div class="n-cd"><h3>${f.n}</h3><p class="n-cd-o">Ø ${lo}–${hi} mm</p><ul>${f.rows.map(catRow).join("")}</ul></div>`;
  };
  $(".n-cv").insertAdjacentHTML("beforeend", CAT.map(piece).join(""));
  $(".n-cb").innerHTML = CAT.map(f => `<span>Ø ${catSpan(f).join("–")} <small>mm</small></span>`).join("");
  $(".n-cw ul").innerHTML = CAT.map(f => `<li>${f.n}</li>`).join("");
  $(".n-ct").innerHTML = CAT.map(f => `<button type="button">${f.n}</button>`).join("");

  const pcs = $$(".n-pz"), cards = $$(".n-cd"), dias = $$(".n-cb span"), names = $$(".n-cw li"), tabs = $$(".n-ct button"), arrows = $$(".n-ca"), tabRow = $(".n-ct");
  let curFam = -1, aim = null;
  const showFam = i => {
    if (i === curFam) return;
    curFam = i;
    if (aim === i) aim = null;
    $(".n-cw ul").style.setProperty("--i", i);
    names.forEach((n, k) => { n.className = k === i ? "on" : Math.abs(k - i) === 1 ? "near" : ""; });
    [pcs, cards, dias].forEach(set => set.forEach((e, k) => e.classList.toggle("on", k === i)));
    tabs.forEach((t, k) => { if (k === i) t.setAttribute("aria-current", "true"); else t.removeAttribute("aria-current"); });
    $(".n-cc b").textContent = "0" + (i + 1);
    tabRow.scrollTo({ left: tabs[i].offsetLeft - (tabRow.clientWidth - tabs[i].offsetWidth) / 2, behavior: "smooth" });
    arrows[0].disabled = i === 0;
    arrows[1].disabled = i === N - 1;
  };
  const fitPieces = () => cards.forEach((c, k) => pcs[k].style.setProperty("--ct", c.offsetTop + "px"));
  let goFam = showFam; // con le animazioni una famiglia è una fetta di scroll, vedi più sotto
  tabs.forEach((t, k) => t.addEventListener("click", () => goFam(k)));
  // Clic veloci: si conta da dove la pagina sta andando, non dalla famiglia raggiunta finora
  arrows.forEach(a => a.addEventListener("click", () => goFam(Math.max(0, Math.min(N - 1, (aim ?? curFam) + Number(a.dataset.step))))));
  showFam(0);
  fitPieces();
  addEventListener("resize", fitPieces);
  addEventListener("load", fitPieces);
  document.fonts?.ready.then(fitPieces);

  wordSpans($(".n-m"));

  // Il titolo in cima non aspetta lo scroll: site.js scopre solo sopra l'88% dello schermo
  $(".n-ap-h .lines").classList.add("in");

  /* ---------- Paesi dalla mappa, Italia per prima ---------- */
  const spots = $$(".n-mo .nbm-spot"), main = spots.find(s => s.dataset.iso === "it"), others = spots.filter(s => s !== main);
  main.classList.add("nbm-spot--main");
  $(".n-cl").innerHTML = [main, ...others].map(s => `<li><img src="${$(".nbm-card-img", s).getAttribute("src")}" alt="">${$(".nbm-card-title", s).textContent.trim()}</li>`).join("");
  const pos = s => [parseFloat(s.style.left) * 20, parseFloat(s.style.top) * 10]; // stesso viewBox della mappa, 2000 x 1000
  const [mx, my] = pos(main);
  $(".n-mo .nbm-points").insertAdjacentHTML("beforebegin", `<svg class="n-arcs" viewBox="0 0 2000 1000" aria-hidden="true">${others.map(s => {
    const [x, y] = pos(s), lift = Math.min(170, Math.hypot(x - mx, y - my) * .32);
    return `<path d="M${mx} ${my}Q${(mx + x) / 2} ${(my + y) / 2 - lift} ${x} ${y}"/>`;
  }).join("")}</svg>`);

  if (!anim) {
    root.classList.add("n-static");
    return;
  }

  /* ---------- Da qui solo movimento ---------- */
  const lenis = smoothScroll();

  /* Apertura: il film si stringe fino a stare nella frase */
  const st = $(".n-ap-st"), film = $(".n-film"), slot = $("#apSlot"), GAP = 10;
  const toSlot = k => () => {
    const s = st.getBoundingClientRect(), r = slot.getBoundingClientRect();
    return { left: r.left - s.left, top: r.top - s.top, width: r.width, height: r.height }[k];
  };
  const openTl = gsap.timeline({ scrollTrigger: { trigger: st, start: "top top", end: "+=170%", pin: true, scrub: true, invalidateOnRefresh: true } });
  openTl
    .to(".n-ap-h", { autoAlpha: 0, y: -40, duration: .22, ease: "power1.in" }, 0)
    .fromTo(film, { left: GAP, top: GAP, width: () => st.clientWidth - 2 * GAP, height: () => st.clientHeight - 2 * GAP - protoH() },
      { left: toSlot("left"), top: toSlot("top"), width: toSlot("width"), height: toSlot("height"), duration: 1, ease: "power2.inOut" }, 0)
    .fromTo(film, { "--cut": "36px" }, { "--cut": () => parseFloat(getComputedStyle(slot).fontSize) * .17 + "px", duration: 1, ease: "power2.inOut" }, 0)
    .to(".n-film i", { opacity: 0, duration: .5 }, .2)
    .fromTo(".n-mw", { opacity: .08 }, { opacity: 1, duration: .16, stagger: .035, ease: "none" }, .55)
    .fromTo(".n-t:not(#apSlot)", { scale: 0 }, { scale: 1, duration: .3, stagger: .16, ease: "power2.out" }, .62)
    .to({}, { duration: .3 });

  /* Catalogo: titolo sul giallo, salgono i due pannelli, una fetta di scroll per famiglia, poi la scheda nera si apre */
  shutter($(".n-cat .n-sh"));
  const catPin = $(".n-cat-pin"), su = $(".n-su"), lastCard = cards[N - 1];
  const HOLD = .25, RISE = .75, STEP = phone ? .4 : .45, OUT = 1.1; // in altezze di schermo
  const IN = HOLD + RISE, TOT = IN + N * STEP + OUT, GROW = IN + N * STEP;
  const cat = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: catPin, start: "top top", end: () => "+=" + innerHeight * TOT, pin: true, scrub: true, invalidateOnRefresh: true, onUpdate: s => showFam(Math.max(0, Math.min(N - 1, Math.floor((s.progress * TOT - IN) / STEP)))) } });
  // Misure senza transform: al refresh i pannelli sono ancora fuori schermo
  const cardBox = () => {
    let x = 0, y = 0;
    for (let e = lastCard; e && e !== catPin; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; }
    return { x, y, w: lastCard.offsetWidth, h: lastCard.offsetHeight };
  };
  cat
    .to(".n-cat-i", { autoAlpha: 0, y: -60, duration: RISE * .32, ease: "power1.in" }, HOLD)
    .fromTo(".n-ci", { y: () => innerHeight }, { y: 0, duration: RISE, ease: "power2.out" }, HOLD)
    .fromTo(".n-cv", { y: () => innerHeight * 1.3 }, { y: 0, duration: RISE, ease: "power2.out" }, HOLD)
    .to(lastCard.children, { autoAlpha: 0, duration: .12 }, GROW - .12)
    .fromTo(su, { autoAlpha: 0 }, { autoAlpha: 1, duration: .001 }, GROW)
    .fromTo(su,
      { "--l": () => cardBox().x + "px", "--t": () => cardBox().y + "px", "--r": () => catPin.clientWidth - cardBox().x - cardBox().w + "px", "--b": () => catPin.clientHeight - cardBox().y - cardBox().h + "px", "--c": "16px" },
      { "--l": "0px", "--t": "0px", "--r": "0px", "--b": "0px", "--c": "0px", duration: OUT * .7, ease: "power2.inOut" }, GROW)
    .fromTo(".n-su-t > *, .n-su-f", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: .28, stagger: .05, ease: "power2.out" }, GROW + OUT * .42)
    .to({}, { duration: .001 }, TOT - .001);
  // Tab e frecce: andare a una famiglia vuol dire scorrere a metà della sua fetta
  goFam = k => {
    aim = k;
    const s = cat.scrollTrigger;
    lenis.scrollTo(s.start + (s.end - s.start) * (IN + (k + .5) * STEP) / TOT);
  };

  /* Fabbrica: una lavorazione per volta a lamelle, poi il cantiere che si apre sulle altre applicazioni */
  const fbPin = $(".n-fb-pin"), panels = $$(".n-fp"), apps = $(".n-apps"), grid = $(".n-grid"), center = $(".n-c");
  const slats = !phone;
  if (!slats) root.classList.add("n-noslats");
  const setSlat = () => { const h = Math.round(innerHeight / 12); [...panels, apps].forEach(p => p.style.setProperty("--sl", h + "px")); };
  setSlat();
  addEventListener("resize", setSlat);
  const fb = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: fbPin, start: "top top", end: () => "+=" + innerHeight * 6.4, pin: true, scrub: true, invalidateOnRefresh: true, onUpdate: () => playClip(fb.time()), onToggle: s => { if (!s.isActive) stopClips(); } } });
  const open = (el, t) => {
    if (slats) fb.fromTo(el, { "--p": 0 }, { "--p": 1, duration: .8, ease: "power1.inOut", onUpdate() { el.classList.toggle("full", this.progress() > .995); } }, t);
    else fb.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .8 }, t);
  };
  const starts = [];
  let t = .3;
  panels.forEach(p => {
    starts.push(t);
    open(p, t);
    fb.fromTo($(".n-fm", p), { scale: 1.12 }, { scale: 1, duration: 1.7 }, t);
    fb.fromTo($(".n-fw b span", p), { yPercent: 108 }, { yPercent: 0, duration: .42, ease: "power2.out" }, t + .32);
    const sub = $(".n-fw em", p);
    if (sub) fb.fromTo(sub, { autoAlpha: 0 }, { autoAlpha: 1, duration: .25 }, t + .55);
    t += 1.15;
  });
  const appsAt = t;
  open(apps, t);
  t += .8;
  const cx = () => center.offsetLeft + center.offsetWidth / 2, cy = () => center.offsetTop + center.offsetHeight / 2;
  const scale0 = () => Math.max(fbPin.clientWidth / center.offsetWidth, fbPin.clientHeight / center.offsetHeight) * 1.02;
  fb.fromTo(grid,
    { transformOrigin: () => `${cx()}px ${cy()}px`, x: () => fbPin.clientWidth / 2 - (grid.offsetLeft + cx()), y: () => fbPin.clientHeight / 2 - (grid.offsetTop + cy()), scale: scale0 },
    { transformOrigin: () => `${cx()}px ${cy()}px`, x: 0, y: 0, scale: 1, duration: 1.3, ease: "power2.inOut" }, appsAt);
  fb.fromTo(".n-c h2", { autoAlpha: 0 }, { autoAlpha: 1, duration: .4 }, t + .35);
  fb.fromTo(".n-tile b", { autoAlpha: 0 }, { autoAlpha: 1, duration: .25, stagger: .03 }, t + .4);
  fb.to({}, { duration: .35 });

  /* Clip: una sola alla volta, solo dal computer. Sul telefono resta la foto */
  const vids = panels.map(p => {
    if (phone || navigator.connection?.saveData) return null;
    const v = Object.assign(document.createElement("video"), { muted: true, loop: true, playsInline: true, preload: "none" });
    v.setAttribute("aria-hidden", "true");
    v.dataset.src = p.dataset.v;
    v.addEventListener("playing", () => { v.style.opacity = 1; });
    $(".n-fm", p).append(v);
    return v;
  });
  ScrollTrigger.create({ trigger: ".n-fb", start: "top 250%", once: true, onEnter: () => vids.forEach(v => { if (v) { v.src = v.dataset.src; v.preload = "auto"; } }) });
  let clipNow = -2;
  const stopClips = () => { clipNow = -2; vids.forEach(v => v?.pause()); };
  const playClip = time => {
    let cur = -1;
    starts.forEach((s, i) => { if (time >= s) cur = i; });
    if (time >= appsAt + .8) cur = -1;
    if (cur === clipNow) return;
    clipNow = cur;
    vids.forEach((v, i) => { if (!v) return; if (i === cur) v.play().catch(() => {}); else v.pause(); });
  };

  /* Mondo: le rotte partono da Modugno, i paesi si accendono uno per volta */
  shutter($(".n-mo .n-sh"));
  const moPin = $(".n-mo-pin"), lis = $$(".n-cl li").slice(1), arcs = $$(".n-arcs path"), Y = "#eec30d", OFF = "#2b2b29", DIM = "#8f8e88";
  const pinMap = !phone && innerHeight >= 640;
  const mo = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: pinMap ? { trigger: moPin, start: "top top", end: "+=110%", pin: true, scrub: true } : { trigger: moPin, start: "top 62%", once: true } });
  arcs.forEach((p, i) => {
    const L = p.getTotalLength(), at = i * .26, land = $$(`.nbm-land [data-iso="${others[i].dataset.iso}"]`);
    gsap.set(p, { strokeDasharray: L });
    mo.fromTo(p, { strokeDashoffset: L }, { strokeDashoffset: 0, duration: .6, ease: "power1.inOut" }, at);
    if (land.length) mo.fromTo(land, { fill: OFF }, { fill: Y, duration: .16 }, at + .46);
    mo.fromTo(others[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: .1 }, at + .48);
    mo.fromTo(lis[i], { color: DIM }, { color: "#fff", duration: .1 }, at + .48);
  });
  mo.to({}, { duration: .3 });

  /* Chiusura */
  shutter($(".n-fi .n-sh"));
  gsap.fromTo(".n-fi-f img", { scale: 1.14 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".n-fi-f", start: "top bottom", end: "bottom bottom", scrub: true } });

  // Il film della prima schermata si ferma quando non si vede
  const fv = $(".n-film video");
  new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) fv.play().catch(() => {}); else fv.pause(); })).observe(st);

  addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
