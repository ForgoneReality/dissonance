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
    return $.ajax({
        url: `api/users/${id}`,
        method: "patch",
        data: {user}
    })
}

export const setNickName = (nickname, user_id, server_id) => {
    return $.ajax({
        url: `api/users/${user_id}/nickname`,
        method: "patch",
        data: {
            nickname: nickname, 
            server_id: server_id
        }
    })
}

export const updateBio = (id, bio) => {
    return $.ajax({
        url: `api/users/${id}/updateBio`,
        method: "patch",
        data: bio
    })
}

export const setStatus = (id, status) => (
    $.ajax({
        url: `/api/users/${id}/status`,
        method: "patch",
        data: {status: status}
    })
)