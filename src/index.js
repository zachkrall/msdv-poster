const p5 = require('p5')
const Vue = require('vue/dist/vue.js')
const moment = require('moment')
const sketch = require('./sketch.js')
const config = require('../poster.config.js')

// Global Variables
let poster
let vm = new Vue({
  el: '#overlay',
  data: {
    day: moment(config.date)
      .format('ddd')
      .toUpperCase(),
    date: moment(config.date).format('M/DD'),
    time: config.time,
    location: config.location,
    school: config.school,
    department: config.department,
    title: config.title
  }
})

let winW = () => window.innerWidth
let winH = () => window.innerHeight

// Init
function init() {
  poster = new p5(sketch)
}
init()

window.addEventListener('resize', () => {
  poster.updateCanvasSize(winW(), winH())
})
