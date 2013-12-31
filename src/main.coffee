id = 82764
overlayColor = 'rgba(0, 0, 0, 0.70)'

can = $('<canvas/>', {
  id: id,
})
.appendTo('body')
.css({
  'display': 'block',
  'position': 'fixed',
  'top': 0,
  'left': 0,
  'z-index': 16232
})[0]
ctx = can.getContext('2d')

resizeCanvas = () ->
  can.width = window.innerWidth
  can.height = window.innerHeight
  draw(ctx)

draw = (ctx) ->
  drawOverlay ctx
  drawOval ctx, can.width / 2, can.height / 2, can.width / 3, can.height / 3

drawOverlay = (ctx) ->
  ctx.save()
  ctx.fillStyle = overlayColor
  ctx.fillRect 0, 0, can.width, can.height
  ctx.restore()

drawOval = (ctx, x, y, width, height) ->
  ctx.save()
  ctx.globalCompositeOperation = 'destination-out'
  ctx.translate x, y
  ctx.scale width, height
  ctx.beginPath()
  ctx.arc 0, 0, 1, 0, 2 * Math.PI, false
  ctx.fill()
  ctx.restore()


resizeCanvas()
window.addEventListener('resize', resizeCanvas, false)