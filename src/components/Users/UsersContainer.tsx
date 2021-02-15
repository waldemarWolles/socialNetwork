import React from 'react'
import { useSelector } from 'react-redux'
import { Users } from './Users'
import Preloader from '../common/Preloader'
import { getIsFetching } from '../../reduxx/users-selectors'
import { withAuthRedirect } from '../common/withAuthRedirect'

const UsersPage: React.FC = () => {
  const isFetching = useSelector(getIsFetching)

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  )
}

export const UserPageWithAuth = withAuthRedirect(UsersPage)
