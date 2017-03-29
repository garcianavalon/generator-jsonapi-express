const debug = require('debug')('payments:cards');

const Customer = require('../models/customers.js');
const stripe = require('../../config/stripe.js');
const utils = require('../utils.js');
const ACTIONS = require('../actions.js');

function _createStripeCustomer(requestData, callback) {
  const customerData = {
    email: requestData.user_email,
    source: requestData.stripe_token,
    metadata: {
      user_id: requestData.user_id
    }
  };
  stripe.customers.create(customerData, function (err, stripeCustomer) {
    if (err) {
      console.error(`${err} creating stripe customer with data ${customerData}`);
      // TODO(garcianavalon) build API-compliant error message
      return callback(err);
    }
    // Store the id locally for future operations
    const localCustomer = {
      _id: requestData.user_id,
      stripe_id: stripeCustomer.id
    };

    Customer.create(localCustomer, function (err, newLocalCustomer) {
      if (err) {
        debug(`${err} saving local customer ${localCustomer}`);
        // TODO(garcianavalon) build API-compliant error message
        return callback(err);
      }
      return callback({
        action_str: ACTIONS.create.success,
        data_type: 'card'
      });
    });
  });
}

function _updateStripeCustomer(requestData, localCustomer, callback) {
  const customerData = {
    email: requestData.user_email, // NOTE(garcianavalon) just in case it has changed
    source: requestData.stripe_token
  };

  stripe.customers.update(localCustomer.stripe_id, customerData, function (err, stripeCustomer) {
    if (err) {
      console.error(`${err} updating stripe customer ${localCustomer.stripe_id} with data ${customerData}`);
      // TODO(garcianavalon) build API-compliant error message
      return callback(err);
    }

    return callback({
      action_str: ACTIONS.create.success,
      data_type: 'card'
    });
  });
}

// Add a new card. Overrides previous cards.
module.exports.create = function (requestMessage, callback) {
  debug(`Handling request in card/create`);
  // Validate required params
  const errorResponse = utils.validateRequestData(requestMessage, ['user_id', 'user_email', 'stripe_token']);

  if (errorResponse) {
    return callback(errorResponse);
  }

  const requestData = requestMessage.request_map;

  Customer.findById(requestData.user_id, function (err, localCustomer) {
    if (err) {
      console.error(`${err} querying for user ${requestData.user_id}`);
      // TODO(garcianavalon) build API-compliant error message
      return callback(err);
    }
    if (!localCustomer) {
      // First card, create customer object for this user
      debug(`No local customer ${localCustomer} for user ${requestData.user_id}`);
      return _createStripeCustomer(requestData, callback);
    }
    // Customer object for this user exits, update it
    debug(`Found local customer ${localCustomer} for user ${requestData.user_id}`);
    return _updateStripeCustomer(requestData, localCustomer, callback);
  });
};

// Get current card details (obscured)
module.exports.retrieve = function (requestMessage, callback) {
  debug(`Handling request in card/retrieve`);
  // Validate required params
  const errorResponse = utils.validateRequestData(requestMessage, ['user_id']);

  if (errorResponse) {
    return callback(errorResponse);
  }

  const requestData = requestMessage.request_map;

  Customer.findById(requestData.user_id, function (err, localCustomer) {
    if (err) {
      console.error(`${err} querying for user ${requestData.user_id}`);
      // TODO(garcianavalon) build API-compliant error message
      return callback(err);
    }
    if (!localCustomer) {
      // We don't have any card stored for this user
      debug(`No local customer ${localCustomer} for user ${requestData.user_id}`);
      // TODO(garcianavalon) build API-compliant error message
      return callback(err);
    }

    // Retrieve the stored card details
    debug(`Found local customer ${localCustomer} for user ${requestData.user_id}`);
    stripe.tokens.retrieve(localCustomer.stripe_token, function (err, stripeToken) {
      if (err) {
        console.error(`${err} retrieving stripe token ${localCustomer.stripe_token} of user ${localCustomer._id}`);
        // TODO(garcianavalon) build API-compliant error message
        return callback(err);
      }
      debug(`Token data found ${stripeToken} for user ${localCustomer._id}`);
      return callback({
        action_str: ACTIONS.retrieve.success,
        data_type: 'card'
      });
    });
  });
};

// Cancel card
module.exports.delete = function (requestMessage, callback) {
  debug(`Handling request in card/delete`);
  // Validate required params
  const errorResponse = utils.validateRequestData(requestMessage, ['user_id']);

  if (errorResponse) {
    return callback(errorResponse);
  }
  const requestData = requestMessage.request_map;

  Customer.findById(requestData.user_id, function (err, localCustomer) {
    if (err) {
      console.error(`${err} querying for user ${requestData.user_id}`);
      // TODO(garcianavalon) build API-compliant error message
      return callback(err);
    }
    if (!localCustomer) {
      // We don't have any card stored for this user
      debug(`No local customer ${localCustomer} for user ${requestData.user_id}`);
      // TODO(garcianavalon) build API-compliant error message
      return callback(err);
    }

    // Delete the customer object in Stripe and locally
    debug(`Found local customer ${localCustomer} for user ${requestData.user_id}`);
    stripe.customers.delete(localCustomer.stripe_id, function (err, confirmation) {
      if (err) {
        console.error(`${err} deleting stripe customer ${localCustomer.stripe_token} of user ${localCustomer._id}`);
        // TODO(garcianavalon) build API-compliant error message
        return callback(err);
      }
      debug(`Stripe customer deleted for user ${localCustomer._id}, ${confirmation}`);
      // TODO(garcianavalon) delete localCustomer!
      return callback({
        action_str: ACTIONS.delete.success,
        data_type: 'card'
      });
    });
  });
};
