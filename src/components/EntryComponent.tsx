import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import Firebase from '../firebase';
import { UserInterface } from '../models/user';
import { SlotInterface } from '../models/slot';
import { BookingInterface } from '../models/booking';

export interface EntryProps {
    firebase: Firebase
}

export interface EntryState {
    vehNo: string
    depDate: string
    depTime: string
    booked: {slot: string}
    [key: string]: any
}
class Entry extends React.Component<EntryProps, EntryState> {

    constructor(props: EntryProps) {
        super(props);
        this.bind()
        this.state = {
            vehNo: '',
            depDate: '',
            depTime: '',
            booked: null
        };
    }
    
    bind() {
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event: any) {
        const target: any = event.target
        const prop: string = target.getAttribute('data-at')
        this.setState({
            [prop]: target.value
        })
    }

    async onSubmit() {
        const vehicle: UserInterface[] = await this.props.firebase.getData(`vehicles`, {
            fieldPath: 'vehNo',
            opStr: '==',
            value: this.state.vehNo
        })

        if(!vehicle) {
            window.location.href = '/register'
        }
        
        const slots: SlotInterface[] = await this.props.firebase.getData(`slots`, {
            fieldPath: 'booked',
            opStr: '==',
            value: false
        })

        console.log(slots)

        // TODO: fix timezone
        const arrivalTimeStamp = Date.now()
        console.log(arrivalTimeStamp)
        let depDate = null
        const hrs = parseInt(this.state.depTime.trim().substr(0, 2))
        const mins = parseInt(this.state.depTime.trim().substr(3, 2))
        depDate = (hrs * 60 + mins) * 60 * 1000 + Date.parse(this.state.depDate)
        console.log(depDate, depDate - arrivalTimeStamp)

        const slotInfo: any = await this.props.firebase.getData(`info/slots`)

        console.log(slotInfo)

        const occupancy: number = (slotInfo[0].total - slotInfo[0].empty) / slotInfo[0].total

        console.log(occupancy)
        

        // TODO: calculate slot

        const slot = 'A01'

        const booking: BookingInterface = {
            dynamicCharges: 1 - 2 * occupancy,
            uid: vehicle[0].uid,
            vehNo: this.state.vehNo,
            slot: slot,
            arrivalTime: arrivalTimeStamp,
            expectedCheckoutTime: depDate,
            actualCheckoutTime: null,
            actualPrice: null,
            paymentMode: null
        }

        await this.props.firebase.addData(`booking`, booking)
        this.setState({
            booked: {slot: slot}
        })
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
                            <Label for="dDate" sm={2}>Departure Date</Label>
                            <Col sm={10}>
                                <Input type="date" name="dDate" id="dDate" onChange={this.handleChange} data-at='depDate'/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="dTime" sm={2}>Departure Time</Label>
                            <Col sm={10}>
                                <Input type="time" name="dTime" id="dTime" onChange={this.handleChange} data-at='depTime'/>
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
                    this.state.booked != null ? (
                        <div>
                            <h1 className="display-4">Thank You for using our service<br />Your slot is -{this.state.booked.slot}</h1>
                        </div>
                    ) : bookingForm()
                }
            </>
        );
    }
}

export default Entry;