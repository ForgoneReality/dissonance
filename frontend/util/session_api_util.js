
export const signup = (user) => (
    $.ajax({
        url: "/api/users",
        method: "post",
        data: {user}
    })
)


export const logout = () => (
    $.ajax({
        url: "/api/session",
        method: "delete"
    })
)

export const login = (user) => (
    $.ajax({
        url: "/api/session",
        method: "post",
        data: {user}
    })
)

export const demo = () => (
    $.ajax({
        url: "/api/session/demo",
        method: "post"
    })
)