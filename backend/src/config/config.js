require("dotenv").config();
const pg = require("pg");
module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
    port: process.env.DB_PORT || 5432,
    logging: true,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //   },
    // },
    // dialectModule: pg,
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
    port: process.env.DB_PORT || 5432,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //   },
    // },
    // dialectModule: pg,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
    port: process.env.DB_PORT || 5432,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //   },
    // },
    // dialectModule: pg,
  },
};

// const { Sequelize } = require('sequelize');
//
// // Sử dụng URL kết nối của Neon
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true, // Neon yêu cầu SSL
//       rejectUnauthorized: false,
//     },
//   },
// });
//
// module.exports = sequelize;
