import React from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse } from "reactstrap";

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
                <Navbar expand="md" className="fixed-top">
                    <NavbarToggler onClick={this.toggleNav} ><i className="fa fa-bars text-dark" style={{ fontSize: "24px" }}></i></NavbarToggler>
                    <NavbarBrand className="mr-auto" >
                        <img src="#"/>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar >
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <span className="fa fa-home fa-lg"></span> Home
                                </NavItem>
                            <NavItem>
                                <span className="fa fa-group fa-lg"></span> LOGOUT
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>

            </div >
        );
    }
}

export default Header;
