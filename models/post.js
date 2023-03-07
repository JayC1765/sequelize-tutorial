'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // belongs an association to another model
    static associate({ User }) {
      // Sequelize defaults to using the model + PK in uppercase "UserId" so we can configure the changes by passing in a value to our foreign Key property "userId"
      // The "as" property allows you to give an alias to the User model which you can then access within the endpoints within the server (see get all posts route in app.js for details)
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
      };
    }
  }
  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'posts',
      modelName: 'Post',
    }
  );
  return Post;
};
