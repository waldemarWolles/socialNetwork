import { getAuthThunk } from './auth-reducer'
import { BasicThunkType, InferActionsTypes } from './redux-store'

type InitialStateType = {
  initialized: boolean
}

let initialState: InitialStateType = {
  initialized: false,
}

const appReducer = (
  state = initialState,
  action: AppReducerActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'app/initialized_success': {
      return {
        ...state,
        initialized: true,
      }
    }
    default: {
      return state
    }
  }
}

// Action creators

type AppReducerActionsTypes = InferActionsTypes<typeof actionsAppReducer>

export const actionsAppReducer = {
  initializedSuccess: () => ({ type: 'app/initialized_success' } as const),
}

// ThunkCreators

// type GetStateType = () => AppRootStateType
// type DispatchType = Dispatch<AppReducerActionsTypes>

type ThunkType = BasicThunkType<AppReducerActionsTypes>

export const initializeApp = (): ThunkType => {
  return async (dispatch) => {
    let promise = await dispatch(getAuthThunk())

    Promise.all([promise]).then(() => {
      dispatch(actionsAppReducer.initializedSuccess())
    })
  }
}

export default appReducer
