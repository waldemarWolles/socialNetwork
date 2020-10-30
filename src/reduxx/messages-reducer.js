const ADD_MESSAGE = 'ADD_MESSAGE';

let initialState = {
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
}

const messagesReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: 7,
                message: action.newMessageText,
            }

            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }

        default:
            return state;

    }
}


export const addMessageActionCreator = (newMessageText) => ({type: ADD_MESSAGE, newMessageText});

export default messagesReducer;