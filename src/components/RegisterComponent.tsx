import * as React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { UserInterface } from '../models/user';
import Firebase from '../firebase';

export interface RegisterProps {
    firebase: Firebase
    uid: string
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