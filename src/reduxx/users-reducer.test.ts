import usersReducer, { InitialStateUsersReducerType, actionsUsersReducer } from './users-reducer';


let state:  InitialStateUsersReducerType

    beforeEach(() => {
      state  = {
            users: [
                {
                    id: 0, name: 'Walter 0', followed: false, 
                    photos:{small: null, large: null}, status: 'status 0'
                },
                {
                    id: 1, name: 'John 1', followed: false, 
                    photos:{small: null, large: null}, status: 'status 1'
                },
                {
                    id: 2, name: 'Jack 2', followed: true, 
                    photos:{small: null, large: null}, status: 'status 2'
                },
                {
                    id: 3, name: 'Jessica 3', followed: true, 
                    photos:{small: null, large: null}, status: 'status 3'
                },
            ] ,
            pageSize: 100,
            pageSizeFriends: 10,
            totalUsersCount: 0,
            currentPage: 1,
            isFetching: false,
            followingInProgress: [] 
        }
        
    })


test('follow success', () => {
    const newState = usersReducer(state, actionsUsersReducer.follow(1))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test('unfollow success', () => {
    const newState = usersReducer(state, actionsUsersReducer.unfollow(3))

    
    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
})