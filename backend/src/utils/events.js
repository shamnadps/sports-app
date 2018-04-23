module.exports = {
    validateEventId: (eventId) => {
        if (typeof eventId !== 'number' || isNaN(eventId)) {
            return 'Event Id is not valid';
        }
    },
};
