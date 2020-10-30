import { getAuthThunk } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';




let initialState = {
    initialized: false

}

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default: {
            return state;
        }

    }
}

// Action creators


export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthThunk());

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });


}



export default appReducer;