const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const localStorageKey = 'toggle';

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const state = {};
    checkboxes.forEach(cb => {
      state[cb.id] = cb.checked;
    });
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  });
});

window.addEventListener('load', function() {
  const storedState = localStorage.getItem(localStorageKey);
  if (storedState !== null) {
    const state = JSON.parse(storedState);
    checkboxes.forEach(checkbox => {
      if (state.hasOwnProperty(checkbox.id)) {
        checkbox.checked = state[checkbox.id];
      }
    });
  }
});

const toggleValue = JSON.parse(localStorage.getItem('toggle'));

const switches = [
  { id: 'arts', key: 'switch1' },
  { id: 'automobiles', key: 'switch2' },
  { id: 'books', key: 'switch3' },
  { id: 'business', key: 'switch4' },
  { id: 'fashion', key: 'switch5' },
  { id: 'food', key: 'switch6' },
  { id: 'health', key: 'switch7' },
  { id: 'home', key: 'switch8' },
  { id: 'insider', key: 'switch9' },
  { id: 'magazine', key: 'switch10' },
  { id: 'movies', key: 'switch11' },
  { id: 'nyregion', key: 'switch12' },
  { id: 'obituaries', key: 'switch13' },
  { id: 'opinion', key: 'switch14' },
  { id: 'politics', key: 'switch15' },
  { id: 'realestate', key: 'switch16' },
  { id: 'science', key: 'switch17' },
  { id: 'sundayreview', key: 'switch18' },
  { id: 'technology', key: 'switch19' },
  { id: 'theater', key: 'switch20' },
  { id: 't-magazine', key: 'switch21' },
  { id: 'travel', key: 'switch22' },
  { id: 'upshot', key: 'switch23' },
  { id: 'us', key: 'switch24' },
  { id: 'world', key: 'switch25' },
];



switches.forEach((switchObj) => {
  const switchValue = toggleValue?.[switchObj.key];
  const articleElement = document.getElementById(switchObj.id);
  
  if (switchValue === false && articleElement) {
    articleElement.classList.add('removedropdown');
  }
});

const theme = localStorage.getItem('theme');
if (theme === 'darkmode') {
  document.body.classList.add('darkmode');
}

const lastCategoryElement = document.querySelector('#world');
if (lastCategoryElement) {
  lastCategoryElement.classList.add('lastsetting');
} 