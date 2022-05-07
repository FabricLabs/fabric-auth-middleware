'use strict';

// Dependencies
const express = require('express');
const Identity = require('@fabric/core/types/identity');

// Middleware
const auth = require('../');

// Settings
const settings = require('../settings/local');
const identity = new Identity({ seed: settings.seed });

async function reportActive (info) {
  console.log('active:', info);
}

async function exampleHandler (request, response, next) {
  return response.send({
    status: 'READY',
    message: 'Generic page for the example.'
  });
}

async function restrictedDocument (request, response, next) {
  return response.send({
    status: 'READY',
    message: 'Authorized!  This is a restricted document.'
  });
}

async function main (input = {}) {
  const app = express();

  app.use(auth);
  app.use(exampleHandler);
  app.use('/documents/restricted', restrictedDocument);

  app.listen(input.port, reportActive);

  return {
    identity: identity.id
  };
}

main(settings).catch((exception) => {
  console.error('[SCRIPTS:EXAMPLE] Main Process Exception:', exception);
}).then((output) => {
  console.log('[SCRIPTS:EXAMPLE] Main Process Output:', output);
});
