const { Sequelize, DataTypes } = require('sequelize');

// SQLite database setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Teacher model definition
const Teacher = sequelize.define('Teacher', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  numClasses: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Initialize database
const initializeDb = async () => {
  await sequelize.sync();
};

module.exports = {
  Teacher,
  initializeDb
};
