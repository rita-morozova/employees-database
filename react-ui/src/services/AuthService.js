import axios from 'axios';

const baseUrl = 'http://localhost:9001/login/';


class AuthService {

    async login(email, password) {
        const res = await axios.post(baseUrl, {email, password});
        if (res.data.accessToken) {
            sessionStorage.setItem('user', JSON.stringify(res.data));
        }
        return res.data;
    }

    logout() {
        sessionStorage.removeItem('user')
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'))
    }

}

export default new AuthService();
