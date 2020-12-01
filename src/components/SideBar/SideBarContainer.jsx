import React from 'react';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import { getAuthUserPhotoThunk } from '../../reduxx/auth-reducer';


class SideBarContainer extends React.Component {


    componentDidMount = () => {
        this.props.getAuthUserPhotoThunk(this.props.userId);
    }

    render() {

        return (
            <SideBar {...this.props} />
        );
    }


}


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    login: state.auth.login,
    authUserPhoto: state.auth.authUserPhoto,

});

export default connect(mapStateToProps, {getAuthUserPhotoThunk})(SideBarContainer);