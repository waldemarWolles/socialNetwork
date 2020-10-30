import React, { Suspense } from 'react';
import classes from './App.module.css';
import SideBar from './components/SideBar/SideBar';
import { Route, Switch, withRouter } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './reduxx/app-reducer';
import Preloader from './components/common/Preloader';





const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer'));
const FriendsContainer = React.lazy(() => import('./components/Friends/FriendsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));
const Videos = React.lazy(() => import('./components/Videos/Videos'));
const Events = React.lazy(() => import('./components/Events/Events'));

class App extends React.Component {


  componentDidMount = () => {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (

      <div className={classes.app}>

        <HeaderContainer />
        <SideBar />
        <div className={classes.mainContent} id={classes.mainContent}>
          <Suspense fallback={<div><Preloader /></div>}>
            <Switch>
              <Route path='/messages' render={() => <MessagesContainer />} />
              <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
              <Route path='/friends' render={() => <FriendsContainer />} />
                <Route path='/videos' render={() => <Videos />} />
              <Route path='/events' render={() => <Events />} />
              <Route path='/login' render={() => <Login />} />
            </Switch>
          </Suspense>
        </div>
      </div>

    );
  }
}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
