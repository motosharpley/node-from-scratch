/*
*
* REQUEST HANDLERS
*
*/

// Dependencies
const _data = require('./data');
const helpers = require('./helpers');
const config = require('./config')

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


/**
 *  =============================== HTML Handlers ==================================
 */

//  Index Handler
handlers.index = function(data,callback){
  // Reject any method that is not GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    let templateData = {
      'head.title' : 'Uptime Monitoring with SMS Text Alerts.',
      'head.description' : 'You guessed it this is the description',
      'body.title' : 'Uptime Monitoring with Alerts to your Phone!',
      'body.class' : 'index'
    };

    // Read in a template as a string
    helpers.getTemplate('index',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        })
      } else {
        callback(500,undefined,'html');
      }
    })
  } else {
    callback(405,undefined,'html');
  }
}


// Create Account
handlers.accountCreate = function(data,callback){
    // Reject any method that is not GET
    if(data.method == 'get'){

      // Prepare data for interpolation
      let templateData = {
        'head.title' : 'Create an account',
        'head.description' : 'Sign up is easy and only takes a moment!',
        'body.class' : 'accountCreate'
      };  
  
      // Read in a template as a string
      helpers.getTemplate('accountCreate',templateData,function(err,str){
        if(!err && str){
          // Add the universal header and footer
          helpers.addUniversalTemplates(str,templateData,function(err,str){
            if(!err && str){
              // Return that page as HTML
              callback(200,str,'html');
            } else {
              callback(500,undefined,'html');
            }
          })
        } else {
          callback(500,undefined,'html');
        }
      })
    } else {
      callback(405,undefined,'html');
    }  
}


// Create New Session
handlers.sessionCreate = function(data,callback){
  // Reject any method that is not GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    let templateData = {
      'head.title' : 'Login to your account',
      'head.description' : 'Please enter your phone number and password to access your account ',
      'body.class' : 'sessionCreate'
    };

    // Read in a template as a string
    helpers.getTemplate('sessionCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        })
      } else {
        callback(500,undefined,'html');
      }
    })
  } else {
    callback(405,undefined,'html');
  }  
}

// Session Deleted
handlers.sessionDeleted = function(data,callback){
  // Reject any method that is not GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    let templateData = {
      'head.title' : 'Logged out',
      'head.description' : 'You have been logged out of your account ',
      'body.class' : 'sessionDeleted'
    };

    // Read in a template as a string
    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        })
      } else {
        callback(500,undefined,'html');
      }
    })
  } else {
    callback(405,undefined,'html');
  }  
}


// Edit Account
handlers.accountEdit = function(data,callback){
  // Reject any method that is not GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    let templateData = {
      'head.title' : 'Account Settings',
      'body.class' : 'accountEdit'
    };

    // Read in a template as a string
    helpers.getTemplate('accountEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        })
      } else {
        callback(500,undefined,'html');
      }
    })
  } else {
    callback(405,undefined,'html');
  }  
}


// Delete Account
handlers.accountDeleted = function(data,callback){
  // Reject any method that is not GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    let templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Your account has been deleted',
      'body.class' : 'accountDeleted'
    };

    // Read in a template as a string
    helpers.getTemplate('accountDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        })
      } else {
        callback(500,undefined,'html');
      }
    })
  } else {
    callback(405,undefined,'html');
  }  
}


// Create a new check
handlers.checksCreate = function(data,callback){
  // Reject any method that is not GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    let templateData = {
      'head.title' : 'Create a new Check',
      'body.class' : 'checksCreate'
    };

    // Read in a template as a string
    helpers.getTemplate('checksCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        })
      } else {
        callback(500,undefined,'html');
      }
    })
  } else {
    callback(405,undefined,'html');
  }  
}


// Dashboard (view all checks)
handlers.checksList = function(data,callback){
  // Reject any method that is not GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    let templateData = {
      'head.title' : 'Dashboard',
      'body.class' : 'checksList'
    };

    // Read in a template as a string
    helpers.getTemplate('checksList',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        })
      } else {
        callback(500,undefined,'html');
      }
    })
  } else {
    callback(405,undefined,'html');
  }  
}



// Favicon
handlers.favicon = function(data,callback){
  // Reject any method that is not GET
  if(data.method == 'get'){
    // Read in the favicon's data
    helpers.getStaticAsset('favicon.ico',function(err,data){
      if(!err && data){
        // callback the data
        callback(200,data,'favicon');
      } else {
        callback(500);
      }
    })

  } else {
    callback(405);
  }
}

// Public assets
handlers.public = function(data,callback){
  // Reject any regeust that is not GET
  if(data.method == 'get'){
    // Get the filename being requested
    let trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if(trimmedAssetName.length > 0){
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName,function(err,data){
        if(!err && data){
          // Determine the content type (default to plain text)
          let contentType = 'plain';

          if(trimmedAssetName.indexOf('.css') > -1){
            contentType = 'css';
          }

          if(trimmedAssetName.indexOf('.png') > -1){
            contentType = 'png';
          }

          if(trimmedAssetName.indexOf('.jpg') > -1){
            contentType = 'jpg';
          }

          if(trimmedAssetName.indexOf('.ico') > -1){
            contentType = 'favicon';
          }

          // Callback the data
          callback(200,data,contentType);

        } else {
          callback(404)
        }
      })
    } else {
      callback(404);
    }
  } else {
    callback(405);
  }
}


/**
 * =============================== JSON API Handlers ===============================
 */

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
handlers._users.delete = function(data,callback){
  // Check that phone number is valid
  const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){
    // Get the token from the headers
    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      
    // Verify that the given token is valid for current phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',phone,function(err,userData){
          if(!err && data){
            _data.delete('users',phone,function(err){
              if(!err){
                // Delete all checks associated with user
                let userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                let checksToDelete = userChecks.length;
                if(checksToDelete > 0){
                  let checksDeleted = 0;
                  let deletionErrors = false;
                  // Loop through the checks
                  userChecks.forEach(function(checkId){
                    // Delete the check
                    _data.delete('checks',checkId,function(err){
                      if(err){
                        deletionErrors = true;
                      }
                      checksDeleted++;
                      if(checksDeleted == checksToDelete){
                        if(!deletionErrors){
                          callback(200);
                        } else {
                          callback(500,{'Error' : 'An error occured while deleting user checks, all checks may not have been deleted'});
                        }
                      }
                    })
                  })
                } else {
                  callback(200);
                }
              } else {
                callback(500,{'Error' : 'Could not delete specified user'});
              }
            })
          } else {
            callback(400,{'Error' : 'User not found'});
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

/*
* ********** START OF TOKENS HANDLERS ***********
*
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
* *********** Checks Handlers **************
*
*/

handlers.checks = function(data,callback){
  const acceptedMethods = ['get','post','put','delete'];
  if(acceptedMethods.indexOf(data.method) > -1){
    handlers._checks[data.method](data,callback);
  } else {
    callback(405);
  }
}

// Container for arll checks methods
handlers._checks = {};

// Checks - get
// Required data: id
// Optional data: none
handlers._checks.get = function(data,callback){
  // Check that id is valid
  const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){

    // Lookup the check 
    _data.read('checks',id,function(err,checkData){
      if(!err && checkData){
      // Get the token from the headers
      const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid and belongs to the user who created the check
      handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
        if(tokenIsValid){
          // Return the check data
          callback(200,checkData);
        } else {
          callback(403);
        }
      })
      } else {
        callback(404);
      }
    })
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
}

// Checks - post
// Required data: protocol, url, method, successCodes, timeoutSeconds
// Optional data: none
handlers._checks.post = function(data,callback){
  // validate inputs
  const protocol = typeof(data.payload.protocol) == 'string' && ['https', 'http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  const url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  const method = typeof(data.payload.method) == 'string' && ['get', 'post', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  if(protocol && url && method && successCodes && timeoutSeconds){
    // get token from the headers
    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Lookup user by reading token
    _data.read('tokens', token, function(err,tokenData){
      if(!err && tokenData){
        const userPhone = tokenData.phone;

        // Lookup user data
        _data.read('users',userPhone,function(err,userData){
          if(!err && userData){
            const userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
            // Verify that user has less than max-checks-per-user
            if(userChecks.length < config.maxChecks){
              // Create a random id for the check
              const checkId = helpers.createRandomString(20);

              // Create the check object, and include the user's phone
              const checkObject = {
                'id' : checkId,
                'userPhone' : userPhone,
                'protocol' : protocol,
                'url' : url,
                'method' : method,
                'successCodes' : successCodes,
                'timeoutSeconds' : timeoutSeconds
              }

              // Save the object
              _data.create('checks',checkId,checkObject,function(err){
                if(!err){
                  //  Add checkId to the user's object
                  userData.checks = userChecks;
                  userData.checks.push(checkId);

                  // Save the new user data
                  _data.update('users',userPhone,userData,function(err){
                    if(!err){
                      // Return the new check data
                      callback(200,checkObject);
                    } else {
                      callback(500,{'Error' : 'Could not update user with new check'});
                    }
                  })
                } else {
                  callback(500,{'Error' : 'Could not create new check'});
                }
              })
            } else {
              callback(400,{'Error' : 'User already has max number of allowed checks ('+config.maxChecks+')'});
            }
          } else {
            callback(403);
          }
        })
      } else {
        callback(403);
      }
    })
  } else {
    callback(400,{'Error' : 'Missing required inputs or inputs are invalid '});
  }
}

// Checks - put
// Required data: id
// Optional data: protocol, url, method, successCodes, timeoutSeconds (at least one must be sent)
handlers._checks.put = function(data,callback){
    // Check for the required field
    const id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;

    // Check for the optional field
    const protocol = typeof(data.payload.protocol) == 'string' && ['https', 'http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    const url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
    const method = typeof(data.payload.method) == 'string' && ['get', 'post', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;
  
  // Check to make sure id is valid
  if(id){
    // Check to make sure one or more optional fields has been sent
    if(protocol || url || method || successCodes || timeoutSeconds){
      // Lookup the check
      _data.read('checks',id,function(err,checkData){
        if(!err && checkData){
          // Get the token from the headers
          const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          // Verify that the given token is valid and belongs to the user who created the check
          handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
            if(tokenIsValid){
              // Update the check where necessary
              if(protocol){
                checkData.protocol = protocol;
              }
              if(url){
                checkData.url = url;
              }
              if(method){
                checkData.method = method;
              }
              if(successCodes){
                checkData.successCodes = successCodes;
              }
              if(timeoutSeconds){
                checkData.timeoutSeconds = timeoutSeconds;
              }
              // Store the updates 
              _data.update('checks',id,checkData,function(err){
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not update the check'});
                }
              })
            } else {
              callback(403);
            }
          })
        } else {
          callback(400,{'Error' : 'Check ID did not exist'});
        }
      })
    } else {
      callback(400,{'Error' : 'Missing fields to update'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
}

// Checks - delete
// Required data: id
// Optional data: none
handlers._checks.delete = function(data,callback){
  // Check that phone number is valid
  const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){

    // Lookup the check
    _data.read('checks',id,function(err,checkData){
      if(!err && checkData){
        // Get the token from the headers
        const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          
        // Verify that the given token is valid for current phone number
        handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
          if(tokenIsValid){

            // Delete the check data
            _data.delete('checks',id,function(err){
              if(!err){
                // Lookup the user
                _data.read('users',checkData.userPhone,function(err,userData){
                  if(!err && userData){
                    const userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];

                    // Remove the deleted check from the list of checks
                    const checkPosition = userChecks.indexOf(id);
                    if(checkPosition > -1){
                      userChecks.splice(checkPosition,1);
                      // Re-save the user data
                      _data.update('users',checkData.userPhone,userData,function(err){
                        if(!err){
                          callback(200);
                        } else {
                          callback(500,{'Error' : 'Could not update user check '});
                        }
                      })
                    } else {
                      callback(500,{'Error' : 'Could not find check on the user object'});
                    }
                  } else {
                    callback(500,{'Error' : 'Could not find User who created this check'});
                  }
                })
              } else {
                callback(500,{'Error' : 'Could not delete the check data'});
              }
            })
            } else {
            callback(403);
            }
          })
      } else {
        callback(400,{'Error' : 'The specified check ID does not exist'});
      }
    })
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }  
}

// Export Handlers Module
module.exports = handlers;