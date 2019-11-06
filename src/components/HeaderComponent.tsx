import React from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse } from "reactstrap";
import Register from './RegisterComponent';
import { NavLink } from 'react-router-dom';

export type HeaderProps = {}

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
    }
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }
    render() {
        return (
            <div className="continer-fluid">
                <Navbar color="primary" expand="md" >
                    <NavbarToggler onClick={this.toggleNav} >
                        <i className="fa fa-bars text-dark" style={{ fontSize: "24px" }}></i>
                    </NavbarToggler>
                    <NavbarBrand className="mr-auto" >
                        <img src="assets/logo.png" className="logo-navbar img-responsive" alt="SNS" height="60" width="70" />
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar >
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink className="nav-link  text-dark" to="/home" >

                                    <span className="fa fa-home fa-lg"></span> Home
                            </NavLink>    </NavItem>
                            <NavItem>
                                <span className="fa fa-group fa-lg"></span> LOGOUT
                            </NavItem>
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
