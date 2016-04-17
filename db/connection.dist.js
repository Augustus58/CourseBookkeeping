var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://username:password@host:port/database', {
    dialect: 'postgres',
    protocol: 'postgres'
});

module.exports = {
    DataTypes: Sequelize,
    sequelize: sequelize
};
