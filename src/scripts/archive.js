if (window.location.pathname.includes("archive.html")) {

  const fetchArticles = (categories) => {
    const dropdownsContainer = document.querySelector('.dropdowns');

    const removeCategoryIfEmpty = (category) => {
      const categoryElement = document.querySelector(`#${category}`);
      const dropdownMenu = categoryElement.querySelector('.dropdown-menu');
      const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');

      if (dropdownItems.length === 0) {
        categoryElement.remove();
      }
    };

    const deleteArticle = (button) => {
      const dropdownItem = button.closest('.dropdown-item');
      if (dropdownItem && dropdownItem.parentNode) {
        const category = dropdownItem.parentNode.parentNode.id;
        let swipeContent = JSON.parse(localStorage.getItem('swipeContent')) || [];

        dropdownItem.remove();

        const index = swipeContent.findIndex((item) => item.category === category);
        if (index !== -1) {
          swipeContent.splice(index, 1);
        }

        localStorage.setItem('swipeContent', JSON.stringify(swipeContent));

        removeCategoryIfEmpty(category);
      }
    };

    categories.forEach((category) => {
      const dropdownElement = document.querySelector(`#${category}`);

      if (!dropdownElement) {
        const categoryElement = document.createElement('article');
        categoryElement.id = category;
        categoryElement.classList.add('dropdown');

        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle-button');

        const categoryTitle = document.createElement('h1');
        categoryTitle.textContent = category.toUpperCase();
        toggleButton.appendChild(categoryTitle);

        const arrowSpan = document.createElement('span');
        arrowSpan.classList.add('arrow');
        arrowSpan.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        toggleButton.appendChild(arrowSpan);

        categoryElement.appendChild(toggleButton);

        const dropdownMenu = document.createElement('section');
        dropdownMenu.classList.add('dropdown-menu');

        const swipeContent = JSON.parse(localStorage.getItem('swipeContent')) || [];
        const categoryContent = swipeContent.filter((item) => item.category === category);

        categoryContent.forEach((content) => {
          const dropdownItem = document.createElement('div');
          dropdownItem.classList.add('dropdown-item');

          const swipeDiv = document.createElement('div');
          swipeDiv.classList.add('swipe');

          const image = document.createElement('img');
          image.src = content.imageSrc;

          const swipeContentSpan = document.createElement('span');

          const h1 = document.createElement('h1');
          h1.textContent = content.h1Text;

          const p = document.createElement('p');
          p.textContent = content.pText;

          swipeContentSpan.appendChild(h1);
          swipeContentSpan.appendChild(p);

          swipeDiv.appendChild(image);
          swipeDiv.appendChild(swipeContentSpan);

          const swipeRightButton = document.createElement('button');
          swipeRightButton.classList.add('swipe-right', 'swipe-delete');

          const swipeRightImage = document.createElement('img');
          swipeRightImage.src = '/src/images/trashcan.png';

          swipeRightButton.appendChild(swipeRightImage);

          dropdownItem.appendChild(swipeDiv);
          dropdownItem.appendChild(swipeRightButton);

          dropdownMenu.appendChild(dropdownItem);
        });

        categoryElement.appendChild(dropdownMenu);

        dropdownsContainer.appendChild(categoryElement);
      }

      const swipeDeleteButtons = document.querySelectorAll('.swipe-delete');
      swipeDeleteButtons.forEach((button) => {
        button.addEventListener('click', function () {
          deleteArticle(button);
        });
      });
    });

    const toggleButtons = document.querySelectorAll('.toggle-button');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Add event listener to each toggle button
    toggleButtons.forEach((button, index) => {
      button.addEventListener('click', function () {
        if (dropdowns[index].classList.contains('open')) {
          dropdowns[index].classList.remove('open');
          dropdowns[index].classList.add('closed');
        } else {
          dropdowns[index].classList.remove('closed');
          dropdowns[index].classList.add('open');
        }
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    const swipeContent = JSON.parse(localStorage.getItem('swipeContent')) || [];
    const categories = swipeContent.map((item) => item.category);

    fetchArticles(categories);
  });

  const script2 = document.createElement('script');
  script2.src = '/src/scripts/button.js';
  document.head.appendChild(script2);

}