export const fetchChannel = (channelId) => (
    $.ajax({
        url: `/api/channels/${channelId}`,
        method: "get"
    })
)

export const createChannel = (channel) => (
    $.ajax({
        url: `/api/channels`,
        method: "post",
        data: {channel}
    })
)

export const removeChannel = (channel_id) => (
    $.ajax({
        url: `api/channels/${channel_id}`,
        method: "delete"
    })
)