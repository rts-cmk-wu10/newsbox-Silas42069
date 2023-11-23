const toggleBtns = document.querySelectorAll('.toggle-button');
const dropdowns = document.querySelectorAll('.dropdown-menu');
const arrows = document.querySelectorAll('.arrow');

toggleBtns.forEach((toggleBtn, index) => {
  toggleBtn.addEventListener('click', () => {
    dropdowns[index].classList.toggle('open');

    if (dropdowns[index].classList.contains('open')) {
      dropdowns[index].style.height = '0';
      dropdowns[index].style.overflow = 'hidden';

      const dropdownHeight = dropdowns[index].scrollHeight;
      dropdowns[index].style.height = dropdownHeight + 'px';
      arrows[index].style.transform = 'rotate(90deg)';
    } else {
      dropdowns[index].style.height = '0';
      dropdowns[index].style.overflow = 'hidden';
      arrows[index].style.transform = 'rotate(0deg)';
    }
  });
})


