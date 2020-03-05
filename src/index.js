const p5 = require("p5");
const sketch = require("./sketch.js");

// Global Variables
let poster;

let winW = () => window.innerWidth;
let winH = () => window.innerHeight;

// Init
function init() {
  poster = new p5(sketch);
}
init();

window.addEventListener("resize", () => {
  poster.updateCanvasSize(winW(), winH());
});
