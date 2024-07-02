'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subject.hasMany(models.Video, { foreignKey: 'subjectId' , onDelete: 'CASCADE', hooks: true})
    }
  }


  Subject.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 100],
      }
    },
  },


  {
    sequelize,
    modelName: 'Subject',
  });


  return Subject;
};
