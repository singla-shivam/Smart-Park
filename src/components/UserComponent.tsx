import * as React from 'react';
import { Button } from 'reactstrap';

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
                <h1 className="display-4"> Welcome to {Pname} </h1>
                <Button color="warning" >Book Slot</Button>
                
            </div>
        );
    }
}
 
export default User;