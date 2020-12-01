import React from 'react';
import classes from './Friends.module.css';
import User from '../Users/User';
import Paginator from '../common/Paginator/Paginator';





const Friends = (props) => {
debugger;
  return (

    <div className={classes.friends}>

  <Paginator 
  currentPage={props.currentPage} 
  onPageChanged={props.onPageChanged} 
  totalItemsCount={props.totalUsersCount} 
  pageSize={props.pageSizeFriends} />

      {props.users.filter(u => u.followed === true).map(u => 
      <User
        user={u} key={u.id}
        followingInProgress={props.followingInProgress}
        unfollowThunk={props.unfollowThunk} followThunk={props.followThunk} />
       )} 
      </div>
    );

}

export default Friends;

