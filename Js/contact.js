let tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);

// ---------------- HELPERS ----------------
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

// ---------------- LENIS ----------------
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
      if (window.innerWidth > 1024) initLenis();
      else destroyLenis();
    }, 200),
    { passive: true }
  );
};

// ---------------- LOADING ----------------
const loadingAnimation = () => {
  tl.from(".contact", { delay: 0.5, opacity: 0, duration: 0.5 });
  tl.from("header", { y: -30, opacity: 0, duration: 0.3 });

  if (window.innerWidth < 1024) {
    tl.from("header i", { y: -20, opacity: 0, duration: 0.3 });
  }

  tl.from("header .logo", { y: -20, opacity: 0, duration: 0.3 });

  if (window.innerWidth > 1024) {
    tl.from("ul li a", {
      y: -20,
      opacity: 0,
      duration: 0.2,
      stagger: 0.1,
    });
  }

  tl.from(".contact-content h2", { y: -30, opacity: 0 });
  tl.from(".contact-content h1", { y: -30, opacity: 0 });
  tl.from(".contact-content .allp", { y: -30, opacity: 0 });
  tl.from(".form-content", { y: -30, opacity: 0 });
};

// ---------------- NAV ----------------
const navBarAnimation = () => {
  let menuBtn = document.querySelector(".ri-menu-4-line");
  let closeBtn = document.querySelector(".ri-close-large-fill");
  let header = document.querySelector("header");
  let navCol = document.querySelector(".navCol");
  let navLinks = document.querySelectorAll(".navCol a");

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

  const closeMenu = () => {
    header.classList.remove("add");
    menuBtn.style.display = "block";
    closeBtn.style.display = "none";
  };

  onPress(menuBtn, openMenu);
  onPress(closeBtn, closeMenu);

  document.addEventListener("click", (e) => {
    if (
      header.classList.contains("add") &&
      !navCol.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
};

// ---------------- FORM (FIXED) ----------------
const contactForm = () => {
  const form = document.querySelector("#contactForm");
  const submitBtn = document.querySelector("#submit");

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3GUeIseQoOs6hU_bRGXJMBncHu-aL-5dLwVT7BrbRNGF9emiuBhmkLiNuuOMJJ71e/exec";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✅ FORM DATA (IMPORTANT FIX)
    const formData = new FormData();
    formData.append("firstName", document.querySelector("#firstName").value.trim());
    formData.append("lastName", document.querySelector("#lastName").value.trim());
    formData.append("email", document.querySelector("#email").value.trim());
    formData.append("phone", document.querySelector("#phone").value.trim());
    formData.append("message", document.querySelector("#message").value.trim());

    submitBtn.value = "Sending...";
    submitBtn.disabled = true;

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData
      });

      const text = await res.text(); // safer than json()

      if (text.includes("success")) {
        submitBtn.value = "Message Sent ✓";
        form.reset();
      } else {
        submitBtn.value = "Error!";
      }

    } catch (err) {
      console.error(err);
      submitBtn.value = "Failed!";
    }

    setTimeout(() => {
      submitBtn.value = "Submit";
      submitBtn.disabled = false;
    }, 2000);
  });
};

// ---------------- INIT ----------------
lenisAnimation();
loadingAnimation();
navBarAnimation();
contactForm();