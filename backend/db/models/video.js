'use strict';
const { Model } = require('sequelize');
const { Sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {

  class Video extends Model {

    static associate(models) {
      Video.belongsTo(models.User, { foreignKey: 'userId' });
      Video.belongsTo(models.Subject, { foreignKey: 'subjectId' })
      Video.hasMany(models.Comment, { foreignKey: 'videoId', onDelete: 'CASCADE', hooks: true });
    }
  }

  Video.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 255]
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isUrl: true,
      // }
    },
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};
