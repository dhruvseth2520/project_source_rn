export const DefaultHeaders = (accessToken) => {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    }
}