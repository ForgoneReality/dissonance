
export const createMessage = (message) => {
    return $.ajax({
        url: "/api/messages",
        method: "post",
        data: {message}
    })
}


export const deleteMessage = (msgId) => (
    $.ajax({
        url: `/api/messages/${msgId}`,
        method: "delete"
    })
)

export const updateMessage = (message) => (
    $.ajax({
        url: `/api/messages/${message.id}`,
        method: "PATCH",
        data: {message}
    })
)

export const pinMessage = (msgId) => (
    $.ajax({
        url:`/api/messages/${msgId}/pin`,
        method: "patch"
    })
)