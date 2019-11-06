import * as React from 'react';
import { UserInterface } from '../models/user';
import Firebase from '../firebase';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

export interface RegisterProps {
    firebase: Firebase
    uid: string
    openRegister: () => void,
    Rval: boolean
}


export interface RegisterState  extends UserInterface{
}


class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.bind()
        this.state = {
            email: '',
            phoneNo: '',
            uid: '',
            vehNo: '',
            userType: 'user',
            name: '',
            id: null,
            balance: 0
        }
    }

    bind() {
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event: Event) {
        const target: any = event.target
        console.log(target.value)
        const prop: string = target.getAttribute('data-at')
        this.setState({
            [prop]: target.value
        })
    }

    handleSubmit() {
        console.log(this.props.firebase)
        this.props.firebase.addData(`vehicles/${this.state.vehNo}`, this.state)
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