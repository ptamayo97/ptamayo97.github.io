import fbConfig from "../config/fbConfig";
import firebase from "firebase";
import "firebase/firestore";
// // const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");
firebase.initializeApp({ fbConfig });

const db = firebase.firestore();

const submitContact = data => {
  db.collection("contacts")
    .add({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      message: data.message
    })
    .then(function(res) {
      console.log(`Success: ${res.data}`);
    })
    .catch(function(error) {
      console.error(`Error adding document: ${error}`);
    });
};

export { db, submitContact };
