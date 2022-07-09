
export const createMessage = (msg) => (
    $.ajax({
        url: "/api/messages",
        method: "post",
        data: {msg}
    })
)


export const deleteMessage = (msgId) => (
    $.ajax({
        url: `/api/messages/${msgId}`,
        method: "delete"
    })
)

export const fetchMessages = () => (
    $.ajax({
        url: "/api/messages",
        method: "get"
    })
)

export const fetchMessage = (msgId) => (
    $.ajax({
        url: `/api/messages/${msgId}`,
        method: "get"
    })
)

export const updateMessage = (msg) => (
    $.ajax({
        url: `/api/messages/${msg.id}`,
        method: "PATCH",
        data: {msg}
    })
)