import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyA-UyUIw_Voy9cvb9NhDIrz2SmK233WB_k",
  authDomain: "portfolio-9eef0.firebaseapp.com",
  databaseURL: "https://portfolio-9eef0.firebaseio.com",
  projectId: "portfolio-9eef0",
  storageBucket: "portfolio-9eef0.appspot.com",
  messagingSenderId: "1080688611428",
  appId: "1:1080688611428:web:7fb77630604bd521"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
const storage = firebase.storage();
const database = firebase.database();

export { storage, database, firebase as default };
