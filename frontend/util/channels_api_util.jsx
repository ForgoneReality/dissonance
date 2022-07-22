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

