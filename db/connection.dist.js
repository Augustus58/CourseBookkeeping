var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://username:password@host:port/database', {
    dialect: 'postgres',
    protocol: 'postgres'
});

sequelize.sync();

module.exports = {
    DataTypes: Sequelize,
    sequelize: sequelize
};
