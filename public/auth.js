(function AuthPage() {
  var authForm = document.getElementById('auth-form'),
      codeForm = document.getElementById('code-form');

  if (!authForm || !codeForm)
    return;

  authForm.addEventListener('submit', onAuhFormSubmit);
  codeForm.addEventListener('submit', onCodeFormSubmit);

  function onAuhFormSubmit(e) {
    e.preventDefault();
    e.target.classList.add('loading');

    var headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    var url = e.target.action,
        phoneNumber = e.target.querySelector("[name='phone_number']").value;

    var fetchOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        phoneNumber: phoneNumber,
      }),
    };

    fetch(url, fetchOptions)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonData) {
        e.target.classList.add('disabled');
        e.target.querySelector('.spinner').innerText = "Code sent!";

        codeForm.classList.add('reveal');
        codeForm.querySelector('[name="phone_number"]').value = phoneNumber;
      });
  }

  function onCodeFormSubmit(e) {
    e.preventDefault();
    e.target.classList.add('loading');

    var headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    var url = e.target.action;

    var fetchOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        phoneNumber: e.target.querySelector("[name='phone_number']").value,
        code: e.target.querySelector("[name='code']").value,
      }),
    };

    fetch(url, fetchOptions)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonData) {
        e.target.classList.remove('loading');

        if (jsonData.error) {
          e.target.classList.add('xhr-failed');
          e.target.querySelector('.spinner').innerText = jsonData.error;
        } else {
          e.target.classList.add('xhr-success');
          e.target.classList.remove('xhr-failed');
          e.target.querySelector('.spinner').innerText = "Success!";
          Cookies.set("authToken", jsonData.authToken);
        }
      });
  }
})();
