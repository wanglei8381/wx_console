var hbs = require('hbs');


var blocks = {};

hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});

hbs.registerHelper('gt', function (a, b, options) {
  if (a > b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('gte', function (a, b, options) {
  if (a >= b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('lt', function (a, b, options) {
  if (a < b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('lte', function (a, b, options) {
  if (a <= b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('eq', function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});