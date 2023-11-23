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