export let windowList = [];
let createdWindows = 0;
let currentWindow = null;
window.highestZIndex = 0;
let offset = { x: 0, y: 0 };



function load() {
    return fetch('assets/data.json')
      .then(response => response.json())
      .then(data => {
        // Get window data from JSON
        return data.windows;
      });
}

function createWorldsWindow() {
  // Main window container
  const windowContainer = document.createElement('div');
  windowContainer.id = 'window';
  windowContainer.classList.add('window');
  windowContainer.style.position = 'absolute';
  windowContainer.style.top = '10%';
  windowContainer.style.left = '10%';
  windowContainer.style.width = '1350px';
  windowContainer.style.height = '800px';

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
  titleParagraph.textContent = 'Worlds';
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
  for (let i = 0; i < 7; i++) {
    const world = document.createElement('div');
    world.classList.add('world');
    worldContent.appendChild(world);

    // World image
    const worldImage = document.createElement('img');
    worldImage.classList.add('world-images');
    worldImage.src = 'images/unknown.png';
    world.appendChild(worldImage);

    // World text
    const worldText = document.createElement('p');
    worldText.classList.add('world-text');
    worldText.textContent = 'smp 1';
    world.appendChild(worldText);
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
      const randomId = Math.floor(Math.random() * windowData.length);
      const randomQuote = windowData[randomId];
      updateWindowContent(Window, randomQuote);
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

          
          if (windowType === 'quote') {
              Window = createQuoteWindow(window);
          } else if (windowType === 'world') {
              Window = createWorldsWindow(window);
              // Add your own window creation function here
              // Example: quoteWindow = createYourWindowType(window);
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
          Window.style.left = `calc(20% + ${positionOffset}px)`;
          Window.style.top = `calc(20% + ${positionOffset}px)`;
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

// Load JSON data and show the first window
load().then(windowData => {
  createWindow(0, windowData, 'world');
});
//Now, the function will only create and display the window with the specified id. If you want to create multiple windows, just call the createWindow function multiple times with different id values.



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

