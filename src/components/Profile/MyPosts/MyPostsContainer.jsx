import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../reduxx/profile-reducer';
import MyPosts from './MyPosts';




const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText))
        },

        updateNewPostText: (text) => {
            dispatch(updateNewPostTextActionCreator(text))
        }
    } 
}


export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);