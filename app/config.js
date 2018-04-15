/*
* Create and export configuration variables
*
*/

// Container for all environments
const environment = {};

// Development (default) environment
environment.development = {
  'port' : 3000,
  'envName' : 'development'
}

// Production environment
environment.production = {
  'port' : 5000,
  'envName' : 'production'
}

// Determine what environment is passed
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is above, if not default to development
const environmentToExport = typeof(environment[currentEnvironment]) == 'object' ? environment[currentEnvironment] : environment.development;

// Export the module
module.exports = environmentToExport;