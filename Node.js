// npm install express nodemailer cors
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

let otps = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_GMAIL@gmail.com',
    pass: 'YOUR_APP_PASSWORD',
  }
});

app.post('/api/sendOTP', (req, res) => {
  const email = req.body.email;
  const otp = Math.floor(100000 + Math.random() * 900000);
  otps[email] = otp;
  const mailOptions = {
    from: 'YOUR_GMAIL@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({ success: false, message: 'Error sending OTP.' });
    } else {
      res.json({ success: true, message: 'OTP sent to your email.' });
    }
  });
});

app.post('/api/verifyOTP', (req, res) => {
  const { email, otp } = req.body;
  if (otps[email] && otps[email].toString() === otp) {
    delete otps[email];
    res.json({ success: true, message: 'OTP verified!' });
  } else {
    res.json({ success: false, message: 'Invalid OTP.' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
