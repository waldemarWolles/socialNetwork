import React, { useState } from 'react';
import Preloader from '../../common/Preloader';
import userPhoto from '../../../images/headerOptions/user.svg';
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import ProfileDataFormik from './ProfileDataFormik';
import { ProfileType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorizedUserIdSelector, getErrorMessageSelector, getProfileSelector, getStatusSelector } from '../../../reduxx/profile-selectors';
import { savePhotoThunk, saveProfileThunk, updateStatusThunk} from '../../../reduxx/profile-reducer';
import { ProfileData } from './ProfileData';


type ProfileInfoPropsType = {
    isOwner: boolean
}

    

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
    isOwner }) => {

    let [editMode, setEditMode] = useState(false);


    const profile = useSelector(getProfileSelector)
    const status = useSelector(getStatusSelector)
    const authorizedUserId = useSelector(getAuthorizedUserIdSelector)
    const errorMessage = useSelector(getErrorMessageSelector)
    

    const dispatch = useDispatch()


    if (!profile) {
        return <Preloader />;
    }

    const hiddenFileInput = React.createRef<HTMLInputElement>();

    const handleClick = () => {
        hiddenFileInput.current!.click();
    }

    const onPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(savePhotoThunk(e.target.files[0]))
        }
    }

    const updateStatus = (status: string) => {
       dispatch(updateStatusThunk(status))
    }

    const saveProfile = (values: ProfileType): any => {
      return dispatch(saveProfileThunk(values))
    }

    const onSubmit =  (values: ProfileType) => {
        debugger
        saveProfile(values).then(
            () => {
                debugger
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
                updateStatus={updateStatus}
            />
        </div>
        <div className={classes.profile_data}>
            {editMode
                ? <ProfileDataFormik initialValues={profile} profile={profile} onSubmit={onSubmit} errorMessage={errorMessage} />
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)} />}
        </div>
    </div>
}





export default ProfileInfo;