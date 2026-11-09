// Chi siamo: la stessa scena della home, con i testi e i punti della cliente.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const anim = window.gsap && window.ScrollTrigger && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  const flat = matchMedia("(max-width: 900px), (max-height: 620px)").matches; // shortcut: si decide al caricamento, ruotando il telefono resta la scelta iniziale

  wordSpans($(".n-m"));

  // Barre e filiera partono quando il pannello si vede: vale sia coi pannelli fissati sia scorrendo
  const seen = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); seen.unobserve(e.target); } }), { threshold: .4 });
  $$(".c-p").forEach(p => seen.observe(p));

  /* Valori: la parola al centro dello schermo è attiva; le tacche ai lati seguono l'avanzamento */
  const box = $(".vals"), list = $("ul", box), items = [...list.children], cols = $$(".ticks", box);
  const desk = matchMedia("(min-width: 901px) and (min-height: 621px)");
  let ticks = [];
  const buildTicks = () => {
    const n = Math.max(12, Math.round(list.offsetHeight / 9));
    cols.forEach(c => { c.innerHTML = "<i></i>".repeat(n); });
    ticks = cols.map(c => [...c.children]);
  };
  const updateVals = () => {
    if (!desk.matches) return;
    const mid = innerHeight / 2, r = list.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
    let best = 0, bd = Infinity;
    items.forEach((li, i) => { const b = li.getBoundingClientRect(), d = Math.abs(b.top + b.height / 2 - mid); if (d < bd) { bd = d; best = i; } });
    items.forEach((li, i) => li.classList.toggle("on", i === best));
    ticks.forEach(col => {
      const at = Math.round(p * (col.length - 1));
      col.forEach((t, i) => { const d = Math.abs(i - at); t.className = d === 0 ? "xxl" : d === 1 ? "xl" : d === 2 ? "l" : d === 3 ? "m" : ""; });
    });
  };
  buildTicks();
  updateVals();
  addEventListener("scroll", updateVals, { passive: true });
  addEventListener("resize", () => { buildTicks(); updateVals(); });

  if (!anim) {
    root.classList.add("n-static");
    return;
  }

  /* ---------- Da qui solo movimento ---------- */
  smoothScroll();

  /* Apertura: il titolo entra, poi la foto nella frase si apre a tutto schermo */
  gsap.fromTo(".n-mw", { opacity: .08 }, { opacity: 1, duration: .5, stagger: .05, ease: "none" });
  gsap.fromTo(".n-t:not(#apSlot), .c-ph", { scale: 0 }, { scale: 1, duration: .7, delay: .25, stagger: .15, ease: "power2.out" });

  const st = $(".n-ap-st"), film = $(".c-ph"), slot = $("#apSlot"), GAP = 10;
  const toSlot = k => () => {
    const s = st.getBoundingClientRect(), r = slot.getBoundingClientRect();
    return { left: r.left - s.left, top: r.top - s.top, width: r.width, height: r.height }[k];
  };
  const open = gsap.timeline({ scrollTrigger: { trigger: flat ? st : ".c-ap-pin", start: "top top", end: flat ? "+=90%" : "+=240%", pin: true, scrub: true, invalidateOnRefresh: true } });
  open
    .fromTo(film, { left: toSlot("left"), top: toSlot("top"), width: toSlot("width"), height: toSlot("height"), "--cut": () => parseFloat(getComputedStyle(slot).fontSize) * .17 + "px" },
      { left: GAP, top: GAP, width: () => st.clientWidth - 2 * GAP, height: () => st.clientHeight - 2 * GAP, "--cut": "36px", duration: 1, ease: "power2.inOut" }, 0)
    .fromTo(".c-ph i", { opacity: 0 }, { opacity: 1, duration: .3 }, flat ? 1 : 1.35);
  // Prima si guarda lo stabilimento con la sua insegna, poi arrivano testo e scheda
  if (!flat) {
    open
      .fromTo(".c-ap-h", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .25, ease: "power2.out" }, 1.4)
      .fromTo(".c-sheet", { y: () => innerHeight }, { y: 0, duration: .5, ease: "power2.out" }, 1.4)
      .to({}, { duration: .3 });
  }

  /* I quattro punti: titolo sul giallo, poi un pannello alla volta. Alla fine il giallo lascia il posto al chiaro della sezione dopo */
  shutter($(".c-pts .n-sh"));
  if (!flat) {
    const pin = $(".c-pts .n-cat-pin"), panels = $$(".c-p");
    const HOLD = .3, RISE = .75, REST = .45, FADE = .35;
    const END = HOLD + panels.length * (RISE + REST);
    const pts = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: pin, start: "top top", end: () => "+=" + innerHeight * (END + FADE), pin: true, scrub: true, invalidateOnRefresh: true } });
    pts.to(".c-pts .n-cat-i", { autoAlpha: 0, y: -60, duration: RISE * .32, ease: "power1.in" }, HOLD);
    panels.forEach((p, i) => pts.fromTo(p, { y: () => innerHeight }, { y: 0, duration: RISE, ease: "power2.out" }, HOLD + i * (RISE + REST)));
    pts.to(pin, { backgroundColor: "#f2f0eb", duration: FADE }, END);
  }

  /* Le altre lamelle e le foto che si assestano */
  shutter($(".c-vl .n-sh"));
  shutter($(".c-tm .n-sh"));
  shutter($(".c-fi .n-sh"));
  $$(".c-mi img, .c-tm .n-fi-f img").forEach(img => gsap.fromTo(img, { scale: 1.14 }, { scale: 1, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom bottom", scrub: true } }));

  addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
