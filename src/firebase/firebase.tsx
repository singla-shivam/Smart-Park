import app from 'firebase/app'

const config = {
  apiKey: "AIzaSyCQuZiQmLeInyNQCPcZ4JS9cMHhCIhJ5co",
  authDomain: "sns-mnit.firebaseapp.com",
  databaseURL: "https://sns-mnit.firebaseio.com",
  projectId: "sns-mnit",
  storageBucket: "sns-mnit.appspot.com",
  messagingSenderId: "1020618091922",
  appId: "1:1020618091922:web:ec91633f57bd0a27f6654b",
  measurementId: "G-MYM7JS99KE"
}

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase
