import * as React from 'react'
import 'firebaseui/dist/firebaseui.css'
import * as firebaseui from 'firebaseui'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import Firebase from '../firebase';

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
        localStorage.setItem('jsadfkhewjdewbfdgqweu', user.uid)
        window.location.reload()
        return false
    }
}

export default Login;