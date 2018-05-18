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
handlers._users.get = function(data,callback){
  // Check that phone number is valid
  const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){

    // Get the token from the headers
    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given token is valid for current phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
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
        callback(403,{'Error' : 'Missing or Invalid Token in header'});
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
      
      // Get the token from the headers
      const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      
      // Verify that the given token is valid for current phone number
      handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
        if(tokenIsValid){
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
              callback(403,{'Error' : 'Missing or Invalid Token in header'});
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

// Verify if token id is valid for current user
handlers._tokens.verifyToken = function(id,phone,callback){
  // Lookup the token
  _data.read('tokens',id,function(err,tokenData){
    if(!err && tokenData){
      // Check that token is for the given user and is not expired
      if(tokenData.phone == phone && tokenData.expires > Date.now()){
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  })
}


/*
* START OF TOKENS HANDLERS
*/
// Tokens
handlers.tokens = function(data,callback){
  const acceptedMethods = ['get','post','put','delete'];
  if(acceptedMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
}

// Container for tokens sub-methods
handlers._tokens = {};

// Tokens - GET
// Rquired data: id
// Optional data: none
handlers._tokens.get = function(data,callback){
  // Check that id is valid
  const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the user
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){

        callback(200,tokenData);
      } else {
        callback(404);
      }
    })
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
}

// Tokens - POST
// Required data: phone, password
// Optional data: none
handlers._tokens.post = function(data,callback){
  const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if(phone && password){
    // Lookup user by phone number
    _data.read('users', phone,function(err,userData){
      if(!err && userData){
        // Hash the sent password and compare to password stored in user object
        const hashedPassword = helpers.hash(password);
        if(hashedPassword == userData.hashedPassword){
          // If valid create a new token with a random name, Set expiration 1 hour in the future
          const tokenId = helpers.createRandomString(20);
          const expires = Date.now() + 1000 * 60 * 60;
          const tokenObject = {
            'phone' : phone,
            'id' : tokenId,
            'expires' : expires
          }
          // Store the token
          _data.create('tokens',tokenId,tokenObject,function(err){
            if(!err){
              callback(200,tokenObject);
            } else {
              callback(500,{'Error' : 'Could not create new token'});
            }
          })
        } else {
          callback(400,{'Error' : 'Invalid Password'});
        }
      } else {
        callback(400,{'Error' : 'Could not find specified user'});
      }
    })

  } else {
    callback(400,{'Error' : 'Missing required field(s)'});
  }
}

// Tokens - PUT
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function(data,callback){
  const id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  const extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if(id && extend){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Check to see that token is not already expired
        if(tokenData.expires > Date.now()){
          // set expiration 1 hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;

          // Store the new updates
          _data.update('tokens',id,tokenData,function(err){
            if(!err){
              callback(200);
            } else {
              callback(500,{'Error' : 'Could not update token expiration'});
            }
          })
        } else {
          callback(400,{'Error' : 'Token has already expired and cannot be extended'});
        }
      } else {
        callback(400,{'Error' : 'Specified token does not exist'});
      }
    })
  } else {
    callback(400,{'Error' : 'Required field(s) missing or invalid'});
  }
}

// Tokens - DELETE
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data,callback){
  // Check that the id is valid
  const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the user
    _data.read('tokens',id,function(err,data){
      if(!err && data){
      _data.delete('tokens',id,function(err){
        if(!err){
          callback(200);
        } else {
          callback(500,{'Error' : 'Could not delete specified token'});
        }
      })
      } else {
        callback(400,{'Error' : 'Token not found'});
      }
    })
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
}

// Export Handlers Module
module.exports = handlers;