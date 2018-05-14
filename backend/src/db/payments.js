const models = require('../models');
const db = require('../sequalize_pg');

const createPayment = (paymentObj) => {
    return models.payments.create(paymentObj);
};

const getPaymentByOrderNumber = (orderNumber) => {
    return models.payments.find({ where: { order_number: orderNumber } });
};

const updatePaymentStatus = (orderNumber, status, transaction) => {
    return models.payments.update(
        { payment_status: status },
        {
            where: { order_number: orderNumber },
        },
        {
            transaction,
        }
    );
};

module.exports = {
    createPayment,
    updatePaymentStatus,
    getPaymentByOrderNumber,
};
