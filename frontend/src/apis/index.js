// Is an abstraction to communicate with backend

const BASE_PATH = '/api';

const myFetch = (url, config = {}) =>
    window.fetch(BASE_PATH + url, {
        headers: { 'content-type': 'application/json', ...config.headers },
        method: config.method || 'GET',
        credentials: 'same-origin',
        body: JSON.stringify(config.body),
    });

export const checkLoginStatus = () =>
    myFetch(`/users/me`).then((res) => res.json());

export const login = ({ pin, phoneNumber }) =>
    myFetch(`/users/login`, {
        headers: {
            credentials: 'same-origin',
        },
        method: 'POST',
        body: {
            pin,
            phoneNumber,
        },
    }).then((res) => res.json());

export const fetchCourses = (config) => {
    const queries = Object.keys(config)
        .map((key) => `${key}=${config[key]}`)
        .join('&');
    return myFetch(`/courses?${encodeURI(queries)}`).then((res) => res.json());
};
