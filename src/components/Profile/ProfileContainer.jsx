import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
    getProfileThunk,
    getStatusThunk,
    updateStatusThunk,
    savePhotoThunk,
    saveProfileThunk,
    addPost,
    updateNewPostText
} from '../../reduxx/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';



class ProfileContainer extends React.Component {

    refreshProfile = () => {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;

            if(!userId) {
                this.props.history.push('/login');
            }
        }

        this.props.getProfileThunk(userId);
        this.props.getStatusThunk(userId);
    }

    componentDidMount = () => {
        this.refreshProfile();
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
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
                newPostText={this.props.newPostText}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,

});


export default compose(
    connect(mapStateToProps, { 
        getProfileThunk, 
        getStatusThunk, 
        updateStatusThunk, 
        savePhotoThunk, 
        saveProfileThunk, 
        addPost, 
        updateNewPostText }),
    withRouter
)(ProfileContainer)
