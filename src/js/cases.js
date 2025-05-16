function calcWidth(img) {
  const rect = img.getBoundingClientRect();

  const h = img.classList.contains("active") ? 400 : 350;

  return (rect.width / rect.height) * h;
}

function calcOffset(imgs, id) {
  let offset = window.innerWidth / 2;
  for (const img of imgs) {
    if (img.getAttribute("data-id") != id) {
      offset -= calcWidth(img) + 20;
    } else {
      offset -= calcWidth(img) / 2;
      return offset;
    }
  }
}

const onResize = () => {
  document.querySelectorAll(".case-screens").forEach((cases) => {
    const offset = calcOffset(cases.querySelectorAll("img"), "2");

    cases
      .querySelector(".case-images")
      .setAttribute("style", `transform:translateX(${offset}px)`);
  });
};

window.addEventListener("load", () => {
  document
    .querySelectorAll(".case-screens .btn, .case-screens img")
    .forEach((el) => {
      el.addEventListener("click", () => {
        if (el.classList.contains("active")) {
          return;
        } else {
          // Set active classes
          const id = el.getAttribute("data-id");
          const cases = el.parentElement.parentElement;
          const activeImg = cases.querySelector("img.active");
          const targetImg = cases.querySelector(`img[data-id="${id}"]`);
          const activeBtn = cases.querySelector(".btn.active");
          const targetBtn = cases.querySelector(`.btn[data-id="${id}"]`);
          activeBtn.classList.remove("active");
          activeImg.classList.remove("active");
          targetImg.classList.add("active");
          targetBtn.classList.add("active");

          // Set transform
          const offset = calcOffset(cases.querySelectorAll("img"), id);
          cases
            .querySelector(".case-images")
            .setAttribute("style", `transform:translateX(${offset}px)`);
        }
      });
    });

  window.addEventListener("resize", onResize);

  onResize();
});
