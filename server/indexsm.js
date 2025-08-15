require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { twiml: { MessagingResponse }, validateRequest } = require('twilio');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3005;
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;

if (!ACCOUNT_SID || !AUTH_TOKEN || !TWILIO_NUMBER) {
  console.error('Missing TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_NUMBER in environment');
  process.exit(1);
}

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

// Simple health check
app.get('/', (req, res) => {
  res.send(`Twilio messaging server is running. POST /send to send SMS, POST /sms receives incoming messages.`);
});

// Send SMS endpoint (JSON body: to, body)
app.post('/send', async (req, res) => {
  const { to, body } = req.body;
  
  if (!to || !body) {
    return res.status(400).json({ error: 'Missing `to` or `body` in request' });
  }

  try {
    const message = await client.messages.create({
      body,
      from: TWILIO_NUMBER,
      to
    });

    return res.json({ sid: message.sid, status: message.status });
  } catch (err) {
    console.error('Error sending message:', err);
    return res.status(502).json({ error: 'Failed to send message', details: err.message });
  }
});

// Receive incoming SMS webhook
// (Configure this URL in your Twilio phone number's Messaging webhook)
app.post('/sms', (req, res) => {
  // Optional: Validate request came from Twilio
  // const twilioSignature = req.headers['x-twilio-signature'];
  // const url = process.env.PUBLIC_URL + '/sms';
  // if (!validateRequest(AUTH_TOKEN, twilioSignature, url, req.body)) {
  //   return res.status(403).send('Invalid Twilio signature');
  // }

  const from = req.body.From;
  const to = req.body.To;
  const body = req.body.Body;

  console.log(`Incoming message from ${from} -> ${to}: ${body}`);

  // Basic auto-reply using TwiML
  const twiml = new MessagingResponse();
  twiml.message('Thanks! We got your message.');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});