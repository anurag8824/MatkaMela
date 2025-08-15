require('dotenv').config();
const twilio = require('twilio');

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;

if (!ACCOUNT_SID || !AUTH_TOKEN || !TWILIO_NUMBER) {
  console.error('Missing environment variables');
  process.exit(1);
}

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
console.log(client)

// Usage: node sendSms.js "+15551234567" "Hello from Twilio"
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node sendSms.js <to> <message>');
  process.exit(1);
}

const [to, ...messageParts] = args;
const body = messageParts.join(' ');

client.messages.create({ from: TWILIO_NUMBER, to, body })
  .then(message => console.log('Sent. SID:', message.sid))
  .catch(err => console.error('Failed to send:', err));