import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { logoutThunk, getAuthUserPhotoThunk } from '../../reduxx/auth-reducer';

class HeaderContainer extends React.Component {


    componentDidMount = () => {
        this.props.getAuthUserPhotoThunk(this.props.userId);
        console.log('header_render_didMount');

    }

    componentDidUpdate = () => {
        this.props.getAuthUserPhotoThunk(this.props.userId);
        console.log('header_render_didupdate');
    }


    render() {
        return (
            <Header {...this.props} authUserPhoto={this.props.authUserPhoto} />
        );
    }

}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    login: state.auth.login,
    authUserPhoto: state.auth.authUserPhoto,
});



export default connect(mapStateToProps, { logoutThunk, getAuthUserPhotoThunk })(HeaderContainer);