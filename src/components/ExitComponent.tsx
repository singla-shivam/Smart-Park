import * as React from 'react';
import Firebase from '../firebase';
export interface ExitProps {
    firebase: Firebase
}
 
export interface ExitState {
    
}
 
class Exit extends React.Component<ExitProps, ExitState> {
    constructor(props: ExitProps) {
        super(props);
        this.state = {  };
    }
    render() { 
        return ( 
            <div>
                Exit
            </div>
         );
    }
}
 
export default Exit;