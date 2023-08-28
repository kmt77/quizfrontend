const navMenu = document.querySelector(".nav_menu");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav_item").forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});
