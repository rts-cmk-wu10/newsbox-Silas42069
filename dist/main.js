/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 117:
/***/ (function() {

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

/***/ }),

/***/ 988:
/***/ (function() {

class DigitalClock {
    constructor(container) {
      this.container = container;
      this.updateTime();
    }
  
    updateTime() {
      const currentDate = new Date();
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  
      const timeString = `${hours}:${minutes}`;
      this.container.innerText = timeString;
  
      setTimeout(() => {
        this.updateTime();
      }, 1000);
    }
  }
  
  const clockContainer = document.querySelector('.clock-container');
  const digitalClock = new DigitalClock(clockContainer);



/***/ }),

/***/ 805:
/***/ (function() {

if (window.location.pathname.includes("settings.html")) {
    const BUTTON = document.querySelector(".modebutton");
  
    if (BUTTON) {
        BUTTON.addEventListener("click", clickHandler);
      }
  
    function clickHandler() {
      const CLASS_LIST = document.body.classList;
      const isDarkMode = CLASS_LIST.contains("darkmode");
      CLASS_LIST.toggle("darkmode");
  
      if (isDarkMode) {
        document.querySelectorAll("*").forEach(element => {
          element.style.transition = "background-color 0.3s ease, color 0.3s ease";
        });
      } else {
        document.querySelectorAll("*").forEach(element => {
          element.style.transition = "background-color 0.3s ease, color 0.3s ease";
        });
      }
  
      localStorage.setItem("theme", CLASS_LIST.contains("darkmode") ? "darkmode" : "");
    }
  
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "");
    }
  
    if (localStorage.getItem("theme") === "darkmode") {
      BUTTON.checked = true;
      document.body.classList.add("darkmode");
      document.querySelectorAll("*").forEach(element => {
        element.style.transition = "background-color 0.3s ease, color 0.3s ease";
      });
    }
  }

/***/ }),

/***/ 3:
/***/ (function() {

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




/***/ }),

/***/ 609:
/***/ (function() {

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

/***/ }),

/***/ 655:
/***/ (function() {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/* harmony import */ var _scripts_settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(655);
/* harmony import */ var _scripts_settings_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scripts_settings_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_inbox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(609);
/* harmony import */ var _scripts_inbox_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scripts_inbox_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scripts_archive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(117);
/* harmony import */ var _scripts_archive_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scripts_archive_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scripts_clock_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(988);
/* harmony import */ var _scripts_clock_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scripts_clock_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _scripts_dropdown_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _scripts_dropdown_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_scripts_dropdown_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _scripts_darkmode_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(805);
/* harmony import */ var _scripts_darkmode_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_scripts_darkmode_js__WEBPACK_IMPORTED_MODULE_5__);







}();
/******/ })()
;
//# sourceMappingURL=main.js.map