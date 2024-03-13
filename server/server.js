const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

// read configurations from the file and place 'em in the process module
dotenv.config({ path: './config.env' });

const dbPass = process.env.DATABASE_CLOUD_PASSWORD;
const DB = process.env.DATABASE_CLOUD_URI.replace('<PASSWORD>', dbPass);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log('DB Connected!'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`Started listening on port ${port}`)
);

process.on('unhandledRejection', (err) => {
  console.log('Unexpected exception occured');
  console.log(err);
  server.close(() => {
    console.log('server closed!');
    process.exit();
  });
});
