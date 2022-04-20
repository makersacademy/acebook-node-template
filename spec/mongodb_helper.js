const mongoose = require('mongoose');


beforeAll(() =>
    mongoose.connect('mongodb://127.0.0.1/acebook_test', {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
    ).catch((err) => console.error(`MongoDB connection error: ${err}`))
);

afterAll( () => mongoose.connection.close(true));
