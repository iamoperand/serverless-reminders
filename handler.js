"use strict";

module.exports.sendReminderDaily = (event, context, callback) => {
  const AWS = require("aws-sdk");
  AWS.config.update({ region: "us-east-1" });

  const ses = new AWS.SES();
  const fs = require("fs");

  const emailHtml = fs.readFileSync("./dailyReminder.html", "utf-8");

  const toAndFromAddress = "niksataws@gmail.com";
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

module.exports.sendReminderWeekend = (event, context, callback) => {
  const AWS = require("aws-sdk");
  AWS.config.update({ region: "us-east-1" });

  const ses = new AWS.SES();
  const fs = require("fs");

  const emailHtml = fs.readFileSync("./weekendReminder.html", "utf-8");

  const toAndFromAddress = "niksataws@gmail.com";
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
