import * as React from 'react';
import { Component } from 'react';


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
                <p>ADMIN IS HERE</p>
            </div>
         );
    }
}
 
export default Admin;