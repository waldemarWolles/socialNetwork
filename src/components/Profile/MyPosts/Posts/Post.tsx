import React from 'react';
import classes from './Post.module.css';
import UserImg from './../../../../images/sideBar/user.svg';
import { useState } from 'react';
import { ReactComponent as LikesCountImg } from './../../../../images/like.svg';
import { ProfileType } from '../../../../types/types';

type PropsType = {
    likesCount: number
    message: string
    profile: ProfileType | null
    deletePost: (postID: number) => void
    id: number
}


const Post: React.FC<PropsType> = (props) => {

    let [likesCount, setLikesCount] = useState(props.likesCount);

    let userPhoto = UserImg;
    if (props.profile) {
        if (props.profile.photos.small) userPhoto = props.profile.photos.small;
    }

    const onSetLikesCount = (event: React.MouseEvent) => {
        event.preventDefault()
        setLikesCount(likesCount + 1)
    }

    const onDeletePost = (event: React.MouseEvent) => {
        event.preventDefault()
        props.deletePost(props.id)
    }



    return (
        <div className={classes.post}>
            <div className={classes.post__item}>
                <div className={classes.post___content}>
                    <img className={classes.img} src={userPhoto} alt="" />
                    {props.profile && <h3 className={classes.name}>{props.profile.fullName}</h3>}
                </div>
                <button className={classes.delete_button} onClick={onDeletePost}>DELETE</button>
            </div>
            <div>
                <p className={classes.post_message}>{props.message}</p>

                <div className={classes.likes_container}>
                    <div >
                        <LikesCountImg
                            className={`${classes.likes} ${(likesCount > 0) && classes.liked}`}
                            onClick={(event) => onSetLikesCount(event)}
                        />
                    </div>
                    <b> {likesCount}</b>
                </div>
            </div>
        </div>
    );

}


export default Post;