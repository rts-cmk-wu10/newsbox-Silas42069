if (window.location.pathname.includes("archive.html")) {
  const swipeContentData = JSON.parse(localStorage.getItem('swipeContent'));

  if (swipeContentData && Array.isArray(swipeContentData)) {
    swipeContentData.forEach((item) => {
      const { category, h1Text, imageSrc, pText, id } = item;

      const div = document.createElement('div');
      div.classList.add(category, 'dropdown-item');

      const swipeDiv = document.createElement('div');
      swipeDiv.classList.add('swipe');

      const image = document.createElement('img');
      image.src = imageSrc;

      const span = document.createElement('span');

      const heading = document.createElement('h1');
      heading.textContent = h1Text;

      const paragraph = document.createElement('p');
      paragraph.textContent = pText;

      span.appendChild(heading);
      span.appendChild(paragraph);

      swipeDiv.appendChild(image);
      swipeDiv.appendChild(span);

      div.appendChild(swipeDiv);

      const swipeRightButton = document.createElement('button');
      swipeRightButton.classList.add('swipe-right', 'swipe-delete');

      const buttonImage = document.createElement('img');
      buttonImage.src = '/src/images/trashcan.png';

      swipeRightButton.appendChild(buttonImage);

      div.appendChild(swipeRightButton);

      const articleId = `#${category}`;
      const article = document.querySelector(articleId);
      if (article) {
        const section = article.querySelector('.dropdown-menu');
        if (section) {
          section.appendChild(div);
        }
      }

        const swipeElement = div.querySelector('.swipe');
      if (swipeElement) {
        swipeElement.addEventListener('click', function() {
          if (id) {
            window.location.href = id;
          } else {
            alert('Invalid link');
          }
        });
      }

      div.addEventListener('mouseover', function() {
        div.classList.add('clickable');
      });

      div.addEventListener('mouseout', function() {
        div.classList.remove('clickable');
      });
    });
  }

  const deleteButtons = document.querySelectorAll('.swipe-delete');
  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', function(event) {
      const section = event.target.closest('.dropdown-item');
      if (section) {
        const category = section.classList[0];
        updateArticle(category);
        removeFromLocalStorage(category);
        const parentSection = section.closest('article');
        section.remove();
        if (parentSection) {
          adjustHeight(parentSection);
          checkCategoryEmpty(category);
        }
      }
    });
  });

  function checkCategoryEmpty(category) {
    const articleId = `#${category}`;
    const article = document.querySelector(articleId);
    if (article) {
      const section = article.querySelector('.dropdown-menu');
      if (section) {
        const items = section.querySelectorAll('.dropdown-item');
        if (items.length === 0) {
          article.remove();
        }
      }
    }
  }

  function updateArticle(category) {
    const articleId = `#${category}`;
    const article = document.querySelector(articleId);
    if (article) {
      adjustHeight(article);
    }
  }

  function adjustHeight(section) {
    const menu = section.querySelector('.dropdown-menu');
    const children = menu.children;
    let totalHeight = 0;
    for (let i = 0; i < children.length; i++) {
      totalHeight += children[i].offsetHeight;
    }
    menu.style.height = totalHeight + 'px'; // Set the height to the calculated total height
  }

  function removeFromLocalStorage(category) {
    const swipeContentData = JSON.parse(localStorage.getItem('swipeContent'));
    if (swipeContentData && Array.isArray(swipeContentData)) {
      const index = swipeContentData.findIndex(item => item.category === category);
      if (index !== -1) {
        swipeContentData.splice(index, 1);
        localStorage.setItem('swipeContent', JSON.stringify(swipeContentData));
      }
    }
  }

  const script = document.createElement('script');
  script.src = '/src/scripts/button.js';
  document.head.appendChild(script);
}