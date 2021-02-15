import React, { useEffect } from 'react'
import Profile from './Profile'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileThunk, getStatusThunk } from '../../reduxx/profile-reducer'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom'
import { getAuthorizedUserIdSelector } from '../../reduxx/profile-selectors'

type RouteComponentParamsProps = {
  userId: string
}

type PropsType = RouteComponentProps<RouteComponentParamsProps>

const ProfileContainerWithHooks: React.FC<PropsType> = (props) => {
  let history = useHistory()

  const authorizedUserId = useSelector(getAuthorizedUserIdSelector)

  const dispatch = useDispatch()

  const getProfile = (userId: number) => {
    dispatch(getProfileThunk(userId))
  }

  const getStatus = (userId: number) => {
    dispatch(getStatusThunk(userId))
  }

  const refreshProfile = () => {
    let userId: number | null = +props.match.params.userId

    if (!userId) {
      userId = authorizedUserId

      if (!userId) {
        history.push('/login')
      }
    }

    if (!userId) {
      console.error('UserID should exist!!!')
    } else {
      getProfile(userId)
      getStatus(userId)
    }
  }

  useEffect(() => {
    refreshProfile()
  })

  return <Profile isOwner={!props.match.params.userId} />
}

export default withRouter(ProfileContainerWithHooks)
