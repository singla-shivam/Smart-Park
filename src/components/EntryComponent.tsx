import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

export interface EntryProps {

}

export interface EntryState {

}
let booked: any = null
class Entry extends React.Component<EntryProps, EntryState> {
    constructor(props: EntryProps) {
        super(props);
        this.state = {};
    }
    render() {
        const bookingForm = () => {
            return (
                <>
                    <Form className="text-left">
                        <FormGroup row>
                            <Label for="vehicleNo" sm={2}>Vehicle No</Label>
                            <Col sm={10}>
                                <Input type="text" name="vehicleNo" id="vehicleNo" placeholder="with a placeholder" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="dDate" sm={2}>Departure Time</Label>
                            <Col sm={10}>
                                <Input type="time" name="dDate" id="dDate" placeholder="with a placeholder" />
                            </Col>
                        </FormGroup>

                        <Button>Submit</Button>
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