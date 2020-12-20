import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';



const Profile = (props) => {
    return <div className={classes.profile} >

        <ProfileInfo
            saveProfileThunk={props.saveProfileThunk}
            savePhotoThunk={props.savePhotoThunk}
            isOwner={props.isOwner}
            profile={props.profile}
            status={props.status}
            updateStatusThunk={props.updateStatusThunk}
            authorizedUserId={props.authorizedUserId}
         />
        <MyPosts 
        posts={props.posts}
        newPostText={props.newPostText}
        profile={props.profile} 
        addPost={props.addPost}
        updateNewPostText={props.updateNewPostText}
        authorizedUserId={props.authorizedUserId}
        />


    </div>

}


export default Profile;