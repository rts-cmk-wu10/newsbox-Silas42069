// Select the toggle button and the dropdown element
const toggleButton = document.querySelector('.toggle-button');
const dropdown = document.querySelector('.dropdown');

// Add event listener to the toggle button
toggleButton.addEventListener('click', function() {
  if (dropdown.classList.contains('open')) {
    dropdown.classList.remove('open');
    dropdown.classList.add('closed');
  } else {
    dropdown.classList.remove('closed');
    dropdown.classList.add('open');
  }
});

