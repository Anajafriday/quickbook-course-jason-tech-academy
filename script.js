const sections = document.querySelectorAll(".section");
const learnMoreBtn = document.querySelector(".learn-more");
const aboutSection = document.querySelector("#about-section");
const navLinks = document.querySelectorAll(".nav-list");
const testimonies = document.querySelectorAll(".testimony-col");
const dotsContainer = document.querySelector(".dot--container");
const nextSlideBtn = document.querySelector(".next-slide-btn");
const navBtn = document.querySelector(".nav--btn");
const navContainer = document.querySelector(".nav-el");
const overlay = document.querySelector(".overlay");
const navbtns = document.querySelectorAll(".btn-nav ");

const toggleBtn = (openBtn, closeBtn) => {
  openBtn?.classList.toggle("hide");
  closeBtn?.classList.toggle("hide");
};
const toggleNav = function (openBtn, closeBtn) {
  console.log(openBtn, closeBtn);
  navContainer.classList.toggle("open-nav");
  toggleBtn(openBtn, closeBtn);
};

overlay.addEventListener("click", (e) => {
  e.currentTarget.classList.add("hide");
  toggleNav(navbtns[0], navbtns[1]);
});
const getNAvBTn = function () {
  navBtn.addEventListener("click", function (e) {
    const openBtn = e.currentTarget.querySelector(".nav--open");
    const closeBtn = e.currentTarget.querySelector(".nav--close");
    if (e.target.classList.contains("nav--open")) {
      toggleNav(openBtn, closeBtn);
      overlay.classList.remove("hide");
    }
    if (e.target.classList.contains("nav--close")) {
      toggleNav(openBtn, closeBtn);
      overlay.classList.add("hide");
    }
  });
};
getNAvBTn();
const callBack = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("transform");
  observer.unobserve(entry.target);
};

const sectionObsever = new IntersectionObserver(callBack, {
  root: null,
  threshold: 0.2,
});
sections.forEach((section) => sectionObsever.observe(section));

learnMoreBtn.addEventListener("click", function (e) {
  e.preventDefault();
  aboutSection.scrollIntoView({
    behavior: "smooth",
  });
});

navLinks.forEach((links) => {
  links.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("list-link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
    if (e.target.classList.contains("head-link")) {
      toggleNav(navbtns[0], navbtns[1]);
      navContainer.classList.remove("open-nav");
    }
  });
});
/*
const getDots = function () {
  testimonies.forEach((_, i) =>
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="dot dot--active" data-slide="${i}"></div>`
    )
  );
};

getDots();
const activateDot = function (slide) {
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("dot--active"));
  document
    .querySelector(`.dot[data-slide="${slide}"]`)
    .classList.add("dot--active");
}; */
const goToSlide = function (slide) {
  testimonies.forEach((testimony, i) => {
    testimony.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
// activateDot(1);

let numSlide = testimonies.length - 1;
const mediaQuery = window.matchMedia("(max-width:788px)");
goToSlide(1);

// document.querySelector(".testimonial-row").classList.remove("row");
if (mediaQuery) {
  goToSlide(0);
  numSlide += 1;
  testimonies.forEach((slide) => {
    slide.addEventListener("touchstart", () => {
      nextSlide();
    });
  });
}

let currSlide = 1;
const nextSlide = function () {
  if (currSlide === numSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
  // activateDot(currSlide);
};

nextSlideBtn.addEventListener("click", nextSlide);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  }
});
