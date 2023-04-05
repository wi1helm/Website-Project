windowList = [];
let currentWindow = null;
let offset = { x: 0, y: 0 };

function load() {
    return fetch('data.json')
      .then(response => response.json())
      .then(data => {
        // Get window data from JSON
        return data.windows;
      });
}
  
// Function to show a window by id
function createWindow(id, windowData) {
    // Loop through each window
    for (let i = 0; i < windowData.length; i++) {
        const window = windowData[i];
        console.log(window.quote)
        // Create a div for the window and set its attributes
        const windowDiv = document.createElement('div');
        windowDiv.setAttribute('id', 'window-' + window.id);
        windowDiv.style.position = 'absolute';
        windowDiv.style.top = '50%';
        windowDiv.style.left = '50%';
        windowDiv.style.width = window.width + 'px';
        windowDiv.style.height = window.height + 'px';
        // create the window container
        windowDiv.classList.add('window');

        // create the window bar
        const windowBar = document.createElement('div');
        windowBar.classList.add('windowbar');
        windowBar.addEventListener('mousedown', selectWindow);

        // create the title element
        const title = document.createElement('div');
        title.classList.add('title');
        const titleText = document.createElement('p');
        titleText.textContent = 'Test';
        titleText.style.color = '#17A7B0';
        title.appendChild(titleText);

        // create the exit button
        const exit = document.createElement('div');
        exit.classList.add('exit');
        const exitCircle = document.createElement('circle');
        exitCircle.classList.add('C_exit');
        exitCircle.id = 'exit';
        exit.appendChild(exitCircle);

        // add title and exit button to the window bar
        windowBar.appendChild(title);
        windowBar.appendChild(exit);

        // create the window content
        const windowContent = document.createElement('div');
        windowContent.classList.add('windowcontent');
        const windowContentText = document.createElement('p');
        windowContentText.textContent = window.quote;
        windowContent.appendChild(windowContentText);

        // add window bar and content to the window
        windowDiv.appendChild(windowBar);
        windowDiv.appendChild(windowContent);

        const content = document.getElementById("content")
        // add window to the content container
        content.appendChild(windowDiv);
        if (window.id === id) {
            windowDiv.style.display = 'block';
            windowList.push(window.id)
            console.log(windowList)
        } 
        else {
            windowDiv.style.display = 'none';
        }
    }
}

// Load JSON data and show the first window
load().then(windowData => {
    createWindow(0, windowData);
    createWindow(2, windowData);
  });

function selectWindow(event) {
    currentWindow = event.currentTarget.parentNode;
    const bounds = currentWindow.getBoundingClientRect();
    const bodyBounds = document.body.getBoundingClientRect();
    offset.x = event.clientX - bounds.left + bodyBounds.left;
    offset.y = event.clientY - bounds.top + bodyBounds.top + 111;
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
    // Set window to inactive
    activeWindow = null;
  }
  