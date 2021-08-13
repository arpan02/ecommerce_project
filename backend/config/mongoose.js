/*****************************************
 * MONGODB DATABASE
 ******************************************/

const mongoose = require('mongoose');
const env = require('./environment');

// mongoose.connect(`mongodb://localhost/${env.db}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// });

mongoose.connect(env.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on(
  'error',
  console.error.bind(console, '********Error connecting to MongoDB*********')
);

db.once('open', function () {
  console.log('Connected to Database');
});

module.exports = db;
