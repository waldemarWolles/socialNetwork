import React from 'react';
import Preloader from '../../common/Preloader';
import ProfileStatus from './ProfileStatus/ProfileStatus';


const ProfileInfo = ({profile, status, updateStatusThunk }) => {

    if(!profile) {
        return <Preloader />;
    }
  
    return <div>
        <div><img src={profile.photos.large} alt=""/></div>
        <div><ProfileStatus status={status} updateStatusThunk={updateStatusThunk} /></div>
    </div>
}


export default ProfileInfo;