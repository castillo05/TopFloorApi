'use strict';

module.exports = (sequelize, DataTypes) => {
  const Agents = sequelize.define('agents', {
    AGENT_CODE: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    AGENT_NAME: DataTypes.STRING,
    COMMISSION: DataTypes.INTEGER,
    COUNTRY: DataTypes.STRING,
    PHONE_NO: DataTypes.STRING,
    WORKING_AREA: DataTypes.STRING
  }, {});
  return Agents;
};