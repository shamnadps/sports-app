const models = require('../models');
module.exports = {
    getEvents: async () => {
        return await models.events.findAll({});
    },

    getEventById: async (id) => {
        return await models.events.findAll({
            where: {
                id,
            },
        });
    },
};
