document.addEventListener("DOMContentLoaded", () => {
  let colorSelectionDiv = document.getElementById("color-selection");

  const circleColors = ['#FF5733', '#33FF57', '#3357FF'];
  const actionBarCircles = createActionBarCircles();
  addCirclesToDiv(actionBarCircles, colorSelectionDiv);

  const settingsIcon = document.getElementById("settings-icon");
  settingsIcon.addEventListener("click", () => {
    toggleSettingsContainer();
  });

  function createActionBarCircles() {
    const circleColor1 = createColorCircle("p-1", 0, circleColors[0]);
    const circleColor2 = createColorCircle("p-2", 1, circleColors[1]);
    const circleColor3 = createColorCircle("p-3", 2, circleColors[2]);

    return [circleColor1, circleColor2, circleColor3];
  }

  function createSettingsMenuCircles() {
    const circleColor1 = createColorCircle("p-1", 0, circleColors[0]);
    const circleColor2 = createColorCircle("p-2", 1, circleColors[1]);
    const circleColor3 = createColorCircle("p-3", 2, circleColors[2]);

    return [circleColor1, circleColor2, circleColor3];
  }

  function addCirclesToDiv(circles, div) {
    circles.forEach((circle) => {
      div.appendChild(circle);
    });
  }


  function toggleSettingsContainer() {
    let settingsContainer = document.getElementById("settings-container");

    if (!settingsContainer) {
      settingsContainer = document.createElement("div");
      settingsContainer.id = "settings-container";
      settingsContainer.style.zIndex = window.highestZIndex;
      const favoriteColorsDiv = document.createElement("div");
      favoriteColorsDiv.id = "favorite-colors";

      const text = document.createElement("p");
      text.id = "text";
      text.textContent = "Color Schemes";

      const circleColorsDiv = document.createElement("div");
      circleColorsDiv.id = "circle-colors";

      const settingsMenuCircles = createSettingsMenuCircles();
      addCirclesToDiv(settingsMenuCircles, circleColorsDiv);

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

  function createColorCircle(className, index, color) {
    const circle = document.createElement("div");
    circle.classList.add(className, "circle");
    circle.style.backgroundColor = color;
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

async function changeColor(event, index) {
  event.stopPropagation();

  const response = await fetch("assets/color_presets.json");

  const data = await response.json();
  const colorPreset = data.presets[index];

  if (!colorPreset) {
    console.error("Invalid color preset index");
    return;
  }

  const { mainText, title, windowBackground, windowBar, dropdown } = colorPreset.colors;

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
