// Is an abstraction to communicate with backend

class API {
    BASE_URL = '/api';
    myFetch = (url, config) =>
        window.fetch(this.BASE_URL + url, {
            headers: { 'content-type': 'application/json' },
            ...config,
        });

    async login({ pin, phoneNumber }) {
        try {
            return await this.myFetch(`/users/login`, {
                method: 'POST',
                body: JSON.stringify({
                    pin,
                    phoneNumber,
                }),
            }).then((res) => res.json());
        } catch (error) {
            throw error;
        }
    }

    async fetchCourses(config) {
        try {
            const queries = Object.keys(config)
                .map((key) => `${key}=${config[key]}`)
                .join('&');
            return await this.myFetch(`/courses?${queries}`).then((res) =>
                res.json()
            );
        } catch (error) {
            throw error;
        }
    }
}

export default API;
