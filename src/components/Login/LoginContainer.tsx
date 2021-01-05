import React from 'react';
import { connect } from 'react-redux';
import { loginThunk } from '../../reduxx/auth-reducer';
import { AppRootStateType } from '../../reduxx/redux-store';
import Login from './Login';


type OwnPropsType = {}

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
    errorMessage: string | null
}
type MapDispatchPropsType = {
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class LoginContainer extends React.Component<PropsType> {

    render() {
        return <Login
            captchaUrl={this.props.captchaUrl}
            isAuth={this.props.isAuth}
            loginThunk={this.props.loginThunk}
            errorMessage={this.props.errorMessage}
             />
    }

}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth,
    errorMessage: state.auth.errorMessage
})


export default connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppRootStateType>(
    mapStateToProps, { loginThunk })(LoginContainer);