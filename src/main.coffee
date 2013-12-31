id = 82764
overlayColor = 'rgba(0, 0, 0, 0.85)'

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

drawOverlay = (ctx) ->
  ctx.fillStyle = overlayColor
  ctx.fillRect(0, 0, can.width, can.height)


resizeCanvas()
window.addEventListener('resize', resizeCanvas, false)