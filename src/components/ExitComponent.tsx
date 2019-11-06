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
    paymentStatus: boolean

}


class Exit extends React.Component<ExitProps, ExitState> {
    constructor(props: ExitProps) {
        super(props);
        this.state = {
            vehNo: '',
            paymentStatus: false
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
            fieldPath: ['vehNo', 'paymentMode'],
            opStr: ['==', '=='],
            value: [this.state.vehNo, null]
        })
        // const booking: BookingInterface[] = await this.props.firebase.getData(`booking`, {
        //     fieldPath: ['vehNo'],
        //     opStr: ['=='],
        //     value: [this.state.vehNo]
        // })

        const booking = bookings[0]
        console.log(booking)

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
        const paymentCheck=()=>{
            
            return (
                this.state.paymentStatus ? (<div>Your May GO</div>): (<div>Complete Your Payment</div>) 
            )
        }
        return (
            <div>
                {
                    true ? (
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