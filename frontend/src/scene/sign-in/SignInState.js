import { decorate, observable, action, autorun } from 'mobx';

class SignInState {
    phoneNumber = '+358 XXX XXX XXX';
    phoneNumberIncorrect = false;
    pinCode = {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
    };
    pinCodeIsSet = false;

    setPhoneNumber(input) {
        this.phoneNumber = input;
        if (this.phoneNumber >= 10) {
            // Once there is enough digit, validates
            this.phoneNumberIncorrect = input.match(
                /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
            );
        }
    }
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
        if (Object.values(this.pinCode).every((code) => code !== '')) {
            this.pinCodeIsSet = true;
        }
        return true;
    };
    pinCodeIsSetEffect = autorun(() => {
        if (this.pinCodeIsSet)
            // do something
            console.log('pinCodeIsSet');
    });
}

export default decorate(SignInState, {
    phoneNumber: observable,
    phoneNumberIncorrect: observable,
    pinCode: observable,
    pinCodeIsSet: observable,
    setPhoneNumber: action,
    setInputCode: action,
});
