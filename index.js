function getValueById(elementId) {
  return document.getElementById(elementId).value;
}

const university = {
  universityName: 'Polytechnic',
  dean: 'Some Great Man'
};

const faculty = Object.create(university, {
  facultyName: { value: 'Cyber security', enumerable: true },
  groups: { value: [], enumerable: true },
  enlistStudent: {
    value: function (studentName) {
      if (this.groups.length < 12)
        this.groups.push(studentName);

      document.getElementById('inheritance-output').innerHTML = this.groups.join(',\n');
    }, enumerable: true
  }
});

function Shape(color) {
  this.color = color;
  this.getArea = function () { };
}

function Rectangle(color, width, height) {
  Shape.call(this, color);
  this.width = width;
  this.height = height;
  this.getArea = function () { return this.width * this.height }
}

Rectangle.prototype = Shape.prototype;
Rectangle.prototype.constructor = Rectangle;

function Circle(color, radius) {
  Shape.call(this, color);
  this.radius = radius;
  this.getArea = function () { return Math.PI * Math.pow(this.radius, 2) };
}

Circle.prototype = Shape.prototype;
Circle.prototype.constructor = Circle;

const rectangle = new Rectangle('blue', 10, 20);
console.log(`${rectangle.color} rectangle square: ${rectangle.getArea()}`)

const circle = new Circle('green', 10);
console.log(`${circle.color} circle square: ${circle.getArea()}`)

function fibonacci(number) {
  if (number < 2) {
    return number;
  }
  else {
    return fibonacci(number - 1) + fibonacci(number - 2);
  }
}

const fibonacciCached = (number, cache) => {
  if (number < 2) {
    return number;
  }
  else {
    const firstMember = cache.has(number - 2) ? cache.get(number - 2) : fibonacciCached(number - 2, cache);
    const secondMember = cache.has(number - 1) ? cache.get(number - 1) : fibonacciCached(number - 1, cache);
    const result = firstMember + secondMember;

    cache.set(number, result)

    return result;
  }
};

const cacheDecorator = (func) => {
  const fibonacciCache = new Map();

  return function (...rest) {
    const key = rest[0];

    let result;

    if (fibonacciCache.has(key)) {
      result = `Return result from cache: ${fibonacciCache.get(key)}`;
    } else {
      const funcResult = func.call(this, key, fibonacciCache);
      fibonacciCache.set(key, funcResult);
      result = funcResult;
    }

    return result;
  }
};

const decoratedFib = cacheDecorator(fibonacciCached);
