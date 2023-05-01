export let windowList = [];
let createdWindows = 0;
let currentWindow = null;
window.highestZIndex = 0;
let offset = { x: 0, y: 0 };
let bigImageCounter = 0;
let currentBigImageID = null;
let dataWindow;
function load() {
    return fetch('assets/data.json')
      .then(response => response.json())
      .then(data => {
        // Get window data from JSON
        return data.windows;
      });
}

function createContactsWindow(window) {
  // Main window container
  const windowContainer = document.createElement('div');
  windowContainer.id = 'window';
  windowContainer.classList.add('window');
  windowContainer.style.position = 'absolute';
  windowContainer.style.top = '10px';
  windowContainer.style.left = '10px';
  windowContainer.style.width = '50%';
  windowContainer.style.height = '90%';

  // Window bar
  const windowBar = document.createElement('div');
  windowBar.classList.add('windowbar');
  windowContainer.appendChild(windowBar);

  // Title element
  const title = document.createElement('div');
  title.classList.add('title');
  windowBar.appendChild(title);

  // Title paragraph
  const titleParagraph = document.createElement('p');
  titleParagraph.style.color = '#17A7B0';
  titleParagraph.textContent = window.title;
  title.appendChild(titleParagraph);

  // Exit element
  const exit = document.createElement('div');
  exit.classList.add('exit');
  windowBar.appendChild(exit);
  windowBar.addEventListener('mousedown', selectWindow);
  // Exit circles
  const exitCircleMin = document.createElement('div');
  exitCircleMin.id = 'exit';
  exitCircleMin.classList.add('circle', 'C_min');
  exit.appendChild(exitCircleMin);

  const exitCircleExit = document.createElement('div');
  exitCircleExit.id = 'exit';
  exitCircleExit.classList.add('circle', 'C_exit');
  exit.appendChild(exitCircleExit);

  // Event listeners for exit and minimize circles
  exitCircleExit.addEventListener('click', () => {
    closeWindow(windowContainer);
  });

  exitCircleMin.addEventListener('click', () => {
    removeWindow(windowContainer);
  });

  // Window content
  const windowContent = document.createElement('div');
  windowContent.id = "contact-w-content"
  windowContent.classList.add('windowcontent');
  windowContainer.appendChild(windowContent);

  const leftContact = document.createElement('div');
  leftContact.id = "left-column";
  windowContent.appendChild(leftContact)

  const rightContact = document.createElement('div');
  rightContact.id = "right-column";
  windowContent.appendChild(rightContact)

  // Contact image
  const contactImage = document.createElement('img');
  contactImage.id = "main-image"
  contactImage.src = window.imageURL;
  contactImage.alt = `${window.name}'s image`;
  leftContact.appendChild(contactImage);

  // Contact name
  const contactName = document.createElement('h2');
  contactName.textContent = window.name;
  rightContact.appendChild(contactName);

  // Contact info
  const contactInfo = document.createElement('p');
  contactInfo.textContent = window.info;
  rightContact.appendChild(contactInfo);

  // Social media container
  const socialMediaContainer = document.createElement('div');
  socialMediaContainer.classList.add('social-media');
  rightContact.appendChild(socialMediaContainer);

  // Social media links
  window.socialMediaLinks.forEach((link) => {
    const socialMediaLink = document.createElement('a');
    socialMediaLink.href = link.url;
    socialMediaLink.textContent = link.name;
    socialMediaLink.target = '_blank';
    socialMediaLink.style.marginRight = '10px';
    socialMediaContainer.appendChild(socialMediaLink);
  });

  return windowContainer;
}
function createProjectsWindow(window) {
  // Main window container
  const windowContainer = document.createElement('div');
  windowContainer.id = 'window';
  windowContainer.classList.add('window');
  windowContainer.style.position = 'absolute';
  windowContainer.style.top = '10px';
  windowContainer.style.left = '10px';
  windowContainer.style.width = '50%';
  windowContainer.style.height = '90%';

  // Window bar
  const windowBar = document.createElement('div');
  windowBar.classList.add('windowbar');
  windowContainer.appendChild(windowBar);

  // Title element
  const title = document.createElement('div');
  title.classList.add('title');
  windowBar.appendChild(title);

  // Title paragraph
  const titleParagraph = document.createElement('p');
  titleParagraph.style.color = '#17A7B0';
  titleParagraph.textContent = window.title;
  title.appendChild(titleParagraph);

  // Exit element
  const exit = document.createElement('div');
  exit.classList.add('exit');
  windowBar.appendChild(exit);
  windowBar.addEventListener('mousedown', selectWindow);
  // Exit circles
  const exitCircleMin = document.createElement('div');
  exitCircleMin.id = 'exit';
  exitCircleMin.classList.add('circle', 'C_min');
  exit.appendChild(exitCircleMin);

  const exitCircleExit = document.createElement('div');
  exitCircleExit.id = 'exit';
  exitCircleExit.classList.add('circle', 'C_exit');
  exit.appendChild(exitCircleExit);

  // Event listeners for exit and minimize circles
  exitCircleExit.addEventListener('click', () => {
    closeWindow(windowContainer);
  });

  exitCircleMin.addEventListener('click', () => {
    removeWindow(windowContainer);
  });

  // Window content
  const windowContent = document.createElement('div');
  windowContent.classList.add('windowcontent');
  windowContainer.appendChild(windowContent);

  // Container for the image display and text
  const imageDisplayContainer = document.createElement('div');
  imageDisplayContainer.classList.add('container');
  windowContent.appendChild(imageDisplayContainer);

  // Left side with the images
  const left = document.createElement('div');
  left.classList.add('left');
  imageDisplayContainer.appendChild(left);

  // Big image
  const bigImage = document.createElement('img');
  bigImage.src = window.images[0]; // Set the big image source to the first image in the array
  bigImage.alt = 'Big image';
  bigImage.id = "bigImage" + bigImageCounter;
  bigImage.style.width = "100%";
  bigImage.style.height = "60%";
  bigImage.style.borderRadius = "5px";

  bigImageCounter++;

  // Set the current big image ID
  currentBigImageID = bigImage.id;
  left.appendChild(bigImage);

  // Small images container
  const smallImages = document.createElement('div');
  smallImages.classList.add('smallImages');
  left.appendChild(smallImages);

  // Small images
  for (let i = 1; i <= 4; i++) {
    const smallImage = document.createElement('img');
    smallImage.src = window.images[i]; // Set the small image sources to the corresponding images in the array
    smallImage.alt = `Small image ${i}`;
    smallImage.bigID = currentBigImageID
    smallImage.onclick = function () {
      switchImage(smallImage);
    };
    smallImages.appendChild(smallImage);
  }

  // Right side with the text
  const right = document.createElement('div');
  right.classList.add('right');
  imageDisplayContainer.appendChild(right);

  // Text on the right side
  const info_title = document.createElement('h1');
  const info = document.createElement('p');
  const info_container = document.createElement("div");

  info_container.classList.add("info_container")
  info.textContent = window.info;
  info_title.textContent = window.title;
  right.appendChild(info_title);
  info_container.appendChild(info);
  right.appendChild(info_container);


  return windowContainer;
}

function switchImage(smallImage) {
  const bigImage = document.getElementById(smallImage.bigID);
  const tempSrc = smallImage.src;
  smallImage.src = bigImage.src;
  bigImage.src = tempSrc;
}


function createWorldsWindow(window) {
  // Main window container
  const windowContainer = document.createElement('div');
  windowContainer.id = 'window';
  windowContainer.classList.add('window');
  windowContainer.style.position = 'absolute';
  windowContainer.style.top = '10%';
  windowContainer.style.left = '10%';
  windowContainer.style.width = '50%';
  windowContainer.style.height = '50%';

  // Window bar
  const windowBar = document.createElement('div');
  windowBar.classList.add('windowbar');
  windowContainer.appendChild(windowBar);

  // Title element
  const title = document.createElement('div');
  title.classList.add('title');
  windowBar.appendChild(title);

  // Title paragraph
  const titleParagraph = document.createElement('p');
  titleParagraph.style.color = '#17A7B0';
  titleParagraph.textContent = window.title;
  title.appendChild(titleParagraph);

  // Exit element
  const exit = document.createElement('div');
  exit.classList.add('exit');
  windowBar.appendChild(exit);
  windowBar.addEventListener('mousedown', selectWindow);
  // Exit circles
  const exitCircleMin = document.createElement('div');
  exitCircleMin.id = 'exit';
  exitCircleMin.classList.add('circle', 'C_min');
  exit.appendChild(exitCircleMin);

  const exitCircleExit = document.createElement('div');
  exitCircleExit.id = 'exit';
  exitCircleExit.classList.add('circle', 'C_exit');
  exit.appendChild(exitCircleExit);

  // Event listeners for exit and minimize circles
  exitCircleExit.addEventListener('click', () => {
    closeWindow(windowContainer);
  });

  exitCircleMin.addEventListener('click', () => {
    removeWindow(windowContainer);
  });

  // Window content
  const windowContent = document.createElement('div');
  windowContent.classList.add('windowcontent');
  windowContainer.appendChild(windowContent);

  // World content
  const worldContent = document.createElement('div');
  worldContent.classList.add('world-content');
  windowContent.appendChild(worldContent);

// World elements
for (let i = 0; i < 3; i++) {
  const world = document.createElement('div');
  world.classList.add('world');
  worldContent.appendChild(world);

  // Create anchor element
  const anchor = document.createElement('a');
  anchor.target = '_blank'; // Open link in a new tab
  world.appendChild(anchor);

  // World image
  const worldImage = document.createElement('img');
  worldImage.classList.add('world-images');
  anchor.appendChild(worldImage);

  // World text
  const worldText = document.createElement('p');
  worldText.classList.add('world-text');
  worldText.style.color = "#FFFFFF";
  
  anchor.appendChild(worldText);

  if (i == 0) {
    worldImage.src = 'images/skolsmp.png';
    worldText.textContent = 'NTI Smp 2021';
    anchor.href = 'https://www.mediafire.com/file/70kmvhhpehepi6t/Smp_2021.zip/file';
  } else if (i == 1) {
    worldImage.src = 'images/smp4.png';
    worldText.textContent = 'Smp4 2022';
    anchor.href = 'https://www.mediafire.com/file/v1e536dsyzmxbsy/world.zip/file';
  } else if (i == 2) {
    worldImage.src = 'images/prison.png';
    worldText.textContent = 'Prison 2020';
    anchor.href = 'https://www.bop.gov/';
  }
}

  return windowContainer;
}


function createQuoteWindow(window) {
    const windowDiv = document.createElement('div');
    windowDiv.setAttribute('id', 'window-' + window.id);
    windowDiv.style.position = 'absolute';
    windowDiv.style.top = '20%';
    windowDiv.style.left = '20%';
    windowDiv.style.width = '815px';
    windowDiv.style.height = '44%';
    windowDiv.classList.add('window');
  
    const windowBar = document.createElement('div');
    windowBar.classList.add('windowbar');
  
    const title = document.createElement('div');
    title.classList.add('title');
    const titleText = document.createElement('p');
    titleText.textContent = window.title;
    titleText.style.color = '#17A7B0';
    title.appendChild(titleText);
  
    const exit = document.createElement('div');
    exit.classList.add('exit');
    const exitCircle = document.createElement('div');
    exitCircle.classList.add('C_exit');
    exitCircle.classList.add('circle');
    exitCircle.id = 'exit';
    exitCircle.addEventListener('click', () => {
      closeWindow(windowDiv);
      
    });
    const minCircle = document.createElement('div');
    minCircle.classList.add('C_min');
    minCircle.classList.add('circle');
    minCircle.id = 'exit';
    minCircle.addEventListener('click', () => {
      removeWindow(windowDiv);
      
    });
    exit.appendChild(minCircle);
    exit.appendChild(exitCircle);
  
    windowBar.appendChild(title);
    windowBar.appendChild(exit);
    windowBar.addEventListener('mousedown', selectWindow);

    const windowContent = document.createElement('div');
    windowContent.classList.add('windowcontent');
  
    const headerDiv = document.createElement('div');
    headerDiv.style.display = 'flex';
    headerDiv.style.height = '40%';
    const header = document.createElement('h1');
    header.textContent = window.text;
    header.classList.add('uppercase'); // Add 'uppercase' class
    header.style.fontSize = '30px';
    header.style.padding = '20px';
    header.style.color = 'white';
    headerDiv.appendChild(header);
    windowContent.appendChild(headerDiv);
  
    const dateDiv = document.createElement('div');
    dateDiv.style.display = 'flex';
    dateDiv.style.justifyContent = 'end';
    dateDiv.style.height = '10%';
    const date = document.createElement('h1');
    date.textContent = window.date;
    date.style.fontSize = '40px';
    date.style.color = 'white';
    date.id = "date"
    dateDiv.appendChild(date);
    windowContent.appendChild(dateDiv);
  
    const imageDiv = document.createElement('div');
    imageDiv.style.height = '50%';
    imageDiv.style.display = 'flex';
    imageDiv.style.alignItems = 'end';
    const dice = document.createElement('img');
    dice.src = 'images/dice.svg';
    dice.id = 'dice';
    dice.addEventListener('click', () => {
      const randomId = getRandomNumber(1,10);
      const randomQuote = dataWindow[randomId];
      updateWindowContent(windowDiv, randomQuote);
    });
    imageDiv.appendChild(dice);
    windowContent.appendChild(imageDiv);
  
    windowDiv.appendChild(windowBar);
    windowDiv.appendChild(windowContent);
  
    return windowDiv;
  }

function createActionBarElement(windowData, UID) {
    const actionBarElement = document.createElement('div');
    actionBarElement.classList.add('actionbar-window');
    actionBarElement.UID = UID;
    const maxTitleLength = 15;
    let windowTitle = windowData.title;
    
    if (windowTitle.length > maxTitleLength) {
        windowTitle = windowTitle.substring(0, maxTitleLength - 2) + '..';
    }

    actionBarElement.innerText = windowTitle;
    actionBarElement.addEventListener('click', () => {
      reopenWindow(UID, windowData);
      
    });

    return actionBarElement;
}

function updateWindowContent(Window, quoteData) {
  console.log(quoteData);
  console.log(Window);
  const titleElement = Window.querySelector('.title p');
  const textElement = Window.querySelector('.windowcontent h1');
  const dateElement = Window.querySelector('.windowcontent #date');
  
  titleElement.textContent = quoteData.title;
  textElement.textContent = quoteData.text.toUpperCase();
  dateElement.textContent = quoteData.date;
}

export function createWindow(id, windowData, windowType) {
  const actionBar = document.getElementById('actionbar');
  if (createdWindows > 7){
    return
  }

  for (let i = 0; i < windowData.length; i++) {
      const window = windowData[i];
      
      if (window.id === id) {
          let Window;

          
          if (windowType === 'qvoute') {
              Window = createQuoteWindow(window);
          } else if (windowType === 'world') {
              Window = createWorldsWindow(window);
          
          } else if (windowType === "project"){
              Window = createProjectsWindow(window);
          } else if (windowType === "contact"){
              Window = createContactsWindow(window);
          } else {
              console.error('Unknown window type:', windowType);
              return;
          }

          
          let UID = 23 * window.id / (windowList.length + 1);

          const content = document.getElementById("content");
          content.appendChild(Window);
          Window.style.display = 'block';
          Window.style.zIndex = window.highestZIndex;
          Window.UID = UID;

          

          // Apply an offset to the window's position
          const positionOffset = 20 * createdWindows;
          Window.style.left = `calc(${Window.style.left} + ${positionOffset}px)`;
          Window.style.top = `calc(${Window.style.top} + ${positionOffset}px)`;
          createdWindows++; // Increment the created windows counter
          windowList.push(Window);
  

          // Add the actionbar element
          const actionBarElement = createActionBarElement(window, Window.UID);
          actionBar.appendChild(actionBarElement);

          break;
      }
  }   
}

function removeWindow(windowElement){
  windowElement.remove();
  createdWindows -= 1;
  const actionBar = document.getElementById('actionbar');
  const actionBarElements = actionBar.children;

  for (let i = 0; i < actionBarElements.length; i++) {
    const actionBarElement = actionBarElements[i];

    if (actionBarElement.UID === windowElement.UID) {
      actionBar.removeChild(actionBarElement);
      break;
    }
  }
}

function closeWindow(windowElement) {
  windowElement.style.display = 'none'; // Hide the window
}
export function reopenWindow(UID, windowData) {
  const content = document.getElementById("content");
  const children = content.children;

  for (let i = 0; i < children.length; i++) {
    const windowElement = children[i];

    if (windowElement.UID === UID) {
      windowElement.style.display = 'block';
      windowElement.style.zIndex = window.highestZIndex;
      window.highestZIndex ++;
      break;
    }
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load JSON data and show the first window
load().then(windowData => {
  dataWindow = windowData
  const currentPage = window.location.pathname.split('/').pop();

  switch (currentPage) {
    case 'index.html':
      createWindowHome(windowData);
      break;
    case 'qvoutes.html':
      createWindowQvoutes(windowData);
      break;
    case 'projects.html':
      createWindowProject(windowData);
      break;
    case 'worlds.html':
      createWindowWorlds(windowData);
      break;
    case 'contact.html':
      createWindowContact(windowData);
      break;
    default:
      console.error('Unexpected page:', currentPage);
  }

  
});

function createWindowHome(windowData) {}

function createWindowQvoutes(windowData) {
  const min = 1;
  const max = 10;
  const randomValue = getRandomNumber(min, max);
  createWindow(randomValue, windowData, 'qvoute');
}

function createWindowProject(windowData) {
  createWindow(12, windowData, 'project');
}
function createWindowWorlds(windowData) {
  createWindow(11, windowData, 'world');
}
function createWindowContact(windowData) {
  createWindow(14, windowData, 'contact');
}


function selectWindow(event) {
    currentWindow = event.currentTarget.parentNode;
    currentWindow.style.zIndex = window.highestZIndex;
    window.highestZIndex += 1;
    const bounds = currentWindow.getBoundingClientRect();
    const bodyBounds = document.body.getBoundingClientRect();
    offset.x = event.clientX - bounds.left + bodyBounds.left;
    offset.y = event.clientY - bounds.top + bodyBounds.top + 90;
    document.addEventListener('mousemove', moveWindow);
    document.addEventListener('mouseup', releaseWindow);
    // Assuming 'selectedWindow' is the window element you just clicked/selected
    currentBigImageID = currentWindow.getAttribute('data-big-image-id');

}
  
function moveWindow(event) {
    if (currentWindow !== null) {
        const windowRect = currentWindow.getBoundingClientRect();
        const maxWidth = window.innerWidth - windowRect.width;
        const maxHeight = window.innerHeight - windowRect.height;
        const left = Math.max(0, Math.min(maxWidth, event.clientX - offset.x));
        const top = Math.max(0, Math.min(maxHeight, event.clientY - offset.y));

        currentWindow.style.left = left + 'px';
        currentWindow.style.top = top + 'px';
    }
}

// Function to release the window when mouse is released
function releaseWindow(event) {
    // Remove mousemove and mouseup event listeners
    document.removeEventListener('mousemove', moveWindow);
    document.removeEventListener('mouseup', releaseWindow);
  }

  