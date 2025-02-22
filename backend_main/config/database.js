// require('dotenv').config();
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//     process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     dialectModule: require('mysql2'), 
//     logging: false,
//     define:{
//         timestamps: true, 
//         underscored: true, 
//         paranoid: false, 
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_unicode_ci'
//     }
// });

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connexion à la base de données réussie.');
//   })
//   .catch(err => {
//   });

// module.exports = sequelize;

require('dotenv').config();
const { Sequelize } = require('sequelize');

let sequelize;

try {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      port: process.env.DB_PORT || 3306,
      logging: false,
    }
  );

  sequelize.authenticate()
    .then(() => console.log("✅ Conectado a la base de datos"))
    .catch((error) => console.warn("⚠️ No se pudo conectar a la base de datos, pero el backend sigue funcionando."));
} catch (error) {
  console.warn("⚠️ Error en la configuración de Sequelize, ignorando la base de datos.");
}

module.exports = sequelize;
