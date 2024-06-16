/*
  NAV BAR
*/

// Get all section IDs and nav links
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".navbar a");

// Function to remove 'active' class from all nav links
const removeActive = () => {
  navLinks.forEach(link => link.classList.remove("active"));
};

// Function to set 'active' class based on scroll position
const setActiveNav = () => {
  let currentSection = null;

  // Determine which section is closest to the top
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) { // Adjust offset as needed
      currentSection = section.getAttribute("id");
    }
  });

  // Update active class on nav links
  removeActive();
  navLinks.forEach(link => {
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });

  // Update the browser's URL to reflect the current section
  if (currentSection) {
    const currentURL = new URL(window.location);
    currentURL.hash = `#${currentSection}`;
    history.replaceState(null, '', currentURL.toString()); // Replaces the current history entry without reloading
  }
  else{
    history.replaceState(null, '', window.location.pathname);
  }
};

// Listen for scroll events to update active nav link
window.addEventListener("scroll", setActiveNav);


/*
  TECHNOLOGIES
*/

document.addEventListener("DOMContentLoaded", function() {
  const techLogos = document.querySelectorAll('.tech-logo');

  function triggerWave(startIndex) {
      techLogos.forEach((logo, index) => {
          const delay = Math.abs(index - startIndex) * 100; // Adjust delay as needed
          setTimeout(() => {
              logo.classList.add('wave');
              setTimeout(() => {
                  logo.classList.remove('wave');
              }, 600); // Duration of the wave animation
          }, delay);
      });
  }

  let currentIndex = 0;

  function startInfiniteWave() {
      setInterval(() => {
          triggerWave(currentIndex);
          // currentIndex = (currentIndex + 1) % techLogos.length; // Move to the next logo in the array
      }, 1000); // Time interval between each wave start, adjust as needed
  }

  startInfiniteWave();
});


/*
  SCROLL TO TOP BUTTON
*/

// Get the button
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.onclick = function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}


/*
  CONTACT FORM
*/ 

document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target;
  const formData = new FormData(form);
  const formMessage = document.getElementById('form-message');
  const spinner = document.getElementById('spinner');

  formMessage.textContent = '';
  spinner.style.display = 'block'; // Show the spinner

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        formMessage.textContent = "Thank you for your message! We will get back to you soon.";
        formMessage.style.color = "green";
        form.reset(); // Optionally reset the form
      } else {
        formMessage.textContent = "There was an issue with your submission. Please try again.";
        formMessage.style.color = "red";
      }
    } else {
      formMessage.textContent = "Network error. Please try again later.";
      formMessage.style.color = "red";
    }
  } catch (error) {
    formMessage.textContent = "There was an error processing your request. Please try again.";
    formMessage.style.color = "red";
  } finally {
    spinner.style.display = 'none'; // Hide the spinner
  }
});