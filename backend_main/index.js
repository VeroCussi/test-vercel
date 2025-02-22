require("dotenv").config();
// const serverless = require("serverless-http");
// const app = require("./app");
// module.exports = serverless(app);

// version antigua del index 1
//Server blocked if sequalize is not connected to the database
// const app = require('./app');
// const sequelize = require('./config/database');
// require("dotenv").config();



// const PORT = process.env.PORT || 8080;

// sequelize.sync({ alter: false }) // Met à jour la table pour correspondre au modèle
//   .then(() => {
//     app.listen(PORT, () => { // Une fois que c'est fini, le serveur est démarré
//         console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(error => {
//     console.error('Unable to connect to the database:', error);
//   });


// version antigua del index 2
// server woking even if database is not connected *************

// const app = require('./app');
// const sequelize = require('./config/database');
// require("dotenv").config();

// const PORT = process.env.PORT || 8080;

// //Función para iniciar el servidor sin importar si la base de datos falla
// const startServer = () => {
//   app.listen(PORT, () => {
//     console.log(`✅ Server is running on port ${PORT}`);
//   });
// };

// //Intentar sincronizar la base de datos, pero no bloquear el servidor si falla
// sequelize.sync({ alter: false })
//   .then(() => {
//     console.log("✅ Database connected successfully.");
//     startServer();
//   })
//   .catch(error => {
//     console.warn("⚠️ Unable to connect to the database. The server will still run.");
//     console.warn(error.message);
//     startServer(); // Iniciar el servidor aunque la base de datos no funcione
//   });
