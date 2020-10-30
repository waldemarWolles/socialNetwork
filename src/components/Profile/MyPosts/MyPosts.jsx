import React from 'react';
import classes from '../Profile.module.css';
import Post from './Posts/Post';
import UserImg from '../../../images/sideBar/user.svg';
import { Field, reduxForm } from 'redux-form';
import { required,  maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormControls/FormControls.jsx';


const MyPosts = React.memo(props => {

    console.log('RENDER');

    let postsElements = [...props.posts].map(post => <Post message={post.message} likesCount={post.likesCount} />)


    let addPostText = (values) => {
        props.addPost(values.newPostText);
    }


    return (
        <div className={classes.posts}>
            <div>

                <div className={classes.postForm}>
                    <div className={classes.user}>
                        <img className={classes.userImg} src={UserImg} alt="" />
                        <h3>User Name</h3>
                    </div>
                    <div className={classes.addPost}>
                        <AddPostReduxForm onSubmit={addPostText}/>
                    </div>
                </div>
            </div>
            { postsElements}

        </div>
    );

});

let  maxLength30 = maxLengthCreator(30);

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name='newPostText' validate={[required, maxLength30]} placeholder={'Write your text here'} />

            <button>Add post</button>
        </form>
    );
}

const AddPostReduxForm = reduxForm({
    form: 'post'
})(AddPostForm);



export default MyPosts;