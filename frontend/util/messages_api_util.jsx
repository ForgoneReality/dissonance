
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

export const updateMessage = (msg) => (
    $.ajax({
        url: `/api/messages/${msg.id}`,
        method: "PATCH",
        data: {msg}
    })
)