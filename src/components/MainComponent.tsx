import React, { Component } from 'react';
import Header from './HeaderComponent';
import Admin from './AdminComponent';
import User from './UserComponent';
import Footer from './FooterComponent';
import Login from './LoginComponent';
import Firebase, { FirebaseContext } from '../firebase';

let uid = window.localStorage.getItem('jsadfkhewjdewbfdgqweu')
let userType: 'user' | null = window.localStorage.getItem('lanfklnasv') as any

class Main extends Component {
    constructor(props: any) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="container">
                <Header />
                {
                    uid != null ?
                        ( userType == null ?
                            <div>Unautorizied user</div> :
                            userType === "user" && userType != null ? <User /> : <Admin />) :
                        // <Login />
                        <FirebaseContext.Consumer>
                            {(firebase: Firebase) => <Login firebase={firebase} />}
                        </FirebaseContext.Consumer>
                }
                <Footer />

            </div>
        );
    }
}

export default Main;