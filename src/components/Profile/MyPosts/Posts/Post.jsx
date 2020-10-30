import React from 'react';
import classes from './Post.module.css';
import UserImg from './../../../../images/sideBar/user.svg';


const Post = (props) => {
    return (
        <div className={classes.post}>
            <div className={classes.post__item}>
                <img className={classes.img} src={UserImg} alt="" /> 
                <h3 className={classes.name}>User Name</h3>
            </div>
            <div>
                 <p>{props.message}</p>
                 likesCount {props.likesCount}
            </div>
        </div>
    );

}


export default Post;