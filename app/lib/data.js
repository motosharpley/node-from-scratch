/*
* Library for storing and editing data
*
*/

// Dependencies
const fs = require('fs');
const path = require('path');

// Container for the module (to be exported)
const lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname,'/../.data/');

// Write data to a file
lib.create = function(dir,file,data,callback){
  // Open the file for writing
  fs.open(lib.baseDir+dir+'/'+'.josn','wx',function(err,fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data to a string
      const stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor,stringData,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing new file');
            }
          })
        }else {
          callback('Error writing to new file');
        }
      })
    } else {
      callback('Could not create a new file, file may already exist');
    }
  })
}




// Export the module
module.exports = lib;