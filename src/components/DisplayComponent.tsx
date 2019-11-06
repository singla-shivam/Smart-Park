import * as React from 'react';
import Firebase from '../firebase';
export interface DisplayProps {
    firebase: Firebase
}
 
export interface DisplayState {
    
}
 
class Display extends React.Component<DisplayProps, DisplayState> {
    constructor(props: DisplayProps) {
        super(props);
        this.state = {  };
    }
    render() { 
        return ( 
            <div>
                DISPLAY
            </div>
        );
    }
}
 
export default Display;