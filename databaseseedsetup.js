const MongoClient = require("mongodb").MongoClient;

async function seedDB() {
    // Connection URL
    const uri = process.env.MONGODB_URL || "mongodb://localhost/acebook";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const collection = client.db("acebook").collection("users");
        const collection2 = client.db("acebook").collection("posts");
        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();
        collection2.drop();
        collection.insertMany(
            [
            {email: "example1@example.com",
            password: "password1"},
            {email: "example2@example.com",
            password: "password2"},
            {email: "example3@example.com",
            password: "password3"},
            {email: "example4@example.com",
            password: "password4"},
            {email: "example5@example.com",
            password: "password5"},
            {email: "example6@example.com",
            password: "password6"},
            {email: "example7@example.com",
            password: "password7"},
            {email: "example8@example.com",
            password: "password8"},
            {email: "example9@example.com",
            password: "password9"},
            {email: "example10@example.com",
            password: "password10"},
            {email: "example11@example.com",
            password: "password11"},
            ])

            collection2.insertMany(
                [
                {message: "example message1"},
                {message: "example message2"},
                {message: "example message3"},
                {message: "example message4"},
                {message: "example message5"},
                {message: "example message6"},
                {message: "example message7"},
                {message: "example message8"},
                {message: "example message9"},
                {message: "example message10"},
                ])

        // collection.insertMany(timeSeriesData);
        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}
seedDB();