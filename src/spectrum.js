import React, { Component } from 'react';
class Spectrum extends Component {
  constructor(props) {
    super(props);
    this.renderFrames = 60;
    this.renderNodesCount = 50;
    this.renderNodes = [];
  }
  componentDidMount() {
    console.log(this.renderFrames);
    this.canvasElement = document.getElementById('spectrum');
    this.canvasContext = this.canvasElement.getContext('2d');
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.canvasElement.setAttribute('width', this.canvasWidth);
    this.canvasElement.setAttribute('height', this.canvasHeight);
    this.animationInit();
    this.animationLoop();
  }

  clearCanvasElement() {
    this.canvasContext.fillStyle = "#000";
    this.canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  renderNodespectrum() {
    this.clearCanvasElement();
    for (let n = 0; n < this.renderNodes.length; n++) {
      let e = this.renderNodes[n];
      e.px += e.sx,
        e.py += e.sy,
        (e.px > this.canvasWidth || e.px < 0) && (e.sx = -e.sx),
        (e.py > this.canvasHeight || e.py < 0) && (e.sy = -e.sy),
        e.draw()
    }
    for (let n = 0; n < this.renderNodes.length; n++)
      for (let e = this.renderNodes[n], t = 0; t < this.renderNodes.length; t++) {
        let a = this.renderNodes[t]
          , o = e.px - a.px
          , r = e.py - a.py
          , s = Math.sqrt(o * o + r * r);
        this.canvasWidth / 4 > s && (this.canvasContext.beginPath(),
          this.canvasContext.moveTo(e.px, e.py),
          this.canvasContext.lineTo(a.px, a.py),
          this.canvasContext.strokeStyle = "#999",
          this.canvasContext.lineWidth = .25,
          this.canvasContext.stroke())
      }
  }

  node(canvasWidth, canvasHeight, canvasContext) {
    this.px = Math.random() * canvasWidth,
      this.py = Math.random() * canvasHeight,
      this.sx = Math.random() > .5 ? Math.random() : -Math.random(),
      this.sy = Math.random() > .5 ? Math.random() : -Math.random(),
      this.draw = function () {
        canvasContext.fillStyle = "#000000";
        canvasContext.fillRect(this.px, this.py, 0, 0);
      }
  }

  animationInit() {
    this.clearCanvasElement();
    for (let n = 0; n < this.renderNodesCount; n++) {
      this.renderNodes.push(new this.node(this.canvasWidth, this.canvasHeight, this.canvasContext))
    }
  }

  animationLoop() {
    this.renderNodespectrum();
    window.requestAnimationFrame(this.animationLoop.bind(this));
  }

  render() {
    return <canvas id='spectrum'></canvas>;
  }
}

export default Spectrum; 