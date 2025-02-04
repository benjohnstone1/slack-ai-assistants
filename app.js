const express = require("express");
const { postSlack } = require("./slack");
const { createMessage } = require("./assistant");

const app = express();
app.use(express.json());

// Slack Events
app.post("/", async (req, res) => {
  const { type, event } = req.body;
  console.log(event);

  if (type === "url_verification") {
    // Respond to Slack's URL verification challenge
    return res.status(200).send(req.body.challenge);
  }

  // Reply to message events
  if (type === "event_callback" && event.type === "message" && !event.subtype) {
    if (event.bot_profile || event.thread_ts) {
      // do not respond to bot replies or threaded messages
      return;
    }

    // Get response from AI Assistant
    const response = await createMessage(event.user, event.text);

    // Post response to slack
    if (response.status === "Success") {
      postSlack(
        event.channel,
        response.body +
          `\n\n\n:white_check_mark: if this answered your question :eyes: if you need some human help`,
        event.ts
      );
    }
    res.sendStatus(200);
  }

  // Placeholder for new events
  // if (
  //   type === "event_callback" &&
  //   event.type === "reaction_added" &&
  //   !event.subtype
  // ) {
  //   if (event.reaction === "white_check_mark") {
  //     postSlack(event.item.channel, "Thank you!", event.item.ts);
  //   }

  //   if (event.reaction === "eyes") {
  //     postSlack(
  //       event.item.channel,
  //       "A human will respond shortly",
  //       event.item.ts
  //     );
  //   }
  // }
});

app.listen(3000, () => console.log("Example app is listening on port 3000."));
