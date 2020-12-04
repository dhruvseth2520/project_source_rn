import env from "../utils/environment";

export const apiLogin = (userId, email, name, photoUrl) => {
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