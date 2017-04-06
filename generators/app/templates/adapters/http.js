const express = require('express');
/* eslint-disable new-cap */
const router = express.Router();
/* eslint-enable new-cap */

const CoreHandler = require('../core/core_handler.js');

// NOTE(garcianavalon) This layer functions as a HTTP/REST adapter to our core.
// It's function is to process the request to extract the API-compliant message,
// Call the adequate core handler to process the message, then create a HTTP
// response with the API-compliant response message. All responses must use
// HTTP 200 OK status code and a json response.

router.post('/', function (req, res) {
  const core = new CoreHandler(req.body, function (response) {
    // Send response
    res.status(200).json(response);
  });

  // Procces message
  core.handle();
});

module.exports = router;
