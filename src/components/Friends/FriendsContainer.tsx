import React from 'react';
import { useSelector } from 'react-redux';
import {Friends} from './Friends';
import Preloader from '../common/Preloader';
import { AppRootStateType } from '../../reduxx/redux-store';


export const FriendsContainer: React.FC = () => {
  
  const isFetching = useSelector((state: AppRootStateType) => state.usersPage.isFetching)

  return (<>
    <h2>Friends</h2>
      { isFetching ? <Preloader /> : null}
      <Friends />
    </>);

  }






