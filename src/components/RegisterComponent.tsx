import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export interface RegisterProps {

}

export interface RegisterState {

}


class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="container" >
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="aadharNo">Aadhar No.</Label>
                        <Input type="text" name="aadharNo" id="aadharNo" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="vehicleNumber">Vehicle Number </Label>
                        <Input type="text" name="vehicleNumber" id="vehicleNumber" />
                    </FormGroup>
                    
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default Register;