const models = require('../models');
module.exports = {
    getEvents: () => {
        return models.events.findAll({});
    },

    getEventById: (id) => {
        return models.events.findAll({
            attributes: [
                ['id', 'eventId'],
                ['start', 'startDate'],
                ['end', 'endDate'],
                'teachingplace',
            ],
            where: {
                id,
            },
        });
    },
};
