/* AI with Pelumi — interactions
   1. Glass cursor (fluid.glass-style lerp trail)
   2. Scroll reveals + pipeline spine
   3. FAQ accordion
   4. Signup forms (ESP endpoint pending — see TODO)
*/

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Glass cursor ---------- */

  var cursor = document.querySelector(".cursor");
  var isTouch =
    window.matchMedia("(hover: none)").matches || "ontouchstart" in window;

  if (cursor && isTouch) cursor.classList.add("is-touch");

  if (cursor && !isTouch && !reducedMotion) {
    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var x = targetX;
    var y = targetY;
    var LERP = 0.14;

    document.addEventListener("mousemove", function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      cursor.classList.add("is-visible");
    });

    document.documentElement.addEventListener("mouseleave", function () {
      cursor.classList.remove("is-visible");
    });
    document.documentElement.addEventListener("mouseenter", function () {
      cursor.classList.add("is-visible");
    });

    // Grow over interactive elements
    var HOVERABLE = "a, button, input, .faq-q";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest(HOVERABLE)) cursor.classList.add("is-hover");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest(HOVERABLE)) cursor.classList.remove("is-hover");
    });

    (function loop() {
      x += (targetX - x) * LERP;
      y += (targetY - y) * LERP;
      cursor.style.transform =
        "translate3d(" + (x - cursor.offsetWidth / 2) + "px," +
        (y - cursor.offsetHeight / 2) + "px,0)";
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- 1b. Hero ASCII globe (shopify.vc reference, our palette) ---------- */

  var globe = document.querySelector(".hero-globe");

  if (globe && globe.getContext) {
    var gctx = globe.getContext("2d");
    var CHARS = [":", "+", ">", "x", "%", "S", "#", "X"];
    var CELL = 9;
    var gsize = 0;

    var hash = function (a, b, c) {
      var n = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453;
      return n - Math.floor(n);
    };
    var smooth = function (t) { return t * t * (3 - 2 * t); };
    var lerp = function (a, b, t) { return a + (b - a) * t; };

    // 3D value noise — makes the land-mass splotches on the sphere
    var noise3 = function (x, y, z) {
      var xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
      var u = smooth(x - xi), v = smooth(y - yi), w = smooth(z - zi);
      return lerp(
        lerp(
          lerp(hash(xi, yi, zi), hash(xi + 1, yi, zi), u),
          lerp(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u), v),
        lerp(
          lerp(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u),
          lerp(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u), v),
        w);
    };

    var resizeGlobe = function () {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      gsize = globe.getBoundingClientRect().width;
      globe.width = gsize * dpr;
      globe.height = gsize * dpr;
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gctx.textAlign = "center";
      gctx.textBaseline = "middle";
      gctx.font = "9px 'Geist Mono', monospace";
    };

    var drawGlobe = function (t) {
      gctx.clearRect(0, 0, gsize, gsize);
      var R = gsize / 2 - CELL;
      var rot = t * 0.00005; // one slow revolution ≈ 2 min
      for (var gy = CELL / 2; gy < gsize; gy += CELL) {
        for (var gx = CELL / 2; gx < gsize; gx += CELL) {
          var dx = (gx - gsize / 2) / R;
          var dy = (gy - gsize / 2) / R;
          var d2 = dx * dx + dy * dy;
          if (d2 > 1) continue;
          var dz = Math.sqrt(1 - d2);
          var sx = dx * Math.cos(rot) + dz * Math.sin(rot);
          var sz = dz * Math.cos(rot) - dx * Math.sin(rot);
          var n = noise3(sx * 2.3 + 5, dy * 2.3 + 5, sz * 2.3 + 5) * 0.65 +
                  noise3(sx * 5.1, dy * 5.1, sz * 5.1) * 0.35;
          var shade = 0.35 + 0.65 * dz; // limb darkening toward the edge
          if (n <= 0.52) {
            // ocean: sparse faint specks so the sphere still reads as a ball
            if (hash(gx, gy, 7) > 0.07) continue;
            gctx.fillStyle = "rgba(80, 80, 80, 0.2)";
            gctx.fillText(":", gx, gy);
            continue;
          }
          var v = Math.min(0.999, ((n - 0.52) / 0.3) * shade);
          var alpha = 0.14 + 0.36 * shade;
          gctx.fillStyle = hash(gy, gx, 3) < 0.05
            ? "rgba(229, 136, 72, " + (alpha + 0.12) + ")"
            : "rgba(15, 15, 15, " + alpha + ")";
          gctx.fillText(CHARS[Math.floor(v * CHARS.length)], gx, gy);
        }
      }
    };

    resizeGlobe();

    if (reducedMotion) {
      drawGlobe(0);
      window.addEventListener("resize", function () { resizeGlobe(); drawGlobe(0); });
    } else {
      var lastFrame = 0;
      var spin = function (t) {
        if (t - lastFrame > 40) { // ~25fps is plenty for this
          lastFrame = t;
          drawGlobe(t);
        }
        requestAnimationFrame(spin);
      };
      window.addEventListener("resize", resizeGlobe);
      requestAnimationFrame(spin);
    }
  }

  /* ---------- 2. Scroll reveals + spine ---------- */

  var observed = document.querySelectorAll("[data-reveal], .spine");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    observed.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -5% 0px" }
    );
    observed.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 3. FAQ accordion ---------- */

  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var isOpen = btn.getAttribute("aria-expanded") === "true";

      // Close any other open item
      document.querySelectorAll(".faq-item.is-open").forEach(function (open) {
        if (open !== item) {
          open.classList.remove("is-open");
          open.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        }
      });

      btn.setAttribute("aria-expanded", String(!isOpen));
      item.classList.toggle("is-open", !isOpen);
    });
  });

  /* ---------- 4. Signup forms ---------- */
  /* Substack's signup API sits behind bot protection (403s on direct
     POSTs), so a hidden fetch would silently drop emails. Instead we hand
     the visitor to Substack's own subscribe page with the email
     pre-filled — their flow captures it reliably every time. */
  var SUBSTACK = "https://pelumidev.substack.com";

  document.querySelectorAll("[data-signup]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var email = input.value.trim();
      if (!email) return;

      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "One sec…"; }

      window.location.href =
        SUBSTACK + "/subscribe?email=" + encodeURIComponent(email) +
        "&utm_source=aiwithpelumi.com";
    });
  });

  /* ---------- 5. Button press/release sounds ---------- */
  /* aiwithremy.com-style retro clicks, but synthesized with WebAudio
     instead of MP3 assets: nothing to download, plays instantly, and the
     context is created inside the first user gesture so autoplay policies
     never block it. Press is a bright tick, release a softer one. */
  var soundCtx = null;

  function clickTick(freq, peak, dur) {
    try {
      soundCtx = soundCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (soundCtx.state === "suspended") soundCtx.resume();
      var t = soundCtx.currentTime;
      var osc = soundCtx.createOscillator();
      var gain = soundCtx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.45, t + dur);
      gain.gain.setValueAtTime(peak, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain);
      gain.connect(soundCtx.destination);
      osc.start(t);
      osc.stop(t + dur);
    } catch (err) { /* no sound support — stay silent */ }
  }

  function pressSound()   { clickTick(900, 0.10, 0.05); }
  function releaseSound() { clickTick(620, 0.07, 0.045); }

  var PRESSABLE = "button, .btn-touch, .social-tile";
  var touchActive = false; // skip the synthetic mouse events after touch

  document.addEventListener("touchstart", function (e) {
    if (e.target.closest(PRESSABLE)) { touchActive = true; pressSound(); }
  }, { passive: true });

  document.addEventListener("touchend", function (e) {
    if (e.target.closest(PRESSABLE)) releaseSound();
  }, { passive: true });

  document.addEventListener("mousedown", function (e) {
    if (touchActive) return;
    if (e.target.closest(PRESSABLE)) pressSound();
  });

  document.addEventListener("mouseup", function (e) {
    if (touchActive) { touchActive = false; return; }
    if (e.target.closest(PRESSABLE)) releaseSound();
  });

  document.addEventListener("keydown", function (e) {
    if (e.repeat || (e.key !== "Enter" && e.key !== " ")) return;
    if (e.target.closest && e.target.closest(PRESSABLE)) pressSound();
  });

  document.addEventListener("keyup", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (e.target.closest && e.target.closest(PRESSABLE)) releaseSound();
  });

  /* ---------- 6. Timed signup popup ---------- */
  /* Opens once per page load, 5 seconds in. No storage on purpose —
     every reload gets exactly one invite. The × button, the backdrop,
     or Esc closes it. */

  var popup = document.getElementById("signup-popup");

  if (popup) {
    var popupShown = false;

    var openPopup = function () {
      if (popupShown) return;
      // never interrupt someone already typing into a signup form
      var active = document.activeElement;
      if (active && active.closest && active.closest(".signup-form")) {
        setTimeout(openPopup, 4000);
        return;
      }
      popupShown = true;
      popup.hidden = false;
      document.body.classList.add("popup-open");
      requestAnimationFrame(function () { popup.classList.add("is-open"); });
      var card = popup.querySelector(".signup-popup-card");
      if (card) card.focus({ preventScroll: true });
    };

    var closePopup = function () {
      popup.classList.remove("is-open");
      document.body.classList.remove("popup-open");
      setTimeout(function () { popup.hidden = true; }, 250);
    };

    setTimeout(openPopup, 5000);

    popup.querySelectorAll("[data-popup-close]").forEach(function (el) {
      el.addEventListener("click", closePopup);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !popup.hidden) closePopup();
    });
  }
})();
