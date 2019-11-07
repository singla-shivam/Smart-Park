import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export type OpStr = app.firestore.WhereFilterOp

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

export type GetDataOptions = {
  fieldPath: string | string[]
  opStr: OpStr | OpStr[]
  value: any | any[]
}

class Firebase {
  public database: app.firestore.Firestore
  public auth: app.auth.Auth

  constructor() {
    this.onAuthStateChanged = this.onAuthStateChanged.bind(this)
    app.initializeApp(config)
    this.database = app.firestore()
    this.auth = app.auth()
    this.auth.onAuthStateChanged(this.onAuthStateChanged)
    // const that = this
    // setTimeout(() => {
    //   const s = ['A', 'B', 'C', 'D', 'E', 'F']
    //   for(let i = 0; i < s.length; i++) {
    //     const element = s[i]
    //     for(let i = 1; i <= 50 ; i ++) {
    //         const slotId = element + i.toString().padStart(2, '0')
    //         console.log(slotId)
    //         try {
    //             that.database.collection('slots').doc(slotId).set({
    //                 slotId: slotId,
    //                 occupied: false,
    //                 booked: false
    //             }).catch(e => console.error(e))
                
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    //   }
    // }, 1000);
  }

  logout() {
    console.log('here')
    this.auth.signOut()
  }

  public async getData<T>(path: string, options?: GetDataOptions): Promise<T[]> {
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
      let doc: firebase.firestore.QueryDocumentSnapshot
      doc = (await document.get())
      if(!doc) return null
      else return [doc.data()] as T[]
    } else {
      let docs: firebase.firestore.QueryDocumentSnapshot[] = [],
        query: firebase.firestore.Query
        
      if(!options) {
        // no query provided
        query = collection
      }
      else if(typeof options.fieldPath == 'string'){
        // query provided
        query = collection.where(options.fieldPath, options.opStr as OpStr, options.value)
        
      }
      else {
        query = collection
        for(let i = 0; i < options.fieldPath.length; i++) {
          console.log(options.fieldPath[i], options.opStr[i], options.value[i])
          query = query.where(options.fieldPath[i], options.opStr[i] as OpStr, options.value[i])
        }
      }

      docs = (await query.get()).docs
      if(docs.length === 0) return null
      else if(docs.length === 1) return [docs[0].data() as T]
      else {
        return docs.map(d => d.data() as T)
      }

    }
  }

  async addData<T>(path: string, value: any): Promise<T>{
    try {
      const paths = path.split('/')
      let collection = this.database.collection(paths[0])
      let document: firebase.firestore.DocumentReference;
      for(let i = 1, len = paths.length; i < len; i++){
        if(i%2 === 0){
          collection = document.collection(paths[i])
        }
        else{
          document = collection.doc(paths[i])
        }
      }
  
      if(paths.length % 2 === 0){
        // document id is provided
        const d = collection.doc(paths[paths.length - 1])
        if(value.id && value.id.includes('??')) value.id = d.id
        try {
          await d.set(value)
        } catch (error) {
          console.error(error)
        }
        return value
      }
      else {
        // document id is not provided
        const d = collection.doc()
        if(value.id && value.id.includes('??')) value.id = d.id
        try {
          await d.set(value)
        } catch (error) {
          console.error(error)
        }
        return value
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  onAuthStateChanged(user: any) {
    if(user) {

    } else {
      if(localStorage.getItem('jsadfkhewjdewbfdgqweu')) {
        localStorage.clear()
        window.location.reload()
        window.location.href = '/'
      }
    }
  }
}

export default Firebase
