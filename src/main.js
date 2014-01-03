var Overlay = {};
Overlay.Shapes = {};

(function() {


  // ----------------------- Private static variables declaration -----------------------

  var id = 82764; // id used for the canvas tag
  var can; // canvas object
  var ctx; // canvas drawing context
  var overlayColor = 'rgba(0, 0, 0, 0.70)'; // overlay color and alpha
  var Shapes = Overlay.Shapes; // alias

  var elements = [] // list of all highlighted elements

  // ------------------------------------------------------------------------------------




  // ---------------------------------- Public methods ----------------------------------

  // Initialise the canvas
  this.init = function () {
    // Do not initialize if it was already done
    if ($('#' + id).length !== 0) {
      return;
    }

    // Create the canvas element
    can = $('<canvas/>', {
      id: id,
    })

    // Append element to the body
    .appendTo('body')

    // Customize the canvas
    .css({
      'display': 'block',
      'position': 'fixed',
      'top': 0,
      'left': 0,
      'z-index': 16232
    })[0];

    // Get the canvas context
    ctx = can.getContext('2d');

    // Resize and redraw the canvas
    this.refresh();

    // Refresh the canvas everytime the window is resized
    window.addEventListener('resize', this.refresh, false);
  };


  // Resize and redraw the canvas
  this.refresh = function () {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    draw(ctx);
  };


  // Add an element to the list of elements to highlight
  this.add = function (element) {
    elements.push(element);
    this.refresh();
  }

  // ------------------------------------------------------------------------------------




  // --------------------------------- Private methods ----------------------------------

  // Launch all the drawing operations
  function draw (ctx) {
    drawOverlay(ctx);
    for (element, index in elements) {
      drawShape(Shapes.Ellipse, ctx, element, {type: 'normal'});
    }
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