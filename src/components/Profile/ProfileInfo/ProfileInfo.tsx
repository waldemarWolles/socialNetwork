import React, { useState } from 'react';
import Preloader from '../../common/Preloader';
//import ProfileStatus from './ProfileStatus/ProfileStatus';
import userPhoto from '../../../images/headerOptions/user.svg';
import classes from './ProfileInfo.module.css';
import ProfileDataForm from './ProfileDataForm';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import ProfileDataFormik from './ProfileDataFormik';
import { ContactsType, ProfileType } from '../../../types/types';


type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: number | null
    isOwner: boolean
    errorMessage: string | null
    updateStatusThunk: (status: string) => void
    savePhotoThunk: (file: File) => void
    saveProfileThunk: (profile: ProfileType) => any
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({ 
    profile, status, updateStatusThunk, isOwner, savePhotoThunk, saveProfileThunk, authorizedUserId, errorMessage }) => {

    let [editMode, setEditMode] = useState(false);


    if (!profile) {
        return <Preloader />;
    }

    const hiddenFileInput = React.createRef<HTMLInputElement>();

    const handleClick = () => {
        hiddenFileInput.current!.click();
    }

    const onPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhotoThunk(e.target.files[0]);
        }
    }

    const onSubmit = (values: ProfileType) => {
        saveProfileThunk(values).then(
            () => {
                setEditMode(false);
            }
        );
    }

    return <div className={classes.profile_info}>
        <div className={classes.img_container}>
            <img className={classes.img} src={profile.photos.large || userPhoto} alt="" />
            {isOwner && <div>
                <button onClick={handleClick}>Change Photo</button>
                <input className={classes.profile_photo_input} ref={hiddenFileInput} type='file' onChange={onPhotoSelected} /></div>}
            <ProfileStatusWithHooks 
                profile={profile} 
                authorizedUserId={authorizedUserId} 
                status={status} 
                updateStatusThunk={updateStatusThunk} 
                />
        </div>
        <div className={classes.profile_data}>
            {editMode
                ? <ProfileDataFormik initialValues={profile} profile={profile} onSubmit={onSubmit} errorMessage={errorMessage}/>
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)} />}
        </div>
    </div>
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => any
} 



const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
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

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    return <div>
       <div className={classes.profile_data_item}><b> {contactTitle}</b>: <span>{contactValue}</span></div>
    </div>
}



export default ProfileInfo;