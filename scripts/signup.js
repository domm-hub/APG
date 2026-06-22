const status = document.getElementById("userStatus");

document.getElementById("signupBtn").addEventListener("click", () => {
  // 1. Build the payload matching the exact keys your Flask app expects
  const payload = {
    firstname: document.getElementById("firstName").value,
    lastname: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phonenumber: document.getElementById("phone").value,
    password: document.getElementById("password").value
  };

  status.innerText = "⏳ Creating account...";

  // 2. Fire the network request across the internet to Vercel
  fetch('https://apg-api.vercel.app/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload) // Converts the object into a JSON string
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      status.innerText = "✅ " + data.message;
      
      // Save just the email to sessionStorage so the verify page knows who to verify
      sessionStorage.setItem("pending_verification_email", payload.email);
      
      // Redirect to your brand-new verify layout view instead of home!
      setTimeout(() => {
        window.location.href = "verify.html";
      }, 1500);
    } else {
      // Handles error states like "Email is already taken"
      status.innerText = "❌ Error: " + data.message;
    }
  })
  .catch(err => {
    status.innerText = "❌ Network error. Backend is unreachable.";
    console.error(err);
  });
});
