import * as React from 'react';

import Firebase from '../firebase';

import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';

export interface BookingProps {
    firebase: Firebase

}

export interface BookingState {
    [key: string]: any
    dDate: string
    dTime: string
    aDate: string
    aTime: string
    amount: Number
    amountReceived: Boolean
}

class Booking extends React.Component<BookingProps, BookingState> {
    constructor(props: BookingProps) {
        super(props);
        this.state = {

            dDate: '',
            aDate: "",
            dTime: "",
            aTime: "",
            amount: 0,
            amountReceived: false
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    confirmBooking(){
        this.setState({
            amount:0,
            amountReceived: false
        })
    }
    handleChange(event: any) {
        const target: any = event.target
        console.log(target.value)
        const prop: string = target.getAttribute('data-at')
        this.setState({
            [prop]: target.value
        })
    }

    async handleSubmit() {
        // TODO: validate fields
        console.log(this.state)
        this.setState({
            amountReceived: true,
            amount: 999
        })
        // change payment status accordingly

    }
    render() {
        const receiveForm = () => {
            return (
                <Form className="text-left">
                    <Row>
                        <Col sm={6}>
                            <Row><Label for="Departure" sm={6}>Departure</Label></Row>
                            <Row>
                                <FormGroup >
                                    <Label for="DepartureDate" sm={2}>Date</Label>
                                    <Col sm={12}>
                                        <Input type="date" name="DepartureDate" id="DepartureDate" placeholder="with a placeholder" onChange={this.handleChange} data-at="dDate" />
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="DepartureTime" sm={2}>Time</Label>
                                    <Col sm={12}>
                                        <Input type="time" name="DepartureTime" id="DepartureTime" placeholder="with a placeholder" onChange={this.handleChange} data-at="dTime" />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <Row><Label for="Arrival" sm={6}>Arrival</Label></Row>
                            <Row>
                                <FormGroup >
                                    <Label for="ArrivalDate" sm={2}>Date</Label>
                                    <Col sm={12}>
                                        <Input type="date" name="ArrivalDate" id="ArrivalDate" placeholder="with a placeholder" onChange={this.handleChange} data-at="aDate" />
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="ArrivalTime" sm={2}>Time</Label>
                                    <Col sm={12}>
                                        <Input type="time" name="ArrivalTime" id="ArrivalTime" placeholder="with a placeholder" onChange={this.handleChange} data-at="aTime" />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </Col>
                    </Row>

                    <Button onClick={this.handleSubmit}>Continue</Button>
                </Form>
            )
        }

        return ( 
            <div>
                {this.state.amountReceived? <div>
                    Your Amount {this.state.amount} <br/>
                    <Button color="success" onClick={()=>{this.confirmBooking()}}>Confirm Booking</Button>
                    </div> :
                    receiveForm()}
                
            </div>
         );
    }
}

export default Booking;