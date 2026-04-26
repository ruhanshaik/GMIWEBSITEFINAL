// GSAP Timeline & Scroll Trigger
let tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);

const onPress = (el, handler) => {
  if (!el) return;
  el.addEventListener("click", handler);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler(e);
    }
  });
};

const debounce = (fn, wait = 150) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
};

const lenisAnimation = () => {
  let lenis;
  let rafFn;

  const initLenis = () => {
    if (window.innerWidth > 1024 && !lenis) {
      lenis = new Lenis({ duration: 2 });

      lenis.on("scroll", ScrollTrigger.update);

      rafFn = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(rafFn);
      gsap.ticker.lagSmoothing(0);
    }
  };

  const destroyLenis = () => {
    if (lenis) {
      gsap.ticker.remove(rafFn);
      lenis.destroy();
      lenis = null;
    }
  };

  initLenis();

  window.addEventListener(
    "resize",
    debounce(() => {
      if (window.innerWidth > 1024) {
        initLenis();
      } else {
        destroyLenis();
      }
    }, 200),
    { passive: true },
  );
};

const loadingAnimation = () => {
  tl.from(".about", {
    delay: 0.5,
    opacity: 0,
    duration: 0.5,
  });

  tl.from("header", {
    y: -30,
    opacity: 0,
    duration: 0.3,
  });

  if (window.innerWidth < 1024) {
    tl.from("header i", {
      y: -20,
      opacity: 0,
      duration: 0.3,
    });
  }

  tl.from("header .logo", {
    y: -20,
    opacity: 0,
    duration: 0.3,
  });

  if (window.innerWidth > 1024) {
    tl.from("ul li a", {
      y: -20,
      opacity: 0,
      duration: 0.2,
      stagger: 0.1,
    });
  }

  tl.from(".about-content h2", {
    y: -30,
    duration: 0.3,
    opacity: 0,
  });

  tl.from(".about-content h1", {
    y: -30,
    duration: 0.3,
    opacity: 0,
  });

  tl.from(".about-content .p2", {
    y: -30,
    duration: 0.3,
    opacity: 0,
  });
};

const navBarAnimation = () => {
  let menuBtn = document.querySelector(".ri-menu-4-line");
  let closeBtn = document.querySelector(".ri-close-large-fill");
  let header = document.querySelector("header");
  let navCol = document.querySelector(".navCol");
  let navLinks = document.querySelectorAll(".navCol a");

  // OPEN MENU
  const openMenu = (e) => {
    e.stopPropagation(); // important
    header.classList.add("add");
    menuBtn.style.display = "none";
    closeBtn.style.display = "block";

    gsap.from(".navCol h2", {
      delay: 0.1,
      y: -30,
      x: -30,
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
    });
  };
  onPress(menuBtn, openMenu);

  // CLOSE MENU (icon)
  const closeMenu = () => {
    header.classList.remove("add");
    menuBtn.style.display = "block";
    closeBtn.style.display = "none";
  };

  const closeMenuFromEvent = (e) => {
    e.stopPropagation();
    closeMenu();
  };
  onPress(closeBtn, closeMenuFromEvent);

  // ✅ 1. Outside click
  document.addEventListener("click", (e) => {
    if (
      header.classList.contains("add") &&
      !navCol.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // ✅ 2. Nav link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
};

const brandsAnimation = () => {
  if (window.innerWidth > 1024) {
    gsap.to(".track", {
      x: "-100%",
      duration: 40,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  } else if (window.innerWidth < 768) {
    gsap.to(".track", {
      x: "-100%",
      duration: 50,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  }
};

const whyUsAnimation = () => {
  gsap.from(".whyUsSec .allh2, .whyUsSec .allh1, .whyUsSec .allp", {
    y: -100,
    opacity: 0,
    scale: 1.3,
    scrollTrigger: {
      trigger: ".whyUsSec",
      scroller: "body",
      start: "top 90%",
      end: "top 30%",
      scrub: 2,
    },
  });

  gsap.from(".box", {
    opacity: 0,
    y: 50,
    scale: 0.7,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".box",
      scroller: "body",
      start: "top 90%",
      end: "top 70%",
      scrub: 2,
    },
  });
};

const valueAnimation = () => {
  gsap.from(".valueSec .allh2, .valueSec .allh1, .valueSec .allp", {
    y: -100,
    opacity: 0,
    scale: 1.3,
    scrollTrigger: {
      trigger: ".valueSec",
      scroller: "body",
      start: "top 90%",
      end: "top 30%",
      scrub: 2,
    },
  });

  gsap.from(".value-box", {
    opacity: 0,
    y: 50,
    scale: 0.7,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".value-box",
      scroller: "body",
      start: "top 90%",
      end: "top 70%",
      scrub: 2,
    },
  });
};

const diffrenceAnimation = () => {
  gsap.from(".diffrenceSec .allh2, .diffrenceSec .allh1, .diffrenceSec .allp", {
    y: -100,
    opacity: 0,
    scale: 1.3,
    scrollTrigger: {
      trigger: ".diffrenceSec",
      scroller: "body",
      start: "top 90%",
      end: "top 30%",
      scrub: 2,
    },
  });
};

const ourTeamAnimation = () => {
  gsap.from(".ourTeamSec .allh2, .ourTeamSec .allh1, .ourTeamSec .allp", {
    y: -100,
    opacity: 0,
    scale: 1.3,
    scrollTrigger: {
      trigger: ".ourTeamSec",
      scroller: "body",
      start: "top 90%",
      end: "top 30%",
      scrub: 2,
    },
  });

  gsap.from(".ourTeam-box", {
    opacity: 0,
    y: 50,
    scale: 0.7,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".ourTeam-box",
      scroller: "body",
      start: "top 90%",
      end: "top 70%",
      scrub: 2,
    },
  });
};

const faqsAnimation = () => {
  gsap.from(".faqSec .allh2, .faqSec .allh1, .faqSec .allp", {
    y: -100,
    opacity: 0,
    scale: 1.3,
    scrollTrigger: {
      trigger: ".faqSec",
      scroller: "body",
      start: "top 90%",
      end: "top 30%",
      scrub: 2,
    },
  });

  gsap.from(".all-ques", {
    opacity: 0,
    scale: 0.7,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".faqSec",
      scroller: "body",
      start: "top 50%",
      end: "top 20%",
      scrub: 2,
    },
  });
};

const promoAnimation = () => {
  gsap.from(".promotion", {
    opacity: 0,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".promoSec",
      scroller: "body",
      start: "top 90%",
      end: "top 50%",
      scrub: 2,
    },
  });
};

lenisAnimation();

loadingAnimation();

navBarAnimation();

brandsAnimation();

whyUsAnimation();

valueAnimation();

diffrenceAnimation();

ourTeamAnimation();

faqsAnimation();

promoAnimation();
