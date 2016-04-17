var Database = require('./connection');

var Course = Database.sequelize.define('Course', {
    id: {type: Database.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: Database.DataTypes.STRING
});

var Task = Database.sequelize.define('Task', {
    id: {type: Database.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: Database.DataTypes.STRING,
    maxPoints: Database.DataTypes.INTEGER
});

var CourseFulfilment = Database.sequelize.define('CourseFulfilment', {
    id: {type: Database.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    studentNumber: Database.DataTypes.STRING
});

var TaskFulfilment = Database.sequelize.define('TaskFulfilment', {
    id: {type: Database.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    points: Database.DataTypes.INTEGER
});

var User = Database.sequelize.define('User', {
    id: {type: Database.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    username: Database.DataTypes.STRING,
    password: Database.DataTypes.STRING
});

Task.belongsTo(Course);
CourseFulfilment.belongsTo(Course);
TaskFulfilment.belongsTo(Task);
TaskFulfilment.belongsTo(CourseFulfilment);

Course.hasMany(CourseFulfilment);
Course.hasMany(Task);
CourseFulfilment.hasMany(TaskFulfilment);
Task.hasMany(TaskFulfilment);

Database.sequelize.sync();
