(function() {
  var API = 'https://apg-api.vercel.app';
  var status = document.getElementById('userStatus');
  var btn = document.getElementById('signinBtn');

  btn.addEventListener('click', function() {
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;

    if (!email || !password) {
      status.innerText = 'Please enter both email and password.';
      return;
    }

    btn.disabled = true;
    status.innerText = 'Signing in...';

    fetch(API + '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      btn.disabled = false;
      if (data.status === 'success') {
        if (!data.token) { status.innerText = 'Server error: no token.'; return; }
        sessionStorage.setItem('token', data.token);
        window.location.href = 'home.html';
      } else if (data.action === 'verify') {
        sessionStorage.setItem('pending_verification_email', email);
        window.location.href = 'verify.html';
      } else {
        status.innerText = data.message;
      }
    })
    .catch(function() {
      btn.disabled = false;
      status.innerText = 'Network error.';
    });
  });
})();
