import React from 'react';
import userPhoto from '../../images/headerOptions/user.svg';
import { NavLink } from 'react-router-dom';
import classes from './Users.module.css';
import { UserType } from '../../types/types';


type PropsType = {
  user: UserType
  followingInProgress: Array<number>


  unfollowThunk: (userId: number) => void
  followThunk: (userId: number) => void
}


const User: React.FC<PropsType> = ({ user, followingInProgress, unfollowThunk, followThunk }) => {

  let u = user
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

