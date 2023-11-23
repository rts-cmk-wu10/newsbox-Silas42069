const toggleBtns = document.querySelectorAll('.toggle-button');
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      if (dropdownMenu.children.length === 0) {
        dropdown.remove();
      }
    });
    
    const handleSwipeStart = (event) => {
      const swipeDiv = event.target.closest('.swipe');
      if (swipeDiv) {
        swipeDiv.startX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
      }
    };
    
    const handleSwipeMove = (event) => {
      const swipeDiv = event.target.closest('.swipe');
      if (swipeDiv) {
        swipeDiv.currentX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
        const deltaX = swipeDiv.currentX - swipeDiv.startX;
    
        if (deltaX >= 50 && Math.abs(deltaX) > 10) {
          swipeDiv.style.transform = `translateX(${deltaX}px)`;
        }
    
        if (deltaX > 0) {
          swipeDiv.style.transform = 'translateX(0)';
          swipeDiv.startX = swipeDiv.currentX;
        }
      }
    };
    
    const handleSwipeEnd = (event) => {
      const swipeDiv = event.target.closest('.swipe');
      if (swipeDiv) {
        if (swipeDiv.currentX !== 0) {
          swipeDiv.swipeDistance = swipeDiv.currentX - swipeDiv.startX;
        }
        if (swipeDiv.swipeDistance <= -10) {
          swipeDiv.style.transition = 'transform 0.2s ease-out';
          swipeDiv.style.transform = 'translateX(-15vh)';
        } else {
          swipeDiv.style.transition = 'transform 0.2s ease-out';
          swipeDiv.style.transform = 'translateX(0)';
        }
        setTimeout(() => {
          swipeDiv.style.transition = 'transform 0.2s ease-out';
          swipeDiv.style.transform = '';
        }, 5000);
      }
    };
    
    const swipeSections = document.querySelectorAll('.swipe');
    
    swipeSections.forEach((swipeSection) => {
      swipeSection.addEventListener('touchstart', handleSwipeStart, { passive: true });
      swipeSection.addEventListener('touchmove', handleSwipeMove, { passive: true });
      swipeSection.addEventListener('touchend', handleSwipeEnd, { passive: true });
      swipeSection.addEventListener('mousedown', handleSwipeStart);
      swipeSection.addEventListener('mousemove', handleSwipeMove);
      swipeSection.addEventListener('mouseup', handleSwipeEnd);
    });