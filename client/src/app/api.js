import axios from "axios";

const baseUrl = "http://localhost:9000/api/"

const api = {
    auth(url = baseUrl + "auth/") {
        return {
            signup: (payload) => axios.post(url + "signup/", payload),
            signin: (payload) => axios.post(url + "signin/", payload),
        }
    }
}

export default api