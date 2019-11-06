import React, { Component } from 'react';
import Header from './HeaderComponent';
import Admin from './AdminComponent';
import User from './UserComponent';
import Footer from './FooterComponent';
import Login from './LoginComponent';
import Register from './RegisterComponent';


let uid: any = undefined
let usertype= 'user1' 


class Main extends Component {
    constructor(props: any) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="container-fluid">
                <Header />
                {
                    uid != null ?
                        (usertype != null) ? (usertype == "user"?<User /> : <Admin /> ):(<div>
                            Unauthorized User
                        </div>):
                        (<> <Login /> 
                        <h1>Register Here</h1>
                            <Register/></>)
                }
                <Footer />


            </div>
        );
    }
}

export default Main;