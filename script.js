let defaultPixelDensity = 16;
let brushColor = "#000000";

const drawingCanvas = document.querySelector(".drawingCanvas");
const clearCanvasButton = document.querySelector(".clearCanvasButton");
let canvasWidth = drawingCanvas.offsetWidth;
let canvasHeight = drawingCanvas.offsetHeight;
const colorPicker = document.querySelector(".colorPicker");
const rainbowButton = document.querySelector(".rainbow");



// Canvas Controls

// pixelDensity slider
var slider = document.getElementById("controlPixels");
var sliderOutput = document.getElementById("pixelsPerSide");
sliderOutput.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  sliderOutput.innerHTML = this.value;
  buildCanvas(slider.value);
}

// Brush Color
rainbowButton.addEventListener("click", () => {
  brushColorInt = Math.floor(Math.random()*16777215).toString(16); //Generate random color
  brushColor = `#${(brushColorInt.padStart(6, '0'))}`
  colorPicker.value = brushColor;
});

// Color Picker
//colorPicker.addEventListener("input", updateFirst, false);
colorPicker.addEventListener("change", watchColorPicker, false);

function watchColorPicker(event) {
  document.querySelectorAll("p").forEach(function(p) {
    brushColor = event.target.value;
  });
}


// Create pixels on the drawingCanvas
function addPixels(pixelDensity) {
  for (let row = slider.value; row > 0; row--) {
    const canvasRow = document.createElement("div");
    canvasRow.classList.add("canvasRow");
    drawingCanvas.append(canvasRow);
    
    for (let pixelInRow = slider.value; pixelInRow > 0; pixelInRow--) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      //pixel.style.height = `${((canvasHeight - 2) / pixelDensity)}px"`;
      pixel.style.width = `${(canvasWidth / slider.value)}px`;
      canvasRow.append(pixel);
      
      // Draw pixels on drawingCanvas
      pixel.addEventListener("click", function (e) {
        e.target.style.backgroundColor = brushColor;
      });


    };
  };
};





function clearCanvas() {
  drawingCanvas.innerHTML = "";
}

function buildCanvas(pixelDensity) {
  clearCanvas();
  addPixels(pixelDensity);
}

buildCanvas(defaultPixelDensity);

clearCanvasButton.addEventListener("click", () => {
  clearCanvas();
  addPixels(slider.value);
});


