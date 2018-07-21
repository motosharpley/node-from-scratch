/**
 * Library for storing and rotating logs
 */

//  Dependencies
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Container for the module
const lib = {};

// Base directory of the logs folder
lib.baseDir = path.join(__dirname,'/../.logs/');

// Append a string to a file, Create the file if it does not exist
lib.append = function(file,str,callback){
  // Open the file for appending
  fs.open(lib.baseDir+file+'.log','a',function(err,fileDescriptor){
    if(!err && fileDescriptor){
      // Append the file and close it
      fs.appendFile(fileDescriptor,str+'\n',function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing file that was being appended');
            }
          });
        } else {
          callback('Error appending to file');
        }
      });
    } else {
      callback('Could not open file for appending');
    }
  });
}

// List all the logs, and optionally include compressed logs
lib.list = function(includeCompressedLogs,callback){
  fs.readdir(lib.baseDir,function(err,data){
    if(!err && data && data.length > 0){
      let trimmedFileNames = [];
      data.forEach(function(fileName){
        // Add the .log files
        if(fileName.indexOf('.log') > -1){
          trimmedFileNames.push(fileName.replace('.log',''));
        }

        // Add on the .gz files
        if(fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs){
          trimmedFileNames.push(fileName.replace('.gz.b64',''));
        }
      });
      callback(false,trimmedFileNames);
    } else {
      callback(err,data);
    }
  });
}





module.exports = lib;