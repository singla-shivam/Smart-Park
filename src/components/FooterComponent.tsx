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
                <Jumbotron >
                    <div className="text-center text-body">
                        <h3>Head Office</h3>
                        </div>
            </Jumbotron>
        </>
                );
            }
        }
        
export default Footer;