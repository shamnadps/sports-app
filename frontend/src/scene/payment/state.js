import { observable, decorate, action } from 'mobx';
import qs from 'qs';

class PaymentFormState {
    requestToClose = false;
    paymentFailed = true;

    validateRequest(request) {
        if (request && request.length > 0) {
            const parsed = qs.parse(request.slice(1));
            if (parsed.status === '0') {
                this.paymentFailed = false;
                return parsed;
            }
        }
    }
    constructor(userStore) {
        this.userStore = userStore;
    }
}

export default decorate(PaymentFormState, {
    requestToClose: observable,
    paymentFailed: observable,
    validateRequest: action.bound,
});
