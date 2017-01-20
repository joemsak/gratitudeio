(function AuthPage() {
  var authForm = document.getElementById('auth-form');

  if (!authForm)
    return;

  authForm.addEventListener('submit', onAuhFormSubmit);

  function onAuhFormSubmit(e) {
    e.preventDefault();

    var headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    var url = e.target.action;

    var fetchOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        phoneNumber: e.target.querySelector("[name='phone_number']").value,
      }),
    };

    fetch(url, fetchOptions)
      .then(function(response) {
        e.target.classList.add('loading');
        return response.json();
      })
      .then(function(jsonData) {
        console.log(jsonData);
      });
  }
})();
