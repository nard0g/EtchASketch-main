let defaultPixelDensity = 16;
let defaultColor = "black";



const drawingCanvas = document.querySelector(".drawingCanvas");
const clearCanvasButton = document.querySelector(".clearCanvasButton");
let canvasWidth = drawingCanvas.offsetWidth;
let canvasHeight = drawingCanvas.offsetHeight;
var slider = document.getElementById("controlPixels");
var sliderOutput = document.getElementById("pixelsPerSide");
sliderOutput.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)

slider.oninput = function() {
  sliderOutput.innerHTML = this.value;
  buildCanvas(slider.value);
}

function addPixels(pixelDensity) {
  for (let i = Math.pow(slider.value, 2); i > 0; i--) {
    const pixel = document.createElement('div');
    pixel.classList.add("pixel");
    pixel.style.height = (canvasHeight - 2) / pixelDensity + "px";
    pixel.style.width = (canvasWidth - 2) / pixelDensity + "px";
    drawingCanvas.append(pixel);
    pixel.addEventListener('click', function (e) {
      e.target.style.backgroundColor = 'black'
    });
  }
}

function clearCanvas() {
  drawingCanvas.innerHTML = '';
}

function buildCanvas(pixelDensity) {
  clearCanvas();
  addPixels(pixelDensity);
}

buildCanvas(defaultPixelDensity);

clearCanvasButton.addEventListener('click', () => {
  clearCanvas();
  addPixels(slider.value);
});


