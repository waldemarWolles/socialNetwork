import React from 'react';
import classes from './Friends.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';





const Friends = ({ totalUsersCount, pageSize, currentPage, onPageChanged, ...props }) => {

  return (

    <div className={classes.friends}>

      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />

      {props.users.map(u => 
      <User
        user={u} key={u.id}
        followingInProgress={props.followingInProgress}
        unfollowThunk={props.unfollowThunk} followThunk={props.followThunk} />
       )}
        
      </div>
    );

}

export default Friends;

