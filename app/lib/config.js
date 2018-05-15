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
  'hashingSecret' : 'InsertHashSecret'
}

// Production environment
environment.production = {
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production',
  'hashingSecret' : 'InsertProdHashSecret'
}

// Determine what environment is passed
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is above, if not default to development
const environmentToExport = typeof(environment[currentEnvironment]) == 'object' ? environment[currentEnvironment] : environment.development;

// Export the module
module.exports = environmentToExport;