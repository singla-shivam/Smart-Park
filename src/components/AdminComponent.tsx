import * as React from 'react';
import {Button } from 'reactstrap';

export interface AdminProps {
}
 
export interface AdminState {
}
 
class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( 
            <div>
                <div className="jumbotron">
                <h1 className="display-4"> Choose </h1>
                <Button color="warning" >Entry</Button>
                <Button color="danger" >Exit</Button>
                <Button color="info" >Display</Button>
                
            </div>
            </div>
         );
    }
}
 
export default Admin;