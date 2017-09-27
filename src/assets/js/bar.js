/**
 * Created by taorui on 2017/8/29.
 */

const renderBar = (el, exponent, color) => {
  el.style.position = 'relative'
  const bar = new Bar(el, exponent, color)
  bar.render()
  bar.innerBar()
  bar.mask()
}

const Bar = (el, exponent, color) => {
  this.cvs = document.createElement('canvas')
  this.width = el.offsetWidth * 4
  this.height = el.offsetHeight * 4
  this.color = color
  this.el = el
  this.exponent = exponent
  this.cvs.width = this.width
  this.cvs.height = this.height
  this.ctx = this.cvs.getContext('2d')
  this.cvs.style.transform = 'scale(.25,.23)'
  this.cvs.style.webkitTransform = 'scale(.25,.23)'
  this.cvs.style.transformOrigin = 'left top'
  this.cvs.style.webkitTransformOrigin = 'left top'
  this.cvs.style.position = 'absolute'
  this.cvs.style.left = '0'
  this.cvs.style.right = '0'
  this.el.appendChild(this.cvs)
}

Bar.prototype.innerBar = (val) => {
  const ctx = this.ctx
  ctx.beginPath()
  ctx.lineCap = 'round'
  ctx.strokeStyle = this.color || '#d4d4d4'
  ctx.lineWidth = this.height
  ctx.moveTo(-this.height / 2, this.height / 2)
  ctx.lineTo((this.width - this.height) / 100 * this.exponent, this.height / 2)
  ctx.stroke()
}

Bar.prototype.render = () => {
  const ctx = this.ctx
  ctx.beginPath()
  ctx.lineCap = 'round'
  ctx.strokeStyle = '#f1f1f1'
  ctx.lineWidth = this.height
  ctx.moveTo(-this.height / 2, this.height / 2)
  ctx.lineTo(this.width - this.height, this.height / 2)
  ctx.stroke()
}

Bar.prototype.mask = () => {
  const ctx = this.ctx
  ctx.beginPath()
  ctx.fillStyle = '#fff'
  ctx.lineWidth = 0
  ctx.strokeStyle = 'transparent'
  ctx.arc(this.height / 2, this.height / 2, this.height / 2, Math.PI / 2, Math.PI * 3 / 2)
  ctx.lineTo(0, 0)
  ctx.lineTo(0, this.height)
  ctx.lineTo(this.height / 2, this.height)
  ctx.stroke()
  ctx.closePath()
  ctx.fill()
}

export default {
  renderBar: renderBar
}
