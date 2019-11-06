import React, { Component } from 'react';
import Header from './HeaderComponent';
import Admin from './AdminComponent';
import User from './UserComponent';
import Footer from './FooterComponent';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import { Switch, Redirect, Route } from 'react-router-dom';
import Firebase, { FirebaseContext } from '../firebase';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Entry from './EntryComponent';
import Exit from './ExitComponent';
import Display from './DisplayComponent';


// let uid: any = 123
// let userType = 'user1'


let uid = window.localStorage.getItem('jsadfkhewjdewbfdgqweu')
let userType: 'user' | null = window.localStorage.getItem('lanfklnasv') as any
let phoneNo: any = window.localStorage.getItem('lanfklnasvph') as any


export interface MainProps {
}

export interface MainState {
    openRegister: boolean
}
class Main extends Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props);
        this.state = {
            openRegister: false
        }
        this.changeRegister = this.changeRegister.bind(this);
    }
    changeRegister() {
        this.setState({
            openRegister: true
        })
    }
    render() {
        const Default = () => {
            return (
                this.state.openRegister == true ?
                    (
                        <div>REFRESH</div>
                    ) : (
                        uid != null ?
                            (userType == null ?
                                <FirebaseContext.Consumer>
                                    {(firebase: Firebase) => <Register firebase={firebase} uid={uid} phoneNo={phoneNo}/>}
                                </FirebaseContext.Consumer> :
                                userType === "user" && userType != null ? <User /> : <Admin />) : (
                                // <Login />
                                <>
                                    <FirebaseContext.Consumer>
                                        {(firebase: Firebase) => <Login firebase={firebase} />}
                                    </FirebaseContext.Consumer>
                                    <NavLink className="nav-link  text-dark" to="/register" >
                                        <Button color="primary" >Register</Button>
                                    </NavLink>
                                </>)
                    )
            )
        }
        return (
            <div className="container-fluid">
                <Header />
                <Switch>
                    <Route exact path="/home" component={() => <Default />} />
                    <Route exact path="/entry" component={() => <Entry/>} />
                    <Route exact path="/exit" component={() => <Exit />} />
                    <Route exact path="/display" component={() => <Display />} />

                    <Redirect to="/home" />
                </Switch>

                <Footer />


            </div>
        );
    }
}

export default Main;