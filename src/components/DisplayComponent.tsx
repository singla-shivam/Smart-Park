import * as React from 'react';
export interface DisplayProps {
    
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