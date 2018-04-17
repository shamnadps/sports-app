import { decorate, observable, action } from 'mobx';

class UserStore {
    phoneNumber;
    pinCode;
    isAuthenticated = false;
    isAuthenticating = false;

    async authenticate(phoneNumber, pinCode) {
        // code try to authenticate...
        console.log(
            'Beep beep.... I am authenticating, just kidding there is no such system atm'
        );
        await new Promise((resolve, reject) => {
            setTimeout(() => resolve('done'), 5000);
        });
        this.isAuthenticated = true;
    }
}

export default decorate(UserStore, {
    isAuthenticated: observable,
    isAuthenticating: observable,
    authenticate: action.bound,
});
