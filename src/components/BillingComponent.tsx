import * as React from 'react';
import { ListGroup, ListGroupItem, Col, Button } from 'reactstrap';
import Firebase from '../firebase';
import { NavLink } from 'react-router-dom';
import { BookingInterface } from '../models/booking';


export interface BillingProps {
    firebase: Firebase
    booking?: BookingInterface

}

export interface BillingState {
}

class Billing extends React.Component<BillingProps, BillingState> {
    constructor(props: BillingProps) {
        super(props);
        this.state = {
        };
    }
    render() {
        const {expectedCheckoutTime, arrivalTime, dynamicCharges} = this.props.booking
        const timeDuration = expectedCheckoutTime - arrivalTime
        const baseFare = timeDuration > 4 * 60 * 60 * 1000 ? 200 : 20
        const n = Math.ceil(timeDuration / (1000 * 60 * 60 * 24))
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
                                    <strong>Base Fare - </strong>{baseFare}/{baseFare === 20 ? <>Hours</> : <>Days</>}
                                </p>
                            </ListGroupItem>
                            <ListGroupItem>
                                <p>
                                    <strong>Dynamic Fare -  </strong>{dynamicCharges}
                                </p>
                            </ListGroupItem>
                            <ListGroupItem>
                                <p>
                                    <strong>{baseFare === 20 ? <>Hours</> : <>Days</>} - </strong>{n}
                                </p>
                            </ListGroupItem>
                            <ListGroupItem>
                                <p>
                                    <strong>Total Fare -  </strong>
                                    {baseFare + dynamicCharges} <i className="fa fa-close"></i> {n} = {(baseFare + dynamicCharges) * n}
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