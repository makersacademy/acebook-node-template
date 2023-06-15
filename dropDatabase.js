const mongoose = require("mongoose");

const dropDatabase = async (url) => {
  const connection = await mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  await connection.dropDatabase();
  console.log(`Dropped database at: ${url}`);
  await connection.close();
};

const dropAll = async () => {
  await dropDatabase("mongodb://0.0.0.0/acebook_test");
  await dropDatabase("mongodb://0.0.0.0/acebook");
};

dropAll().catch(console.error);
