const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyBZyQwVp6AvKXIs3gmFqjsImUVqGiFTYok",
  authDomain: "portfolio-e31a9.firebaseapp.com",
  databaseURL: "https://portfolio-e31a9.firebaseio.com",
  projectId: "portfolio-e31a9",
  storageBucket: "portfolio-e31a9.appspot.com",
  messagingSenderId: "872417866321",
  appId: "1:872417866321:web:7f7f65a4370c72e1cf7e70"
});

var db = firebase.firestore();

$("#contactSubmit").click(event => {
  event.preventDefault();
  const firstName = $("#firstName")
    .val()
    .trim();
  const lastName = $("#lastName")
    .val()
    .trim();
  const email = $("#email")
    .val()
    .trim();
  const message = $("#message")
    .val()
    .trim();

  const newContact = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    message: message
  };

  //   const { firstName, lastName, email, message } = newContact;

  db.collection("contacts")
    .add({
      firstName: newContact.firstName,
      lastName: newContact.lastName,
      email: newContact.email,
      message: newContact.message
    })
    .then(function(res) {
      console.log(`Success: ${res.data}`);
    })
    .catch(function(error) {
      console.error(`Error adding document: ${error}`);
    });

  $("#firstName").val("");
  $("#lastName").val("");
  $("#email").val("");
  $("#message").val("");
});
