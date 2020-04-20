const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://${process.env.DB_ADDRESS}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => {
    console.log('MONGO connected');
  })
  .catch((error) => console.log(error));
