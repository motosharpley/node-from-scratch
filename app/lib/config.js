/*
* Create and export configuration variables
*
*/

// Container for all environments
const environment = {};

// Development (default) environment
environment.development = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'development',
  'hashingSecret' : 'InsertHashSecret',
  'maxChecks' : 5,
  'twilio' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
  },
  'templateGlobals' : {
    'appName' : 'Uptime SMS',
    'companyName' : 'DevPath',
    'yearCreated' : '2018',
    'baseUrl' : 'http://localhost:3000/'
  }
}

// Production environment
environment.production = {
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production',
  'hashingSecret' : 'InsertProdHashSecret',
  'maxChecks' : 5,
  'twilio' : {
    'accountSid' : '',
    'authToken' : '',
    'fromPhone' : ''
  },
  'templateGlobals' : {
    'appName' : 'Uptime SMS',
    'companyName' : 'DevPath',
    'yearCreated' : '2018',
    'baseUrl' : 'http://localhost:5000/'
  }
}

// Determine what environment is passed
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is above, if not default to development
const environmentToExport = typeof(environment[currentEnvironment]) == 'object' ? environment[currentEnvironment] : environment.development;

// Export the module
module.exports = environmentToExport;