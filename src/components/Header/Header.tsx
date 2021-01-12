/* eslint-disable import/first */
import React, { useEffect } from 'react';
import classes from './Header.module.css';
import { ReactComponent as HomeImg } from '../../images/headerNav/home.svg';
import { ReactComponent as FriendsImg } from '../../images/headerNav/friends.svg';
import { ReactComponent as VideosImg } from '../../images/headerNav/videos.svg';
import { ReactComponent as GroupsImg } from '../../images/headerNav/groups.svg';
import { ReactComponent as MessagesImg } from '../../images/headerOptions/messanger.svg';
import { ReactComponent as Logo } from '../../images/Logo.svg';
import UserImg from '../../images/sideBar/user.svg';
import { ReactComponent as LockImg } from '../../images/headerOptions/lock.svg';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../reduxx/redux-store';
import { getAuthUserPhotoThunk, logoutThunk} from '../../reduxx/auth-reducer';
import { getAuthUserPhoto, getIsAuth, getLogin, getUserId } from '../../reduxx/auth-selectors';

type PropsType = {
}


export const Header: React.FC<PropsType> = (props) => {

    const authUserPhoto = useSelector(getAuthUserPhoto)
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)
    const userId = useSelector(getUserId)

    const dispatch = useDispatch()

    const logOut = () =>  {
        dispatch(logoutThunk())
    }

    useEffect(() => {
        if(isAuth) {
          dispatch(getAuthUserPhotoThunk(userId))
        }
    }, [dispatch, isAuth, userId]) 

   


    let userPhoto = UserImg;
    debugger
    if (authUserPhoto) {
        userPhoto = authUserPhoto;
    }
    debugger
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
                <div >
                    <NavLink className={classes.nav_item} to="/profile" activeClassName={classes.active} data-title='Profile page'>
                        <HomeImg className={classes.img} />
                    </NavLink>

                </div>
                <div >
                    <NavLink className={classes.nav_item} to="/friends" activeClassName={classes.active} data-title='Friends'>
                        <FriendsImg className={classes.img} />
                    </NavLink>
                </div>

                <div >
                    <NavLink className={classes.nav_item} to="/users" activeClassName={classes.active} data-title='Users'>
                        <GroupsImg className={classes.img} />
                    </NavLink>
                </div>
                <div >
                    <NavLink className={classes.nav_item} to="/messages" activeClassName={classes.active} data-title='Messages'>
                        <MessagesImg className={classes.img} />
                    </NavLink>
                </div>
                <div >
                    <NavLink className={classes.nav_item} to="/videos" activeClassName={classes.active} data-title='Videos'>
                        <VideosImg className={classes.img} />
                    </NavLink>
                </div>
            </nav>
        </div>
        <div className={classes.auth_user}>
            {
                
                isAuth
                    ? <div className={classes.login} ><NavLink className={classes.login} to='/login'>
                        <img className={classes.img} src={userPhoto} alt='' /> <h3>{login}</h3></NavLink>
                        <NavLink to='/login'>
                            <button className={classes.button} onClick={logOut} >Log Out</button>
                        </NavLink>
                    </div>
                    : <NavLink className={classes.login} to="/login">
                        <LockImg className={classes.lock_img} /> <h3>Log In</h3> </NavLink>

            }
        </div>
    </header>
}

