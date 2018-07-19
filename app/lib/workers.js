/**
 * Worker Related Tasks
 */

 const path = require('path');
 const fs = require('fs');
 const _data = require('./data');
 const https = require('https');
 const http = require('http');
 const helpers = require('./helpers');
 const url = require('url');


//  Instantiate the worker
const workers = {};

// Lookup all checks, get the data, send to validator
workers.getAllChecks = function(){
  // Get all the checks
  _data.list('checks',function(err,checks){
    if(!err && checks && checks.length > 0){
      checks.forEach(function(check){
        // Read in the check data
        _data.read('checks',check,function(err,originalCheckData){
          if(!err && originalCheckData){
            // Pass it to the check validator, and let the function continue or log errors
            workers.validateCheckData(originalCheckData);
          } else {
            console.error("Error reading one of the check's data");
          }
        })
      })
    } else {
      console.error('Error: Could not find any checks to process');
    }
  })
}

// Sanity-check the check-data
workers.validateCheckData = function(originalCheckData){
  originalCheckData = typeof(originalCheckData) == 'object' && originalCheckData !== null ? originalCheckData : {};
  originalCheckData.id = typeof(originalCheckData.id) == 'string' && originalCheckData.id.trim().length == 20 ? originalCheckData.id.trim() : false;
  originalCheckData.userPhone = typeof(originalCheckData.userPhone) == 'string' && originalCheckData.userPhone.trim().length == 10 ? originalCheckData.userPhone.trim() : false;
  originalCheckData.protocol = typeof(originalCheckData.protocol) == 'string' && ['http','https'].indexOf(originalCheckData.protocol) > -1 ? originalCheckData.protocol : false;
// @@@@TODO finish this===============================================
}

// Tier to execute the worker-process once per minute
workers.loop = function(){
  setInterval(function(){
    workers.getAllChecks();
  },1000 * 60)
}

// Init worker script
workers.init = function(){
  // Execute the checks immediately
  workers.getAllChecks();

  // Call the loop so the checks will execute later
  workers.loop();
}
