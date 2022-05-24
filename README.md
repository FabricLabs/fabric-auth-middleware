# @fabric/connect
Middleware for Fabric Auth

## Example Usage

**`someapp.js`:**
```js
// Dependencies
const express = require('express');

// Middleware
const attachFabric = require('@fabric/connect');

// Settings
const settings = require('../settings/local');

// Whatever your application does with requests...
async function exampleHandler (request, response, next) {
  return response.send({
    status: 'READY',
    message: 'Generic page for the example.'
  });
}

async function main (input = {}) {
  // Basic express app
  const app = express();

  // Use our middlewhere for everything
  app.use(attachFabric);

  // Handle all pages
  app.use(exampleHandler);

  // Listen (and maybe do other stuff when port open)
  app.listen(input.port /* , ... */);

  return {
    status: 'STARTING',
    port: input.port
  };
}

main(settings).catch((exception) => {
  console.error('[SCRIPTS:EXAMPLE] Main Process Exception:', exception);
}).then((output) => {
  console.log('[SCRIPTS:EXAMPLE] Main Process Output:', output);
});
```
