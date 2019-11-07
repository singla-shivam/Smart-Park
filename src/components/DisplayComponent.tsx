import * as React from 'react';
import Firebase from '../firebase';

import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { SlotInterface } from '../models/slot';

export interface DisplayProps {
    firebase: Firebase
}

export interface DisplayState {
    [key: string]: any
    carNumberReceived: Boolean
    vehNo: string
    available: Boolean
}

class Display extends React.Component<DisplayProps, DisplayState> {
    constructor(props: DisplayProps) {
        super(props);
        this.state = {
            vehNo: '',
            carNumberReceived: false,
            available: false
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
        this.setState({
            carNumberReceived: true,
            available: false
        })
        // change payment status accordingly
        const bookings: SlotInterface[] = await this.props.firebase.getData(`slots`, {
            fieldPath: ['uid'],
            opStr: ['=='],
            value: [this.state.vehNo]
        })
        
        this.setState({
            available: bookings ? true : false
        })

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
        const availabilityCheck = () => {

            return (
                this.state.available ? (<div>IT'S AVAILABLE</div>) : (<div>NOT AVAILABLE</div>)
            )
        }
        return (
            <div>
                {
                    this.state.carNumberReceived == false ? (
                        <>
                            {receiveForm()}
                        </>
                    ) : <>
                            Welcome car {this.state.carNumber}
                            {availabilityCheck()}
                        </>}
            </div>
        );
    }
}


export default Display;