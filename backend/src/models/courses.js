const db = require('../sequalize_pg');
const Sequelize = require('sequelize');
const locationModel = require('./locations');

const courses = db.define('courses', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    code: Sequelize.STRING,
    description: Sequelize.TEXT,
    descriptionInternet: Sequelize.TEXT,
    price: Sequelize.FLOAT,
    priceMaterial: Sequelize.FLOAT,
    firstSessionDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    firstSessionWeekDay: Sequelize.STRING,
    lastSessionDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    internetEnrollment: Sequelize.BOOLEAN,
    minStudentCount: Sequelize.INTEGER,
    maxStudentCount: Sequelize.INTEGER,
    firstEnrollmentDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    lastEnrollmentDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    acceptedCount: Sequelize.INTEGER,
    ilmokink: Sequelize.STRING,
    teachingSession: Sequelize.ARRAY(Sequelize.TEXT),
});
courses.hasMany(locationModel, { as: 'location' });
module.exports = courses;
