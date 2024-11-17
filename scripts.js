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
    const technologyContainer = document.querySelector('.technologys');
    const list1 = document.querySelector('.list1');
    const list2 = document.querySelector('.list2');

    let scrollPosition = 0; // Current position of the scroll
    const scrollSpeed = 20; // Speed of scrolling
    const animationSpeed = 2; // Speed of auto animation
    let isScrolling = false; // Flag to detect mouse wheel control

    // Auto animation function
    function autoScroll() {
      if (!isScrolling) {
        scrollPosition -= animationSpeed; // Automatically move left
        if (scrollPosition < -list1.scrollWidth) scrollPosition = 0; // Loop back
        updateScrollPosition();
      }
      requestAnimationFrame(autoScroll);
    }

    // Update transform for smooth animation
    function updateScrollPosition() {
      list1.style.transform = `translateX(${scrollPosition}px)`;
      list2.style.transform = `translateX(${scrollPosition}px)`;
    }

    // Mouse wheel control
    technologyContainer.addEventListener('wheel', (event) => {
      event.preventDefault(); // Stop page scrolling
      isScrolling = true; // Set flag to true
      scrollPosition += event.deltaY > 0 ? -scrollSpeed : scrollSpeed;

      // Looping behavior
      if (scrollPosition < -list1.scrollWidth) {
        scrollPosition = 0;
      } else if (scrollPosition > 0) {
        scrollPosition = -list1.scrollWidth;
      }

      updateScrollPosition();

      // Stop manual control after 1 second of inactivity
      clearTimeout(technologyContainer._scrollTimeout);
        technologyContainer._scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 1000);
    });

    // Start auto animation
    autoScroll();

  });
  