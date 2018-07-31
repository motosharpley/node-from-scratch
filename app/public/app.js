/**
 * Frontend Logic for the Application
 */

//  Container for front end app
const app = {};

//  Config
app.config = {
  'sessionToken': false
}

// AJAX Client (for restful API)
app.client = {};

// Interface for making API calls
app.client.request = function (headers, path, method, queryStringObject, payload, callback) {

  // Set Defaults
  headers = typeof (headers) == 'object' && headers !== null ? headers : {};
  path = typeof (path) == 'string' ? path : '/';
  method = typeof (method) == 'string' && ['GET', 'POST', 'PUT', 'DELETE'].indexOf(method) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof (queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof (payload) == 'object' && payload !== null ? payload : {};
  callback = typeof (callback) == 'function' ? callback : false;

  // For each query string parameter sent, add to the path
  let requestUrl = path + '?';
  let counter = 0;
  for (let queryKey in queryStringObject) {
    if (queryStringObject.hasOwnProperty(queryKey)) {
      counter++;
      // If at least one query string param has already been added, prepend new ones with an ampersand
      if (counter > 1) {
        requestUrl += '&';
      }
      // Add the key and value
      requestUrl += queryKey + '=' + queryStringObject[queryKey];
    }
  }

  // Form the http request as a JSON type
  let xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // For each header sent, add to the request
  for (let headerKey in headers) {
    if (headers.hasOwnProperty(headerKey)) {
      xhr.setRequestHeader(headerKey, headers[headerKey]);
    }
  }

  // If there is a current session token set, add that as a header
  if (app.config.sessionToken) {
    xhr.setRequestHeader('token', app.config.sessionToken.id);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      let statusCode = xhr.status;
      let responseReturned = xhr.responseText;

      // Callback if requested
      if (callback) {
        try {
          let parsedResponse = JSON.parse(responseReturned);
          callback(statusCode, parsedResponse);
        } catch (e) {
          callback(statusCode, false);
        }
      }
    }
  }

  // Send the payload as JSON
  let payloadString = JSON.stringify(payload);
  xhr.send(payloadString);

}

// Bind the forms
app.bindForms = function () {
  if (document.querySelector('form')) {
    document.querySelector('form').addEventListener('submit', function (e) {

      // Stop it from submitting
      e.preventDefault();
      let formId = this.id;
      let path = this.action;
      let method = this.method.toUpperCase();

      // Hide the error message (if it's currently shown due to a previous error)
      document.querySelector('#' + formId + ' .formError').style.display = 'hidden';

      // Turn the inputs into a payload
      let payload = {};
      let elements = this.elements;
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].type !== 'submit') {
          let valueOfElement = elements[i].type == 'checkbox' ? elements[i].checked : elements[i].value;
          payload[elements[i].name] = valueOfElement;
        }
      }

      // Call the API
      app.client.request(undefined, path, method, undefined, payload, function (statusCode, responsePayload) {
        // Display an error on the form if needed
        if (statusCode !== 200) {

          // Try to get the error from the api, or set a default error message
          let error = typeof (responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

          // Set the formError field with the error text
          document.querySelector('#' + formId + ' .formError').innerHTML = error;

          // Show (unhide) the form error field on the form
          document.querySelector('#' + formId + ' .formError').style.display = 'block';

        } else {
          // If successful, send to form response processor
          app.formResponseProcessor(formId, payload, responsePayload);
        }

      });
    });
  }
}

// Form response processor
app.formResponseProcessor = function (formId, requestPayload, responsePayload) {
  let functionToCall = false;
  // If account creation was successful, try to immediately log the user in
  if (formId == 'accountCreate') {
    // Take the phone and password, and use it to log the user in
    let newPayload = {
      'phone': requestPayload.phone,
      'password': requestPayload.password
    };

    app.client.request(undefined, 'api/tokens', 'POST', undefined, newPayload, function (newStatusCode, newResponsePayload) {
      // Display an error on the form if needed
      if (newStatusCode !== 200) {

        // Set the formError field with the error text
        document.querySelector('#' + formId + ' .formError').innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector('#' + formId + ' .formError').style.display = 'block';

      } else {
        // If successful, set the token and redirect the user
        app.setSessionToken(newResponsePayload);
        window.location = '/checks/all';
      }
    });
  }
  // If login was successful, set the token in localstorage and redirect the user
  if (formId == 'sessionCreate') {
    app.setSessionToken(responsePayload);
    window.location = '/checks/all';
  }
}

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function () {
  let tokenString = localStorage.getItem('token');
  if (typeof (tokenString) == 'string') {
    try {
      let token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if (typeof (token) == 'object') {
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    } catch (e) {
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
}

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function (add) {
  let target = document.querySelector('body');
  if (add) {
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
}

// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function (token) {
  app.config.sessionToken = token;
  let tokenString = JSON.stringify(token);
  localStorage.setItem('token', tokenString);
  if (typeof (token) == 'object') {
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
}

// Renew the token
app.renewToken = function (callback) {
  let currentToken = typeof (app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if (currentToken) {
    // Update the token with a new expiration
    let payload = {
      'id': currentToken.id,
      'extend': true,
    };
    app.client.request(undefined, 'api/tokens', 'PUT', undefined, payload, function (statusCode, responsePayload) {
      // Display an error on the form if needed
      if (statusCode == 200) {
        // Get the new token details
        let queryStringObject = { 'id': currentToken.id };
        app.client.request(undefined, 'api/tokens', 'GET', queryStringObject, undefined, function (statusCode, responsePayload) {
          // Display an error on the form if needed
          if (statusCode == 200) {
            app.setSessionToken(responsePayload);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
}

// Loop to renew token often
app.tokenRenewalLoop = function () {
  setInterval(function () {
    app.renewToken(function (err) {
      if (!err) {
        console.log('Token renewed successfully @ ' + Date.now());
      }
    });
  }, 1000 * 60);
}

// Init (bootstrapping)
app.init = function () {

  // Bind all form submissions
  app.bindForms();

  // Get the token from localstorage
  app.getSessionToken();

  // Renew token
  app.tokenRenewalLoop();

}

// Call the init processes after the window loads
window.onload = function () {
  app.init();
}