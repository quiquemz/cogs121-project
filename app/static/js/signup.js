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
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const uid = res.user.uid;
                writeUserDataDB(uid, email);
                user.getIdToken().then(function(idToken) {  //idToken is the user's firebase token
                   $.ajax({
                     url: '/',
                     type: 'GET', 
                     headers: {'Authorization': 'Bearer ' + idToken },
                     success: (status) => {
                       if (status == 'Login Successful')
                         window.location.href = "/discover"
                     }
                   });
                });
            }
        });
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