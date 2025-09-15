function animateStat(stat) {
  const target = Number(stat.getAttribute("data-target"));
  const precision = Number(stat.getAttribute("data-precision") ?? 0);
  const current = Number(stat.getAttribute("data-current") ?? stat.innerText);
  const increment = (target - current) / 50;

  if (increment > 0.01) {
    stat.setAttribute("data-current", current + increment);
    stat.innerText = (current + increment).toFixed(precision);
    window.requestAnimationFrame(() => animateStat(stat));
  } else {
    stat.innerText = target;
    stat.classList.add("in");
  }
}

window.addEventListener("load", () => {
  // Smooth anchor scroll
  document.querySelectorAll('a[href*="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.getAttribute("href").split("#")[1];
      const el = document.getElementById(id);
      const top = el.offsetTop - 50;
      window.scroll({
        top,
        left: 0,
        behavior: "smooth",
      });
    });
  });

  document.querySelector("#landing").classList.add("in");

  const statObserver = new IntersectionObserver(
    function (entries, fadeInObserver) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          var el = entry.target;
          if (el.classList.contains("animate")) {
            el.classList.remove("animate");
            window.requestAnimationFrame(() => animateStat(el));
          }
          statObserver.unobserve(el);
        }
      });
    },
    {
      rootMargin: "-25px",
    }
  );

  document
    .querySelectorAll(".stat-number.animate")
    .forEach((el) => statObserver.observe(el));
});
