import React, { Suspense } from 'react';
import classes from './App.module.css';
import { Link, NavLink, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './reduxx/app-reducer';
import Preloader from './components/common/Preloader';
// import {SideBar} from './components/SideBar/SideBar'; 
import { AppRootStateType } from './reduxx/redux-store';
import { Header } from './components/Header/Header';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { SubMenu } = Menu;
const {  Content, Footer, Sider } = Layout;


const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer'));
const FriendsContainer = React.lazy(
  () => import('./components/Friends/FriendsContainer').then(module => ({ default: module.FriendsContainer }))
)
const UsersPage = React.lazy(
  () => import('./components/Users/UsersContainer').then(module => ({ default: module.UsersPage }))
)

const ProfileContainerHooks = React.lazy(() => import('./components/Profile/ProfileContainerHooks'));
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

      <Layout>
        <Header />
        {/* <SideBar /> */}

        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >

                {/* {isAuth
                  ? <div className={classes.item}>
                    <NavLink to="/profile" >
                      <img className={cn(classes.img, classes.auth_user)} src={userPhoto} alt="" /> <h3>{login}</h3>
                    </NavLink>
                  </div>
                  : <div className={classes.item}>
                    <NavLink to="/profile" ><img className={classes.img} src={UserImg} alt="" /> <h3>User Name</h3></NavLink>
                  </div>
                }
                <div className={classes.item}>
                  <NavLink to="/friends"><FriendsImg className={classes.img} /><h3>Friends</h3></NavLink>
                </div>
                <div className={classes.item}>
                  <NavLink to="/users"><FriendsImg className={classes.img} /><h3>Users</h3></NavLink>
                </div>
                <div className={classes.item}>
                  <NavLink to="/messages"><MessangerImg className={classes.img} /><h3>Messages</h3></NavLink>
                </div>
                <div className={classes.item}>
                  <NavLink to="/videos"><VideoImg className={classes.img} /><h3>Videos</h3></NavLink>
                </div> */}
                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                  <Menu.Item key="1" >
                    <Link to="/profile" >
                       <h3>Profile</h3>
                    </Link></Menu.Item>
                  <Menu.Item key="2"> <Link to="/friends" >
                       <h3>friends</h3>
                    </Link></Menu.Item>
                  <Menu.Item key="3"> <Link to="/users" >
                       <h3>users</h3>
                    </Link></Menu.Item>
                  <Menu.Item key="4"> <Link to="/videos" >
                       <h3>videos</h3>
                    </Link></Menu.Item>
                  <Menu.Item key="5"> <Link to="/messages" >
                       <h3>Messages</h3>
                    </Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Suspense fallback={<div><Preloader /></div>} >
                <Switch>
                  <Route path='/messages' render={() => <MessagesContainer />} />
                  <Route path='/profile/:userId?' render={() => <ProfileContainerHooks />} />
                  <Route path='/friends' render={() => <FriendsContainer />} /> {/* TITLE ?????*/}
                  <Route path='/users' render={() => <UsersPage />} />   {/* TITLE ?????*/}
                  <Route path='/videos' render={() => <Videos />} />
                  <Route path='/login' render={() => <Login />} />
                </Switch>
              </Suspense>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>



















      // <div className={classes.app}>
      //   <Header />


      //   <SideBarContainer />

      //   <div className={classes.mainContent} id={classes.mainContent}>
      //    
      //   </div>
      // </div>

    );
  }
}


const mapStateToProps = (state: AppRootStateType) => ({
  initialized: state.app.initialized
})

export default compose<React.ComponentType>(
  withRouter,
  connect<MapStatePropsType, MapDispatchPropsType, unknown, AppRootStateType>(mapStateToProps, { initializeApp })
)(App);
