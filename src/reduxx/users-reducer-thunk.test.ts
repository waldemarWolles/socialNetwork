import { APIResponseType, ResultCodeEnums } from "../api/api"
import { usersAPI } from "../api/users-api"
import { actionsUsersReducer, followThunk, unfollowThunk } from "./users-reducer"

jest.mock("../api/users-api")

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    usersAPIMock.postFollow.mockClear()
    usersAPIMock.deleteUnfollow.mockClear()
})


const result: APIResponseType = {
    resultCode: ResultCodeEnums.Success,
    messages: [],
    data: {}
}


usersAPIMock.postFollow.mockReturnValue(Promise.resolve(result))
usersAPIMock.deleteUnfollow.mockReturnValue(Promise.resolve(result))

test('success follow thunk', async () => {

    const thunk = followThunk(1)
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actionsUsersReducer.toggleIsFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actionsUsersReducer.follow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actionsUsersReducer.toggleIsFollowingInProgress(false, 1))

})

test('success unfollow thunk', async () => {
   
    const thunk = unfollowThunk(1)
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actionsUsersReducer.toggleIsFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actionsUsersReducer.unfollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actionsUsersReducer.toggleIsFollowingInProgress(false, 1))

})