import * as React from 'react'
import 'firebaseui/dist/firebaseui.css'
import * as firebaseui from 'firebaseui'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import Firebase from '../firebase';
import { UserInterface } from '../models/user';

export interface LoginProps {
    firebase: Firebase
}

export interface LoginState {

}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.bind()
        this.state = {};
    }

    bind() {
        this.onSuccess = this.onSuccess.bind(this)
    }

    componentDidMount() {
        const config: firebaseui.auth.Config = {
            signInOptions: [
                {
                    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                    defaultCountry: 'in',
                    recaptchaParameters: {
                        size: 'invisible'
                    }
                }
            ],
            callbacks: {
                signInSuccessWithAuthResult: this.onSuccess
            }
        }

        new firebaseui.auth.AuthUI(this.props.firebase.auth)
            .start('#authUi', config)
    }

    render() {
        return (
            <div id='authUi'>
            </div>
        );
    }

    onSuccess(authResult: any) {
        const user = authResult.user
        console.log(user)
        localStorage.setItem('jsadfkhewjdewbfdgqweu', user.uid)
        this.handleSuccess(user)
        return false
    }

    async handleSuccess(user: any) {
        const vehicle: UserInterface[] = await this.props.firebase.getData(`vehicles`, {
            fieldPath: 'phoneNo',
            opStr: '==',
            value: user.phoneNumber
        })
        localStorage.setItem('lanfklnasvph', user.phoneNumber)
        if(vehicle && vehicle[0].userType) {
            // vehicle already registered
            localStorage.setItem('lanfklnasv', user.userType)
            localStorage.setItem('lanfklnasvveh', user.vehNo)
            if(!vehicle[0].uid) {
                await this.props.firebase.database.doc(`vehicles/${vehicle[0].vehNo}`)
                    .update({
                        uid: user.uid
                    })
            }
            window.location.reload()
        }
        else {
            window.location.reload()
        }

    }
}

export default Login;