let brushMode = 'basic';

drawGrid();

function drawGrid(divCount = 4) {
    const mainDiv = document.querySelector('#container');
    
    // Calculate width for each div
    const containerStyles = window.getComputedStyle(mainDiv);
    const gridDivWidth = Math.floor(parseFloat(containerStyles.width) / divCount);

    mainDiv.textContent = ''; // Empty div

    for (i = 1; i <= divCount; i++) {
        for (j = 1; j <= divCount; j++) {
            const newDiv = document.createElement('div');
            newDiv.classList = 'grid-div';
            newDiv.style.width = gridDivWidth;
            newDiv.style.height = gridDivWidth;
            newDiv.style.opacity = 0;
            mainDiv.appendChild(newDiv);
        }
        
        // Add a div to clear the float
        const lineBreak = document.createElement('br');
        mainDiv.appendChild(lineBreak); 
    }

    const gridDivs = document.querySelectorAll('.grid-div');

    gridDivs.forEach(div => {
        div.addEventListener('mouseenter', function(e) {
            if (brushMode == 'basic') {
                e.target.style.opacity = 1;
                e.target.style.backgroundColor = 'black';
            }

            if (brushMode == 'color') {
                e.target.style.opacity = 1;
                let red = Math.random() * 256;
                let green = Math.random() * 256;
                let blue = Math.random() * 256;
                e.target.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')'
            }

            if (brushMode == 'greyscale') {
                e.target.style.backgroundColor = 'black';
                console.log(window.getComputedStyle(e.target).getPropertyValue('opacity'));
                e.target.style.opacity = parseFloat(window.getComputedStyle(e.target).getPropertyValue('opacity')) + 0.1;
            }
        });
    });
}

const clearButton = document.querySelector('#clear');
const redrawButton = document.querySelector('#redraw');
const basicButton = document.querySelector('#basic');
const colorButton = document.querySelector('#randcolor');
const greyscaleButton = document.querySelector('#greyscale');

clearButton.addEventListener('click', function(e) {
    const gridDivs = document.querySelectorAll('.grid-div');

    gridDivs.forEach(div => {
        div.style.backgroundColor = 'white';
    });
});

redrawButton.addEventListener('click', function() {
    let cellNum = parseInt(prompt('How many cells wide/tall should the grid be? (Max: 64)'));

    if (isNaN(cellNum)) {
        alert('That\'s not a valid number! Drawing a 4 x 4 grid');
        drawGrid();
    } else if (cellNum > 64) {
        alert('You entered a number larger than 64! Drawing a 64 x 64 grid');
        drawGrid(64);
    } else {
        drawGrid(parseInt(cellNum));
    }
});

basicButton.addEventListener('click', function() {
    brushMode = 'basic';
});

colorButton.addEventListener('click', function() {
    brushMode = 'color';
});

greyscaleButton.addEventListener('click', function() {
    brushMode = 'greyscale';
});
