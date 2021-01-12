import React from 'react';
import { connect } from 'react-redux';
import {SideBar} from './SideBar';
import { getAuthUserPhotoThunk } from '../../reduxx/auth-reducer';
import { AppRootStateType } from '../../reduxx/redux-store';


type MapStatePropsType = {
    isAuth: boolean
    userId: number | null
    login: string | null
    authUserPhoto: string | null 
}

type MapDispatchPropsType = {
    getAuthUserPhotoThunk: (userId: number | null) => void
}

// type OwnPropsType = {
    
// }

type PropsType = MapStatePropsType & MapDispatchPropsType 

class SideBarContainer extends React.Component<PropsType> {


    componentDidMount = () => {
        this.props.getAuthUserPhotoThunk(this.props.userId);
    }
    render() {

        return (
            <SideBar {...this.props} />
        );
    }
}


const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    login: state.auth.login,
    authUserPhoto: state.auth.authUserPhoto,

});

 connect<MapStatePropsType,MapDispatchPropsType,unknown,AppRootStateType>(
    mapStateToProps, {getAuthUserPhotoThunk})(SideBarContainer);