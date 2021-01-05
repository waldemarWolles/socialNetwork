import React from 'react' 
import classes from './Users.module.css' 
import Paginator from '../common/Paginator/Paginator' 
import User from './User' 
import { UserType } from '../../types/types'


type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number 
  users: Array<UserType>
  followingInProgress: Array<number>


  onPageChanged: (pageNumber: number) => void 
  unfollowThunk: (userId: number) => void
  followThunk: (userId: number) => void
 
}


const Users: React.FC<PropsType> = ({ totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props }) => {
  return (

    <div className={classes.users}>

      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />

      {users.map(u => 
      
      <User
        user={u} key={u.id}
        followingInProgress={props.followingInProgress}
        unfollowThunk={props.unfollowThunk} followThunk={props.followThunk} />
       )}
        
      </div>
    ) 

}

export default Users 

