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
import { PostsType, ProfileType } from '../../../types/types';


type PropsType = {
    posts: Array<PostsType> 
    profile: ProfileType | null
    addPost: (newPostText: string, newPostId: number) => void
    deletePost: (postID: number) => void
}

const MyPosts: React.FC<PropsType> = (props) => {

debugger;
    console.log('RENDER');
    if (!props.profile) {
        return <Preloader />;
    }
    let userPhoto = UserImg;
    if (props.profile.photos.small) {
        userPhoto = props.profile.photos.small;
    }

    let postsElements = [...props.posts].map(post =>
         <Post profile={props.profile} key={post.id} id={post.id} message={post.message} likesCount={post.likesCount} deletePost={props.deletePost} />)

    let newPostId = props.posts.length + 2;


    const addPostText = (values: any) => {
        debugger
         props.addPost(values.newPostText, newPostId);
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


}

type AddPostFormikType = {
    onSubmit: (newPostText: string) => void
}



const AddPostFormik: React.FC<AddPostFormikType> = (props) => {

    return (
        <Formik
            initialValues={{ newPostText: ''}}
            validationSchema={Yup.object({
                newPostText: Yup.string().required('Cannot send an empty post').max(50)
            })}
            onSubmit={(values: any, {resetForm}) => {
                props.onSubmit(values);
                debugger
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

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized;

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



