  const { Model, DataTypes } = require('sequelize');

  class User extends Model {}

  module.exports = (sequelize) => {
    User.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        utilisateur: { type: DataTypes.STRING(25), allowNull: false },
        prenom: { type: DataTypes.STRING(75), allowNull: false },
        nom: { type: DataTypes.STRING(75), allowNull: false },
        email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        telephone: { type: DataTypes.STRING(255), allowNull: true },
        password: { type: DataTypes.STRING(255), allowNull: false },
        langue: { type: DataTypes.STRING(2), allowNull: true },
        adresse_ip: { type: DataTypes.STRING(255), allowNull: false },
      },
      {
        sequelize,
        tableName: 'users',
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        timestamps: true,
      }
    );
    return User;

  };
