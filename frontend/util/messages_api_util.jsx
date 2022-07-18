
export const createMessage = (message) => (
    $.ajax({
        url: "/api/messages",
        method: "post",
        data: {message}
    })
)


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