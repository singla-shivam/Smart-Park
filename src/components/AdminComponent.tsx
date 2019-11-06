import * as React from 'react';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export interface AdminProps {
}

export interface AdminState {
}

class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-4"> Choose </h1>
                    <NavLink className="nav-link  text-dark" to="/entry" >
                        <Button color="warning" >Entry</Button>
                    </NavLink>
                    <NavLink className="nav-link  text-dark" to="/exit" >
                        <Button color="danger" >Exit</Button>
                    </NavLink>
                    <NavLink className="nav-link  text-dark" to="/display" >
                        <Button color="info" >Display</Button>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default Admin;