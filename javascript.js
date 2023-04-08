windowList = [];
let currentWindow = null;
let highestZIndex = 0;
let offset = { x: 0, y: 0 };



function load() {
    return fetch('data.json')
      .then(response => response.json())
      .then(data => {
        // Get window data from JSON
        return data.windows;
      });
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
    const exitCircle = document.createElement('circle');
    exitCircle.classList.add('C_exit');
    exitCircle.id = 'exit';
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
    dateDiv.appendChild(date);
    windowContent.appendChild(dateDiv);
  
    const imageDiv = document.createElement('div');
    imageDiv.style.height = '50%';
    imageDiv.style.display = 'flex';
    imageDiv.style.alignItems = 'end';
    const image = document.createElement('img');
    image.src = 'images/dice.svg';
    imageDiv.appendChild(image);
    windowContent.appendChild(imageDiv);
  
    windowDiv.appendChild(windowBar);
    windowDiv.appendChild(windowContent);
  
    return windowDiv;
  }
  
function createWindow(id, windowData, windowType) {
    for (let i = 0; i < windowData.length; i++) {
        const window = windowData[i];
        
        if (window.id === id) {
            let Window;
  
        if (windowType === 'quote') {
          Window = createQuoteWindow(window);
        } else if (windowType === 'yourWindowType') {
          // Add your own window creation function here
          // Example: quoteWindow = createYourWindowType(window);
        } else {
          console.error('Unknown window type:', windowType);
          return;
        }
  
        const content = document.getElementById("content");
        content.appendChild(Window);
        Window.style.display = 'block';
        Window.style.zIndex = highestZIndex;
        windowList.push(window.id);
        console.log(windowList);
        break;
      }
    }
  }
  
  // Load JSON data and show the first window
  load().then(windowData => {
    createWindow(5, windowData, 'quote');
    createWindow(2, windowData, 'quote');
  });
  //Now, the function will only create and display the window with the specified id. If you want to create multiple windows, just call the createWindow function multiple times with different id values.
  


function selectWindow(event) {
    
    currentWindow = event.currentTarget.parentNode;
    currentWindow.style.zIndex = highestZIndex;
    highestZIndex += 1;
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
        console.log('Cursor position:', event.clientX, event.clientY);
        console.log('Window position:', left, top);
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
  