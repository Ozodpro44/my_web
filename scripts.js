// script.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.animated-section');
  
    const observerOptions = {
      root: null,
      threshold: 0.2, // Trigger when 20% of the section is in view
    };
  
    // Intersection Observer Callback
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once the section is in view
        }
      });
    };
  
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
  
    sections.forEach(section => {
      observer.observe(section); // Start observing each animated section
    });
  });
  