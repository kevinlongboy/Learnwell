'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
// const { all } = require('../../routes/api/spots'); // NEVER AGAIN

module.exports = (sequelize, DataTypes) => {

  class User extends Model {

    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    };

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    };

    // LOGIN
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    };

    // SIGN UP
    static async signup({ firstName, lastName, username, password, email, avatar }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        hashedPassword,
        email,
        avatar,
      });
      return await User.scope('currentUser').findByPk(user.id);
    };

    static associate(models) {
      User.hasMany(models.Video, { foreignKey: 'userId' });
      User.hasMany(models.Comment, { foreignKey: 'userId' });
    };
  };

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [2, 25]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [2, 25]
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Username cannot be an email");
            }
          }
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [3, 256],
        }
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
