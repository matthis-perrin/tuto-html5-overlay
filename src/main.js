var Overlay = {};
Overlay.Shapes = {};

(function() {


  // ----------------------- Private static variables declaration -----------------------

  var id = 82764; // id used for the canvas tag
  var can; // canvas object
  var ctx; // canvas drawing context
  var overlayColor = 'rgba(0, 0, 0, 0.70)'; // overlay color and alpha
  var Shapes = Overlay.Shapes; // alias

  // ------------------------------------------------------------------------------------




  // ---------------------------------- Public methods ----------------------------------

  // Initialise the canvas
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


  // Resize and redraw the canvas
  this.refresh = function () {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    draw(ctx);
  };

  // ------------------------------------------------------------------------------------




  // --------------------------------- Private methods ----------------------------------

  // Launch all the drawing operations
  function draw (ctx) {
    drawOverlay(ctx);
    drawShape(Shapes.Ellipse, ctx, 'btn2', {type: 'normal'});
    drawShape(Shapes.Ellipse, ctx, 'btn4', {type: 'proportional'});
  }


  // Draw a shape around an html element
  function drawShape (shape, ctx, id, config) {
    component = $('#' + id)
    offset = component.offset();
    x = offset.left - $(window).scrollLeft();
    y = offset.top - $(window).scrollTop();
    w = component.innerWidth()
    h = component.innerHeight()

    shape.draw(ctx, config, x, y, w, h);
  }


  // Draw the overlay
  function drawOverlay (ctx) {
    ctx.save();
    ctx.fillStyle = overlayColor;
    ctx.fillRect(0, 0, can.width, can.height);
    ctx.restore();
  }

  // ------------------------------------------------------------------------------------


}).call(Overlay);