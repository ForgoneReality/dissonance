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

export const getServerFromLink = (server_link) => (
    $.ajax({
        url: `api/servers/${server_link}/getlink`,
        method: "get"
    })
)

export const removeServer = (id) => (
    $.ajax({
        url: `api/servers/${id}`,
        method: "delete"
    })
)

// export const createServer = (server) => (
//     $.ajax({
//         url: `api/servers`,
//         method: "post",
//         data: {
//         server
//         }
//     })
// )