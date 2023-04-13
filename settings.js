
  document.addEventListener("DOMContentLoaded", () => {
    const settingsIcon = document.getElementById("settings-icon");
    settingsIcon.addEventListener("click", () => {
      toggleSettingsContainer();
      console.log("obama");
  
      function toggleSettingsContainer() {
        let settingsContainer = document.getElementById("settings-container");
      
        if (!settingsContainer) {
          settingsContainer = document.createElement("div");
          settingsContainer.id = "settings-container";
          settingsContainer.style.zIndex = window.highestZIndex
          const favoriteColorsDiv = document.createElement("div");
          favoriteColorsDiv.id = "favorite-colors";
      
          const text = document.createElement("p");
          text.id = "text";
          text.textContent = "Color Schemes";
      
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
        const circle = document.createElement("div");
        circle.classList.add(className, "circle");
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
 
  
  async function changeColor(event, index) {
    event.stopPropagation();
  
    // Add the missing line here to define the 'response' variable
    const response = await fetch("assets/color_presets.json");
  
    const data = await response.json();
    const colorPreset = data.presets[index];
  
    if (!colorPreset) {
      console.error("Invalid color preset index");
      return;
    }
  
    const { mainText, title, windowBackground, windowBar, dropdown } = colorPreset.colors;
      
    // Apply the colors
    const windows = document.querySelectorAll(".window");
    windows.forEach((windowElement) => {
      windowElement.querySelector(".title p").style.color = title;
      windowElement.querySelector(".windowbar").style.backgroundColor = windowBar;
      windowElement.querySelector(".windowcontent").style.backgroundColor = windowBackground;
    });
  
    // Set drop shadow color for action bar elements and the 3 dots at the bottom of the page
    const actionBarElements = document.querySelectorAll(".actionbar-window");
    actionBarElements.forEach((element) => {
      element.style.filter = `drop-shadow(8px 8px 6px ${dropdown})`;
    });
  
    const dots = document.querySelectorAll(".dot");
  }