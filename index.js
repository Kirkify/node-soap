"use strict";

var node = function() {
  require('./lib/soap');
};

var browser = function() {
  require('./lib/browser-soap');
};

module.exports = {
  node: node,
  browser: browser,
};
