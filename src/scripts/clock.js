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

