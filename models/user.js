'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // belongs an association to another model
    static associate({ Post }) {
      // Refer to post model for details. Since users may have many post, this references the "userId" FK within the posts tables
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
      };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // look up documentation for different types of validation like unique, lowercase, etc
        validate: {
          notNull: true,
          // notNull: { msg: 'Name must not be null'},
          notEmpty: true,
          // notEmpty: { msg: 'Name must not be empty'},
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Email must not be null' },
          notEmpty: { msg: 'Email must not be empty' },
          isEmail: { msg: 'Must be a valid email address' },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );
  return User;
};
