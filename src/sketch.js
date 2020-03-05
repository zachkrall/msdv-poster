const config = require("./config.js");
const colors = require("./colors.js");
const moment = require("moment");

const sketch = p => {
  // Global Variables
  let txtre,
    canvas,
    theme = colors[0],
    txt_pos = 0,
    fgcolor = theme[0],
    bgcolor = theme[1],
    message_string,
    message_counter = 0,
    message_options = [
      config.eventTitle,
      config.department,
      config.school,
      config.location.replace(/\n/g, " - ")
    ],
    fontFamily,
    normX = 0,
    normY = 0;

  p.preload = () => {
    fontFamily = p.loadFont("../fonts/FivoSansModern-Medium.otf");
  };

  // Set Up Canvas
  p.setup = () => {
    // create canvas and append to div
    canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    canvas.parent("#canvas");
    // create texture canvas
    txtre = p.createGraphics(800, 800);
    // set theme colors
    p.updateColors();
    p.updateMessage();

    p.textFont(fontFamily);

    normX = p.width * -0.5;
    normY = p.height * -0.5;
  };

  // function for randomly selecting theme colors
  p.updateColors = () => {
    let new_theme = colors[parseInt(colors.length * Math.random())];

    if (new_theme[0] == theme[0]) {
      p.updateColors();
    } else {
      theme = new_theme;
      bgcolor = new_theme[1];
      fgcolor = new_theme[0];
    }
  };

  p.updateMessage = () => {
    message = message_options[message_counter % message_options.length];
    message_counter++;
  };

  p.repeatString = (string, repeat) => {
    let new_string = string;
    for (let i = 0; i < repeat; i++) {
      new_string += " " + string;
    }
    return new_string;
  };

  p.txtre = inputTextValue => {
    txtre.background(bgcolor);
    txtre.fill(fgcolor);
    txtre.textSize(40);
    txtre.textFont(fontFamily);
    txtre.textAlign(p.LEFT, p.TOP);

    for (let i = 0; i < 9; i++) {
      txtre.text(
        p.repeatString(inputTextValue.toUpperCase(), 20),
        txt_pos - i * 100,
        i * 70
      );
    }

    // txtre.rect(txt_pos + 500, 100, 10, 10);

    if (txt_pos < -500) {
      txt_pos = 0;
    } else {
      txt_pos -= 0.9;
    }
  };

  p.draw = () => {
    p.background(bgcolor);

    p.txtre(message);

    if (p.frameCount % 80 == 0) {
      p.updateMessage();
    }
    // if (p.frameCount % (80 * message_options.length) == 0) {
    //   p.updateColors();
    // }

    p.push();
    p.translate(0, 90, -450);
    p.push();
    p.rotateX(Math.sin(p.frameCount * 0.001) + p.frameCount * 0.001 * -1);
    p.rotateY(p.frameCount * 0.005);
    p.drawCube(0, 0, Math.sin(p.frameCount * 0.001), txtre);
    p.pop();
    p.push();
    p.rotateX(p.frameCount * 0.001 * -1);
    p.rotateY(p.frameCount * 0.001);
    p.drawCube(0, 0, 0, txtre);
    p.pop();
    p.pop();

    p.fill(fgcolor);

    p.textSize(60);
    p.textAlign(p.LEFT, p.TOP);
    p.text(
      moment(config.date)
        .format("ddd")
        .toUpperCase(),
      normX + 20,
      normY + 33,
      p.width,
      p.height
    );
    p.textSize(70);
    p.textAlign(p.LEFT, p.TOP);
    p.text(
      moment(config.date).format("M/DD"),
      normX + 20,
      normY + 90,
      p.width,
      p.height
    );
    p.text(config.time, normX + 300, normY + 90, p.width, p.height);

    // p.textAlign(p.LEFT, p.BOTTOM);
    p.push();
    p.textSize(60);
    p.textLeading(70);
    p.text(
      config.location,
      normX + 20,
      normY + p.height - 70 * 3 - 20,
      p.width - 40,
      p.height * 0.5
    );
    p.pop();

    p.push();
    p.textSize(110);
    p.textLeading(100);
    p.textAlign(p.LEFT, p.TOP);
    p.text(
      config.eventTitle,
      normX + 20,
      normY + 220,
      p.width - 100,
      p.height - 100
    );
    p.pop();
  };

  p.drawCube = (x = 0, y = 0, z = 0, texture) => {
    p.push();
    if (texture) {
      p.texture(texture);
      p.textureMode(p.NORMAL);
    }
    p.noStroke();
    p.translate(x, y, z);
    p.sphere(600);
    p.pop();
  };

  p.updateCanvasSize = (width, height) => {
    p.resizeCanvas(width, height);
    normX = p.width * -0.5;
    normY = p.height * -0.5;
  };
};

module.exports = sketch;
