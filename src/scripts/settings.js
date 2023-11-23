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
  { id: 'world', key: 'switch1' },
  { id: 'health', key: 'switch2' },
  { id: 'sport', key: 'switch3' },
  { id: 'business', key: 'switch4' },
  { id: 'travel', key: 'switch5' }
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