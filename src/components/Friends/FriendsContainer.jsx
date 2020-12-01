import React from 'react';
import { connect } from 'react-redux';
import Friends from './Friends';
import {
  follow,
  unfollow,
  toggleIsFollowingInProgress,
  followThunk,
  unfollowThunk,
  getFriendsThunk,
  setCurrentPage
} from '../../reduxx/users-reducer';
import Preloader from '../common/Preloader';
import { withAuthRedirect } from '../common/withAuthRedirect';
import { compose } from 'redux';






class FriendsContainer extends React.Component {

  componentDidMount = () => {
    const { friend } = this.props;
    this.props.getFriendsThunk(friend);

  }

  onPageChanged = (pageNumber) => {
    const { pageSizeFriends } = this.props;
    this.props.setCurrentPage(pageNumber);
    this.props.getFriendsThunk(pageNumber, pageSizeFriends);
  }

  render() {
    return (<>
      { this.props.isFetching ? <Preloader /> : null}
      <Friends
        users={this.props.users}
        pageSizeFriends={this.props.pageSizeFriends}
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

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSizeFriends: state.usersPage.pageSizeFriends,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,

  }
}
export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    getFriendsThunk,
    setCurrentPage,
    toggleIsFollowingInProgress,
    followThunk,
    unfollowThunk
  }),
  withAuthRedirect
)(FriendsContainer)




