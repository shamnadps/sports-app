import { decorate, observable, action, autorun } from 'mobx';

const fakeCredentials = {
    phoneNumber: '+358444444444',
    pinCode: '1234',
};

const toStringFromObject = (obj) =>
    Object.keys(obj)
        .map((key) => obj[key])
        .join('');

class UserStore {
    // @TODO: reset this flag back to false before commit
    isAuthenticated = false;
    isAuthenticating = false;
    authenticationFailed = false;
    phoneNumber = '+358 123 456 789';
    phoneNumberIncorrect = false;
    pinCode = {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
    };
    pinCodeIsSet = false;

    // sets and validate phoneNumber
    setPhoneNumber(input) {
        this.phoneNumber = input.replace(/^\s*0/, '+358');
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
        // code try to authenticate...

        console.log('Beep beep.... I am authenticating');
        try {
            await new Promise((resolve, reject) => {
                // this is because "this" loses scope in setTimeOut
                const execute = () => {
                    const processedPhoneNumber = this.phoneNumber
                        .replace(/\s/g, '')
                        .replace('0', '+358');
                    const proccessedPinCode = toStringFromObject(this.pinCode);

                    if (
                        fakeCredentials.phoneNumber === processedPhoneNumber &&
                        fakeCredentials.pinCode === proccessedPinCode
                    ) {
                        resolve('done');
                    } else {
                        reject('Incorrect credentials');
                    }
                };
                setTimeout(execute.bind(this), 1000);
            });
            console.log('Just kidding there is no such system atm. You are in');
            this.isAuthenticated = true;
        } catch (err) {
            console.error(err);
            console.log('Resetting inputs');
            // this boolean is flipped to true and set a chain of action to happen
            this.authenticationFailed = true;
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
    authenticationFailed: observable,
    authenticate: action.bound,
    phoneNumber: observable,
    phoneNumberIncorrect: observable,
    pinCode: observable,
    setPhoneNumber: action,
    setInputCode: action,
});
