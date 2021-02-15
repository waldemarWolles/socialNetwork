import React, { Suspense } from 'react'
import classes from './App.module.css'
import { Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { initializeApp } from './reduxx/app-reducer'
import Preloader from './components/common/Preloader'
import { SideBar } from './components/SideBar/SideBar'
import { AppRootStateType } from './reduxx/redux-store'
import { HeaderComponent } from './components/Header/HeaderComponent'

const MessagesContainer = React.lazy(
  () => import('./components/Messages/MessagesContainer')
)
const FriendsContainer = React.lazy(() =>
  import('./components/Friends/FriendsContainer').then((module) => ({
    default: module.FriendsContainerWithAuth,
  }))
)
const UsersPage = React.lazy(() =>
  import('./components/Users/UsersContainer').then((module) => ({
    default: module.UserPageWithAuth,
  }))
)
const ChatPage = React.lazy(() =>
  import('./pages/chat/chatPage').then((module) => ({
    default: module.ChatPageWithAuth,
  }))
)

const ProfileContainerHooks = React.lazy(
  () => import('./components/Profile/ProfileContainerHooks')
)
const Login = React.lazy(() =>
  import('./components/Login/Login').then((module) => ({
    default: module.Login,
  }))
)
const Videos = React.lazy(() =>
  import('./components/Videos/Videos').then((module) => ({
    default: module.VideosWithAuth,
  }))
)

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
  initializeApp: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class App extends React.Component<PropsType> {
  componentDidMount = () => {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className={classes.app}>
        <HeaderComponent />
        <SideBar />

        <div className={classes.mainContent} id={classes.mainContent}>
          <Suspense
            fallback={
              <div>
                <Preloader />
              </div>
            }
          >
            <Switch>
              <Route path="/messages" render={() => <MessagesContainer />} />
              <Route
                path="/profile/:userId?"
                render={() => <ProfileContainerHooks />}
              />
              <Route path="/friends" render={() => <FriendsContainer />} />
              <Route path="/users" render={() => <UsersPage />} />
              <Route path="/videos" render={() => <Videos />} />
              <Route path="/login" render={() => <Login />} />
              <Route path="/chat" render={() => <ChatPage />} />
            </Switch>
          </Suspense>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppRootStateType) => ({
  initialized: state.app.initialized,
})

export default compose<React.ComponentType>(
  withRouter,
  connect<MapStatePropsType, MapDispatchPropsType, unknown, AppRootStateType>(
    mapStateToProps,
    { initializeApp }
  )
)(App)
