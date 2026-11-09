// Livello di animazioni (GSAP + ScrollTrigger + Lenis, le stesse librerie del sito).
// Togliendo questo file e i tre script CDN le pagine tornano alla versione senza animazioni allo scroll.
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const $ = (s, r = document) => [...r.querySelectorAll(s)];

  // Scroll fluido (come sul sito), sincronizzato con ScrollTrigger; anche le ancore passano da Lenis
  if (window.Lenis && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.documentElement.style.scrollBehavior = "auto";
  }

  const enter = (el, { trigger, ...vars }, start = "top 85%") => {
    const targets = el instanceof Element ? [el] : [...el];
    if (targets.length) gsap.from(targets, { ...vars, scrollTrigger: { trigger: trigger || targets[0], start, once: true } });
  };

  const mm = gsap.matchMedia();
  mm.add({ motion: "(prefers-reduced-motion: no-preference)", desk: "(min-width: 861px) and (pointer: fine)" }, ({ conditions: c }) => {
    if (!c.motion) return;

    // Foto: si aprono dal basso (clip) e si assestano dalla scala
    $(".why-img img, .std .side img, .news img, .mv img, .team figure img, .idcard figure img, .mf-pic img, .nw-row .pic img, .nw-item .pic img").forEach(img =>
      gsap.fromTo(img, { clipPath: "inset(100% 0% 0% 0%)", scale: c.desk ? 1.18 : 1 }, {
        clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.5, ease: "power4.out",
        scrollTrigger: { trigger: img, start: "top 88%", once: true }
      }));

    // Numeri del "Perché": entrano uno dopo l'altro (senza contatori)
    $(".stats").forEach(s => enter(s.children, { trigger: s, y: 50, autoAlpha: 0, duration: 1, stagger: .12, ease: "power3.out" }, "top 90%"));

    // Prodotti: i disegni scorrono in posizione come un'asta che entra
    $(".pcard").forEach((card, i) => enter(card.querySelector(".pic"), { trigger: card, xPercent: -35, autoAlpha: 0, duration: 1.4, delay: (i % 3) * .1, ease: "expo.out" }));

    // Flussi (su misura, filiera, lavorazioni, scheda azienda): voci in sequenza
    $(".flow, .inputs").forEach(f => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: f, start: "top 85%", once: true } });
      tl.from($("li:not(.to):not(.res)", f), { y: 30, autoAlpha: 0, duration: .7, stagger: .1, ease: "power3.out" })
        .from($(".to i", f), { x: -24, autoAlpha: 0, duration: .5, ease: "power2.out" }, "-=.2")
        .from($(".res", f), { clipPath: "inset(0% 100% 0% 0%)", duration: .9, ease: "power4.inOut" }, "-=.15");
    });
    $(".steps").forEach(s => enter(s.children, { trigger: s, y: 24, autoAlpha: 0, duration: .6, stagger: .06, ease: "power3.out" }));
    $(".chain").forEach(s => enter(s.children, { trigger: s, y: 20, autoAlpha: 0, duration: .7, stagger: .25, delay: .2, ease: "power3.out" }));
    $(".sheet dl").forEach(s => enter(s.children, { trigger: s, y: 18, autoAlpha: 0, duration: .7, stagger: .08, delay: .2, ease: "power3.out" }));
    $(".eco > *").forEach((el, i) => enter(el, { y: 30, autoAlpha: 0, duration: .9, delay: i * .12, ease: "power3.out" }));

    // Mappa: i paesi si accendono uno alla volta, poi compaiono i punti e l'elenco
    $(".nbm").forEach(map => {
      const land = getComputedStyle(map).getPropertyValue("--nbm-land").trim() || "#dcdcd7";
      const tl = gsap.timeline({ scrollTrigger: { trigger: map, start: "top 70%", once: true } });
      const lit = $(".nbm-spot", map).flatMap(s => $(`.nbm-land [data-iso="${s.dataset.iso}"]`, map));
      tl.from(lit, { fill: land, duration: .6, stagger: .08, ease: "power1.out" })
        .from($(".nbm-spot", map), { autoAlpha: 0, duration: .4, stagger: .05 }, "-=.6");
    });
    $(".countries").forEach(s => enter(s.children, { trigger: s, y: 14, autoAlpha: 0, duration: .5, stagger: .04, ease: "power2.out" }, "top 92%"));

    if (!c.desk) return;

    // Hero: allo scroll il testo sale e sfuma, il video si avvicina
    const hero = document.querySelector(".hero");
    if (hero) {
      const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero .wrap", { yPercent: -18, autoAlpha: 0, ease: "none", scrollTrigger: st });
      gsap.to(".hero video", { scale: 1.12, ease: "none", scrollTrigger: st });
    }

    // Foto grande del "Perché": parallasse leggera dentro la cornice
    $(".why-img").forEach(w => gsap.fromTo(w.querySelector("img"), { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: w, start: "top bottom", end: "bottom top", scrub: true } }));

    // "Oltre lo standard": le due righe si allontanano mentre scorri
    $(".std h2").forEach(h => {
      const [a, b] = h.querySelectorAll(".ln");
      const st = { trigger: h, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(a, { xPercent: 0 }, { xPercent: -6, ease: "none", scrollTrigger: st });
      gsap.fromTo(b, { xPercent: 0 }, { xPercent: 8, ease: "none", scrollTrigger: st });
    });

    // Bottoni calamita (solo mouse)
    $("main .btn").forEach(btn => {
      const x = gsap.quickTo(btn, "x", { duration: .5, ease: "power3.out" }), y = gsap.quickTo(btn, "y", { duration: .5, ease: "power3.out" });
      btn.addEventListener("pointermove", e => { const r = btn.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .25); y((e.clientY - r.top - r.height / 2) * .35); });
      btn.addEventListener("pointerleave", () => { x(0); y(0); });
    });
  });

  addEventListener("load", () => ScrollTrigger.refresh());
})();
