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
  w = component.innerWidth()
  h = component.innerHeight()

  width1 = 0.5 * w
  width2 = width1 * 2
  while testEllipseWidth width2 > 1
    width2 = width2 * 2

  while width2 - width1 > 1
    width3 = Math.round((width1 + width2) / 2)
    if (testEllipseWidth width3, w, h) > 1
      width1 = width3
    else
      width2 = width3

  if 1 - (testEllipseWidth width2, w, h) > 1 - (testEllipseWidth width1, w, h)
    width = width1
  else
    width = width2

  width *= 2
  height = width - w + h

  drawEllipse ctx, x + w / 2, y + h / 2, width, height

testEllipseWidth = (ellipseWidth, rectWidth, rectHeight) ->
  return (rectWidth * rectWidth / (4 * ellipseWidth * ellipseWidth) + 
         rectHeight * rectHeight / ((2 * ellipseWidth + rectHeight - rectWidth) * (2 * ellipseWidth + rectHeight - rectWidth)))


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