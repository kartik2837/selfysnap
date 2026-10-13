const express = require("express");
const router = express.Router();
const twilio = require("twilio");

router.post("/twiml", (req, res) => {
  const sellerNumber = req.query.to;
  console.log("🔗 [Twilio] Admin picked up. Dialing seller:", sellerNumber);

  const twiml = new twilio.twiml.VoiceResponse();

  twiml.say(
    { voice: "alice", language: "en-IN" },
    "Connecting you to the seller. Please wait."
  );

  const dial = twiml.dial({
    callerId: process.env.TWILIO_PHONE_NUMBER,
    record: "record-from-answer",
    timeout: 30,
    action: `${process.env.BACKEND_URL}/api/twilio/callback`,
  });

  dial.number(sellerNumber);

  res.type("text/xml");
  res.send(twiml.toString());
});

router.post("/callback", (req, res) => {
  console.log("📞 [Twilio] Call completed:", req.body.CallStatus);
  res.status(200).send("OK");
});

module.exports = router;