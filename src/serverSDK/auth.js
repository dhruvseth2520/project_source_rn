import env from "../utils/environment";

/**
 * Returns user information in the user object + the accessToken
 * @param {*} userId 
 * @param {*} email 
 * @param {*} name 
 * @param {*} photoUrl 
 */
export const apiLogin = async (userId, email, name, photoUrl) => {
    return fetch(`${env.API_URL}/auth/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId,
            email: email,
            name: name,
            photoUrl: photoUrl
        })
    }).then(response => response.json())
}