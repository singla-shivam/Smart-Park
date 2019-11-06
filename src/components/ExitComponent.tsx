import * as React from 'react';

import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

import Firebase from '../firebase';


export interface ExitProps {
    firebase: Firebase
}

export interface ExitState {
    [key: string]: any
    carNumberReceived: Boolean
    carNumber: string
    paymentStatus: boolean

}


class Exit extends React.Component<ExitProps, ExitState> {
    constructor(props: ExitProps) {
        super(props);
        this.state = {
            carNumber: '',
            carNumberReceived: false,
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
        this.setState({
            carNumberReceived: true,
            paymentStatus: false
        })
        // change payment status accordingly

    }
    render() {
        const receiveForm = () => {
            return (
                <Form className="text-left">
                    <FormGroup row>
                        <Label for="vehicleNo" sm={2}>Vehicle No</Label>
                        <Col sm={10}>
                            <Input type="text" name="vehicleNo" id="vehicleNo" placeholder="with a placeholder" onChange={this.handleChange} data-at="carNumber" />
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
                    this.state.carNumberReceived==false ? (
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