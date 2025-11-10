document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  // Call backend API to send OTP
  const response = await fetch('/api/sendOTP', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email })
  });
  const result = await response.json();
  document.getElementById('message').textContent = result.message;
  if (result.success) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'block';
  }
});
document.getElementById('otpForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const otp = document.getElementById('otp').value;
  // Call backend API to verify OTP
  const response = await fetch('/api/verifyOTP', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, otp })
  });
  const result = await response.json();
  document.getElementById('message').textContent = result.message;
  if (result.success) {
    document.getElementById('message').textContent = 'Login Success!';
  }
});
