// TODO If user is signed in REDIRECT to home. Do NOT show signup form.
$(document).ready(function() {
  /*** Firebase Auth and DB ***/
  const auth = firebase.auth();
  const db = firebase.database();

  /*** Function definitions ***/
  function writeUserDataDB(uid, email) {
    // TODO Add all the fields of a user object
    db.ref('users/' + uid).set(new User(email));
  }

  function signup() {
    const email = $('#email').val();
    const password = $('#password').val();

    auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        const uid = res.user.uid;

        writeUserDataDB(uid, email);
        // TODO Redirect user to set preferences page
        window.location = "/";
        // TODO Prompt user that he/she succesfully signed up
      })
      .catch(e => {
        console.log(e);
        alert(e.message);
        // TODO Handle errors
        // TODO Prompt user with error
      });
  }

  /*** Event Handlers ***/
  $('#email-signup-form').on('submit', (e) => {
    e.preventDefault();
    signup(e);
  });
});