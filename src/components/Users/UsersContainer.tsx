import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import {
    getUsersThunk,
    followThunk,
    unfollowThunk,
    actionsUsersReducer,
} from '../../reduxx/users-reducer';
import Preloader from '../common/Preloader';
import {withAuthRedirect} from '../common/withAuthRedirect';
import { compose } from 'redux';
import {
    getUsers,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress
} from '../../reduxx/users-selectors';
import { UserType } from '../../types/types';
import { AppRootStateType } from '../../reduxx/redux-store';


type MapStateToPropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: Array<UserType>
  followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
  followThunk: (userId: number) => void
  unfollowThunk: (userId: number) => void
  setCurrentPage: (currentPage: number) => void
  getUsersThunk:(currentPage: number, pageSize: number) => void
}

 

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<PropsType> {


  componentDidMount = () => {
    const {currentPage, pageSize} = this.props;
    this.props.getUsersThunk(currentPage, pageSize);

  }

  onPageChanged = (currentPage: number) => {
    const {pageSize} = this.props;
    this.props.setCurrentPage(currentPage);
    this.props.getUsersThunk(currentPage, pageSize);
  }

  render() {

    return (<>
      { this.props.isFetching ? <Preloader /> : null}
      <Users
        users={this.props.users}
        pageSize={this.props.pageSize}
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

// const mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   }
// }

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
}


//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppRootStateType>(mapStateToProps, {
    setCurrentPage: actionsUsersReducer.setCurrentPage,
    getUsersThunk,
    followThunk,
    unfollowThunk
  }),
  withAuthRedirect
)(UsersContainer)




// const mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followAC(userId));
//     },
//     unfollow: (userId) => {
//       dispatch(unfollowAC(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageAC(pageNumber));
//     },
//     setTotalUsersCount: (totalCount) => {
//       dispatch(setTotalUsersCountAC(totalCount));
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetchingAC(isFetching));
//     },
//   }
// }

// follow: follow ==> follow etc


