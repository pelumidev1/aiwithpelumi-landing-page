/* Prompt & Pipeline — interactions
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
  /* TODO: wire to the chosen ESP.
     - Substack: POST { email } to https://YOURPUB.substack.com/api/v1/free
     - Beehiiv / ConvertKit: swap in their embed endpoint.
     Set the endpoint below (or a data-endpoint attribute per form). */
  var ENDPOINT = "";

  document.querySelectorAll("[data-signup]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var email = input.value.trim();
      if (!email) return;

      var finish = function () {
        form.innerHTML =
          '<p class="form-success" role="status">YOU’RE IN — CHECK YOUR INBOX TO CONFIRM.</p>';
        form.classList.add("is-done");
      };

      if (ENDPOINT) {
        fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email })
        }).then(finish).catch(finish);
      } else {
        // No ESP configured yet — optimistic UI only.
        finish();
      }
    });
  });
})();
