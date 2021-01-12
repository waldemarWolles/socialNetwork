import React from 'react';
import classes from '../Profile.module.css';
import Post from './Posts/Post';
import UserImg from '../../../images/sideBar/user.svg';
import Preloader from '../../common/Preloader';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormControlsWithFormik from '../../common/FormControls/FormControlsWithFormik';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsSelector, getProfileSelector } from '../../../reduxx/profile-selectors';
import { actionsProfileReducer } from '../../../reduxx/profile-reducer';


type PropsType = {
}


const MyPosts: React.FC<PropsType> = (props) => {

    const posts = useSelector(getPostsSelector)
    const profile = useSelector(getProfileSelector)
    
    const dispatch = useDispatch()

  

    const addPostText = (values: any) => {
        let newPostId = posts.length + 2;
        dispatch(actionsProfileReducer.addPost(values.newPostText, newPostId))
    }

    const deletePostText = (postID: number) => {
        dispatch(actionsProfileReducer.deletePost(postID))
    }


    if (!profile) {
        return <Preloader />;
    }
    let userPhoto = UserImg;
    if (profile.photos.small) {
        userPhoto = profile.photos.small;
    }

    let postsElements = [...posts].map(post =>
         <Post profile={profile} key={post.id} id={post.id} message={post.message} likesCount={post.likesCount} deletePost={deletePostText} />)

    


    

    return (
        <div className={classes.posts}>
            <div>
                <div className={classes.postForm}>
                    <div className={classes.user}>
                        <img className={classes.userImg} src={userPhoto} alt="" />
                    <h3>{profile.fullName}</h3>
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





