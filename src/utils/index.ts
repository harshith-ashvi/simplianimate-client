export const utils = {
  norm: function (value: number, min: number, max: number) {
    return (value - min) / (max - min);
  },

  lerp: function (norm: number, min: number, max: number) {
    return (max - min) * norm + min;
  },

  map: function (
    value: number,
    sourceMin: number,
    sourceMax: number,
    destMin: number,
    destMax: number
  ) {
    return utils.lerp(
      utils.norm(value, sourceMin, sourceMax),
      destMin,
      destMax
    );
  },

  clamp: function (value: number, min: number, max: number) {
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
  },

  distance: function (
    p0: { x: number; y: number },
    p1: { x: number; y: number }
  ) {
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    return Math.sqrt(dx * dx + dy * dy);
  },

  distanceXY: function (x0: number, y0: number, x1: number, y1: number) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    return Math.sqrt(dx * dx + dy * dy);
  },

  circleCollision: function (c0, c1) {
    return utils.distance(c0, c1) <= c0.radius + c1.radius;
  },

  circlePointCollision: function (x, y, circle) {
    return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
  },

  pointInRect: function (x, y, rect) {
    return (
      utils.inRange(x, rect.x, rect.x + rect.width) &&
      utils.inRange(y, rect.y, rect.y + rect.height)
    );
  },

  inRange: function (value, min, max) {
    return value >= Math.min(min, max) && value <= Math.max(min, max);
  },

  rangeIntersect: function (min0, max0, min1, max1) {
    return (
      Math.max(min0, max0) >= Math.min(min1, max1) &&
      Math.min(min0, max0) <= Math.max(min1, max1)
    );
  },

  rectIntersect: function (r0, r1) {
    return (
      utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
      utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
    );
  },

  degreesToRads: function (degrees) {
    return (degrees / 180) * Math.PI;
  },

  radsToDegrees: function (radians) {
    return (radians * 180) / Math.PI;
  },

  randomRange: function (min, max) {
    return min + Math.random() * (max - min);
  },

  randomInt: function (min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  },

  roundToPlaces: function (value, places) {
    var mult = Math.pow(10, places);
    return Math.round(value * mult) / mult;
  },

  roundNearest: function (value, nearest) {
    return Math.round(value / nearest) * nearest;
  },

  quadraticBezier: function (p0, p1, p2, t, pFinal) {
    pFinal = pFinal || {};
    pFinal.x =
      Math.pow(1 - t, 2) * p0.x + (1 - t) * 2 * t * p1.x + t * t * p2.x;
    pFinal.y =
      Math.pow(1 - t, 2) * p0.y + (1 - t) * 2 * t * p1.y + t * t * p2.y;
    return pFinal;
  },

  cubicBezier: function (p0, p1, p2, p3, t, pFinal) {
    pFinal = pFinal || {};
    pFinal.x =
      Math.pow(1 - t, 3) * p0.x +
      Math.pow(1 - t, 2) * 3 * t * p1.x +
      (1 - t) * 3 * t * t * p2.x +
      t * t * t * p3.x;
    pFinal.y =
      Math.pow(1 - t, 3) * p0.y +
      Math.pow(1 - t, 2) * 3 * t * p1.y +
      (1 - t) * 3 * t * t * p2.y +
      t * t * t * p3.y;
    return pFinal;
  },

  multicurve: function (points, context) {
    var p0, p1, midx, midy;

    context.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < points.length - 2; i += 1) {
      p0 = points[i];
      p1 = points[i + 1];
      midx = (p0.x + p1.x) / 2;
      midy = (p0.y + p1.y) / 2;
      context.quadraticCurveTo(p0.x, p0.y, midx, midy);
    }
    p0 = points[points.length - 2];
    p1 = points[points.length - 1];
    context.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
  },
};

export const preloadImages = (images: [], callback: () => void) => {
  let imagesloaded = 0;
  const totalImagesToLoad = Object.keys(images).length;
  const loadedImages = {};
  for (const src in images) {
    loadedImages[src] = new Image();

    loadedImages[src].onload = function () {
      if (++imagesloaded === totalImagesToLoad) {
        callback(loadedImages);
      }
    };
    loadedImages[src].src = images[src];
  }
  return loadedImages;
};
