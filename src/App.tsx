import React, { Suspense } from 'react';
import classes from './App.module.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './reduxx/app-reducer';
import Preloader from './components/common/Preloader';
import SideBarContainer from './components/SideBar/SideBarContainer';
import { AppRootStateType } from './reduxx/redux-store';
import { Header } from './components/Header/Header';


const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer'));
const FriendsContainer = React.lazy(
  () => import('./components/Friends/FriendsContainer').then(module => ({ default: module.FriendsContainer }))
)
const UsersPage = React.lazy(
  () => import('./components/Users/UsersContainer').then(module => ({ default: module.UsersPage }))
)
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Login = React.lazy(
  () => import('./components/Login/Login').then(module => ({ default: module.Login }))
)
const Videos = React.lazy(() => import('./components/Videos/Videos'));


type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
  initializeApp: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType


class App extends React.Component<PropsType> {

  componentDidMount = () => {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
 
      <div className={classes.app}>
        <Header />
        <SideBarContainer />

        <div className={classes.mainContent} id={classes.mainContent}>
          <Suspense fallback={<div><Preloader /></div>} >
            <Switch>
              <Route path='/messages'  render={() => <MessagesContainer />} />
              <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
              <Route path='/friends' render={() => <FriendsContainer  />} /> {/* TITLE ?????*/}
              <Route path='/users'  render={() => <UsersPage  />} />   {/* TITLE ?????*/}
              <Route path='/videos' render={() => <Videos />} />
              <Route path='/login' render={() => <Login />} />
            </Switch>
          </Suspense>
        </div>
      </div>

    );
  }
}


const mapStateToProps = (state: AppRootStateType) => ({
  initialized: state.app.initialized
})

export default compose<React.ComponentType>(
  withRouter,
  connect<MapStatePropsType, MapDispatchPropsType, unknown, AppRootStateType >(mapStateToProps, { initializeApp })
)(App);
