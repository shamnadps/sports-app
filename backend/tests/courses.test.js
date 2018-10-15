const utils = require('../src/utils');
describe('Grynos Price Calculation', () => {
    test('Validate Prices', () => { });
    let price = utils.courses.getCoursePrice(82, new Date(2018, 10, 14, 16, 0));
    expect(price).toEqual(2.5);
    price = utils.courses.getCoursePrice(82, new Date(2018, 10, 15, 17, 0));
    expect(price).toEqual(4);
    price = utils.courses.getCoursePrice(488, new Date(2018, 5, 10, 16, 0));
    expect(price).toEqual(2.5);
    price = utils.courses.getCoursePrice(488, new Date(2018, 5, 10, 17, 0));
    expect(price).toEqual(2.5);
});
