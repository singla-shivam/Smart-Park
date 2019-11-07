import React from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse } from "reactstrap";
import Register from './RegisterComponent';
import Firebase from '../firebase';
import { SlotInterface } from '../models/slot';
import { NavLink } from 'react-router-dom';
import '../App.css';

export type HeaderProps = {
    firebase: Firebase
}

export type HeaderState = {
    isNavOpen: boolean
}

class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isNavOpen: false,
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    logout() {
        this.props.firebase.logout()
    }
    render() {

        return (
            <div className="continer-fluid ">
                <Navbar  expand="sm" className="navbar-default" >
                    <NavbarToggler onClick={this.toggleNav} >
                        <i className="fa fa-bars text-light" style={{ fontSize: "24px" }}></i>
                    </NavbarToggler>
                    <NavbarBrand className="mr-auto" >
                        <img src="assets/logo3.png" className="logo-navbar img-responsive" alt="SNS" height="60" width="70" />
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar >
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink className="nav-link  text-light" to="/home" >

                                    <span className="fa fa-home fa-lg"></span> Home
                            </NavLink>
                            </NavItem>

                            {/* implement sign out */}

                            <NavLink to="/home" className="nav-link  text-light" >
                                <div className='text-light'  onClick={this.logout}><span className="fa fa-sign-out fa-lg"></span> LOGOUT</div>
</NavLink>
                            {/* <NavItem>
                                <a onClick={() => (<Register />)}><span className="fa fa-registered" ></span>Register</a>
                            </NavItem> */}
                        </Nav>
                    </Collapse>
                </Navbar>

            </div >
        );
    }
}

export default Header;
