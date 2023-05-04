let isAnimating = false;
let animationTimeout;
let searchDropDownOpen = false;

import { createWindow, windowList } from './javascript.js';

function animateLinesApart() {
  if (isAnimating) {
    clearTimeout(animationTimeout);
  }
  if (searchDropDownOpen){
    return
  }

  const input = document.createElement("input");
  const upperLine = document.createElement("hr");
  const lowerLine = document.createElement("hr");


  if (!upperLine || !lowerLine || !input) {
    return;
  }

  const searchElement = document.getElementById("line");
  searchElement.innerHTML = "";

  
  upperLine.id = "upperline";
  lowerLine.id = "lowerline";

  upperLine.style.zIndex = window.highestZIndex + 1;
  lowerLine.style.zIndex = window.highestZIndex + 1;

  input.id = "search-input";
  input.style.display = "none";
  input.style.zIndex = window.highestZIndex;
  const textInput = sessionStorage.getItem("text");
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
    if (isScreenSizeLessThan()){
    upperLine.style.transform = "translateY(-48px)";
    lowerLine.style.transform = "translateY(48px)";
    }
    else{
    upperLine.style.transform = "translateY(-24px)";
    lowerLine.style.transform = "translateY(24px)";
    }
    input.style.display = "block";
    input.setAttribute("placeholder", "Search");
    input.autocomplete = "off"
    isAnimating = false;
  }, 50);
}

function isScreenSizeLessThan() {
  return window.innerWidth < 1000;
}

function animateLinesTogether() {
  
  if (isAnimating) {
    clearTimeout(animationTimeout);
  }

  const searchElement = document.getElementById("line");
  const upperLine = document.getElementById("upperline");
  const lowerLine = document.getElementById("lowerline");
  const input = document.getElementById("search-input");

  
  if (searchDropDownOpen == true) {
    
    return;
  }

  if (!upperLine || !lowerLine || !input) {
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

function handleSearchAction(searchTerm, windows) {
  const filteredWindows = windows.filter(window => window.title.toLowerCase() === searchTerm.toLowerCase());

  if (filteredWindows.length > 0) {
    const windowData = filteredWindows[0];
    const windowExists = windowList.find(window => window.dataset.windowId === windowData.id);
    createWindow(windowData.id, windows, windowData.type);
  } else {
    console.log("Does not exist.");
  }
}




async function showSearchResults(inputValue) {
  const response = await fetch("assets/data.json");
  const data = await response.json();

  const searchElement = document.getElementById("line");

  const windows = data.windows;
  const searchResults = windows.filter(window => window.text.toLowerCase().includes(inputValue.toLowerCase()));

  let searchDropdown = document.getElementById("search-dropdown");

  // If there's no searchDropdown, create one
  if (!searchDropdown) {
    searchDropdown = document.createElement("div");
    searchDropdown.id = "search-dropdown";
    searchDropdown.style.zIndex = "9999";
    searchElement.appendChild(searchDropdown);
  }

  // Clear the existing searchDropdown content
  searchDropdown.innerHTML = "";

  const input = document.getElementById("search-input");
  const specificElement = document.getElementById("line");
  const searchIcon = document.getElementById("search-icon");

  // Attach a click event listener to the document
  document.addEventListener("click", (event) => {
  // Check if the click target is the specific element or one of its children
    if (!specificElement.contains(event.target)) {
      searchDropDownOpen = false;
      animateLinesTogether();
      const hrElement = document.getElementById("line");
      hrElement.addEventListener("mouseenter", animateLinesApart);
      hrElement.addEventListener("mouseleave", animateLinesTogether);
      // Perform any action you want when a click occurs outside the specific element
  }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSearchAction(inputValue, windows);
      searchDropDownOpen = false;
      animateLinesTogether();
    }
  });

  
  searchIcon.addEventListener("click", () => {
    handleSearchAction(inputValue, windows);
  });


    for (const result of searchResults) {
    const resultLink = document.createElement("a");
    resultLink.style.padding = "5px"
    resultLink.textContent = result.text;
    resultLink.addEventListener("click", () => {
      searchDropdown.remove();
      
      const windowExists = windowList.find(window => window.dataset.windowId == result.id);
      createWindow(result.id, windows, result.type);
    });
    searchDropdown.appendChild(resultLink);
  }

  
  searchElement.appendChild(searchDropdown);
}

function openSearch(){
  const hrElement = document.getElementById("line");
  hrElement.removeEventListener("mouseenter", animateLinesApart);
  animateLinesApart();
}

document.addEventListener("DOMContentLoaded", () => {
  const hrElement = document.getElementById("line");
  const searchFooter = document.getElementById("search-icon-footer");
  hrElement.addEventListener("mouseenter", animateLinesApart);
  hrElement.addEventListener("mouseleave", animateLinesTogether);
  searchFooter.addEventListener("click", openSearch)
});

