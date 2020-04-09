'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

   
      /************************************************************
       * 
       * Pour lancer la migration : npx sequelize db:migrate
       * Pour annuler la migration : npx sequelize db:migrate:undo
       * 
       ************************************************************/

   return queryInterface.createTable('searchs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    brand: {
      allowNull: false,
      type: Sequelize.STRING
    },
    model: {
      allowNull: false,
      type: Sequelize.STRING
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deleted_at: {
      type: Sequelize.DATE
    }
  });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('searchs');
  }
};
