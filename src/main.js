var Overlay = {};
Overlay.Shapes = {};

(function() {

  var id = 82764;
  var ctx;
  var can;
  var overlayColor = 'rgba(0, 0, 0, 0.70)';
  var Shapes = Overlay.Shapes;

  this.init = function () {
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
    })[0];
    ctx = can.getContext('2d');
    this.refresh();
    window.addEventListener('resize', this.refresh, false);
  };

  this.refresh = function () {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    draw(ctx);
  };

  function draw (ctx) {
    drawOverlay(ctx);
    drawShape(Shapes.Ellipse, ctx, 'btn2', {type: 'normal'});
    drawShape(Shapes.Ellipse, ctx, 'btn4', {type: 'proportional'});
  }

  function drawShape (shape, ctx, id, config) {
    component = $('#' + id)
    offset = component.offset();
    x = offset.left - $(window).scrollLeft();
    y = offset.top - $(window).scrollTop();
    w = component.innerWidth()
    h = component.innerHeight()

    shape.draw(ctx, config, x, y, w, h);
  }

  function drawOverlay (ctx) {
    ctx.save();
    ctx.fillStyle = overlayColor;
    ctx.fillRect(0, 0, can.width, can.height);
    ctx.restore();
  }


}).call(Overlay);