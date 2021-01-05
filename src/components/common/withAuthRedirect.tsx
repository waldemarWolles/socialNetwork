import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppRootStateType } from '../../reduxx/redux-store';


type MapStatePropsType = ReturnType<typeof mapStateToProps>


const mapStateToProps = (state: AppRootStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    

    const RedirectComponent: React.FC<MapStatePropsType> = (props) => {
        let {isAuth, ...restProps} = props

        if (!props.isAuth) return <Redirect to='/login' />
        return <WrappedComponent {...restProps as WCP} />
    }



    return connect<MapStatePropsType, unknown, WCP, AppRootStateType>(mapStateToProps)(RedirectComponent)
}

