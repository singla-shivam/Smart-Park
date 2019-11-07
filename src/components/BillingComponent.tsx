import * as React from 'react';
import { ListGroup, ListGroupItem, Col, Button } from 'reactstrap';
import Firebase from '../firebase';
import { NavLink } from 'react-router-dom';


export interface BillingProps {
    firebase: Firebase

}

export interface BillingState {
    baseFare: number
    dynamicFare: number
    days: number
}

class Billing extends React.Component<BillingProps, BillingState> {
    constructor(props: BillingProps) {
        super(props);
        this.state = {
            baseFare: 20,
            dynamicFare: 4,
            days: 2
        };
    }
    render() {
        return (
            <div className="jumbotron ">
                <h1 className="display-3">Bill</h1>
                <hr className="my-2" />
                <div className="row">
                    <Col sm={4}></Col>
                    <Col sm={4}>
                        <ListGroup>
                            <ListGroupItem>
                                <p>
                                    <strong>Base Fare -  </strong>{this.state.baseFare}
                                </p>
                            </ListGroupItem>
                            <ListGroupItem>
                                <p>
                                    <strong>Dynamic Fare -  </strong>{this.state.dynamicFare}
                                </p>
                            </ListGroupItem>
                            <ListGroupItem>
                                <p>
                                    <strong>Days  -  </strong>{this.state.days}
                                </p>
                            </ListGroupItem>
                            <ListGroupItem>
                                <p>
                                    <strong>Total Fare -  </strong>
                                    {this.state.baseFare + this.state.dynamicFare} <i className="fa fa-close"></i> {this.state.days} = {(this.state.baseFare + this.state.dynamicFare) * this.state.days}
                                </p>
                            </ListGroupItem>
                        </ListGroup>
                        </Col >
                        <Col sm={4}></Col>
                </div>
                <NavLink to="#"> <Button color="success">Complete Your Payment</Button></NavLink>
            </div>
        );
    }
}

export default Billing;