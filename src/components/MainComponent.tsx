import React, { Component } from 'react';
import Header from './HeaderComponent';
import Admin from './AdminComponent';
import User from './UserComponent';
import Footer from './FooterComponent';
let userid="user1"

class Main extends Component {
    constructor(props: any) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="container">
                <Header />
                { userid=='user'?<User/>:<Admin/> }
                <Footer />

            </div>
          );
    }
}
 
export default Main;