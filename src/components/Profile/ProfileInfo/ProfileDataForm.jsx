import React from 'react';
import classes from './ProfileInfo.module.css';
import { createField, Input, Textarea } from '../../common/FormControls/FormControls';
import { reduxForm } from 'redux-form';



const ProfileDataForm = ({handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
         {error && <div className={classes.form_error}>
          {error}
        </div>}
        <div>
            <b>FullName :</b>{profile.fullName}
            {createField('Full name', [], 'fullName', Input)}
        </div>
        <div>
            <b>LookingForAJob: </b>{profile.lookingForAJob ? 'yes' : 'no'}
            {createField('', [], 'lookingForAJob', Input, { type: 'checkbox' })}
        </div>

        <div>
            <b>My skills: </b>{profile.lookingForAJobDescription}
            {createField('My skills', [], 'lookingForAJobDescription', Textarea)}
        </div>


        <div>
            <b>About me: </b>{profile.aboutMe}
            {createField('About me', [], 'aboutMe', Textarea)}
        </div>
        <div><b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
        return <div>
            {key}: {createField(key, [], 'contacts.' + key, Input)}
        </div>
    })}</div>
     <div><button>Save</button></div>
         

    </form>
}

const ProfileDataReduxForm = reduxForm({
    // a unique name for the form
    form: 'edit_profile'
  })(ProfileDataForm)


export default ProfileDataReduxForm;