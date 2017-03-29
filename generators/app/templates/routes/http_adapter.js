const express = require('express');
/* eslint-disable new-cap */
const router = express.Router();
/* eslint-enable new-cap */

const paymentsCore = require('../core/core.js');

// NOTE(garcianavalon) This layer functions as a HTTP/REST adapter to our core.
// It's function is to process the request to extract the API-compliant message,
// Call the adequate core handler to process the message, then create a HTTP
// response with the API-compliant response message. All responses must use
// HTTP 200 OK status code and a json response.

router.post('/', function (req, res) {
  // Extract message
  const requestMessage = req.body;
  // TODO(garcianavalon) record transaction in database

  // TODO(garcianavalon) validate structure
  // http://json-schema.org/implementations.html#validator-javascript

  // Procces message
  paymentsCore.processMessage(requestMessage, function (responseMessage) {
    // TODO(garcianavalon) record transaction in database

    // Send response
    res.status(200).json(responseMessage);
  });
});

module.exports = router;
