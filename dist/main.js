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
    if (Object.prototype.toString.call(element) === '[object String]') {
      element = {
        id: element,
        padding: 0
      }
    }
    elements.push(element);
    this.refresh();
  }

  // ------------------------------------------------------------------------------------




  // --------------------------------- Private methods ----------------------------------

  // Launch all the drawing operations
  function draw (ctx) {
    drawOverlay(ctx);
    for (var i = 0; i < elements.length; i++) {
      drawShape(Shapes.Ellipse, ctx, elements[i], {type: 'normal'});
    }
  }


  // Draw a shape around an html element
  function drawShape (shape, ctx, element, config) {
    component = $('#' + element.id)
    offset = component.offset();
    x = offset.left - $(window).scrollLeft() - element.padding;
    y = offset.top - $(window).scrollTop() - element.padding;
    w = component.innerWidth() + 2 * element.padding
    h = component.innerHeight() + 2 * element.padding

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
Overlay.Shapes.Ellipse = {};

(function() {


  // Public draw function of the module
  // Draw an ellipse around the rectangle at the (x,y) position with (w,h) dimension
  this.draw = function (ctx, config, x, y, w, h) {
    var ellipse;
    if (config.type === 'normal') {
      ellipse = getEllipseDimension(w, h);
    }
    else if (config.type === 'proportional') {
      ellipse = getEllipseDimensionWithSameProportion(w, h);
    }
    drawEllipse(ctx, x + w / 2, y + h / 2, ellipse.width, ellipse.height);
  };


  // Compute an ellipse dimension
  // The ellipse bounds the rectangle and have the same proportion.
  getEllipseDimensionWithSameProportion = function (rectWidth, rectHeight) {
    return {width: 2 * rectWidth / Math.sqrt(2), height: 2 * rectHeight / Math.sqrt(2)};
  }


  // Compute an ellipse dimension
  // The ellipse bounds the rectangle and have the vertical and horizontal "overlapping"
  // part equal.
  getEllipseDimension = function (rectWidth, rectHeight) {

    // The ellipse we are aiming for has a width that will make this function returning 1
    // This is equivalent to solve a quartic which have a huge formula for the root.
    // Since we don't need the exact solution we will use a dichotomic method
    testEllipseWidth = function (ellipseRadiusWidth, rectWidth, rectHeight) {
      var a = rectWidth * rectWidth;
      var b = rectHeight * rectHeight;
      var c = 4 * ellipseRadiusWidth * ellipseRadiusWidth;
      var d = 2 * ellipseRadiusWidth + rectHeight - rectWidth;
      return a / c + b / (d * d);
    }

    // Initialise the dichotomic boundary
    width1 = 0.5 * rectWidth; // this will always return a value lower than 1 
                              // when using testEllipseWidth

    // So we try to find a width that will return a value greater than 1
    width2 = width1 * 2;
    while (testEllipseWidth(width2, rectWidth, rectHeight) > 1) {
      width2 = width2 * 2;
    }


    // Dichotomic loop
    while (width2 - width1 > 1) { // We don't to be more precise that one pixel
      width3 = Math.round((width1 + width2) / 2);
      if (testEllipseWidth(width3, rectWidth, rectHeight) > 1)
        width1 = width3;
      else
        width2 = width3;
    }

    // We select the best value from the boundary
    if (1 - testEllipseWidth(width2, rectWidth, rectHeight) > 
        1 - testEllipseWidth(width1, rectWidth, rectHeight)) {
      width = width1;
    }
    else {
      width = width2;
    }

    // And we return the computed data
    width *= 2;
    height = width - rectWidth + rectHeight;

    return { width: width, height: height }
  }


  // Draw an ellipse a the ctx context, at the (x,y) position with the (w,h) dimension
  drawEllipse = function (ctx, x, y, w, h) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.translate(x, y);
    ctx.scale(w, h);
    ctx.beginPath()
    ctx.arc(0, 0, 0.5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
  }


}).call(Overlay.Shapes.Ellipse);