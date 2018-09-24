"use strict";

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event
    })
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.sendReminderDaily = (event, context, callback) => {
  const aws = require("aws-sdk");
  AWS.config.update({ region: "us-east-1" });

  const ses = new AWS.SES();
  const fs = require("fs");

  const emailHtml = fs.readFileSync("./dailyReminder.html", "utf-8");

  const toAndFromAddress = "verifiedemail@yourdomain.com";
  const params = {
    Destination: {
      ToAddresses: [toAndFromAddress]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailHtml
        },
        Text: {
          Charset: "UTF-8",
          Data: "Remember to continue helping the Woof Garden!"
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Woof Grden Reminder"
      }
    },
    ReplyToAddresses: [toAndFromAddress],
    Source: toAndFromAddress
  };

  ses.sendEmail(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      callback(null, data);
    }
  });
};
