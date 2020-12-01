import React from 'react';
import classes from './Post.module.css';
import UserImg from './../../../../images/sideBar/user.svg';
import { useState } from 'react';
import { ReactComponent as LikesCountImg } from './../../../../images/like.svg';


const Post = (props) => {

    let [likesCount, setLikesCount] = useState(props.likesCount);

    let userPhoto = UserImg;
    if (props.profile.photos.small) {
        userPhoto = props.profile.photos.small;
    }


    return (
        <div className={classes.post}>
            <div className={classes.post__item}>
                <img className={classes.img} src={userPhoto} alt="" />
                <h3 className={classes.name}>{props.profile.fullName}</h3>
            </div>
            <div>
                <p className={classes.post_message}>{props.message}</p>

                <div className={classes.likes_container}>
                   <div >
                   <LikesCountImg
                        className={`${classes.likes} ${(likesCount > 0) && classes.liked}`} 
                        onClick={() => {setLikesCount(likesCount + 1)}}
                        src={LikesCountImg} alt="" />
                   </div>
                     <b> {likesCount}</b>
                </div>
            </div>
        </div>
    );

}


export default Post;