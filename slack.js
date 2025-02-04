const { WebClient } = require("@slack/web-api");
require("dotenv").config();

const SLACK_TOKEN = process.env.SLACK_TOKEN;

// Create a new instance of the WebClient class with the token read from your environment variable
const web = new WebClient(SLACK_TOKEN);

const postSlack = async (channel, text, ts) => {
  try {
    await web.chat.postMessage({
      channel: channel,
      text: text,
      thread_ts: ts, //thread as reply
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postSlack = postSlack;
