const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {Integer} options.pageSize The number of applications to get per page. Min: 1 Max: 100
 * @param {Integer} options.pageNumber The page number to get. Min: 1
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getApiDomains = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'getApiDomains ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.api_domain_name the name of the api domain
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getApiDomainsByApiDomainName = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'getApiDomainsByApiDomainName ok!'
  };
};

