$(function() {
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

  $("form[name='contactForm'").submit(event => {
    const first = $("#firstName").hasClass("valid");
    const last = $("#lastName").hasClass("valid");
    const email = $("#email").hasClass("valid");
    const message = $("#message").hasClass("valid");
    event.preventDefault();
    if (first && last && email && message) {
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

      const data = {
        name: {
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        message: message
      };

      db.collection("contacts")
        .add({
          name: {
            firstName: data.name.firstName,
            lastName: data.name.lastName
          },
          email: data.email,
          message: data.message
        })
        .then(() => {
          console.log("Success!");
          const success = "<span>Message Sent!</span>";
          M.toast({ html: success, classes: "green darken-4" });
        })
        .catch(err => {
          console.error(`Error adding document: ${err}`);
          const error = "<span>Error!</span>";
          M.toast({ html: error });
        });

      $("#firstName").val("");
      $("#lastName").val("");
      $("#email").val("");
      $("#message").val("");
    }
  });
});
