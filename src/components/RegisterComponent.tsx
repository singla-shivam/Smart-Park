import * as React from 'react';
import { UserInterface } from '../models/user';
import Firebase from '../firebase';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

export interface RegisterProps {
    firebase: Firebase
    uid: string
    phoneNo: string
    openRegister?: () => void,
    Rval?: boolean
}


export interface RegisterState  extends UserInterface{
}


class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.bind()
        this.state = {
            email: '', // -
            phoneNo: this.props.phoneNo,
            uid: this.props.uid,
            vehNo: '', // -
            userType: 'user',
            name: '', // -
            id: null, // - 
            balance: 0
        }
    }

    bind() {
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
        await this.props.firebase.addData(`vehicles/${this.state.vehNo}`, this.state)
        if(this.props.uid) {
            localStorage.setItem('lanfklnasv', 'user')
            window.location.reload()
        }
        else {
            window.location.href = '/entry'
        }
    }

    render() {
        if (this.props.Rval === false)
        {
        this.props.openRegister()
    }

        return (
            <div className="jumbotron" >
                <Form className="text-left">
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="exampleEmail" onChange={this.handleChange} data-at='email' />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="name" sm={2}>Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="name" id="name" onChange={this.handleChange} data-at='name' />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="aadharNo" sm={2}>Aadhar No</Label>
                        <Col sm={10}>
                            <Input type="text" name="aadharNo" id="aadharNo" onChange={this.handleChange} data-at='id' />
                        </Col>
                    </FormGroup>

                    {!this.props.phoneNo ? 
                        <FormGroup row>
                        <Label for="phoneNo" sm={2}>Mobile Number</Label>
                            <Col sm={10}>
                                <Input type="text" name="phoneNo" id="phoneNo" onChange={this.handleChange} data-at='phoneNo' />
                            </Col>
                        </FormGroup> :
                        <></>
                    }

                    <FormGroup row>
                    <Label for="vehicleNo" sm={2}>Vehicle No</Label>
                        <Col sm={10}>
                            <Input type="text" name="vehicleNo" id="vehicleNo" onChange={this.handleChange} data-at='vehNo' />
                        </Col>
                    </FormGroup>

                    <Button onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default Register;