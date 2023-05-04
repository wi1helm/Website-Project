let largeImage;

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

  
  
  // Run the function on page load
  document.addEventListener("DOMContentLoaded", () => {
    updateBackgroundImage();
    window.addEventListener("resize", updateBackgroundImage);
  });
  