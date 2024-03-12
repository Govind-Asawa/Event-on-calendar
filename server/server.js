const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

// read configurations from the file and place 'em in the process module
dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_URI, {
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
