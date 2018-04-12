const Sequelize = require('sequelize');
const db = require('../../../sequalize_pg');

const Events = db.define('Events', {
    title: Sequelize.STRING,
});

db
    .sync()
    .then(() =>
        Events.create({
            title: 'develop',
        })
    )
    .then((user) => {
        console.log(user.toJSON());
    });

module.exports = Events;
