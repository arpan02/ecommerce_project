/*****************************************
 * ENVIRONMENT
 ******************************************/

const development = {
  name: 'development',
  db: 'e_2',
  port: 8080,
  jwt_secret: 'secret',
};

const production = {
  port: 8080,
  name: 'production',
  db: process.env.NODE_DB,
  jwt_secret: process.env.JWT_SECRET,
};

module.exports = process.env.NODE_ENV === undefined ? development : production;
