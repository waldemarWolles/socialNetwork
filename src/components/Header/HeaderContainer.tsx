import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { logoutThunk, getAuthUserPhotoThunk } from '../../reduxx/auth-reducer';
import { AppRootStateType } from '../../reduxx/redux-store';



type MapStatePropsType = {
    isAuth: boolean
    userId: number | null
    login: string | null
    authUserPhoto: string | null 
}

type MapDispatchPropsType = {
    getAuthUserPhotoThunk: (userId: number | null) => void
    logoutThunk: () => void
}


type PropsType = MapStatePropsType & MapDispatchPropsType 

class HeaderContainer extends React.Component<PropsType> {

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

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    login: state.auth.login,
    authUserPhoto: state.auth.authUserPhoto,
});



export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppRootStateType>(mapStateToProps, 
    {logoutThunk, getAuthUserPhotoThunk })(HeaderContainer);