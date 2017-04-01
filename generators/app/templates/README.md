# <%= service_name %> Docs
Welcome to the amazing <%= service_name %> docs!

<%= description %>

## Understanding the API

### Beforehand
Make sure to read and understand the following resources first:
- [RESTful APIs, the big lie](https://mmikowski.github.io/the_lie/)
- [JSON-Pure APIs](https://mmikowski.github.io/json-pure/)

### Messages

#### Vocabulary (actions)
- Uses [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) standard.
- Server responses use UPPERCASE to help differentiate from client requests.

| Request	| Response |
| --- | --- |
| create | CREATED or CREATE_FAIL	|
| retrieve | RETRIEVED or RETRIEVE_FAIL	|
| update | UPDATED or UPDATE_FAIL	|
| delete | DELETED or DELETE_FAIL	|

#### Message types

##### Requests
Requests are messages sent from clients requesting data manipulation or delivery. An example request to change a specific record would have the update action verb.

##### Direct responses
Direct responses are messages from the server to attached clients directly in response to a request. A direct response to the update request in the example would use the UPDATED action verb.

##### Indirect responses
Indirect responses are sent from the server to clients without a direct corresponding request. This happens when the server needs to notify a client of a data change, such as an updated, deleted, or new record. An indirect response for the example above would have an UPDATED action verb.

##### Confirmations
Confirmations are sent from a client to a server to confirm a response has been received and processed. The client may indicate success with done, cancel the transaction with abort, or re-request the message with retry. Generally it is a good idea to avoid the complexities of supporting the idea of “partial success”.

#### Message structure/format
- The action verb, action_str, is required.
- The data_type indicator is application dependent.
- The application messages list, log_list, is optional.
- The request_map, response_map, and confirm_map are required for each message type.
- The trans_map is required and includes transaction specific parameters. It is discussed below.

```javascript
// request
{ action_str    : "retrieve",  /* action verb */
  data_type     : "person",    /* record data */
  log_list      : [ /* application messages   */ ],
  request_map   : { /* request parameters     */ },
  trans_map     : { /* transaction meta-data  */ }
}

// direct and indirect responses
{ action_str    : "RETRIEVED", /* action verb */
  data_type     : "person",    /* record data */
  log_list      : [ /* application messages   */ ],
  response_map  : { /* returned data          */ },
  trans_map     : { /* transaction meta-data  */ }
}
```

## Running tests
```
$ docker-compose -f docker-compose.test.yml run --rm sut
```
If you need to see debugging traces, use the `DEBUG` environment variable as normally.
```
$ docker-compose -f docker-compose.test.yml run --rm -e DEBUG=<%= service_name %>:[namespace|*] sut
```
To run a specific test use the `npm run mocha` command. Check [this article](http://jaketrent.com/post/run-single-mocha-test/)
for tricks on choosing your test.
```
$ docker-compose -f docker-compose.test.yml run --rm sut npm run mocha -- [PATH_TO_YOUR_TEST]
```

## Running a full stack
```
$ docker-compose up -d [--force-recreate]
```
