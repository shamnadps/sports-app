module.exports = {
    validateAmount: (amount) => {
        if (
            typeof amount !== 'number' ||
            isNaN(amount) ||
            amount <= 0 ||
            amount > 50
        ) {
            return 'Amount not valid. Please try with a valid amount';
        }
    },
};
