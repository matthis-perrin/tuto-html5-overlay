Overlay.Shapes.Ellipse = {};

(function() {

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


  getEllipseDimensionWithSameProportion = function (rectWidth, rectHeight) {
    return {width: 2 * rectWidth / Math.sqrt(2), height: 2 * rectHeight / Math.sqrt(2)};
  }

  getEllipseDimension = function (rectWidth, rectHeight) {
    testEllipseWidth = function (ellipseWidth, rectWidth, rectHeight) {
      return (rectWidth * rectWidth / (4 * ellipseWidth * ellipseWidth) + 
             rectHeight * rectHeight / ((2 * ellipseWidth + rectHeight - rectWidth) * (2 * ellipseWidth + rectHeight - rectWidth)));
    }

    width1 = 0.5 * rectWidth;
    width2 = width1 * 2;
    while (testEllipseWidth(width2, rectWidth, rectHeight) > 1) {
      width2 = width2 * 2;
    }

    while (width2 - width1 > 1) {
      width3 = Math.round((width1 + width2) / 2);
      if (testEllipseWidth(width3, rectWidth, rectHeight) > 1)
        width1 = width3;
      else
        width2 = width3;
    }

    if (1 - testEllipseWidth(width2, rectWidth, rectHeight) > 1 - testEllipseWidth(width1, rectWidth, rectHeight)) {
      width = width1;
    }
    else {
      width = width2;
    }

    width *= 2;
    height = width - rectWidth + rectHeight;

    return { width: width, height: height }
  }

  drawEllipse = function (ctx, x, y, width, height) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.translate(x, y);
    ctx.scale(width, height);
    ctx.beginPath()
    ctx.arc(0, 0, 0.5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
  }

}).call(Overlay.Shapes.Ellipse);