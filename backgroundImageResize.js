let largeImage;

function updateBackgroundImage() {
  const body = document.body;
  const smallImage = body.getAttribute("data-bg-small");

  if (!largeImage) {
    largeImage = body.style.backgroundImage;
  }

  if (window.innerWidth <= 1500) {
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
  