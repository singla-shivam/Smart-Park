import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

export interface RegisterProps {
    openRegister: () => void,
    Rval: boolean
}

export interface RegisterState {

}


class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {};
    }
    render() {
        if (this.props.Rval==false)
        {
        this.props.openRegister()
    }

        return (
            <div className="jumbotron" >
                <Form className="text-left">
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label for="name">Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="name" id="name" placeholder="with a placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label for="aadharNo">Aadhar No</Label>
                        <Col sm={10}>
                            <Input type="text" name="aadharNo" id="aadharNo" placeholder="with a placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label for="vehicleNo">Vehicle No</Label>
                        <Col sm={10}>
                            <Input type="text" name="vehicleNo" id="vehicleNo" placeholder="with a placeholder" />
                        </Col>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default Register;