export {}
// import React from 'react';
// import Profile from './Profile';
// import { connect } from 'react-redux';
// import {
//     getProfileThunk,
//     getStatusThunk,
//     updateStatusThunk,
//     savePhotoThunk,
//     saveProfileThunk,
//     actionsProfileReducer,
// } from '../../reduxx/profile-reducer';
// import { withRouter, RouteComponentProps} from 'react-router-dom';
// import { compose } from 'redux';
// import { AppRootStateType } from '../../reduxx/redux-store';
// import { PostsType, ProfileType } from '../../types/types';


// type RouteComponentParamsProps = {
//     userId: string
// }

// type OwnPropsType = {
//     isOwner: boolean
// }

// type MapStatePropsType = {
//     authorizedUserId: number | null
// }

// type MapDispatchPropsType = {
//     getProfileThunk: (userId: number) => void
//     getStatusThunk: (userId: number) => void
//     saveProfileThunk: (profile: ProfileType) => void
// }

// type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & RouteComponentProps<RouteComponentParamsProps>


// class ProfileContainer extends React.Component<PropsType> {

//     refreshProfile = () => {
//         let userId: number | null = +this.props.match.params.userId;
     
//         if (!userId) {
//             userId = this.props.authorizedUserId;

//             if (!userId) {
//                 this.props.history.push('/login');
//             }
//         }

//         if(!userId) {
//             console.error('UserID should exist!!!')
//         } else {
//             this.props.getProfileThunk(userId);
//             this.props.getStatusThunk(userId);
//         }
       
//     }

//     componentDidMount = () => {
//         this.refreshProfile();
//     }

//     componentDidUpdate = (prevProps: PropsType, prevState: PropsType, snapshot: PropsType) => {
//         if (this.props.match.params.userId !== prevProps.match.params.userId) {
//             this.refreshProfile();
//         }

//     }

//     render() {
//         return (
//             <Profile {...this.props}
//                 isOwner={!this.props.match.params.userId}
//                 saveProfileThunk={this.props.saveProfileThunk}
               
//             />
//         );
//     }
// }

// const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
//     authorizedUserId: state.auth.userId,
// });


//  compose<React.ComponentType>(
//     connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppRootStateType>(mapStateToProps, {
//         getProfileThunk,
//         getStatusThunk,
//         saveProfileThunk,
//     }),
//     withRouter
// )(ProfileContainer)