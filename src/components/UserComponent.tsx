import * as React from 'react';
import { Component } from 'react';

export interface UserProps {
    
}
 
export interface UserState {
    
}
 
class User extends React.Component<UserProps, UserState> {
    constructor(props: UserProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return (  
            <div>
                <p>USER IS HERE</p>
            </div>
        );
    }
}
 
export default User;