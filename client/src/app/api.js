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
            fetchOfCategory: (category) => api.get(url, {
                params: {
                    category: category,
                },
            }),
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
            fetchDetails: () => api.get(url + 'details'),
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
    },
    public(url = baseUrl + "public/") {
        return {
            fetchResources: (payload) => axios.get(url + "resources/", payload),
            fetchCategories: (payload) => axios.get(url + "categories/details", payload),
            fetchResourcesOfCategory: (category) => axios.get(url + "resources/", {
                params: {
                    category: category,
                },
            }),
        }
    },
    admin(token, url = baseUrl + "admin/") {
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
            fetchResources: () => api.get(url + "resources/"),
            fetchCategories: () => api.get(url + "categories/"),
            approveResource: (id) => api.put(url + `resources/${id}/approve`)
        }
    },
}

export default api