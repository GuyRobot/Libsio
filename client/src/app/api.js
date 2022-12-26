import axios from "axios";

const baseUrl = "http://localhost:9000/api/"

const api = {
    auth(url = baseUrl + "auth/") {
        return {
            signup: (payload) => axios.post(url + "signup/", payload),
            signin: (payload) => axios.post(url + "signin/", payload),
        }
    },
    resource(token, url = baseUrl + "resources/") {
        const api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        api.interceptors.request.use(function (config) {
            config.headers.Authorization = token
            config.headers["x-access-token"] = token
            return config;
        });
        return {
            create: (payload) => api.post(url, payload),
            fetchAll: () => api.get(url),
        }
    },
    category(token, url = baseUrl + "public/categories/") {
        const api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        api.interceptors.request.use(function (config) {
            config.headers.Authorization = token
            config.headers["x-access-token"] = token
            return config;
        });
        return {
            create: (payload) => api.post(url, payload),
            fetchAll: () => api.get(url),
        }
    },
    upload(token, url = baseUrl + "upload/") {
        const api = axios.create({
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        });
        api.interceptors.request.use(function (config) {
            config.headers.Authorization = token
            config.headers["x-access-token"] = token
            return config;
        });
        return {
            uploadImage: (file) => {
                const form = new FormData();
                form.append("image", file);
                return api.post(url + "image", form)
            }
        }
    }
}

export default api