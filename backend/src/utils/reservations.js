const users = require('./users');
const courses = require('./courses');
const events = require('./events');
const validateReservationRequest = (reservationRequest) => {
    const userId = reservationRequest.userId;
    const eventId = reservationRequest.eventId;
    const courseId = reservationRequest.courseId;
    const ticketType = reservationRequest.ticketType;
    const ticketPrice = reservationRequest.ticketPrice;
    const bookingStatus = reservationRequest.bookingStatus;

    const userIdError = users.validateUserId(userId);

    if (userIdError) {
        return userIdError;
    }

    const eventIdError = events.validateEventId(eventId);

    if (eventIdError) {
        return eventIdError;
    }

    const courseIdError = courses.validateCourseId(courseId);

    if (courseIdError) {
        return courseIdError;
    }

    const ticketTypeError = validateTicketType(ticketType);

    if (ticketTypeError) {
        return ticketTypeError;
    }

    const ticketPriceError = validateTicketPrice(ticketPrice);

    if (ticketPriceError) {
        return ticketPriceError;
    }

    const bookingStatusError = validateBookingStatus(bookingStatus);

    if (bookingStatusError) {
        return bookingStatusError;
    }
};

const validateBookingStatus = (bookingStatus) => {
    if (typeof bookingStatus !== 'number' || bookingStatus) {
        return 'booking status is not valid';
    }
};

const validateTicketPrice = (ticketPrice) => {
    if (typeof ticketPrice !== 'number' || ticketPrice <= 0) {
        return 'Ticket Price is not valid';
    }
};

const validateTicketType = (ticketType) => {
    if (
        typeof ticketType !== 'string' ||
        !['Single_Ticket'].includes(ticketType)
    ) {
        return 'Ticket Type is not valid';
    }
};

const checkBalance = (balance, ticketPrice) => {
    if (balance < ticketPrice) {
        return 'You dont have enough balance to make this reservation.';
    }
};

const checkBookingLimit = (count, limit) => {
    if (count === limit) {
        return 'There are no tickets left for this event.';
    }
};

const validateReservationId = (reservationId) => {
    if (typeof reservationId !== 'number' || isNaN(reservationId)) {
        return 'Reservation Id is not valid';
    }
};

module.exports = {
    validateReservationRequest,
    validateBookingStatus,
    validateTicketPrice,
    validateTicketType,
    checkBalance,
    checkBookingLimit,
    validateReservationId,
};
