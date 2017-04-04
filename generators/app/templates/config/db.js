if (process.env.NODE_ENV === 'test') {
  console.warn('NODE_ENV environment variable is set to \'test\' so database connection will be skipped');
  // TODO(garcianavalon) once I manage to make slint ignore this error ...
  // return;
} else {
  // Const debug = require('debug')('jsonapi:db');

  // Your database's config and connection goes here.
}
