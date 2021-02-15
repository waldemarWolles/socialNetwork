import React from 'react'
import { useSelector } from 'react-redux'
import { Friends } from './Friends'
import Preloader from '../common/Preloader'
import { AppRootStateType } from '../../reduxx/redux-store'
import { withAuthRedirect } from '../common/withAuthRedirect'

const FriendsContainer: React.FC = () => {
  const isFetching = useSelector(
    (state: AppRootStateType) => state.usersPage.isFetching
  )

  return (
    <>
      <h2>Friends</h2>
      {isFetching ? <Preloader /> : null}
      <Friends />
    </>
  )
}

export const FriendsContainerWithAuth = withAuthRedirect(FriendsContainer)
