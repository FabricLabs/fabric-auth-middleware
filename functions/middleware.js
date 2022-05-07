module.exports = function FabricMiddleware (request, response, next) {
  if (request.headers['x-auth-identity']) {
    return response.send({
      status: 'debug',
      content: `Header "X-Auth-Identity" was provided: ${request.headers['x-auth-identity']}`
    });
  } else {
    console.debug(`[WARNING] No "X-Auth-Identity" header.  Consider rejecting here.`);
  }

  return next();
};
