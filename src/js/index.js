document.addEventListener("readystatechange", () => {
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
});
