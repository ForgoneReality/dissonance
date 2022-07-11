export const createConversation = (convo) => (
    $.ajax({
        url: "/api/conversations",
        method: "post",
        data: {convo}
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

export const getConversationList = (userId) => (
    $.ajax({
        url: `/api/users/${userId}/conversations`,
        method: "get"
    })
)