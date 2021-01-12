import React, { useEffect } from 'react';
import classes from './Friends.module.css';
import User from '../Users/User';
import Paginator from '../common/Paginator/Paginator';
import { UserType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../reduxx/redux-store';
import {
    actionsUsersReducer,
    getFriendsThunk,
    unfollowThunk,
    followThunk
} from '../../reduxx/users-reducer';
import { getCurrentPage, getFollowingInProgress, getPageSizeFriends, getTotalUsersCount, getUsers } from '../../reduxx/users-selectors';


export const Friends: React.FC = (props) => {


  const currentPage = useSelector(getCurrentPage)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const pageSizeFriends = useSelector(getPageSizeFriends)
  const users = useSelector(getUsers)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFriendsThunk(1, pageSizeFriends, true ))
  }, [dispatch, pageSizeFriends])

  const onPageChanged = (currentPage: number) => {
    dispatch(actionsUsersReducer.setCurrentPage(currentPage))
    dispatch(getFriendsThunk(currentPage, pageSizeFriends, true))
  }

  const unfollow = (userId: number) => {
    dispatch(unfollowThunk(userId))
  }

  const follow = (userId: number) => {
    dispatch(followThunk(userId))
  }


  return (
    <div className={classes.friends}>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSizeFriends} />

      {users.filter(u => u.followed === true).map(u =>
        <User
          user={u} key={u.id}
          followingInProgress={followingInProgress}
          unfollow={unfollow} follow={follow} />
      )}
    </div>
  );

}


