import { PostsType, ProfileType } from '../types/types';
import profileReducer, { actionsProfileReducer} from './profile-reducer';

let state = {
    posts: [
        { id: 1, message: 'Post 1t', likesCount: 4 },
        { id: 2, message: 'Post 2ntent', likesCount: 14 },
        { id: 3, message: 'Post 3ntentcontent', likesCount: 34 },
        { id: 4, message: 'It-Kamasutra.com', likesCount: 44 },
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: ' ',
    errorMessage: '' as string | null,
}

test('length of posts should be incremented', () => {
    //1. test data
    let action = actionsProfileReducer.addPost('It-Kamasutra.com', 5);
    
    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
   expect(newState.posts.length).toBe(5);
});

test('length of posts should be incremented', () => {
    //1. test data
    let action = actionsProfileReducer.addPost('It-Kamasutra.com', 5);
    
    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
   expect(newState.posts[4].message).toBe('It-Kamasutra.com');
});

test('after delete length of messages should be decrement', () => {
    //1. test data
    let action = actionsProfileReducer.deletePost(1);
   
    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
   expect(newState.posts.length).toBe(3);
});
 
