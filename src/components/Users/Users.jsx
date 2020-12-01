import React from 'react';
import classes from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';





const Users = ({ totalUsersCount, pageSize, currentPage, onPageChanged, ...props }) => {
debugger;
  return (

    <div className={classes.users}>

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

export default Users;

