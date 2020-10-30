/* eslint-disable import/first */
import React from 'react';
import classes from './Header.module.css';
import { ReactComponent as HomeImg } from '../../images/headerNav/home.svg';
import { ReactComponent as FriendsImg } from '../../images/headerNav/friends.svg';
import { ReactComponent as VideosImg } from '../../images/headerNav/videos.svg';
import { ReactComponent as GroupsImg } from '../../images/headerNav/groups.svg';
import { ReactComponent as GamesImg } from '../../images/headerNav/games.svg';;
import { ReactComponent as Logo } from '../../images/Logo.svg';
// import {ReactComponent as CreateImg} from '../../images/headerOptions/create.svg';
// import {ReactComponent as MessengerImg} from '../../images/headerOptions/messenger.svg';
// import {ReactComponent as NotificationsImg} from '../../images/headerOptions/notification.svg';
// import {ReactComponent as AccountImg} from '../../images/headerOptions/account.svg';
import { ReactComponent as UserImg } from '../../images/sideBar/user.svg';
import { ReactComponent as LockImg } from '../../images/headerOptions/lock.svg';
import { NavLink } from 'react-router-dom';


const Header = (props) => {

    return <header className={classes.header} id={classes.pageHeader}>
        <div className={classes.search}>
            <div className={classes.search_item}>
                <NavLink to="/profile" > <Logo className={`${classes.img} ${classes.logo}`} /></NavLink>
            </div>
            <div className={classes.search_item}>
                <input type="text" />
            </div>
        </div>
        <div>
            <nav className={classes.nav}>
                <div>
                    <NavLink className={classes.nav_item} to="/profile" activeClassName={classes.active}>
                        <HomeImg className={classes.img} />
                    </NavLink>
                </div>
                <div >
                    <NavLink className={classes.nav_item} to="/friends" activeClassName={classes.active}><FriendsImg className={classes.img} /></NavLink>
                </div>
                <div >
                    <NavLink className={classes.nav_item} to="/videos" activeClassName={classes.active}><VideosImg className={classes.img} /> </NavLink>
                </div>
                <div >
                    <NavLink className={classes.nav_item} to="/messages" activeClassName={classes.active}><GroupsImg className={classes.img} /></NavLink>
                </div>
                <div >
                    <NavLink className={classes.nav_item} to="/games" activeClassName={classes.active}><GamesImg className={classes.img} /> </NavLink>
                </div>
            </nav>
        </div>
        <div className={classes.options}>
            <div className={classes.options_item}>
                {
                    props.isAuth
                        ? <NavLink className={classes.login} to="/profile">
                            <UserImg className={classes.img} /> <h3>{props.login}</h3> 
                            <button onClick={props.logoutThunk} >Log Out</button> </NavLink>
                        : <NavLink className={classes.login} to="/login">
                            <LockImg className={classes.log_img} /> <h3>Log In</h3> </NavLink>

                }

            </div>
        </div>

    </header>

}


export default Header;