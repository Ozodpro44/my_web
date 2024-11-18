document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".animated-section");

  const observerOptions = {
    root: null,
    threshold: 0.2,
  };

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); 
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  sections.forEach((section) => {
    observer.observe(section); 
  });

  const iconsContainer = document.querySelector(".icons");
  const list1 = document.querySelector(".list1");
  const list2 = document.querySelector(".list2");

  let scrollPosition = 0; 
  const scrollSpeed = 20; 
  const animationSpeed = 2;
  let isScrolling = false;

  let isDragging = false; 
  let startX = 0;

  function autoScroll() {
    if (!isScrolling && !isDragging) {
      scrollPosition -= animationSpeed; 
      if (scrollPosition < -list1.scrollWidth) scrollPosition = 0;
      updateScrollPosition();
    }
    requestAnimationFrame(autoScroll);
  }

  function updateScrollPosition() {
    list1.style.transform = `translateX(${scrollPosition}px)`;
    list2.style.transform = `translateX(${scrollPosition}px)`;
  }

  iconsContainer.addEventListener("wheel", (event) => {
    event.preventDefault(); 
    isScrolling = true; 
    scrollPosition += event.deltaY > 0 ? -scrollSpeed : scrollSpeed;

    if (scrollPosition < -list1.scrollWidth) {
      scrollPosition = 0;
    } else if (scrollPosition > 0) {
      scrollPosition = -list1.scrollWidth;
    }

    updateScrollPosition();

    clearTimeout(iconsContainer._scrollTimeout);
    iconsContainer._scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 1000);
  });

  iconsContainer.addEventListener("touchstart", (event) => {
    isDragging = true; 
    startX = event.touches[0].clientX; 
    clearTimeout(iconsContainer._scrollTimeout);
  });

  iconsContainer.addEventListener("touchmove", (event) => {
    if (isDragging) {
      const currentX = event.touches[0].clientX;
      const deltaX = currentX - startX;
      startX = currentX;

      scrollPosition += deltaX;

      if (scrollPosition < -list1.scrollWidth) {
        scrollPosition = 0;
      } else if (scrollPosition > 0) {
        scrollPosition = -list1.scrollWidth;
      }

      updateScrollPosition();
    }
  });

  iconsContainer.addEventListener("touchend", () => {
    isDragging = false; 
    iconsContainer._scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 1000);
  });

  iconsContainer.addEventListener("mousedown", (event) => {
    isDragging = true; 
    startX = event.clientX; 
    event.preventDefault(); 
  });

  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const currentX = event.clientX;
      const deltaX = currentX - startX;
      startX = currentX; 

      scrollPosition += deltaX;

      if (scrollPosition < -list1.scrollWidth) {
        scrollPosition = 0;
      } else if (scrollPosition > 0) {
        scrollPosition = -list1.scrollWidth;
      }

      updateScrollPosition();
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false; 
    iconsContainer._scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 1000);
  });

  autoScroll();

  const emailElement = document.querySelector('.email');
  const iconElement = emailElement.querySelector('i');
  
  emailElement.addEventListener('mouseenter', () => {
    iconElement.classList.remove('bxs-envelope');
    iconElement.classList.add('bxs-envelope-open');
  });
  
  emailElement.addEventListener('mouseleave', () => {
    iconElement.classList.remove('bxs-envelope-open');
    iconElement.classList.add('bxs-envelope');
  });

  const phoneElement = document.querySelector('.phone-number1, .phone-number2');
  const phoneIconElement = phoneElement.querySelector('i');

  phoneElement.addEventListener('mouseenter', () => {
    phoneIconElement.classList.remove('bxs-phone');
    phoneIconElement.classList.add('bxs-phone-call');
  });

  phoneElement.addEventListener('mouseleave', () => {
    phoneIconElement.classList.remove('bxs-phone-call');
    phoneIconElement.classList.add('bxs-phone');
  });

});
