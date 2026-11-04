// Force landing page: the intro plays once (not for reduced motion), a replay button afterwards, the copy button.
(function () {
  var video = document.getElementById("intro");
  var replay = document.querySelector(".replay");
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (video && replay) {
    var show = function () { replay.hidden = false; };
    video.addEventListener("ended", show);
    replay.addEventListener("click", function () {
      replay.hidden = true;
      video.currentTime = 0;
      video.play();
    });
    if (still) {
      replay.textContent = "Play the intro";
      show();                           // the poster (the wordmark at rest) stays until asked
    } else {
      var p = video.play();
      if (p && p.catch) p.catch(show);  // autoplay refused: offer it
    }
  }

  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-copy"));
      var text = el.textContent.replace(/^\$\s*/, "");
      var done = function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
    });
  });
})();
