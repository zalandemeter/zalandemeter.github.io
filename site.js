// Force landing page: the film plays muted and looped (not with reduced motion), "Sound on" restarts it with sound,
// and the copy buttons.
(function () {
  var film = document.getElementById("film");
  var sound = document.querySelector(".sound");
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (film) {
    if (still) {
      film.controls = true;               // nothing moves until asked
      if (sound) sound.hidden = true;
    } else {
      var p = film.play();
      if (p && p.catch) p.catch(function () { film.controls = true; });
    }
    if (sound) sound.addEventListener("click", function () {
      var on = film.muted;
      film.muted = !on;
      if (on) { film.currentTime = 0; film.play(); }
      sound.textContent = on ? "Sound off" : "Sound on";
      sound.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-copy"));
      var text = el.textContent.replace(/^\$\s*/, "");
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 1600);
      }, function () {});
    });
  });
})();
