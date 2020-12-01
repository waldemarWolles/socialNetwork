import React from 'react';
import userPhoto from '../../images/headerOptions/user.svg';
import { NavLink } from 'react-router-dom';
import classes from './Users.module.css';





const User = ({ user, followingInProgress, unfollowThunk, followThunk }) => {

  let u = user;
  return (

    <div className={classes.user}>
      <div>
        <NavLink to={'profile/' + u.id} >
          <img className={classes.user_photo} width='150' src={u.photos.small !== null ? u.photos.small : userPhoto} alt="" />
        </NavLink>
      </div>
      <div className={classes.user_info}>
        <div className={classes.user_info_item}>Name: {u.name}</div>
        <div className={classes.user_info_item}>Status:{u.status}</div>
        <div className={classes.user_info_item}>City:{u.city}</div>
        <div className={classes.user_info_item}>Country:{u.country}</div>
        <div className={classes.user_info_item}>
          {u.followed
            ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
              unfollowThunk(u.id);
            }}>Unfollow</button>
            : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
              followThunk(u.id);
            }}>Follow</button>}
        </div>
      </div>

    </div>

  );




}

export default User;

