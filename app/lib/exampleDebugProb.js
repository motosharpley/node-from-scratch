/**
 * Library that demonstrates an something trhowing when it's init() is called
 */

//  Container for the module
const example = {};

// Init function
example.init = function(){
  // This is intentionally created err (bar not defined)
  let foo = bar;
};

module.exports = example;