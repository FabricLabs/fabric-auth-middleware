'use strict';

// Dependencies
const assert = require('assert');
const express = require('express');

// Fabric Authentication Middleware
const FabricAuth = require('../');

// Fabric Types
const Identity = require('@fabric/core/types/identity');
const Remote = require('@fabric/http/types/remote');

// Settings
const identity = new Identity({
  seed: 'cricket grocery kingdom wool double wood happy predict worth pave build pepper bullet farm churn exhibit grit isolate short theory help vehicle denial slide'
});

const settings = {
  authority: 'localhost',
  secure: false,
  port: 11392
};

// Sample
const secret = {
  status: 'PAUSED',
  message: 'Access granted!  This is the document you were looking for.'
};

// Tests
describe('fabric-auth-middleware', function () {
  describe('FabricAuthenticationMiddleware()', function () {
    it('is available from @fabric/core', function () {
      assert.equal(FabricAuth instanceof Function, true);
    });

    it('can be used with an express app', function (done) {
      const app = express();
      const client = new Remote(settings);

      async function _handleReady () {
        const result = await client._GET('/', {
          headers: {
            'X-Auth-Identity': identity.id
          }
        });
        this.close();

        assert.equal(result.message, secret.message);

        done();
      }

      // Setup
      app.use(FabricAuth);

      // Routes
      app.use('/', (req, res) => {
        return res.send(secret);
      });

      app.listen(settings.port, _handleReady);

      assert.ok(app);
    });
  });
});
