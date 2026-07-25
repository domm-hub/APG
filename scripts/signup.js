(function() {
  var API = 'https://apg-api.vercel.app';
  var status = document.getElementById('userStatus');
  var btn = document.getElementById('signupBtn');
  var inviteCode = new URLSearchParams(window.location.search).get('invite');

  btn.addEventListener('click', function() {
    var payload = {
      firstname: document.getElementById('firstName').value.trim(),
      lastname: document.getElementById('lastName').value.trim(),
      email: document.getElementById('email').value.trim(),
      display_name: document.getElementById('displayName').value.trim(),
      phonenumber: document.getElementById('phone').value.trim(),
      password: document.getElementById('password').value
    };

    if (inviteCode) payload.invite_code = inviteCode;

    if (!payload.firstname || !payload.lastname || !payload.email || !payload.display_name || !payload.phonenumber || !payload.password) {
      status.innerText = 'Fill in all fields.';
      return;
    }
    if (payload.display_name.length < 3) {
      status.innerText = 'Username must be at least 3 characters.';
      return;
    }
    if (payload.password.length < 8) {
      status.innerText = 'Password is too short. 8+ chars minimum.';
      return;
    }

    btn.disabled = true;
    status.innerText = 'Creating account...';

    fetch(API + '/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      btn.disabled = false;
      if (data.status === 'success') {
        status.innerText = data.message;
        sessionStorage.setItem('pending_verification_email', payload.email);
        setTimeout(function() { window.location.href = 'verify.html'; }, 1500);
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
