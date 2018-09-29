'use strict';

const request = require('sync-request');
const WEBHOOK_URL = process.env.WEBHOOK_URL;

exports.lambda_test = function(event, context, callback) {
  try {
    console.log('event: \n', event);

    const headers = event.headers;
    const eventName = headers['X-GitHub-Event'];

    console.log('Handling GitHub Event: ', eventName);
    if (eventName === 'pull_request') {
      const body = JSON.parse(event.body);
      console.log('headers:\n', headers);
      console.log('body:\n', body);

      console.log('Handling PR Action: ', body.action);
      if (body.action === 'closed') {
        const pr = body.pull_request;

        console.log('PR Merged Status: ', pr.merged);
        if (pr.merged) {
          const links = pr._links;
          console.log('links:\n', links.commits);
          run();
        }
      }
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

function run() {
  console.log('run body function');
}
