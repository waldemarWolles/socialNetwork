import { Formik, Form, Field } from 'formik';
import React from 'react';
import FormControlsWithFormik from '../../common/FormControls/FormControlsWithFormik';
import classes from './ProfileInfo.module.css';
import * as Yup from 'yup';



const ProfileDataFormik = ({ profile, onSubmit }) => {

    


    return <Formik
        initialValues={
            {
                fullName: profile.fullName,
                lookingForAJob: false,
                lookingForAJobDescription: profile.lookingForAJobDescription,
                aboutMe: profile.aboutMe,
                contacts: profile.contacts
            }}
        validationSchema={Yup.object({
            fullName: Yup.string().required('Required field'),
            lookingForAJob: Yup.bool().required('Required field'),
            lookingForAJobDescription: Yup.string().required('Required field'),
            aboutMe: Yup.string().required('Required field'),
            contacts: Yup.object().required('Required field'),
        })}
        onSubmit={onSubmit}>
        {
            formik => {
                return <Form>
                    <div>
                        <b>FullName :</b>{profile.fullName}
                        <FormControlsWithFormik control='input' name='fullName' placeholder='Write your name here' />
                    </div>
                    <div>
                        <b>LookingForAJob: </b>{profile.lookingForAJob ? 'yes' : 'no'}
                        <Field type='checkbox' name='lookingForAJob' />
                    </div>

                    <div>
                        <b>My skills: </b>{profile.lookingForAJobDescription}
                        <FormControlsWithFormik control='textarea' name='lookingForAJobDescription' placeholder='My skills' />
                    </div>


                    <div>
                        <b>About me: </b>{profile.aboutMe}

                        <FormControlsWithFormik control='textarea' name='aboutMe' placeholder='About me' />
                    </div>
                    <div><b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
                        return <div key={key}>
                            {key}: <FormControlsWithFormik key={key} control='input' name={'contacts.' + key} placeholder={key} />
                        </div>
                    })}</div>


                    <div><button type='submit'>Save</button></div>
                </Form>
            }
        }
    </Formik>




}



export default ProfileDataFormik;