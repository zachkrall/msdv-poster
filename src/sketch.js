const moment = require('moment')
const colors = require('./colors.js')
const config = require('../poster.config.js')

const sketch = p => {
  let fontface
  let c = 0
  let pause = 0
  let pause_duration = 70
  let rotation_angle = 90

  // normalized coordinates
  normX = 0
  normY = 0

  // declare texture variables
  let texture1
  let texture2

  let featuredTextPos = 0
  let featuredTextArray = [
    config.title,
    config.school,
    config.department,
    config.time,
    ...config.students
  ]
  let featuredText = featuredTextArray[0]

  p.preload = () => {
    fontface = p.loadFont('./fonts/NeueDisplay-Wide.otf')
  }

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL)

    p.textFont(fontface)

    texture1 = p.createGraphics(800, 800)
    texture2 = p.createGraphics(800, 800)

    normX = p.width * -0.5
    normY = p.height * -0.5

    p.noStroke()
  }

  p.title = () => {
    p.push()
    p.fill(colors['Parsons Red'])
    p.textSize(100)

    p.textAlign(p.CENTER, p.CENTER)
    p.text(config.title, 0, 0, 0)
    p.pop()
  }

  p.cube = ({ c, x = 0, y = 0, z = 0, size = 300, texture } = {}) => {
    p.push()
    p.translate(x, y, z)

    p.push()

    p.noStroke()

    if (texture) {
      p.texture(texture)
      p.textureMode(p.NORMAL)
    }

    let r = c => (p.PI / 180) * c
    p.rotateX(r(c))
    p.rotateY(r(c))
    p.box(size)

    p.pop()
    p.pop()
  }

  p.drawTexture1 = ({ t, c } = {}) => {
    t.background(colors['Parsons Red'])

    t.push()
    t.noStroke()
    // font settings
    t.textFont(fontface)
    t.textSize(t.width * 0.1)
    t.textAlign(t.CENTER, t.CENTER)

    // translation
    t.translate(t.width * -0.21, t.height * 0.47)
    t.rotate((t.PI / 180) * -45)

    t.fill(colors['White'])
    t.text(featuredText, 20, 20, t.width - 40, t.height - 40)

    t.pop()
  }

  p.drawTexture2 = ({ t } = {}) => {
    t.background(colors['Parsons Red'])
    t.fill(255, 50)
    t.push()

    // font settings
    t.textFont(fontface)
    t.textSize(t.width * 0.1)
    t.textAlign(t.CENTER, t.CENTER)

    // translation
    t.translate(t.width * 0.5, t.height * -0.21)
    t.rotate((t.PI / 180) * 45)

    // write text
    t.text(config['title'], 0, 0, t.width, t.height)

    t.pop()
  }

  p.draw = () => {
    p.background(colors['Parsons Red'])

    p.drawTexture1({ t: texture1, c })
    p.drawTexture2({ t: texture2 })

    let size = p.width < 1000 ? 300 : 500
    let offset = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2)) - 200

    p.cube({ c, size, x: 0, y: -10, z: 200, texture: texture1 })
    p.cube({ c, size, x: offset, y: -10, z: 100, texture: texture2 })
    p.cube({ c, size, x: offset * -1, y: -10, z: 100, texture: texture2 })

    p.counter()
  }

  p.counter = () => {
    if (pause >= pause_duration) {
      pause = 0
      c = 0
    }
    if (c == rotation_angle * 0.3) {
      p.updateFeaturedText()
    }
    if (c >= rotation_angle && pause < pause_duration) {
      pause++
    } else if (pause < 1 && c < rotation_angle) {
      c++
    } else {
      c = 0
    }
  }

  p.updateCanvasSize = (w, h) => {
    console.log('resize canvas', w, h)
    normX = p.width * -0.5
    normY = p.height * -0.5
    p.resizeCanvas(w, h)
  }

  p.updateFeaturedText = () => {
    featuredTextPos++
    featuredText = featuredTextArray[featuredTextPos % featuredTextArray.length]
  }
}

module.exports = sketch
