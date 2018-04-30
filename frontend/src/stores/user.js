import { decorate, observable, action, autorun, computed } from 'mobx';
import API from '../apis';

// constants
const BACKEND_API = new API();
const DEFAULT_PIN = {
    '0': '',
    '1': '',
    '2': '',
    '3': '',
};

// local utility helper
const toStringFromObject = (obj) => Object.values(obj).join('');
const processPhoneNumber = (phoneNumber) =>
    phoneNumber.replace(/^0/, '+358').replace(/\s/g, '');

class UserStore {
    isAuthenticating = false;
    token = null;
    authenticationFailed = false;
    phoneNumber = '';
    phoneNumberIncorrect = false;
    pinCode = DEFAULT_PIN;
    pinCodeIsSet = false;
    balance = 100;

    get isAuthenticated() {
        // user is authenticated if there exists a token, otherwise they are guests
        return !!this.token;
    }
    constructor() {
        try {
            const value = window.localStorage.getItem('token');
            if (value) {
                this.token = value;
            } else throw new Error('Token is null');
        } catch (err) {
            console.log('Session expired');
        }
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

    async authenticate() {
        this.isAuthenticating = true;

        try {
            const userData = await BACKEND_API.login({
                pin: toStringFromObject(this.pinCode),
                phoneNumber: processPhoneNumber(this.phoneNumber),
            });
            // @TODO: Token is a "for now" placeholder implementation. To be removed when official
            // strategy for token is decided.
            this.token = userData.token;
            this.username = userData.username;
        } catch (err) {
            this.authenticationFailed = true;
            console.log(err);
        }
    }

    authenticationFailedReaction = autorun(() => {
        if (this.authenticationFailed) {
            this.pinCodeIsSet = false;
            window.setTimeout(() => {
                this.authenticationFailed = false;
                this.pinCode = DEFAULT_PIN;
            }, 1500);
        }
    });

    authenticationSuccessfulReaction = autorun(() => {
        if (!this.token) return;
        this.isAuthenticating = false;
        this.authenticationFailed = false;
        window.localStorage.setItem('token', this.token);
    });
}

export default decorate(UserStore, {
    isAuthenticated: computed,
    isAuthenticating: observable,
    authenticationFailed: observable,
    token: observable,
    phoneNumberIncorrect: observable,
    phoneNumber: observable,
    pinCode: observable,
    balance: observable,
    authenticate: action.bound,
    setPhoneNumber: action,
    setInputCode: action,
    setStatusAsGuest: action.bound,
});
