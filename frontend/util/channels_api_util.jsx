export const fetchChannel = (channelId) => (
    $.ajax({
        url: `/api/channels/${channelId}`,
        method: "get"
    })
)

// export const createChannel

