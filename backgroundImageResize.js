
console.log("firstirergghdn")



let largeImage;

import { windowList } from './javascript.js';

function updateBackgroundImage() {
  const body = document.body;
  const smallImage = body.getAttribute("data-bg-small");
  const smallerImage = body.getAttribute("small")
  if (!largeImage) {
    largeImage = body.style.backgroundImage;
  }
  if(window.innerWidth <= 1700 && window.innerWidth > 1000) {
    body.style.backgroundImage = `url('${smallerImage}')`;
  } else if(window.innerWidth <= 1000) {
    body.style.backgroundImage = `url('${smallImage}')`;
  } else {
    body.style.backgroundImage = largeImage;
  }
}

// Check if the website is in mobile mode
function isMobile() {
  return window.innerWidth < 1100;
}

export function fixWindowsToScroll() {
  let oldSize = [];
  for (let i = 0; i < windowList.length; i++) {
  oldSize.push([windowList[i].style.width, windowList[i].style.height]);
  }
  console.log(window.innerWidth)
  // Check if the website is in mobile mode
  console.log(window.innerWidth, "ismobile");
  if (isMobile()) {
    console.log(window.innerWidth,"width 2" , windowList.length)  
    // Set window width and height to a fixed value
    for (let i = 0; i < windowList.length; i++) {
      windowList[i].style.width = "90%";
      windowList[i].style.maxheight = "800px";
      windowList[i].style.top = i * 7 + "20px";
      windowList[i].style.left = "50px";
      
      console.log("jgn");
    }
  } else {
    // Set window width and height back to original size
    for (let i = 0; i < windowList.length; i++) {
      console.log(oldSize[i][0]);
      windowList[i].style.width = oldSize[i][0];
      windowList[i].style.top = "50px"
      windowList[i].style.left = "50px"
      console.log("back")
    }
  }
}

// Remember original window sizes
let oldSize = [];
for (let i = 0; i < windowList.length; i++) {
  oldSize.push([windowList[i].style.width, windowList[i].style.height]);
}
console.log("oldSize:", oldSize);
console.log("1")
// Run the function on page load


// Attach the resize event listener to the window
window.addEventListener("resize", () => {
  fixWindowsToScroll();
  updateBackgroundImage();
  console.log("fd")
});

updateBackgroundImage();
fixWindowsToScroll();
console.log("3")



  