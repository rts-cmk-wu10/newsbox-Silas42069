if (window.location.pathname.includes("index.html")) {

  const fetchArticles = async (categories) => {
    if (location.pathname !== '/dist/index.html') {
      return;
    }
  
    const apiKey = 'wKgqhvrJkntIotGQVFYkokyir6N8Xg8N';
  
    const results = await Promise.all(categories.map(category => 
      fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`)
        .then(response => response.json())
        .then(data => category === 'world' ? data.results.filter(article => article.subsection === 'europe') : data.results)
    ));
  
    const script = document.createElement('script');
    script.src = '/src/scripts/button.js';
    document.head.appendChild(script);
  
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
  
    results.forEach((categoryArticles, index) => {
      let counter = 0;
  
      categoryArticles.forEach(article => {
        if (article.multimedia?.length && counter < 100) {
          const section = document.createElement('div');
          section.setAttribute('data-category', categories[index]);
          section.classList.add('dropdown-item'); 
          section.id = article.url; 
  
          section.innerHTML = `
            <div class="swipe">
              <img src="${article.multimedia[0].url}">
              <span>
                <h1>${article.title}</h1>
                <p>${article.abstract}</p>
              </span>
            </div>
            <button class="swipe-right">
              <img src="/src/images/inbox.png">
            </button>
          `;
  
          dropdownMenus[index].appendChild(section);
  
          const swipeRightButton = section.querySelector('.swipe-right');
          swipeRightButton.addEventListener('click', handleSwipeRightButtonClick);
  
          counter++;
        }
      });
    });
  };
  
  const handleSwipeRightButtonClick = (event) => {
    const swipeDiv = event.target.parentElement.querySelector('.swipe');
    if (swipeDiv && swipeDiv.innerText.trim() !== "") {
      const existingStyle = swipeDiv.getAttribute('style');
      const updatedStyle = existingStyle.replace(/transform:.*?;/gi, '');
      swipeDiv.setAttribute('style', updatedStyle);
      const dropdownItem = event.target.closest('.dropdown-item');
      const category = dropdownItem.getAttribute('data-category'); 
      const imageSrc = dropdownItem.querySelector('img').getAttribute('src');
      const h1Text = dropdownItem.querySelector('h1').innerText.trim();
      const pText = dropdownItem.querySelector('p').innerText.trim();
      const articleId = dropdownItem.id; 
  
      let swipeContent = [];
      try {
        swipeContent = JSON.parse(localStorage.getItem('swipeContent')) || [];
      } catch (error) {
        console.error('Error parsing swipe content:', error);
      }
  
      if (category && categories.includes(category)) {
        const existingContent = swipeContent.find((item) => item.category === category && item.h1Text === h1Text && item.pText === pText);
        const existingId = swipeContent.find((item) => item.id === articleId);
  
        if (!existingContent && !existingId) {
          swipeContent.push({ category, imageSrc, h1Text, pText, id: articleId });
          localStorage.setItem('swipeContent', JSON.stringify(swipeContent));
        } else {
          console.log('Content already exists!');
        }
      }
    }
  };
  
  const categories = ['world', 'health', 'sports', 'business', 'travel'];
  fetchArticles(categories);
  }