// Comentado para añadir a index.js
// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// const app = express();
// app.use(cors({ origin: '*' }));
// app.use(express.json());
// require("dotenv").config();

//const morgan = require('morgan');
//const helmet = require('helmet');
//const cookieParser = require('cookie-parser');

//app.use(cookieParser());
//app.use(morgan('dev'));
//app.use(helmet());


// const allowedOrigins = ['http://localhost:4000', 'http://localhost:4000/en', 'http://localhost:4000/fr'];

// const corsOptions = {
//     origin: function(origin, callback) {
//       // Permitir solicitudes sin origen (por ejemplo, desde Postman o curl)
//       if (!origin) return callback(null, true);
  
//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error(`Origen ${origin} no permitido por CORS`));
//       }
//     },
//     credentials: false, // Si vas a enviar cookies o encabezados de autorización
//   };

// // Aplica CORS globalmente
// app.use(cors(corsOptions));

// // Responde a las solicitudes OPTIONS en todas las rutas
// app.options('*', cors(corsOptions));


