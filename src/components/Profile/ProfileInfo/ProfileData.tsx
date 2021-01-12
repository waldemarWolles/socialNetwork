import React from 'react';
import classes from './ProfileInfo.module.css';
import { ContactsType, ProfileType } from '../../../types/types';
import { Contact } from './Contact';




type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => any
}



export const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode }) => {
    return <div>

        <div className={classes.profile_data_item}><b>FullName :</b>{profile.fullName}</div>
        <div className={classes.profile_data_item}><b>LookingForAJob: </b>{profile.lookingForAJob ? 'yes' : 'no'}</div>
        {profile.lookingForAJob &&
            <div className={classes.profile_data_item}><b>My skills: </b>{profile.lookingForAJobDescription}</div>
        }

        <div className={classes.profile_data_item}><b>About me: </b>{profile.aboutMe}</div>
        <div className={classes.profile_data_item}><b>Contacts:</b>{Object.keys(profile.contacts).map((key) => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} /> // [index: string]: string

        })}</div>
        {isOwner && <div><button className={classes.profile_data_item} onClick={goToEditMode}>Edit</button></div>}

    </div>
}



