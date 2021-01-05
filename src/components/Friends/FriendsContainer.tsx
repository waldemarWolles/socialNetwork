import React from 'react';
import { connect } from 'react-redux';
import Friends from './Friends';
import {
  followThunk,
  unfollowThunk,
  getFriendsThunk,
  actionsUsersReducer
} from '../../reduxx/users-reducer';
import Preloader from '../common/Preloader';
import { withAuthRedirect } from '../common/withAuthRedirect';
import { compose } from 'redux';
import { AppRootStateType } from '../../reduxx/redux-store';
import { UserType } from '../../types/types';
import { RouteProps } from 'react-router-dom';



type MapStatePropsType = {
  pageSizeFriends: number
  isFetching: boolean
  users: Array<UserType>
  totalUsersCount: number
  currentPage: number
  followingInProgress: Array<number>
}

type MapDispatchPropsType = {
  getFriendsThunk: (currentPage: number, pageSizeFriends:number, friend: boolean) => void
  setCurrentPage: (currentPage: number) => void
  followThunk: (userId: number) => void
  unfollowThunk: (userId: number) => void
}

type OwnPropsType = {
 friend: boolean
}




type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType 


class FriendsContainer extends React.Component<PropsType> {

  componentDidMount = () => {
    const { friend, currentPage, pageSizeFriends } = this.props;
    this.props.getFriendsThunk(currentPage, pageSizeFriends, friend );

  }

  onPageChanged = (currentPage: number) => {
    const { pageSizeFriends, friend } = this.props;
    this.props.setCurrentPage(currentPage);
    this.props.getFriendsThunk(currentPage, pageSizeFriends, friend);
  }

  render() {
    debugger
    return (<>
    <h2>Friends</h2>
      { this.props.isFetching ? <Preloader /> : null}
      <Friends
        users={this.props.users}
        pageSizeFriends={this.props.pageSizeFriends}
        totalUsersCount={this.props.totalUsersCount}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        followingInProgress={this.props.followingInProgress}
        followThunk={this.props.followThunk}
        unfollowThunk={this.props.unfollowThunk}
      />
    </>);
  }

}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
  return {
    users: state.usersPage.users,
    pageSizeFriends: state.usersPage.pageSizeFriends,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  }
}


export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppRootStateType>(mapStateToProps, {
    getFriendsThunk,
    setCurrentPage: actionsUsersReducer.setCurrentPage,
    followThunk,
    unfollowThunk
  }),
  withAuthRedirect
)(FriendsContainer)




