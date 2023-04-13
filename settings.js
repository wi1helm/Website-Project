


document.addEventListener("DOMContentLoaded", () => {
    const settingsIcon = document.getElementById("settings-icon");
    settingsIcon.addEventListener("click", () => {
      toggleSettingsContainer();
      console.log("obama")
      
  function toggleSettingsContainer() {
    let settingsContainer = document.getElementById("settings-container");
  
    if (!settingsContainer) {
      settingsContainer = document.createElement("div");
      settingsContainer.id = "settings-container";
  
      const favoriteColorsDiv = document.createElement("div");
      favoriteColorsDiv.id = "favorite-colors";
  
      const text = document.createElement("p");
      text.id = "text";
      text.textContent = "Favorite Colors";
  
      const circleColorsDiv = document.createElement("div");
      circleColorsDiv.id = "circle-colors";
  
      const circleBlue = createColorCircle("C_blue", 0);
      const circleYellow = createColorCircle("C_yellow", 1);
      const circlePurple = createColorCircle("C_purple", 2);
  
      circleColorsDiv.appendChild(circleBlue);
      circleColorsDiv.appendChild(circleYellow);
      circleColorsDiv.appendChild(circlePurple);
  
      favoriteColorsDiv.appendChild(text);
      favoriteColorsDiv.appendChild(circleColorsDiv);
      settingsContainer.appendChild(favoriteColorsDiv);
  
      document.body.appendChild(settingsContainer);
      document.addEventListener("click", closeSettingsContainerOnClickOutside);
    } else {
      settingsContainer.remove();
      document.removeEventListener("click", closeSettingsContainerOnClickOutside);
    }
  }
  
  function createColorCircle(className, index) {
    const circle = document.createElement("circle");
    circle.classList.add(className);
    circle.addEventListener("click", (event) => {
      event.stopPropagation();
      changeColor(event, index);
    });
    return circle;
  }
  
  function closeSettingsContainerOnClickOutside(event) {
    const settingsContainer = document.getElementById("settings-container");
    if (settingsContainer && !settingsContainer.contains(event.target) && event.target !== settingsIcon) {
        settingsContainer.remove();
        document.removeEventListener("click", closeSettingsContainerOnClickOutside);
    }
  }
    });
  });
  
  