import React from 'react';
import { connect } from 'react-redux';
import { loginThunk } from '../../reduxx/auth-reducer';
import Login from './Login';


class LoginContainer extends React.Component {

    render() {
        return <Login
            captchaUrl={this.props.captchaUrl}
            isAuth={this.props.isAuth}
            loginThunk={this.props.loginThunk} />
    }

}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, { loginThunk })(LoginContainer);