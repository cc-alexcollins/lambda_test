'use strict';

const request = require('sync-request');
const parse_diff = require('parse-diff');
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
          const diff_url = pr.diff_url;
          console.log('diff url:\n', diff_url);
          run(diff_url);
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

function run(diff_url) {
  console.log('upload files from diff: ', diff_url);

  const res = request('GET', diff_url);
  const diff = res.getBody().toString();
  console.log('diff contents:\n', diff);

  const files = parse_diff(diff);
  console.log('files:\n', files);

  files.forEach(function(file) {
    console.log('Uploading file: ', file.to);
  });
}
