import React from 'react';
import { connect } from 'react-redux';
import {
    addPostActionCreator,
    updateNewPostTextActionCreator,
    addPost,
    updateNewPostText
} from '../../../reduxx/profile-reducer';
import MyPosts from './MyPosts';


class MyPostsContainer extends React.Component {

   
    render () {
        return (
            <MyPosts profile={this.props.profile}
                posts={this.props.posts}
                newPostText={this.props.newPostText}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    } 
}


export default
    connect(mapStateToProps, {addPost, updateNewPostText})(MyPostsContainer);