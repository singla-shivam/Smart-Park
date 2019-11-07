import * as React from 'react';

import Firebase from '../firebase';

import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { UserInterface } from '../models/user';
import { BookingInterface } from '../models/booking';
import { SlotInterface } from '../models/slot';
import {getSlot} from './../utitlites'

export interface BookingProps {
    firebase: Firebase

}

export interface BookingState {
    [key: string]: any
    dDate: string
    dTime: string
    aDate: string
    aTime: string
    expectedPaymentAmount: Number
}

class Booking extends React.Component<BookingProps, BookingState> {
    private booking: BookingInterface
    constructor(props: BookingProps) {
        super(props);
        this.state = {
            dDate: '',
            aDate: "",
            dTime: "",
            aTime: "",
            expectedPaymentAmount: null,
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async confirmBooking(){
        await this.props.firebase.addData(`booking`, this.booking)
        await this.props.firebase.database.collection('slots')
            .doc(this.booking.slot).update({
                booked: true,
                occupied: true,
                uid: this.booking.vehNo
            })
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
        const vehNo = localStorage.getItem('lanfklnasvveh')
        const vehicle: UserInterface[] = await this.props.firebase.getData(`vehicles`, {
            fieldPath: 'vehNo',
            opStr: '==',
            value: vehNo
        })

        const slots: SlotInterface[] =  await this.props.firebase.getData(`slots`, {
            fieldPath: 'booked',
            opStr: '==',
            value: false
        })

        console.log(slots)

        const slotInfo: any = await this.props.firebase.getData(`info/slots`)
        const emptiness: number = slotInfo[0].empty / slotInfo[0].total

        let arrivalTimeStamp, depDate
        let hrs = parseInt(this.state.aTime.trim().substr(0, 2))
        let mins = parseInt(this.state.aTime.trim().substr(3, 2))
        arrivalTimeStamp = (hrs * 60 + mins) * 60 * 1000 + Date.parse(this.state.aDate)

        hrs = parseInt(this.state.dTime.trim().substr(0, 2))
        mins = parseInt(this.state.dDate.trim().substr(3, 2))
        depDate = (hrs * 60 + mins) * 60 * 1000 + Date.parse(this.state.dDate)

        this.booking = {
            dynamicCharges: emptiness < 0.5 ? 1 - 2 * emptiness : 0,
            uid: vehicle[0].uid,
            vehNo: vehNo,
            slot: null,
            arrivalTime: arrivalTimeStamp,
            expectedCheckoutTime: depDate,
            actualCheckoutTime: null,
            actualPrice: null,
            paymentMode: null,
            paymentTime: null,
            id: '???'
        }


        const timeDuration = this.booking.expectedCheckoutTime - this.booking.arrivalTime
        const n = Math.ceil(timeDuration / (1000 * 60 * 60 * 24))
        let price = 0

        if(timeDuration > 4 * 60 * 60 * 1000) {
            // more than 12 hrs
            price = Math.ceil(n * 100 * (1 + this.booking.dynamicCharges))
        }
        else {
            price = Math.ceil(n * 20 * (1 + this.booking.dynamicCharges))
        }

        // calculate slot
        let slot = getSlot(slots, timeDuration)

        this.booking.slot = slot

        this.setState({
            expectedPaymentAmount: price
        })

    }

    render() {
        const receiveForm = () => {
            return (
                <Form className="text-left">
                    <Row>
                        <Col sm={6}>
                            <Row><Label for="Arrival" sm={6}>Arrival</Label></Row>
                            <Row>
                                <FormGroup >
                                    <Label for="ArrivalDate" sm={2}>Date</Label>
                                    <Col sm={12}>
                                        <Input type="date" name="ArrivalDate" id="ArrivalDate" onChange={this.handleChange} data-at="aDate" />
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="ArrivalTime" sm={2}>Time</Label>
                                    <Col sm={12}>
                                        <Input type="time" name="ArrivalTime" id="ArrivalTime" onChange={this.handleChange} data-at="aTime" />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <Row><Label for="Departure" sm={6}>Departure</Label></Row>
                            <Row>
                                <FormGroup >
                                    <Label for="DepartureDate" sm={2}>Date</Label>
                                    <Col sm={12}>
                                        <Input type="date" name="DepartureDate" id="DepartureDate" onChange={this.handleChange} data-at="dDate" />
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="DepartureTime" sm={2}>Time</Label>
                                    <Col sm={12}>
                                        <Input type="time" name="DepartureTime" id="DepartureTime" onChange={this.handleChange} data-at="dTime" />
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
                {
                    this.state.expectedPaymentAmount !== null ? <div>
                        Your Amount {this.state.expectedPaymentAmount} <br/>
                    <Button color="success" onClick={()=>{this.confirmBooking()}}>Confirm Booking</Button>
                    </div> :
                    receiveForm()
                    }
                
            </div>
         );
    }
}

export default Booking;