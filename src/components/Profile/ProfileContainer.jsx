import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfileThunk, getStatusThunk, updateStatusThunk } from '../../reduxx/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../common/withAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends React.Component {

    componentDidMount = () => {

        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;

            if(!userId) {
                this.props.history.push('/login');
            }
        }

        this.props.getProfileThunk(userId);
        this.props.getStatusThunk(userId);
    }

    render() {
        return (
            <Profile {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatusThunk={this.props.updateStatusThunk}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth

})


export default compose(
    connect(mapStateToProps, { getProfileThunk, getStatusThunk, updateStatusThunk }),
    withRouter
)(ProfileContainer)

