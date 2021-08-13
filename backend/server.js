process.on('uncaughtException', (err) => {
  console.log(err);
  // console.log(err.name, '--', err.message);
  console.log('UNCAUGHT EXCEPTION-->shutting down');
  // first finish all the request
  process.exit(1);
});
const socket = require('./socket/socket').Socket;
const app = require('./app');
const db = require('./config/mongoose');
const env = require('./config/environment');

const port = process.env.PORT || env.port;
// staring server
const server = app.listen(port, (err) => {
  if (err) {
    console.log(`*******Error in starting server*******`, err);
    return;
  }
  console.log(`Server is Started on port  ${port}`);
  // chatServer.listen(5000, err => {
  //   if (err) {
  //     console.listen('Problem on chat server');
  //   }
  // });

  socket(server);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('UNHANDLED REJECTION-->shutting down');
  // first finish all the request
  server.close(() => {
    process.exit(1);
  });
});
