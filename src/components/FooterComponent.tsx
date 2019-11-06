import React from 'react';
import { Jumbotron } from "reactstrap";

export interface FooterProps {

}

export interface FooterState {

}

class Footer extends React.Component<FooterProps, FooterState> {
    constructor(props: FooterProps) {
        super(props);
        this.state = {};
    }
    render() {
        return ( 
            <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-3">Fluid jumbo heading</h1>
                    
                </div>
            </div>
        </>
                );
            }
        }
        
export default Footer;