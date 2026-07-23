const status = document.getElementById("userStatus");
const signinBtn = document.getElementById("signinBtn");

signinBtn.addEventListener("click", () => {
  const emailVal = document.getElementById("email").value.trim();
  const passwordVal = document.getElementById("password").value;


  if (!emailVal || !passwordVal) {
    status.innerText = "Please enter both email and password.";
    return;
  }

  status.innerText = "Signing in...";

  fetch('https://apg-api.vercel.app/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailVal, password: passwordVal })
  })
  .then(r => r.json())
  .then(data => {
    if (data.status === 'success') {
      if (!data.token) {
        status.innerText = "Server error: no token returned.";
        console.error("Login succeeded but API response has no token:", data);
        return;
      }
      sessionStorage.setItem('token', data.token);
      setTimeout(() => { window.location.href = 'home.html'; }, 200);
    } else if (data.action == "verify"){
      sessionStorage.setItem('pending_verification_email', emailVal);
      setTimeout(() => { window.location.href = 'verify.html'; }, 200);
    }
    else {
      status.innerText = data.message;
    }
  })
  .catch(() => {
    status.innerText = 'Network error.';
  });
});
