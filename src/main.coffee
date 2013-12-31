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
  drawEllipseAroundComponent ctx, 'title'
  drawEllipseAroundComponent ctx, 'menu'

drawOverlay = (ctx) ->
  ctx.save()
  ctx.fillStyle = overlayColor
  ctx.fillRect 0, 0, can.width, can.height
  ctx.restore()

drawEllipseAroundComponent = (ctx, id) ->
  component = $('#' + id)
  offset = component.offset();
  x = offset.left - $(window).scrollLeft();
  y = offset.top - $(window).scrollTop();
  width = component.innerWidth()
  height = component.innerHeight()
  drawEllipse ctx, x + width / 2, y + height / 2, 2 * width / Math.sqrt(2), 2 * height / Math.sqrt(2)

drawEllipse = (ctx, x, y, width, height) ->
  ctx.save()
  ctx.globalCompositeOperation = 'destination-out'
  ctx.translate x, y
  ctx.scale width, height
  ctx.beginPath()
  ctx.arc 0, 0, 0.5, 0, 2 * Math.PI, false
  ctx.fill()
  ctx.restore()


resizeCanvas()
window.addEventListener('resize', resizeCanvas, false)