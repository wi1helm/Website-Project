let isAnimating = false;

function animateLinesApart() {
  if (isAnimating) return;

  const searchElement = document.getElementById("line");
  searchElement.innerHTML = "";

  input = document.createElement("input")
  upperLine = document.createElement("hr");
  lowerLine = document.createElement("hr");

  upperLine.id = "upperline";
  lowerLine.id = "lowerline";

  upperLine.style.zIndex = window.highestZIndex + 1;
  lowerLine.style.zIndex = window.highestZIndex + 1;

  input.id = "search-input"
  input.style.display = "none"
  input.style.zIndex = window.highestZIndex
  const textInput = sessionStorage.getItem("text")
  console.log(textInput)
  input.value = textInput

  window.highestZIndex ++;
  searchElement.appendChild(upperLine);
  searchElement.appendChild(input);
  searchElement.appendChild(lowerLine);

  isAnimating = true;
  setTimeout(() => {
    upperLine.style.transform = "translateY(-24px)";
    lowerLine.style.transform = "translateY(24px)";
    input.style.display = "block"
    input.setAttribute("placeholder","Your placeholder text here");
    isAnimating = false;
  }, 50);
}

function animateLinesTogether() {
  if (isAnimating) return;

  const searchElement = document.getElementById("line");
  const upperLine = document.getElementById("upperline");
  const lowerLine = document.getElementById("lowerline");
  const input = document.getElementById("search-input");

  sessionStorage.setItem("text", input.value);

  input.style.display = "none"

  upperLine.style.transform = "translateY(0)";
  lowerLine.style.transform = "translateY(0)";

  isAnimating = true;
  setTimeout(() => {
    upperLine.remove();
    lowerLine.remove();
    hr = document.createElement("hr");
    searchElement.appendChild(hr);
    isAnimating = false;
  }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
    const hrElement = document.getElementById("line");
  
    const input = document.getElementById("search-input");
    let typing = false;
    input.addEventListener("input", () => {
      typing = true;
      setTimeout(() => {
        typing = false;
      }, 100);
    });
  
    hrElement.addEventListener("mouseenter", animateLinesApart);
    hrElement.addEventListener("mouseleave", () => {
      if (!typing) {
        animateLinesTogether();
      }
    });
  });
