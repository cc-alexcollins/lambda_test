'use strict';

const request = require('sync-request');
const WEBHOOK_URL = process.env.WEBHOOK_URL;

exports.lambda_test = function(event, context, callback) {
  // const eventName = headers["X-GitHub-Event"];

  // console.log('Handling event: ', eventName);

  // if (eventName = 'pull_request') {
    const body = JSON.parse(event.body);
    const { repository, sender } = body;

    const repo = repository.name;

    try {
      console.log('headers: ', event.headers);
      console.log(body);
      run(repo, body);
    } catch (err) {
      console.log(err);
      callback(err);
    }
  // }

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
