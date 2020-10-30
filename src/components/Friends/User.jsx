import React from 'react';
import classes from './Friends.module.css';
import userPhoto from '../../images/headerOptions/user.svg';
import { NavLink } from 'react-router-dom';





const User = ({user, followingInProgress, unfollowThunk, followThunk }) => {
  let u = user;
  return (

    <div>
      <div>
        <NavLink to={'profile/' + u.id} >
          <img width='200' src={u.photos.small !== null ? u.photos.small : userPhoto} alt="" />
        </NavLink>
      </div>
      <div> <div>{u.name}</div>
        <div>{u.status}</div>
        <div>{u.city}</div>
        <div>{u.country}</div>
      </div>
      <div>
        {u.followed
          ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
            unfollowThunk(u.id);
          }}>Unfollow</button>
          : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
            followThunk(u.id);
          }}>Follow</button>}
      </div>
    </div>

  );




}

export default User;

