import React, { useEffect } from 'react'
import classes from './Users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import {
    actionsUsersReducer,
    FilterType,
    getUsersThunk,
    unfollowThunk,
    followThunk
} from '../../reduxx/users-reducer';
import { useDispatch, useSelector } from 'react-redux'
import { getTotalUsersCount, getCurrentPage, getPageSize, getUsersFilter, getUsers, getFollowingInProgress } from '../../reduxx/users-selectors'




export const Users: React.FC = () => {

  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const users = useSelector(getUsers)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch = useDispatch()

  useEffect(() => {
   
   dispatch(getUsersThunk(currentPage, pageSize, filter))
  }, [currentPage, dispatch, filter, pageSize])

  const onPageChanged = (currentPage: number) => {

    dispatch(actionsUsersReducer.setCurrentPage(currentPage))
    dispatch(getUsersThunk(currentPage, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsersThunk(1, pageSize, filter))
  }

  const unfollow =  (userId: number) => {
    dispatch(unfollowThunk(userId))
  }

  const follow = (userId: number) => {
    dispatch(followThunk(userId))
  }


  return (
    <div className={classes.users}>
      <UsersSearchForm onFilterChanged={onFilterChanged} />

      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
     
      {users.map(u =>
        <User
          user={u} key={u.id}
          followingInProgress={followingInProgress}
          unfollow={unfollow} follow={follow} />
      )}

    </div>
  )

}



