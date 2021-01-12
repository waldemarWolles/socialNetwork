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
import { useHistory } from 'react-router-dom'
import * as queryString from 'querystring'


type PropsType = {}

export const Users: React.FC<PropsType> = () => {

  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const users = useSelector(getUsers)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch = useDispatch()
  const history = useHistory()

  type QueryParamsType = {
    term?: string
    page?: string
    friend?: string
  }
  

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
    
    let actualPage = currentPage
    let actualFilter = filter

    if(!!parsed.page) actualPage = Number(parsed.page)
    if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string} 
    if(!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false}
    console.log('render')
  
   dispatch(getUsersThunk(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {

    const query: QueryParamsType = {}

    if(!!filter.term) query.term = filter.term
    if(filter.friend !== null) query.friend = String(filter.friend)
    if(currentPage !== 1) query.page = String(currentPage)
    console.log('render')
    history.push({
      pathname: '/users',
      search: queryString.stringify(query)
    })
  }, [filter, currentPage])

  

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



