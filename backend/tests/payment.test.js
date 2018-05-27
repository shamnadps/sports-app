const services = require('../src/services');
const utils = require('../src/utils');
describe('Payment test', () => {
    test('validate the payment request', () => {
        const paymentModel = {
            amount: 12,
        };
        const paymentRequest = services.bambora.createBamboraPaymentRequest(
            paymentModel
        );
        expect(paymentRequest.products[0].tax).toEqual(10);
        expect(paymentRequest.products[0].pretax_price).toEqual(1091);
        expect(paymentRequest.products[0].price).toEqual(1200);
    });

    test('validate the payment amount', () => {
        const invalidAmount =
            'Amount not valid. Please try with a valid amount';
        expect(utils.payments.validateAmount(0)).toEqual(invalidAmount);
        expect(utils.payments.validateAmount(-1)).toEqual(invalidAmount);
        expect(utils.payments.validateAmount(55)).toEqual(invalidAmount);
        expect(utils.payments.validateAmount(51)).toEqual(invalidAmount);
        expect(utils.payments.validateAmount(101)).toEqual(invalidAmount);
        expect(utils.payments.validateAmount(1)).toBeUndefined();
        expect(utils.payments.validateAmount(25)).toBeUndefined();
        expect(utils.payments.validateAmount(50)).toBeUndefined();
    });
});
