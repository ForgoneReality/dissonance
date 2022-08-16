export const getFriendList = (userId) => (
    $.ajax({
        url: `/api/users/${userId}/friends`,
        method: "get"
    })
)

export const findUser = (username, four_id) => (
    $.ajax({
        url: `/api/users/search`,
        method: "get",
        data: {
            username: username, fourdigit_id: four_id
        }
    })
)

export const addFriend = (user_id, friend_id) => (
    $.ajax({
        url: `/api/friendships`,
        method: "post",
        data: {
            friendship: {
                user_id: user_id, friend_id: friend_id
            }
        }
    })
)

    export const updateUser = (id, user) => {
    console.log("???", id, user)
    return $.ajax({
        url: `api/users/${id}`,
        method: "patch",
        data: {user}
    })
}

export const changePFP = (id, pfp_url) => {
    return $.ajax({
        url: `api/users/${id}/changePFP`,
        method: "patch",
        data: {pfp_url}
    })
}