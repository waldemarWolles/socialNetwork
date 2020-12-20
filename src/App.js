import React, { Suspense } from 'react';
import classes from './App.module.css';
import SideBar from './components/SideBar/SideBar';
import { Route, Switch, withRouter } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './reduxx/app-reducer';
import Preloader from './components/common/Preloader';
import SideBarContainer from './components/SideBar/SideBarContainer';
import FriendsContainer from './components/Friends/FriendsContainer';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'https://social-network.samuraijs.com/api/1.0/',
  '706fad94-0cd0-4565-8db0-3b78dd0a8c25'
);






const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'));
const Videos = React.lazy(() => import('./components/Videos/Videos'));

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
        <SideBarContainer />

        <div className={classes.mainContent} id={classes.mainContent}>
          <InstantSearch
            indexName="bestbuy"
            searchClient={searchClient}
          >
            <SearchBox />
            <Hits />
          </InstantSearch>
          <Suspense fallback={<div><Preloader /></div>}>
            <Switch>
              <Route path='/messages' render={() => <MessagesContainer />} />
              <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
              <Route path='/friends' render={() => <FriendsContainer />} />
              <Route path='/users' render={() => <UsersContainer />} />
              <Route path='/videos' render={() => <Videos />} />
              <Route path='/login' render={() => <LoginContainer />} />
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
