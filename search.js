let isAnimating = false;
let animationTimeout;
let searchDropDownOpen = false;

function animateLinesApart() {
  console.log("entering");
  if (isAnimating) {
    clearTimeout(animationTimeout);
  }
  if (searchDropDownOpen){
    return
  }
  const searchElement = document.getElementById("line");
  searchElement.innerHTML = "";

  const input = document.createElement("input");
  const upperLine = document.createElement("hr");
  const lowerLine = document.createElement("hr");

  upperLine.id = "upperline";
  lowerLine.id = "lowerline";

  upperLine.style.zIndex = window.highestZIndex + 1;
  lowerLine.style.zIndex = window.highestZIndex + 1;

  input.id = "search-input";
  input.style.display = "none";
  input.style.zIndex = window.highestZIndex;
  const textInput = sessionStorage.getItem("text");
  console.log(textInput);
  input.value = textInput;

  input.addEventListener("input", (event) => {
    const inputValue = event.target.value;
  
    if (inputValue.length > 0) {
      if (searchDropDownOpen === false) {
        searchDropDownOpen = true;
      }
      showSearchResults(inputValue);
    } else {
      if (searchDropDownOpen === true) {
        const searchDropdown = document.getElementById("search-dropdown");
        if (searchDropdown) {
          searchDropDownOpen = false;
          searchDropdown.remove();
        }
      }
    }
  });

  window.highestZIndex++;
  searchElement.appendChild(upperLine);
  searchElement.appendChild(input);
  searchElement.appendChild(lowerLine);

  isAnimating = true;
  animationTimeout = setTimeout(() => {
    upperLine.style.transform = "translateY(-24px)";
    lowerLine.style.transform = "translateY(24px)";
    input.style.display = "block";
    input.setAttribute("placeholder", "Search");
    input.autocomplete = "off"
    isAnimating = false;
  }, 50);
}

function animateLinesTogether() {
  console.log("leave");
  if (isAnimating) {
    clearTimeout(animationTimeout);
  }

  const searchElement = document.getElementById("line");
  const upperLine = document.getElementById("upperline");
  const lowerLine = document.getElementById("lowerline");
  const input = document.getElementById("search-input");

  if (searchDropDownOpen == true) {
    console.log("obama")
    return;
  }

  sessionStorage.setItem("text", input.value);

  input.style.display = "none";

  upperLine.style.transform = "translateY(0)";
  lowerLine.style.transform = "translateY(0)";

  const searchDropdown = document.getElementById("search-dropdown");
  if (searchDropdown) {
    searchDropDownOpen = false;
    searchDropdown.remove();
  }

  isAnimating = true;
  animationTimeout = setTimeout(() => {
    upperLine.remove();
    lowerLine.remove();
    const hr = document.createElement("hr");
    searchElement.appendChild(hr);
    isAnimating = false;
  }, 300);
}

async function showSearchResults(inputValue) {

  

  const response = await fetch("assets/data.json");
  const data = await response.json();

  const windows = data.windows;
  const searchResults = windows.filter(window => window.title.toLowerCase().includes(inputValue.toLowerCase()));
  const searchDropdown = document.createElement("div");
  searchDropdown.id = "search-dropdown";
  searchDropdown.style.zIndex = "9999";
  

  const specificElement = document.getElementById("line");

  // Attach a click event listener to the document
  document.addEventListener("click", (event) => {
  // Check if the click target is the specific element or one of its children
    if (!specificElement.contains(event.target)) {
      searchDropDownOpen = false;
      animateLinesTogether();
      // Perform any action you want when a click occurs outside the specific element
  }
  });

  for (const result of searchResults) {
    const resultLink = document.createElement("a");
    resultLink.textContent = result.title;
    resultLink.href = "#";
    resultLink.addEventListener("click", () => {
      searchDropdown.remove();
      const windowExists = windowList.find(window => window.dataset.windowId === result.id);
      if (windowExists) {
        reopenWindow(windowExists.UID);
      } else {
        const newWindow = createWindow(result.id, windows, "quote");
        const content = document.getElementById("content");
        content.appendChild(newWindow);
      }
    });
    searchDropdown.appendChild(resultLink);
  }

  const searchElement = document.getElementById("line");
  searchElement.appendChild(searchDropdown);
}



document.addEventListener("DOMContentLoaded", () => {
  const hrElement = document.getElementById("line");

  hrElement.addEventListener("mouseenter", animateLinesApart);
  hrElement.addEventListener("mouseleave", animateLinesTogether);
});

