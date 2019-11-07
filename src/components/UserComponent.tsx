import * as React from 'react';
import { Button } from 'reactstrap';
import {NavLink} from 'react-router-dom';

export interface UserProps {
    
}
 
export interface UserState {
    
}

let Pname = "Mukesh bhai"

 
class User extends React.Component<UserProps, UserState> {
    constructor(props: UserProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return (  
            <div className="jumbotron">
                <h1 className="display-4"> Welcome to {Pname} parking </h1>
                <NavLink to="/booking" ><Button color="warning" >Book Slot</Button></NavLink>
            </div>
        );
    }
}
 
export default User;