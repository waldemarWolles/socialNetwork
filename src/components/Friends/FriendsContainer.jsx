import React from 'react';
import { connect } from 'react-redux';
import Friends from './Friends';
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    unfollow,
    toggleIsFollowingInProgress,
    getUsersThunk,
    followThunk,
    unfollowThunk
} from '../../reduxx/users-reducer';
import Preloader from '../common/Preloader';
import { Redirect } from 'react-router-dom';
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





class FriendsContainer extends React.Component {


  componentDidMount = () => {
    const {currentPage, pageSize} = this.props;
    this.props.getUsersThunk(currentPage, pageSize);

  }

  onPageChanged = (pageNumber) => {
    const {pageSize} = this.props;
    this.props.setCurrentPage(pageNumber);
    this.props.getUsersThunk(pageNumber, pageSize);
  }

  render() {

    return (<>
      { this.props.isFetching ? <Preloader /> : null}
      <Friends
        users={this.props.users}
        pageSize={this.props.pageSize}
        totalUsersCount={this.props.totalUsersCount}
        currentPage={this.props.currentPage}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
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

const mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
}


export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    getUsersThunk,
    toggleIsFollowingInProgress,
    followThunk,
    unfollowThunk
  }),
  withAuthRedirect
)(FriendsContainer)




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


