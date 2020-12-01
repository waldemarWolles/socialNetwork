import React from 'react';
import classes from './SideBar.module.css';
import UserImg from '../../images/sideBar/user.svg';
import { ReactComponent as FriendsImg } from '../../images/sideBar/friends.svg';
import { ReactComponent as MessangerImg } from '../../images/sideBar/messanger.svg';
import { ReactComponent as VideoImg } from '../../images/sideBar/videos.svg';
import { ReactComponent as EventsImg } from '../../images/sideBar/events.svg';
import { ReactComponent as MemoriesImg } from '../../images/sideBar/memories.svg';
import { ReactComponent as SavedImg } from '../../images/sideBar/saved.svg';
import { ReactComponent as PagesImg } from '../../images/sideBar/pages.svg';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const SideBar = (props) => {

    let userPhoto = props.authUserPhoto;

    return <div className={classes.sideBar} id={classes.pageSideBar}>
        {props.isAuth 
        ? <div className={classes.item}>
            <NavLink to="/profile" ><img className={cn(classes.img, classes.auth_user)} src={userPhoto} alt="" /> <h3>{props.login}</h3></NavLink>
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
        <div className={classes.item}>
            <NavLink to="/events"><EventsImg className={classes.img} /><h3>Events</h3></NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/memories"><MemoriesImg className={classes.img} /><h3>Memories</h3></NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/saved"><SavedImg className={classes.img} /><h3>Saved</h3></NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/pages"><PagesImg className={classes.img} /><h3>Pages</h3></NavLink>
        </div>

    </div>

}


export default SideBar;