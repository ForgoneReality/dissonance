//For the "root" server
// export const fetchAllServers = () => (
//     $.ajax({
//         url: `/api/servers`,
//         method: "get"
//     })
// )

export const getServersList = (userId) => (
    $.ajax({
        url: `/api/users/${userId}/servers`,
        method: "get"
    })
)

export const fetchServer = (id) => (
    $.ajax({
        url: `api/servers/${id}`,
        method: "get"
    })
)

export const channelRedirect = (id) => (
    $.ajax({
        url: `api/servers/${id}/mainchannel`,
        method: "get"
    })
)