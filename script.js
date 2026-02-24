const sections = document.querySelectorAll(".section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

const setActiveNav = () => {
  let currentId = "home";

  sections.forEach((section) => {
    const top = section.offsetTop;
    if (window.scrollY >= top - 140) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", isCurrent);
  });
};

const toggleScrollButton = () => {
  if (window.scrollY > 240) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  setActiveNav();
  toggleScrollButton();
});

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  toggleScrollButton();

  const techLogos = document.querySelectorAll(".tech-logo");

  const triggerWave = (startIndex) => {
    techLogos.forEach((logo, index) => {
      const delay = Math.abs(index - startIndex) * 110;
      setTimeout(() => {
        logo.classList.add("wave");
        setTimeout(() => logo.classList.remove("wave"), 620);
      }, delay);
    });
  };

  let waveIndex = 0;
  if (techLogos.length > 0) {
    setInterval(() => {
      triggerWave(waveIndex);
      waveIndex = (waveIndex + 1) % techLogos.length;
    }, 1800);
  }

  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 },
  );

  revealElements.forEach((element) => observer.observe(element));
});

document
  .getElementById("contact-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById("form-message");
    const spinner = document.getElementById("spinner");

    formMessage.textContent = "";
    spinner.style.display = "block";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          formMessage.textContent =
            "Thank you for your message! I will get back to you soon 💜";
          formMessage.style.color = "#90ffc5";
          form.reset();
        } else {
          formMessage.textContent =
            "There was an issue with your submission. Please try again.";
          formMessage.style.color = "#ff9ebb";
        }
      } else {
        formMessage.textContent = "Network error. Please try again later.";
        formMessage.style.color = "#ff9ebb";
      }
    } catch (error) {
      formMessage.textContent =
        "There was an error processing your request. Please try again.";
      formMessage.style.color = "#ff9ebb";
    } finally {
      spinner.style.display = "none";
    }
  });
