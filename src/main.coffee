id = 82764
overlayColor = '#000000'
overlayOpacity = 0.5

canvas = $('<canvas/>', {
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

resizeCanvas = () ->
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  drawCanvas()

drawCanvas = () ->
  console.log 'Test'

resizeCanvas()
window.addEventListener('resize', resizeCanvas, false)