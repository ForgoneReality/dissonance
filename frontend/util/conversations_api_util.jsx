export const createConversation = (user1_id, user2_id) => (
    $.ajax({
        url: "/api/conversations",
        method: "post",
        data: {conversation:{user1_id: user1_id, user2_id: user2_id}}
    })
)

// export const fetchConversations = () => (
//     $.ajax({
//         url: "/api/conversations",
//         method: "get"
//     })
// ) //not sure if needed

export const fetchConversation = (convoId) => (
    $.ajax({
        url: `/api/conversations/${convoId}`,
        method: "get"
    })
)

export const readConversation = (convoId, userId) => {
    return $.ajax({
        url: `/api/conversations/${convoId}/read`,
        method: "patch",
        data: {userId}
    })
}

export const getConversationList = (userId) => (
    $.ajax({
        url: `/api/users/${userId}/conversations`,
        method: "get"
    })
)

export const updateConversation = (id, convo, userId) => (
    $.ajax({
        url: `api/conversations/${id}`,
        method: "patch",
        data: {conversation: convo, userId: userId}
    })
)

export const searchConversation = (user1_id, user2_id) => (
    $.ajax({
        url: `api/conversations/search`,
        method: "get",
        data: {conversation:{user1_id: user1_id, user2_id: user2_id}}
    })
)

export const otherCreateConversation = (user1_id, user2_id) => (
    $.ajax({
        url: "/api/conversations/other",
        method: "post",
        data: {conversation:{user1_id: user1_id, user2_id: user2_id}, userId: user1_id}
    })
)