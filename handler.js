'use strict';

const request = require('sync-request');
const WEBHOOK_URL = process.env.WEBHOOK_URL;

exports.lambda_test = function(event, context, callback) {
  try {
    console.log('event: \n', event);

    const headers = event.headers;
    const eventName = headers['X-GitHub-Event'];

    console.log('Handling event: ', eventName);
    if (eventName === 'pull_request') {
      const body = JSON.parse(event.body);
      const { repository, sender } = body;

      const repo = repository.name;
      console.log('headers:\n', headers);
      console.log('body:\n', body);
      run(repo, body);
    }
  } catch (err) {
    console.log(err);
    callback(err);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Event Processed"
    })
  };
  callback(null, response);
};

function run(repo, body) {
  console.log('run body function');
}
