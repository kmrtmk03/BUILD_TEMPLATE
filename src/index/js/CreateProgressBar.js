import p5 from 'p5'

export default class CreateProgressBar {

  constructor (targetProgress, targetElement, width, height, red, green, blue, bgColor) {
    this.tp = document.querySelector(`.${targetProgress}`)
    this.te = document.querySelector(`.${targetElement}`)
    this.w = width
    this.h = height
    this.r = red
    this.g = green
    this.b = blue
    this.bg = bgColor
  }

  setBar () {
    let sketch = p => {
      p.setup = () => {
        p.createCanvas(this.w, this.h)
        p.background(this.bg)
        p.frameRate(30)
      }

      p.draw = () => {
        const getValue = this.tp.getAttribute('value')
        const barWidth = p.map(getValue, 0, 100, 0, this.w)

        p.fill(this.r, this.g, this.b)
        p.noStroke()
        p.rect(0, 0, barWidth, this.h)
      }
    }
    return sketch
  }

  displayBar () {
    const app = new p5(this.setBar(), this.te)
  }

  setCss () {
    this.te.style.height = `${this.h}px`
  }

}
