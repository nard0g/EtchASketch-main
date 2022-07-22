let defaultPixelDensity = 16;
let brushColor = "#000000";
let rainbowMode = false;
let rainbowGradient = "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)";

const drawingCanvas = document.querySelector(".drawingCanvas");
const clearCanvasButton = document.querySelector("#clearCanvasButton");
let canvasWidth = drawingCanvas.offsetWidth;
const colorPicker = document.querySelector(".colorPicker");
const randomColorButton = document.querySelector(".randomColor");
const rainbowModeButton = document.querySelector(".rainbowMode");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");


// Canvas Controls

// pixelDensity slider
var slider = document.getElementById("controlPixels");
var sliderOutput = document.getElementById("pixelsPerSide");
sliderOutput.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  sliderOutput.innerHTML = this.value;
  buildCanvas(slider.value);
};


randomColorButton.addEventListener("click", () => {
  removeRainbowUI();
  randomizeColor();
  rainbowMode = false;
});

function setUItoBrushColor() {
  header.style.backgroundColor = brushColor;
  footer.style.backgroundColor = brushColor;
  clearCanvasButton.style.backgroundColor = brushColor;
  randomColorButton.style.backgroundColor = brushColor;
  rainbowModeButton.style.backgroundColor = brushColor;
};

function randomizeColor() {
  brushColorInt = Math.floor(Math.random()*16777215).toString(16); //Generate random color
  brushColor = `#${(brushColorInt.padStart(6, '0'))}`;
  colorPicker.value = brushColor;
  setUItoBrushColor();
};

// Toggle rainbowMode when button pressed
rainbowModeButton.addEventListener("click", () => {
  rainbowMode = !rainbowMode;
  checkRainbowMode(rainbowMode);
});

function checkRainbowMode(rainbowMode) {
  if (rainbowMode) {
    addRainbowToUI();
  } else {
    removeRainbowUI();
  };
};

function addRainbowToUI() {
  header.style.backgroundImage = rainbowGradient;
  footer.style.backgroundImage = rainbowGradient;
  clearCanvasButton.style.backgroundImage = rainbowGradient;
  randomColorButton.style.backgroundImage = rainbowGradient;
  rainbowModeButton.style.backgroundImage = rainbowGradient;
};

function removeRainbowUI() {
  header.style.removeProperty("background-image");
  footer.style.removeProperty("background-image");
  clearCanvasButton.style.removeProperty("background-image");
  randomColorButton.style.removeProperty("background-image");
  rainbowModeButton.style.removeProperty("background-image");
};

// Color Picker
colorPicker.addEventListener("change", watchColorPicker, false);

function watchColorPicker(event) {
  document.querySelectorAll("p").forEach(function(p) {
    rainbowMode = false;
    brushColor = event.target.value;
    setUItoBrushColor();
    removeRainbowUI();
  });
};


// Create pixels on the drawingCanvas
function addPixels(pixelDensity) {
  for (let row = slider.value; row > 0; row--) {
    const canvasRow = document.createElement("div");
    canvasRow.classList.add("canvasRow");
    drawingCanvas.append(canvasRow);
    
    for (let pixelInRow = slider.value; pixelInRow > 0; pixelInRow--) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      pixel.style.width = `${(canvasWidth / slider.value)}px`;
      canvasRow.append(pixel);
      
      // Draw pixels on drawingCanvas
      pixel.addEventListener("mouseover", function (e) {
        if (rainbowMode) {
          randomizeColor();
        }
        e.target.style.backgroundColor = brushColor;       
      });
    };
  };
};


function clearCanvas() {
  drawingCanvas.innerHTML = "";
};

function buildCanvas(pixelDensity) {
  clearCanvas();
  addPixels(pixelDensity);
};

buildCanvas(defaultPixelDensity);

clearCanvasButton.addEventListener("click", () => {
  clearCanvas();
  addPixels(slider.value);
});


