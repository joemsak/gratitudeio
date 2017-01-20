var firebase = require("firebase");

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
};

firebase.initializeApp(config);

var database = firebase.database();

module.exports = database;
