// TODO If user is signed in REDIRECT to home. Do NOT show login form.
$(document).ready(function() {
  /*** Firebase Auth and DB ***/
  const auth = firebase.auth();
  const db = firebase.database();

  /*** Function definitions ***/
  function login(e) {
    e.preventDefault();

    const username = $('#username').val()
    const email = $('#email').val();
    const password = $('#password').val();


    auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        window.location = "/";
        // TODO Prompt user that he/she succesfully logged in
      })
      .catch(e => {
        alert(e.message);
        // TODO Handle errors
        // TODO Prompt user with error
      });
  }

  /*** Event Handlers ***/
  $('#email-login-form').on('submit', (e) => login(e));

});