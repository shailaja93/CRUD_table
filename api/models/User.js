/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'user',
  attributes: {
    id: {
    	type: 'INTEGER',
    	primaryKey: true,
    	autoIncrement: true
    },
    username: {
    	type: 'STRING'
    },
    password: {
    	type: 'STRING'
    }
  }
};

