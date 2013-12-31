(function() {
  var can, ctx, draw, drawEllipse, drawEllipseAroundComponent, drawOverlay, id, overlayColor, resizeCanvas;

  id = 82764;

  overlayColor = 'rgba(0, 0, 0, 0.70)';

  can = $('<canvas/>', {
    id: id
  }).appendTo('body').css({
    'display': 'block',
    'position': 'fixed',
    'top': 0,
    'left': 0,
    'z-index': 16232
  })[0];

  ctx = can.getContext('2d');

  resizeCanvas = function() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    return draw(ctx);
  };

  draw = function(ctx) {
    drawOverlay(ctx);
    drawEllipseAroundComponent(ctx, 'title');
    return drawEllipseAroundComponent(ctx, 'menu');
  };

  drawOverlay = function(ctx) {
    ctx.save();
    ctx.fillStyle = overlayColor;
    ctx.fillRect(0, 0, can.width, can.height);
    return ctx.restore();
  };

  drawEllipseAroundComponent = function(ctx, id) {
    var component, height, offset, width, x, y;
    component = $('#' + id);
    offset = component.offset();
    x = offset.left - $(window).scrollLeft();
    y = offset.top - $(window).scrollTop();
    width = component.innerWidth();
    height = component.innerHeight();
    return drawEllipse(ctx, x + width / 2, y + height / 2, 2 * width / Math.sqrt(2), 2 * height / Math.sqrt(2));
  };

  drawEllipse = function(ctx, x, y, width, height) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.translate(x, y);
    ctx.scale(width, height);
    ctx.beginPath();
    ctx.arc(0, 0, 0.5, 0, 2 * Math.PI, false);
    ctx.fill();
    return ctx.restore();
  };

  resizeCanvas();

  window.addEventListener('resize', resizeCanvas, false);

}).call(this);
