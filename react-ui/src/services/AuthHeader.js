export default function authHeader() {
    const user = JSON.parse(sessionStorage.getItem('user'))

    // If there is a logged in user with accessToken, returns HTTP header
    // otherwise, returns an empty object
    if (user && user.accessToken) {
        return {
            Autorization: "Bearer" + user.accessToken
        }
    } else {
        return {}
    }
}
