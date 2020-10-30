import messagesReducer from "./messages-reducer";
import profileReducer from "./profile-reducer";


let store = {

  _callSubscriber() {
    console.log('State is changed')
  },


  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Post content contentcontentcontentcontentcontentcontent', likesCount: 4 },
        { id: 2, message: 'Post content contentcontentcontentcontentcontentcontent', likesCount: 14 },
        { id: 3, message: 'Post content contentcontentcontentcontentcontentcontent', likesCount: 34 },
        { id: 4, message: 'Post content contentcontentcontentcontentcontentcontent', likesCount: 44 },
      ],
      newPostText: 'Hello it`s me'
    },
    messagesPage: {
      dialogs: [
        { id: 1, name: 'Jack' },
        { id: 2, name: 'John' },
        { id: 3, name: 'Jessy' },
        { id: 4, name: 'Luke' },
        { id: 5, name: 'Will' },
        { id: 6, name: 'Jennifer' },
      ],

      messages: [
        { id: 1, message: 'Hello it\'s me!' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Good! And you?' },
        { id: 4, message: 'I\'m fine too' },
        { id: 5, message: 'too' },
        { id: 6, message: 'oo' },
      ],
      newMessageText: 'NewMessage'
    }

  },

  getState() {
    return this._state;
  },

  dispatch(action) {
    
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = messagesReducer(this._state.messagesPage, action);
   
    this._callSubscriber(this._state);

  },
    
  subscribe(observer) {
    this._callSubscriber = observer;
  }
}





export default store;
