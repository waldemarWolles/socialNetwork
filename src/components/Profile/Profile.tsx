import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import { PostsType, ProfileType } from '../../types/types';

type PropsType = {
    status: string
    authorizedUserId: number | null
    isAuth: boolean
    posts: Array<PostsType> 
    profile: ProfileType | any
    isOwner: boolean
    errorMessage: string | null

    getProfileThunk: (userId: number) => void
    getStatusThunk: (userId: number) => void
    updateStatusThunk: (status: string) => void
    savePhotoThunk: (file: any) => void
    saveProfileThunk: (profile: ProfileType) => void
    addPost: (newPostText: string, newPostId: number) => void
    deletePost: (postID: number) => void
  
}

const Profile: React.FC<PropsType> = (props) => {
    return <div className={classes.profile} >

        <ProfileInfo {...props}
            isOwner={props.isOwner}
            profile={props.profile}
            status={props.status}
            authorizedUserId={props.authorizedUserId}
            updateStatusThunk={props.updateStatusThunk}
            saveProfileThunk={props.saveProfileThunk}
            savePhotoThunk={props.savePhotoThunk}
            errorMessage={props.errorMessage}
            
         />
        <MyPosts {...props}/>


    </div>

}


export default Profile;