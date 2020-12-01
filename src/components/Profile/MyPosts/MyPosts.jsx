import React from 'react';
import classes from '../Profile.module.css';
import Post from './Posts/Post';
import UserImg from '../../../images/sideBar/user.svg';
// import { Field, reduxForm, reset } from 'redux-form';
// import { required,  maxLengthCreator } from '../../../utils/validators/validators';
// import { Textarea } from '../../common/FormControls/FormControls.jsx';
import Preloader from '../../common/Preloader';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormControlsWithFormik from '../../common/FormControls/FormControlsWithFormik';


const MyPosts = React.memo(props => {

debugger;
    console.log('RENDER');
    if (!props.profile) {
        return <Preloader />;
    }
    let userPhoto = UserImg;
    if (props.profile.photos.small) {
        userPhoto = props.profile.photos.small;
    }

    let postsElements = [...props.posts].map(post => <Post profile={props.profile} key={post.id} message={post.message} likesCount={post.likesCount} />)


    let addPostText = (values) => {
        props.addPost(values.newPostText);
    }



    return (
        <div className={classes.posts}>
            <div>
                <div className={classes.postForm}>
                    <div className={classes.user}>
                        <img className={classes.userImg} src={userPhoto} alt="" />
                    <h3>{props.profile.fullName}</h3>
                    </div>
                    <div className={classes.addPost}>
                        <div className={classes.addPost_item}>
                           <AddPostFormik onSubmit={addPostText} />
                        </div>
                    </div>
                </div>
            </div>
            { postsElements}

        </div>
    );


});

const AddPostFormik = (props) => {

    return (
        <Formik
            initialValues={{ newPostText: '' }}
            validationSchema={Yup.object({
                newPostText: Yup.string().required('Cannot send an empty post').max(50)
            })}
            onSubmit={(values, {resetForm}) => {
                props.onSubmit(values);
                resetForm();
            }}
        >
            {
                formik => {
                    return <Form>
                        <FormControlsWithFormik 
                            control='textarea'
                            name='newPostText'
                            placeholder='Write your text here'
                        />
                        <button className={classes.button} type='submit'>Send</button>
                    </Form>

                }
            }
        </Formik>
    );
}

export default MyPosts;

// let  maxLength50 = maxLengthCreator(50);



// const AddPostForm = (props) => {
//     return (
//         <form onSubmit={props.handleSubmit} >
//             <Field rows='5' cols='70' 
//             component={Textarea} 
//             name='newPostText' 
//             validate={[required, maxLength50]} 
//             placeholder={'Write your text here'}
//              />
//             <button>Add post</button>
//         </form>
//     );
// }

// const afterSubmit = (result, dispatch) =>
//      dispatch(reset('post'));

// const AddPostReduxForm = reduxForm({
//     form: 'post',
//     onSubmitSuccess: afterSubmit,
// })(AddPostForm);



