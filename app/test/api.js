/**
 * API Tests
 */

//  Dependencies
const app = require('./../index');
const assert = require('assert');
const http = require('http');
const config = require('./../lib/config');

// Container for tests
const api = {};


// Export tests to the runner
module.exports = api;