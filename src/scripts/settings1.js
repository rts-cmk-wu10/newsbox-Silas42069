const fetchArticles = (categories) => {
  const dropdownsContainer = document.querySelector('.settings-menu');

  // Check if dropdownsContainer exists before proceeding
  if (dropdownsContainer) {
    const categoryNumbers = {};

    for (const category of categories) {
      const dropdownElement = document.querySelector(`#${category}`);

      if (!dropdownElement) {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('settings-item');
        categoryElement.dataset.category = category;

        const toggleButton = document.createElement('h1');
        toggleButton.textContent = `${category.toUpperCase()}`;

        categoryElement.appendChild(toggleButton);

        if (!categoryNumbers[category]) {
          categoryNumbers[category] = Object.keys(categoryNumbers).length + 1;
        }

        const dropdownMenu = document.createElement('input');
        dropdownMenu.classList.add('toggle');
        dropdownMenu.type = 'checkbox';
        dropdownMenu.checked = true;
        dropdownMenu.id = `switch${categoryNumbers[category]}`;

        categoryElement.appendChild(dropdownMenu);

        dropdownsContainer.appendChild(categoryElement);
      }
    }

    const worldCategoryElement = document.querySelector('#world');
    if (worldCategoryElement) {
      worldCategoryElement.classList.add('lastsetting');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
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
});

const script = document.createElement('script');
script.src = '/src/scripts/settings2.js';
document.head.appendChild(script);