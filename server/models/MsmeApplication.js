// models/MsmeApplication.js
import mongoose from 'mongoose';

const msmeApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  subject: String,
  phone: String,
  file: String, // File path to uploaded document
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('MsmeApplication', msmeApplicationSchema);
