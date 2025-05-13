document.addEventListener("readystatechange", () => {
  // Mobile nav toggle
  document.querySelector(".mobile-nav-btn").addEventListener("click", () => {
    const ul = document.querySelector("nav ul");
    if (ul.classList.contains("open")) {
      ul.classList.remove("open");
      ul.classList.remove("opened");
    } else {
      ul.classList.add("open");
      setTimeout(() => {
        ul.classList.add("opened");
      }, 100);
    }
  });

  // Language switch toggle
  document
    .querySelector(".language-switch-btn")
    .addEventListener("click", () => {
      const menu = document.querySelector("nav .language-switch");
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        menu.classList.remove("opened");
      } else {
        menu.classList.add("open");
        setTimeout(() => {
          menu.classList.add("opened");
        }, 100);
      }
    });
});
