import React from 'react';
import classes from './SideBar.module.css';
import UserImg from '../../images/sideBar/user.svg';
import { ReactComponent as FriendsImg } from '../../images/sideBar/friends.svg';
import { ReactComponent as MessangerImg } from '../../images/sideBar/messanger.svg';
import { ReactComponent as VideoImg } from '../../images/sideBar/videos.svg';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type PropsType = {
    authUserPhoto: string | null
    login: string | null
    isAuth: boolean
}

const SideBar: React.FC<PropsType> = ({ authUserPhoto, isAuth, login }) => {
   
    let userPhoto = UserImg;
    if(authUserPhoto){
    userPhoto = authUserPhoto;
    }

    return <div className={classes.sideBar} id={classes.pageSideBar}>
        {isAuth
            ? <div className={classes.item}>
                <NavLink to="/profile" >
                    <img className={cn(classes.img, classes.auth_user)} src={userPhoto} alt="" /> <h3>{login}</h3>
                </NavLink>
            </div>
            : <div className={classes.item}>
                <NavLink to="/profile" ><img className={classes.img} src={UserImg} alt="" /> <h3>User Name</h3></NavLink>
            </div>
        }
        <div className={classes.item}>
            <NavLink to="/friends"><FriendsImg className={classes.img} /><h3>Friends</h3></NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/users"><FriendsImg className={classes.img} /><h3>Users</h3></NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/messages"><MessangerImg className={classes.img} /><h3>Messages</h3></NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/videos"><VideoImg className={classes.img} /><h3>Videos</h3></NavLink>
        </div>

    </div>

}


export default SideBar;