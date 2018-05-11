// TODO If user is signed in REDIRECT to home. Do NOT show login form.
$(document).ready(function() {
  /*** Firebase Auth and DB ***/
  const auth = firebase.auth();
  const db = firebase.database();

  /*** Function definitions ***/
  function login() {
    const username = $('#username').val()
    const email = $('#email').val();
    const password = $('#password').val();


    auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        window.location = "/";
        // TODO Prompt user that he/she succesfully logged in
      })
      .catch(e => {
        console.log(e);
        // TODO Handle errors
        // TODO Prompt user with error
      });
  }

  /*** Event Handlers ***/
  $('#login-form').on('submit', (e) => {
    e.preventDefault();
    login(e);
  });

});