const models = require('../models');
const db = require('../sequalize_pg');

module.exports = {
    createUser: async (user) => {
        await db.sync();
        return await models.users.create(user);
    },

    getUser: async (phoneNumber) => {
        return await models.users.find({
            where: { phoneNumber },
        });
    },

    getUserByPhoneAndPin: async (phoneNumber, pin) => {
        return await models.users.find({
            where: { phoneNumber, pin },
        });
    },

    getUserByToken: async (token) => {
        return await models.users.find({
            where: { token },
        });
    },

    updateUser: async (user, phoneNumber) => {
        return await models.users.update(
            {
                pin: user.pin,
                username: user.username,
            },
            {
                where: { phoneNumber },
            }
        );
    },

    deleteUser: async (phoneNumber) => {
        return await models.users.destroy({
            where: { phoneNumber },
        });
    },
};
