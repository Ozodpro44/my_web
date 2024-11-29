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

  // const iconsContainer = document.querySelector(".icons");
  // const list1 = document.querySelector(".list1");
  // const list2 = document.querySelector(".list2");

  // let scrollPosition = 0; 
  // const scrollSpeed = 20; 
  // const animationSpeed = 2;
  // let isScrolling = false;

  // let isDragging = false; 
  // let startX = 0;
  // let velocity = 0;

  // const DECELERATION = 0.95;

  // function autoScroll() {
  //   if (!isScrolling && !isDragging) {
  //     scrollPosition -= animationSpeed; 
  //     if (scrollPosition < -list1.scrollWidth) scrollPosition = 0;
  //     updateScrollPosition();
  //   }
  //   requestAnimationFrame(autoScroll);
  // }

  // function updateScrollPosition() {
  //   list1.style.transform = `translateX(${scrollPosition}px)`;
  //   list2.style.transform = `translateX(${scrollPosition}px)`;
  // }

  // iconsContainer.addEventListener("wheel", (event) => {
  //   event.preventDefault(); 
  //   isScrolling = true; 
  //   scrollPosition += event.deltaY > 0 ? -scrollSpeed : scrollSpeed;

  //   if (scrollPosition < -list1.scrollWidth) {
  //     scrollPosition = 0;
  //   } else if (scrollPosition > 0) {
  //     scrollPosition = -list1.scrollWidth;
  //   }

  //   updateScrollPosition();

  //   clearTimeout(iconsContainer._scrollTimeout);
  //   iconsContainer._scrollTimeout = setTimeout(() => {
  //     isScrolling = false;
  //   }, 1000);
  // });

  // iconsContainer.addEventListener("touchstart", (event) => {
  //   isDragging = true; 
  //   startX = event.touches[0].clientX; 
  //   velocity = 0;
  // });

  // iconsContainer.addEventListener("touchmove", (event) => {
  //   if (isDragging) {
  //     const currentX = event.touches[0].clientX;
  //     const deltaX = currentX - startX;
  //     startX = currentX;

  //     scrollPosition += deltaX;

  //     if (scrollPosition < -list1.scrollWidth) {
  //       scrollPosition = 0;
  //     } else if (scrollPosition > 0) {
  //       scrollPosition = -list1.scrollWidth;
  //     }

  //     updateScrollPosition();
  //   }
  // });

  // iconsContainer.addEventListener("touchend", () => {
  //   isDragging = false; 
  //   iconsContainer._scrollTimeout = setTimeout(() => {
  //     isScrolling = false;
  //   }, 2000);
  // });

  // iconsContainer.addEventListener("mousedown", (event) => {
  //   isDragging = true; 
  //   startX = event.clientX; 
  //   event.preventDefault(); 
  // });

  // document.addEventListener("mousemove", (event) => {
  //   if (isDragging) {
  //     const currentX = event.clientX;
  //     const deltaX = currentX - startX;
  //     startX = currentX; 

  //     scrollPosition += deltaX;

  //     if (scrollPosition < -list1.scrollWidth) {
  //       scrollPosition = 0;
  //     } else if (scrollPosition > 0) {
  //       scrollPosition = -list1.scrollWidth;
  //     }

  //     updateScrollPosition();
  //   }
  // });

  // document.addEventListener("mouseup", () => {
  //   isDragging = false; 
  //   iconsContainer._scrollTimeout = setTimeout(() => {
  //     isScrolling = false;
  //   }, 1000);
  // });

  // autoScroll();

  const iconsContainer = document.querySelector(".icons");
  const list1 = document.querySelector(".list1");
  const list2 = document.querySelector(".list2");

  let scrollPosition = 0; // Current scroll position
  let isDragging = false; // Dragging state
  let startX = 0; // Starting X position for touch/mouse
  let velocity = 0; // Velocity for inertial scrolling
  const DECELERATION = 0.95; // Deceleration factor for inertia

  // Function to update the position of the icons
  function updateScrollPosition() {
    list1.style.transform = `translateX(${scrollPosition}px)`;
    list2.style.transform = `translateX(${scrollPosition}px)`;
  }

  // Function to handle inertial scrolling
  function applyInertia() {
    if (!isDragging && Math.abs(velocity) > 0.1) {
      scrollPosition += velocity;
      velocity *= DECELERATION; // Gradually reduce velocity
      if (scrollPosition < -list1.scrollWidth) {
        scrollPosition = 0;
      } else if (scrollPosition > 0) {
        scrollPosition = -list1.scrollWidth;
      }
      updateScrollPosition();
      requestAnimationFrame(applyInertia);
    }
  }

  // Touchstart event
  iconsContainer.addEventListener("touchstart", (event) => {
    isDragging = true;
    startX = event.touches[0].clientX;
    velocity = 0; // Reset velocity
  });

  // Touchmove event
  iconsContainer.addEventListener("touchmove", (event) => {
    if (isDragging) {
      const currentX = event.touches[0].clientX;
      const deltaX = currentX - startX;
      startX = currentX;

      scrollPosition += deltaX;
      velocity = deltaX; // Update velocity based on movement

      if (scrollPosition < -list1.scrollWidth) {
        scrollPosition = 0;
      } else if (scrollPosition > 0) {
        scrollPosition = -list1.scrollWidth;
      }

      updateScrollPosition();
    }
  });

  // Touchend event
  iconsContainer.addEventListener("touchend", () => {
    isDragging = false;
    requestAnimationFrame(applyInertia); // Apply inertia after touch ends
  });

  // Mousedown event
  iconsContainer.addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX;
    velocity = 0; // Reset velocity
    event.preventDefault(); // Prevent text selection
  });

  // Mousemove event
  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const currentX = event.clientX;
      const deltaX = currentX - startX;
      startX = currentX;

      scrollPosition += deltaX;
      velocity = deltaX; // Update velocity based on movement

      if (scrollPosition < -list1.scrollWidth) {
        scrollPosition = 0;
      } else if (scrollPosition > 0) {
        scrollPosition = -list1.scrollWidth;
      }

      updateScrollPosition();
    }
  });

  // Mouseup event
  document.addEventListener("mouseup", () => {
    isDragging = false;
    requestAnimationFrame(applyInertia); // Apply inertia after mouse release
  });

  // Auto animation (if no touch or drag interaction is occurring)
  function autoScroll() {
    if (!isDragging && Math.abs(velocity) < 0.1) {
      scrollPosition -= 2; // Automatic animation speed
      if (scrollPosition < -list1.scrollWidth) scrollPosition = 0;
      updateScrollPosition();
    }
    requestAnimationFrame(autoScroll);
  }

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

  const phoneElement = document.querySelector('.phone-number1');
  const phoneElement2 = document.querySelector('.phone-number2');
  const phoneIconElement = phoneElement.querySelector('i');
  const phoneIconElement2 = phoneElement2.querySelector('i');


  phoneElement.addEventListener('mouseenter', () => {
    phoneIconElement.classList.remove('bxs-phone');
    phoneIconElement.classList.add('bxs-phone-call');
  });

  phoneElement.addEventListener('mouseleave', () => {
    phoneIconElement.classList.remove('bxs-phone-call');
    phoneIconElement.classList.add('bxs-phone');
  });

  phoneElement2.addEventListener("mouseenter", () => {
    phoneIconElement2.classList.remove("bxs-phone");
    phoneIconElement2.classList.add("bxs-phone-call");
  });

  phoneElement2.addEventListener("mouseleave", () => {
    phoneIconElement2.classList.remove("bxs-phone-call");
    phoneIconElement2.classList.add("bxs-phone");
  })

});
