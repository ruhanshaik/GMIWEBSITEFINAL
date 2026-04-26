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
  tl.from(".hero", {
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

  tl.from(".hero-content .p1", {
    y: -30,
    duration: 0.3,
    opacity: 0,
  });

  tl.from(".hero-content h1", {
    y: -30,
    duration: 0.3,
    opacity: 0,
  });

  tl.from(".hero-content .p2", {
    y: -30,
    duration: 0.3,
    opacity: 0,
  });

  tl.from(".btn-set", {
    scale: 0.8,
    opacity: 0,
    duration: 0.4,
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
    e.stopPropagation();
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

const cursorAnimation = () => {
  let sec = document.querySelector(".heroSec");
  let cursor = document.querySelector(".cursor");
  if (!sec || !cursor) return;

  let rafId = 0;
  let lastX = 0;
  let lastY = 0;

  const schedule = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      gsap.to(cursor, {
        x: lastX,
        y: lastY,
        opacity: 1,
        overwrite: true,
        duration: 0.12,
      });
    });
  };

  sec.addEventListener("mousemove", (dets) => {
    lastX = dets.x;
    lastY = dets.y;
    schedule();
  });

  sec.addEventListener("mouseleave", (dets) => {
    gsap.to(cursor, {
      opacity: 0,
      overwrite: true,
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

const serviceAnimation = () => {
  gsap.from(".servicesSec .allh2, .servicesSec .allh1, .servicesSec .allp", {
    y: -100,
    opacity: 0,
    scale: 1.3,
    scrollTrigger: {
      trigger: ".servicesSec",
      scroller: "body",
      start: "top 90%",
      end: "top 30%",
      scrub: 2,
    },
  });

  gsap.from(".serv1", {
    opacity: 0,
    y: 50,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".serv1",
      scroller: "body",
      top: "top 70%",
      end: "top 60%",
      scrub: 2,
    },
  });

  gsap.from(".serv2", {
    opacity: 0,
    y: 50,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".serv2",
      scroller: "body",
      top: "top 70%",
      end: "top 60%",
      scrub: 2,
    },
  });

  gsap.from(".serv3", {
    opacity: 0,
    y: 50,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".serv3",
      scroller: "body",
      top: "top 70%",
      end: "top 60%",
      scrub: 2,
    },
  });

  gsap.from(".serv4", {
    opacity: 0,
    y: 50,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".serv4",
      scroller: "body",
      top: "top 70%",
      end: "top 60%",
      scrub: 2,
    },
  });
};

const processAnimation = () => {
  gsap.from(".processSec .allh2, .processSec .allh1, .processSec .allp", {
    y: -100,
    opacity: 0,
    scale: 1.3,
    scrollTrigger: {
      trigger: ".processSec",
      scroller: "body",
      start: "top 90%",
      end: "top 30%",
      scrub: 2,
    },
  });

  gsap.from(".step1", {
    opacity: 0,
    y: 50,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".step1",
      scroller: "body",
      top: "top 70%",
      end: "top 60%",
      scrub: 2,
    },
  });

  gsap.from(".step2", {
    opacity: 0,
    y: 50,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".step2",
      scroller: "body",
      top: "top 70%",
      end: "top 60%",
      scrub: 2,
    },
  });

  gsap.from(".step3", {
    opacity: 0,
    y: 50,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".step3",
      scroller: "body",
      top: "top 70%",
      end: "top 60%",
      scrub: 2,
    },
  });

  gsap.from(".step4", {
    opacity: 0,
    y: 50,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".step4",
      scroller: "body",
      top: "top 70%",
      end: "top 60%",
      scrub: 2,
    },
  });
};

const casesAnimation = () => {

  // HEADING ANIMATION
  gsap.from(".casesSec .allh2, .casesSec .allh1, .casesSec .allp", {
    y: -100,
    opacity: 0,
    scale: 1.3,
    scrollTrigger: {
      trigger: ".casesSec",
      scroller: "body",
      start: "top 90%",
      end: "top 30%",
      scrub: 2,
    },
  });

  // DESKTOP ALL CARDS ANIMATION
  if (window.innerWidth > 767) {
    gsap.from(".mainCaseRow", {
      opacity: 0,
      y: 50,
      scale: 0.7,
      scrollTrigger: {
        trigger: ".casesSec",
        scroller: "body",
        start: "top 30%",
        end: "top 10%",
        scrub: 2,
      },
    });
  }

  // MOBILE INDIVIDUAL ANIMATION
  if (window.innerWidth < 768) {
    [".Case1", ".Case2", ".Case3", ".Case4"].forEach((cls) => {
      gsap.from(cls, {
        opacity: 0,
        y: 50,
        scale: 0.7,
        scrollTrigger: {
          trigger: cls,
          scroller: "body",
          start: "top 60%",
          end: "top 40%",
          scrub: 2,
        },
      });
    });
  }

  // 🔥 SLIDER ONLY FOR DESKTOP
  if (window.innerWidth > 767) {
    const track = document.querySelector(".caseTrack");
    const slides = document.querySelectorAll(".mainCaseRow");

    let index = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function updateSlide() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    // START DRAG
    track.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      track.style.cursor = "grabbing";
    });

    // DRAG MOVE
    track.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      currentX = e.clientX;
    });

    // END DRAG
    const endDrag = () => {
      if (!isDragging) return;

      let diff = startX - currentX;

      if (diff > 50) index++;
      else if (diff < -50) index--;

      // 🔁 LOOP
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;

      updateSlide();

      isDragging = false;
      track.style.cursor = "grab";
    };

    track.addEventListener("mouseup", endDrag);
    track.addEventListener("mouseleave", endDrag);

    // TOUCH SUPPORT (optional desktop touchscreens)
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
      let endX = e.changedTouches[0].clientX;
      let diff = startX - endX;

      if (diff > 50) index++;
      else if (diff < -50) index--;

      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;

      updateSlide();
    }, { passive: true });
  }
};

const benefitsAnimation = () => {
  gsap.from(".benefitsSec .allh2, .benefitsSec .allh1, .benefitsSec .allp", {
    y: -100,
    opacity: 0,
    scale: 1.3,
    scrollTrigger: {
      trigger: ".benefitsSec",
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

const pricingAnimation = () => {
  gsap.from(
    ".pricingSec .allh2, .pricingSec .allh1, .pricingSec .allp, .pricingMethod",
    {
      y: -100,
      opacity: 0,
      scale: 1.3,
      scrollTrigger: {
        trigger: ".pricingSec",
        scroller: "body",
        start: "top 90%",
        end: "top 30%",
        scrub: 2,
      },
    },
  );

  if (window.innerWidth > 1024) {
    gsap.from(".landing, .elite, .custom", {
      opacity: 0,
      scale: 0.7,
      scrollTrigger: {
        trigger: ".pricingSec",
        scroller: "body",
        start: "top 90%",
        end: "top 70%",
        scrub: 2,
      },
    });
  }

  if (window.innerWidth < 768) {
    gsap.from(".landing", {
      opacity: 0,
      scale: 0.7,
      scrollTrigger: {
        trigger: ".landing",
        scroller: "body",
        start: "top 70%",
        end: "top 50%",
        scrub: 2,
      },
    });
  }

  if (window.innerWidth < 768) {
    gsap.from(".elite", {
      opacity: 0,
      scale: 0.7,
      scrollTrigger: {
        trigger: ".elite",
        scroller: "body",
        start: "top 70%",
        end: "top 50%",
        scrub: 2,
      },
    });
  }

  if (window.innerWidth < 768) {
    gsap.from(".custom", {
      opacity: 0,
      scale: 0.7,
      scrollTrigger: {
        trigger: ".custom",
        scroller: "body",
        start: "top 70%",
        end: "top 50%",
        scrub: 2,
      },
    });
  }

  const priceMethod = () => {
    let toggleBtn = document.querySelector(".togglebtn");
    let white = document.querySelector(".white");
    let annually = document.querySelectorAll(".anually");
    let monthly = document.querySelectorAll(".monthly");

    const toggle = () => {
      toggleBtn.classList.toggle("black");
      white.classList.toggle("left");

      annually.forEach((el) => el.classList.toggle("remove"));
      monthly.forEach((el) => el.classList.toggle("remove"));
      if (toggleBtn && toggleBtn.getAttribute("role") === "switch") {
        toggleBtn.setAttribute(
          "aria-checked",
          toggleBtn.classList.contains("black") ? "true" : "false",
        );
      }
    };

    onPress(toggleBtn, toggle);
  };

  priceMethod();
};

const testimonialsAnimation = () => {
  gsap.from(
    ".testimonialSec .allh2, .testimonialSec .allh1, .testimonialSec .allp",
    {
      y: -100,
      opacity: 0,
      scale: 1.3,
      scrollTrigger: {
        trigger: ".testimonialSec",
        scroller: "body",
        start: "top 90%",
        end: "top 30%",
        scrub: 2,
      },
    },
  );

  gsap.from(".Reviewrow", {
    opacity: 0,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".testimonialSec",
      scroller: "body",
      start: "top 50%",
      end: "top 20%",
      scrub: 2,
    },
  });

  gsap.from(".Reviewrow2", {
    opacity: 0,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".testimonialSec",
      scroller: "body",
      start: "top 20%",
      end: "top -10%",
      scrub: 2,
    },
  });

  if (window.innerWidth > 1024) {
    gsap.to(".Reviewrow", {
      x: "-170%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  }

  if (window.innerWidth > 767 && window.innerWidth < 1025) {
    gsap.to(".Reviewrow", {
      x: "-250%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  }

  if (window.innerWidth > 1024) {
    gsap.to(".Reviewrow2", {
      x: "170%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  }

  if (window.innerWidth > 767 && window.innerWidth < 1025) {
    gsap.to(".Reviewrow2", {
      x: "250%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  }

  if (window.innerWidth < 768) {
    gsap.to(".Reviewrow", {
      x: "-340%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  }

  if (window.innerWidth < 768) {
    gsap.to(".Reviewrow2", {
      x: "340%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  }
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

cursorAnimation();

brandsAnimation();

serviceAnimation();

processAnimation();

casesAnimation();

benefitsAnimation();

pricingAnimation();

testimonialsAnimation();

faqsAnimation();

promoAnimation();
