import * as React from 'react';

import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

import Firebase from '../firebase';
import { BookingInterface } from '../models/booking';


export interface ExitProps {
    firebase: Firebase
}

export interface ExitState {
    [key: string]: any
    vehNo: string
    paymentStatus: 'cash' | 'done'
    paymentAmount: number

}


class Exit extends React.Component<ExitProps, ExitState> {
    constructor(props: ExitProps) {
        super(props);
        this.state = {
            vehNo: '',
            paymentStatus: null,
            paymentAmount: null
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.doPayment = this.doPayment.bind(this)
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
        const bookings: BookingInterface[] = await this.props.firebase.getData(`booking`, {
            fieldPath: ['vehNo', 'actualCheckoutTime'],
            opStr: ['==', '=='],
            value: [this.state.vehNo, null]
        })

        const booking = bookings[0]
        console.log(booking)

        if(booking.paymentMode === 'online') {
            if(booking.actualCheckoutTime- booking.paymentTime <= 15 * 60 * 1000) {
                // all ok
                this.setState({
                    paymentStatus: 'done'
                })
            }
            else {
                // payment done long ago
                // fine vasoolo
            }
        }

        else {
            const timeDuration = booking.actualCheckoutTime - booking.arrivalTime
            const n = Math.ceil(timeDuration / (1000 * 60 * 60 * 24))
            let price = 0
    
            if(timeDuration > 12 * 60 * 60 * 1000) {
                // more than 12 hrs
                price = n * 200 * booking.dynamicCharges
            }
            else {
                price = n * 20 * booking.dynamicCharges
            }
            this.setState({
                paymentStatus: 'cash',
                paymentAmount: price
            })
        }

    }

    async doPayment() {
        const bookings: BookingInterface[] = await this.props.firebase.getData(`booking`, {
            fieldPath: ['vehNo', 'actualCheckoutTime'],
            opStr: ['==', '=='],
            value: [this.state.vehNo, null]
        })

        const booking = bookings[0]

        booking.actualCheckoutTime = Date.now()
        booking.paymentTime = booking.actualCheckoutTime
        booking.actualPrice = this.state.paymentAmount
        booking.paymentMode = 'cash'

        await this.props.firebase.database.collection(`booking`).doc(booking.id).set(booking, {
            merge: true
        })

        window.location.href = '/'

    }

    render() {
        const receiveForm = () => {
            return (
                <Form className="text-left">
                    <FormGroup row>
                        <Label for="vehicleNo" sm={2}>Vehicle No</Label>
                        <Col sm={10}>
                            <Input type="text" name="vehicleNo" id="vehicleNo" onChange={this.handleChange} data-at="vehNo" />
                        </Col>
                    </FormGroup>

                    <Button onClick={this.handleSubmit}>Submit</Button>
                </Form>
            )
        }

        const doPayment = () => {
            return (
                <div>
                    Receive cash of Rs. {this.state.paymentAmount}
                    <Button onClick={this.doPayment}>Submit</Button>
                </div>
            )
        }

        const paymentCheck=()=>{
            
            return (
                this.state.paymentStatus === 'done' ?
                    (<div>Your May GO</div>) :
                    (<>{doPayment()}</>)
            )
        }
        return (
            <div>
                {
                    this.state.paymentStatus === null ? (
                        <>
                        {receiveForm()}
                        </>
                    ) : <>
                    Welcome car {this.state.carNumber}
                    {paymentCheck()}
                    </>}
            </div>
        );
    }
}

export default Exit;