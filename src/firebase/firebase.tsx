import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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
  private database: app.firestore.Firestore
  private auth: app.auth.Auth

  constructor() {
    app.initializeApp(config)
    this.database = app.firestore()
    this.auth = app.auth()
  }

  public async getData(path: string) {
    const paths = path.split('/')

    let collection = this.database.collection(paths[0])

    let document: firebase.firestore.DocumentReference
      // query: firebase.firestore.Query

    for (let i = 1, len = paths.length; i < len; i++) {
      if (i % 2 === 0) {
        // if it is document path
        collection = document.collection(paths[i])
      } else {
        // if it is collection path
        document = collection.doc(paths[i])
      }
    }

    if (paths.length % 2 === 0) {
    }
  }
}

export default Firebase
