'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date : {
        type: Sequelize.DATE,
        allowNull : false,
      },
      user_id : {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdte: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      provider_id : {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdte: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      cancelated_at : {
        type: Sequelize.DATE,
        allowNull : true,
      },
      created_at : {
        type: Sequelize.DATE,
        allowNull : false,
      },
      updated_at : {
        type: Sequelize.DATE,
        allowNull : false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
