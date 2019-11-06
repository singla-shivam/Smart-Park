import React, { Component } from 'react';
import Header from './HeaderComponent';
import Admin from './AdminComponent';
import User from './UserComponent';
import Footer from './FooterComponent';
import Login from './LoginComponent';

let uid = window.localStorage.getItem('jsadfkhewjdewbfdgqweu')
let usertype: 'user' | null = window.localStorage.getItem('lanfklnasv') as any

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
                        ( usertype == "user" && usertype != null ? <User /> : <Admin />):
                        ( usertype == null? <div>Unautorizied user</div>: <Login />)
                }
                <Footer />

            </div>
        );
    }
}

export default Main;