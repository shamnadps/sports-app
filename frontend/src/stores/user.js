import { decorate, observable, action, autorun } from 'mobx';

const fakeCredentials = {
    phoneNumber: '+358444444444',
    pinCode: '1234',
};

const toStringFromObject = (obj) =>
    Object.keys(obj)
        .map((key) => obj[key])
        .join('');
const processPhoneNumber = (phoneNumber) =>
    phoneNumber.replace(/^0/, '+358').replace(/\s/g, '');

class UserStore {
    isAuthenticated = false;
    isAuthenticating = false;
    isGuest = false;
    authenticationFailed = false;
    phoneNumber = '';
    phoneNumberIncorrect = false;
    pinCode = {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
    };
    pinCodeIsSet = false;
    balance = 100;

    constructor() {
        try {
            this.token = window.localStorage.getItem('token');
            if (this.token) this.isAuthenticated = true;
            else throw new Error('Token is null');
        } catch (err) {
            console.log('Session expired');
        }
    }
    setStatusAsGuest() {
        this.isGuest = true;
    }
    // sets and validate phoneNumber
    setPhoneNumber(input) {
        this.phoneNumber = input;
        this.phoneNumberIncorrect = input.match(
            /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        );
    }

    // sets and authenticate
    setInputCode = (position, value) => {
        // pin code array only have 4 digits
        if (
            this.pinCodeIsSet ||
            position < 0 ||
            position > 3 ||
            value > 10 ||
            isNaN(value)
        )
            return false;
        this.pinCode[position] = value;
        if (
            Object.values(this.pinCode).every((code) => code !== '') &&
            !this.phoneNumberIncorrect
        ) {
            this.pinCodeIsSet = true;
            // the PINCODE is now complete, attempts to authenticate
            this.authenticate();
        }
        return true;
    };

    // @TODO: refactor this behemoth into a better defined action-reaction flow
    async authenticate() {
        this.isAuthenticating = true;
        const pin = toStringFromObject(this.pinCode);
        const phoneNumber = processPhoneNumber(this.phoneNumber);
        try {
            const response = await fetch(`/api/users/login`, {
                headers: {
                    'content-type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    pin,
                    phoneNumber,
                }),
            });
            const userData = await response.json();
            this.isAuthenticated = true;
            this.isAuthenticating = false;
            this.isGuest = false;
            this.token = userData.token;
            this.username = userData.username;

            // persist token to localStorage for now
            window.localStorage.setItem('token', userData.token);
            debugger;
        } catch (err) {
            this.isAuthenticating = false;
            this.authenticationFailed = true;
            console.log(err);
        }
    }

    authenticationFailedReaction = autorun(() => {
        if (this.authenticationFailed) {
            this.pinCodeIsSet = false;
            window.setTimeout(() => {
                this.authenticationFailed = false;
                this.pinCode = {
                    '0': '',
                    '1': '',
                    '2': '',
                    '3': '',
                };
            }, 1500);
        }
    });
}

export default decorate(UserStore, {
    isAuthenticated: observable,
    isAuthenticating: observable,
    isGuest: observable,
    authenticationFailed: observable,
    authenticate: action.bound,
    phoneNumber: observable,
    phoneNumberIncorrect: observable,
    pinCode: observable,
    balance: observable,
    setPhoneNumber: action,
    setInputCode: action,
    setStatusAsGuest: action.bound,
});
