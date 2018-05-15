/*
*
* REQUEST HANDLERS
*
*/

// Dependencies
const _data = require('./data');
const helpers = require('./helpers.js');

// Define handlers
const handlers = {};

// Ping handler
handlers.ping = function(data,callback){
  callback(200);
}

// Not found handler
handlers.notFound = function(data,callback){
  callback(404);
}

// Users
handlers.users = function(data,callback){
  const acceptedMethods = ['get','post','put','delete'];
  if(acceptedMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
}

// Container for users sub-methods
handlers._users = {};

// Users - GET
// Required data: phone
// Optional data: none
// @TODO only let an authenticated user access thier object
handlers._users.get = function(data,callback){
  // Check that phone number is valid
  const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){
    // Lookup the user
    _data.read('users',phone,function(err,data){
      if(!err && data){
        // Remove hashed password from user object before returning request
        delete data.hashedPassword;
        callback(200,data);
      } else {
        callback(404);
      }
    })
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
}

// Users - POST
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function(data,callback){
  // Check that all required fields are present
  const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if(firstName && lastName && phone && password && tosAgreement){
    // Make sure user doesn't already exist
    _data.read('users',phone,function(err,data){
      if(err){
        // Hash the password
        const hashedPassword = helpers.hash(password);

        // Create User Object
        if(hashedPassword){
          const userObject = {
            'firstName': firstName,
            'lastName' : lastName,
            'phone' : phone,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : true
          };
  
          // Store the User
          _data.create('users',phone,userObject,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not create new user'});
            }
          });
        } else {
          callback(500,{'Error' : 'Could not hash the password'});
        }

      } else {
        callback(400,{'Error' : 'User with that phone number already exists'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing Required Fields'});
  }

}

// Users - PUT
// Required data: phone
// Optional data: firstName, lastName, password(at least one must be specified)
// @TODO Only let an authenticated user update their own object
handlers._users.put = function(data,callback){
  // Check for the required field
  const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  // Check for the optional field
  const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  
  // Error if the phone is invalid
  if(phone){
    // Error if nothing is sent to update
    if(firstName || lastName || password){
      // Lookup the user
      _data.read('users',phone,function(err,userData){
        if(!err && userData){
          // Update the necessary fields
          if(firstName){
            userData.firstName = firstName;
          }
          if(lastName){
            userData.lastName = lastName;
          }
          if(password){
            userData.hashedPassword = helpers.hash(password);
          }
          // Store new updates
          _data.update('users',phone,userData,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not update user'});
            }
          })
        } else {
          callback(400,{'Error' : 'User does not exist'});
        }
      })
    } else {
      callback(400,{'Error' : 'Missing fields to update'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }

}

// Users - DELETE
// Required field: phone
// @TODO Only let an authenticated user delete their object
// @TODO Clean up any additional data files associated with this user
handlers._users.delete = function(data,callback){
  // Check that phone number is valid
  const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){
    // Lookup the user
    _data.read('users',phone,function(err,data){
      if(!err && data){
      _data.delete('users',phone,function(err){
        if(!err){
          callback(200);
        } else {
          callback(500,{'Error' : 'Could not delete specified user'});
        }
      })
      } else {
        callback(400,{'Error' : 'User not found'});
      }
    })
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
}


// Export Handlers Module
module.exports = handlers;