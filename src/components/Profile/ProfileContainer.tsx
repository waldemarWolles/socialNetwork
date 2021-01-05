import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
    getProfileThunk,
    getStatusThunk,
    updateStatusThunk,
    savePhotoThunk,
    saveProfileThunk,
    actionsProfileReducer,
} from '../../reduxx/profile-reducer';
import { withRouter, RouteComponentProps} from 'react-router-dom';
import { compose } from 'redux';
import { AppRootStateType } from '../../reduxx/redux-store';
import { PostsType, ProfileType } from '../../types/types';


type RouteComponentParamsProps = {
    userId: string
}

type OwnPropsType = {
    isOwner: boolean
}

type MapStatePropsType = {
    profile: ProfileType | any
    status: string
    authorizedUserId: number | null
    isAuth: boolean
    posts: Array<PostsType>
    errorMessage: string | null
}

type MapDispatchPropsType = {
    getProfileThunk: (userId: number) => void
    getStatusThunk: (userId: number) => void
    updateStatusThunk: (status: string) => void
    savePhotoThunk: (file: any) => void
    saveProfileThunk: (profile: ProfileType) => void
    addPost: (newPostText: string, newPostId: number) => void
    deletePost: (postID: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & RouteComponentProps<RouteComponentParamsProps>


class ProfileContainer extends React.Component<PropsType> {

    refreshProfile = () => {
        let userId: number | null = +this.props.match.params.userId;
     
        if (!userId) {
            userId = this.props.authorizedUserId;

            if (!userId) {
                this.props.history.push('/login');
            }
        }

        if(!userId) {
            console.error('UserID should exist!!!')
        } else {
            this.props.getProfileThunk(userId);
            this.props.getStatusThunk(userId);
        }
       
    }

    componentDidMount = () => {
        this.refreshProfile();
    }

    componentDidUpdate = (prevProps: PropsType, prevState: PropsType, snapshot: PropsType) => {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }

    }

    render() {
        return (
            <Profile {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatusThunk={this.props.updateStatusThunk}
                savePhotoThunk={this.props.savePhotoThunk}
                saveProfileThunk={this.props.saveProfileThunk}
                authorizedUserId={this.props.authorizedUserId}
                posts={this.props.posts}
                errorMessage={this.props.errorMessage}
            />
        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    posts: state.profilePage.posts,
    errorMessage: state.profilePage.errorMessage
});


export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppRootStateType>(mapStateToProps, {
        getProfileThunk,
        getStatusThunk,
        updateStatusThunk,
        savePhotoThunk,
        saveProfileThunk,
        addPost: actionsProfileReducer.addPost,
        deletePost: actionsProfileReducer.deletePost
    }),
    withRouter
)(ProfileContainer)
