require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 4000;

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Endpoint to initiate the call
app.get('/make-call', (req, res) => {
  const { phoneNumber } = req.query;

  client.calls
  .create({
    url: 'https://a240-202-47-36-167.ngrok-free.app/outbound-call', // URL for the call flow
    to: phoneNumber,
    from: process.env.TWILIO_PHONE_NUMBER
  })
  .then(call => {
    console.log("Calling", call.sid);
    res.send(call.sid);
  })
  .catch(error => res.status(500).send(error));

});

// Endpoint for Twilio to retrieve TwiML instructions
app.post('/outbound-call', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.dial({ callerId: process.env.TWILIO_PHONE_NUMBER }, '+923122043673'); // Replace with the desired destination number
  
  res.type('text/xml');
  res.send(twiml.toString());
  console.log("Sent data ", res.send(twiml.toString()))
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
