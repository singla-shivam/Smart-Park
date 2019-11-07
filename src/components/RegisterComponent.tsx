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


export interface RegisterState extends UserInterface {
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
            balance: 0,
            emailError: false,
            nameError: false,
            vehNoError: false,
            idError: false,
            phoneNoError: false
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
        if (prop == 'email') {
            this.validateEmail(target.value)
        }
        if (prop === 'name') {
            this.validateName(target.value)
        }
        if (prop === "vehNum") {
            this.validateVehNum(target.value)
        }
        if (prop === "id") {
            this.validateaadhar(target.value)
        }
        if (prop == 'phoneNo') {
            this.validateNumber(target.value)
        }
    }

    validateName(name: string) {
        if (name === '' || name === null) {
            this.setState({
                nameError: true
            })
        } else {
            this.setState({
                nameError: false,
                name: name
            })
        }
    }
    validateVehNum(name: string) {
        if (name === '' || name === null) {
            this.setState({
                vehNoError: true
            })
        } else {
            this.setState({
                vehNoError: false,
                vehNo: name
            })
        }
    }
    validateNumber(number: string) {
        const pattern = /^[0-9]*$/g;
        const result = pattern.test(number);
        if (result == true) {
            this.setState({
                phoneNoError: false,
                phoneNo: number
            })
        }
        else {
            this.setState({
                phoneNoError: true
            })
        }

    }
    validateaadhar(name: number) {
        if (name === null) {
            this.setState({
                idError: true
            })
        } else {
            this.setState({
                idError: false,
                id: name
            })
        }
    }

    async handleSubmit() {
        // TODO: validate fields
        console.log(this.state)

        if (this.state.nameError | this.state.vehNoError | this.state.idError | this.state.emailError | this.state.phoneNoError) {
            alert('Invalid Input')
        }
        else {
            await this.props.firebase.addData(`vehicles/${this.state.vehNo}`, this.state)
            if (this.props.uid) {
                localStorage.setItem('lanfklnasv', 'user')
                window.location.reload()
            }
            else {
                window.location.href = '/entry'
            }
        }
    }
    validateEmail(email) {
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(email);
        if (result === true) {
            this.setState({
                emailError: false,
                email: email
            })
        } else {
            this.setState({
                emailError: true
            })
        }
    }

    render() {
        if (this.props.Rval === false) {
            this.props.openRegister()
        }


        return (
            <div className="jumbotron" >
                <Form className="text-left">
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email
                        {this.state.emailError ? <i className="fa fa-close   text-danger "></i> : <i className="fa fa-check-circle-o" aria-hidden="true"></i>}
                        </Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="exampleEmail" onChange={this.handleChange} data-at='email' />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="name" sm={2}>Name
                        {this.state.nameError ? <i className="fa fa-close   text-danger "></i> : <i className="fa fa-check-circle-o" aria-hidden="true"></i>}

                        </Label>
                        <Col sm={10}>
                            <Input type="text" name="name" id="name" onChange={this.handleChange} data-at='name' />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="aadharNo" sm={2}>Aadhar No
                        {this.state.idError ? <i className="fa fa-close   text-danger "></i> : <i className="fa fa-check-circle-o" aria-hidden="true"></i>}

                        </Label>
                        <Col sm={10}>
                            <Input type="text" name="aadharNo" id="aadharNo" onChange={this.handleChange} data-at='id' />
                        </Col>
                    </FormGroup>

                    {!this.props.phoneNo ?
                        <FormGroup row>
                            <Label for="phoneNo" sm={2}>Mobile Number
                            {this.state.phoneNoError ? <i className="fa fa-close   text-danger "></i> : <i className="fa fa-check-circle-o" aria-hidden="true"></i>}

                            </Label>
                            <Col sm={10}>
                                <Input type="text" name="phoneNo" id="phoneNo" onChange={this.handleChange} data-at='phoneNo' />
                            </Col>
                        </FormGroup> :
                        <></>
                    }

                    <FormGroup row>
                        <Label for="vehicleNo" sm={2}>Vehicle No
                        {this.state.vehNoError ? <i className="fa fa-close   text-danger "></i> : <i className="fa fa-check-circle-o" aria-hidden="true"></i>}

                        </Label>
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