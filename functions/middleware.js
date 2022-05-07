'use strict';

const {
  HTTP_IDENTITY_HEADER_NAME,
  HTTP_SIGNATURE_HEADER_NAME
} = require('../constants');

const HTTP_IDENTITY_HEADER_NAME_LOWER = HTTP_IDENTITY_HEADER_NAME.toLowerCase();
const HTTP_SIGNATURE_HEADER_NAME_LOWER = HTTP_SIGNATURE_HEADER_NAME.toLowerCase();

const Identity = require('@fabric/core/types/identity');
const hasRole = require('./hasRole');

module.exports = function FabricAuthenticationMiddleware (request, response, next) {
  request.identity = null;
  request.hasRole = hasRole.bind(request);

  if (request.headers[HTTP_IDENTITY_HEADER_NAME_LOWER]) {
    request.identity = Identity.fromString(request.headers[HTTP_IDENTITY_HEADER_NAME_LOWER]);
  } else {
    console.debug(`[WARNING] No "${HTTP_IDENTITY_HEADER_NAME}" header.  Consider rejecting here.`);
  }

  return next();
};
