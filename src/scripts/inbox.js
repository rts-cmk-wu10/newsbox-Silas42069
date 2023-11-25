if (window.location.pathname.includes("index.html")) {

  const fetchArticles = async (categories) => {
    const apiKey = 'wKgqhvrJkntIotGQVFYkokyir6N8Xg8N';
  
    const dropdownsContainer = document.querySelector('.dropdowns');
  
    const results = await Promise.all(categories.map(async (category) => {
      const categoryElement = document.createElement('article');
      categoryElement.id = category;
  
      categoryElement.classList.add('dropdown');
  
      const toggleButton = document.createElement('button');
      toggleButton.classList.add('toggle-button');
  
      const categoryImage = document.createElement('img');
      categoryImage.src = '/src/images/orangething.png'; // Replace with the actual image source
      toggleButton.appendChild(categoryImage);
  
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
  
      toggleButton.addEventListener('click', async () => {
        categoryElement.classList.toggle('open');
      
        if (!categoryElement.classList.contains('open')) {
          categoryElement.classList.add('closed');
        } else {
          categoryElement.classList.remove('closed');
          await fetchContent(category, dropdownMenu, apiKey);
        }
      });
  
      categoryElement.appendChild(dropdownMenu);
  
      return categoryElement;
    }));
  
    dropdownsContainer.innerHTML = '';
    results.forEach(categoryElement => {
      dropdownsContainer.appendChild(categoryElement);
    });
  };


  
  const fetchContent = async (category, dropdownMenu, apiKey) => {
    try {
      const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      const categoryArticles = data.results;
      console.log(categoryArticles);
  
      dropdownMenu.innerHTML = '';
  
      if (categoryArticles.length === 0) {
        const noArticlesElement = document.createElement('p');
        noArticlesElement.textContent = 'No articles available for this category';
        dropdownMenu.appendChild(noArticlesElement);
      } else {
        categoryArticles.forEach(article => {
          const articleElement = document.createElement('div');
          articleElement.classList.add('dropdown-item');
          const link = article.url; // Get the article link
          
          articleElement.id = link; // Add the link as the id of the articleElement
  
          const swipeDiv = document.createElement('div');
          swipeDiv.classList.add('swipe');
  
          const image = document.createElement('img');
          const multimedia = article.multimedia;
          const imageSrc = multimedia && multimedia.length > 0 ? multimedia[0].url : 'path/to/default-image.jpg';
          image.src = imageSrc; // Replace with the default image source
  
          const contentDiv = document.createElement('span');
  
          const titleElement = document.createElement('h1');
          titleElement.textContent = article.title;
  
          const abstractElement = document.createElement('p');
          abstractElement.textContent = article.abstract;
  
          contentDiv.appendChild(titleElement);
          contentDiv.appendChild(abstractElement);
  
          swipeDiv.appendChild(image);
          swipeDiv.appendChild(contentDiv);
  
          const button = document.createElement('button');
          button.classList.add('swipe-right');
  
          const buttonImage = document.createElement('img');
          buttonImage.src = '/src/images/inbox.png'; // Replace with the path to your desired image
  
          button.appendChild(buttonImage);
  
          articleElement.appendChild(swipeDiv);
          articleElement.appendChild(button);
  
          dropdownMenu.appendChild(articleElement);
        });
        const script = document.createElement('script');
        script.src = '/src/scripts/button.js';
        document.head.appendChild(script);
      }
    } catch (error) {
      console.error(error);
    }
  };

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('swipe-right')) {
      const articleElement = event.target.parentNode;
      const dropdownMenu = articleElement.parentNode;
      const category = dropdownMenu.parentNode.id;
      const id = articleElement.id;
      const imageSrc = articleElement.querySelector('img').src;
      const h1Text = articleElement.querySelector('h1').textContent;
      const pText = articleElement.querySelector('p').textContent;
  
      const articleData = {
        category,
        imageSrc,
        h1Text,
        pText,
        id
      };
  
      let swipeContent = JSON.parse(localStorage.getItem('swipeContent')) || [];
  
      // Check if the article data already exists in swipeContent
      const isDuplicate = swipeContent.some((item) => item.id === id);
  
      if (!isDuplicate) {
        swipeContent.push(articleData);
        localStorage.setItem('swipeContent', JSON.stringify(swipeContent));
      } else {
        console.log('This content is already saved.');
      }
    }
  });
  
  const categories = [
    "arts",
    "automobiles",
    "books",
    "business",
    "fashion",
    "food",
    "health",
    "home",
    "insider",
    "magazine",
    "movies",
    "nyregion",
    "obituaries",
    "opinion",
    "politics",
    "realestate",
    "science",
    "sundayreview",
    "technology",
    "theater",
    "t-magazine",
    "travel",
    "upshot",
    "us",
    "world"
  ];
  
  fetchArticles(categories);

  
}