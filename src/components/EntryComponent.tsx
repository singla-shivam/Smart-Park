import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import Firebase from '../firebase';
import { UserInterface } from '../models/user';

export interface EntryProps {
    firebase: Firebase
}

export interface EntryState {
    vehNo: string
    dep: number
    [key: string]: any
}
let booked: any = null
class Entry extends React.Component<EntryProps, EntryState> {
    constructor(props: EntryProps) {
        super(props);
        this.bind()
        this.state = {
            vehNo: '',
            dep: null
        };
    }
    
    bind() {
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event: any) {
        const target: any = event.target
        console.log(target.value)
        const prop: string = target.getAttribute('data-at')
        this.setState({
            [prop]: target.value
        })
    }

    async onSubmit() {
        console.log(this.state)
        const vehicle: UserInterface[] = await this.props.firebase.getData(`vehicles`, {
            fieldPath: 'vehNo',
            opStr: '==',
            value: this.state.vehNo
        })
        console.log(vehicle)
        if(!vehicle) {
            window.location.href = '/register'
        }
    }

    render() {
        const bookingForm = () => {
            return (
                <>
                    <Form className="text-left">
                        <FormGroup row>
                            <Label for="vehicleNo" sm={2}>Vehicle No</Label>
                            <Col sm={10}>
                                <Input type="text" name="vehicleNo" id="vehicleNo" onChange={this.handleChange} data-at='vehNo'/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="dDate" sm={2}>Departure Time</Label>
                            <Col sm={10}>
                                <Input type="datetime-local" name="dDate" id="dDate" onChange={this.handleChange} data-at='dep'/>
                            </Col>
                        </FormGroup>

                        <Button onClick={this.onSubmit}>Submit</Button>
                    </Form>
                </>
            )
        }


        return (
            <>
                {
                    booked != null ? (
                        <div>
                            <h1 className="display-4">Thank You for using our service<br />Your slot is -{booked.slot}</h1>
                        </div>
                    ) : bookingForm()
                }
            </>
        );
    }
}

export default Entry;