const User = require('../models/user')
const Friends = require('../models/friends')
const mongoose = require('mongoose')

mongoose.connect("mongodb://0.0.0.0/acebook_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("connection established!");
    })
    .catch((err) => {
        console.log(err);
    });

const userSeeds = [
    {
        firstName: "Peter",
        lastName: "Strange",
        username: "PeterS",
        email: "Peter@email.com",
        password: "petepassword",
        phoneNumber: "12345678",

    },
    {
        firstName: 'Test FN',
        lastName: 'Test Surname',
        username: 'TF1234',
        email: 'test@test.com',
        password: '123456789',
        phoneNumber: "12345678",
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        username: 'Jdorff',
        email: 'j@test.com',
        password: '987654321',
        phoneNumber: "12345688322",
    },
    {
        firstName: 'Boris',
        lastName: 'Johnson',
        username: 'BJghfjd',
        email: 'bg@gov.uk',
        password: 'qwerty123',
        phoneNumber: "18473625134",
    },
];

const friendsSchema = [
    {
      requester: 
      recipient:
      status:
      date: 
    }
]


for (const user[0] of users) {
    const sellerToAdd = { name: seller.name };
    const { _id } = await mongoose.model("Seller").create(sellerToAdd);

    // Product_sellers_Seller_products Insertion
    for (const productId of seller.products) {
      await mongoose
        .model("Product_sellers_Seller_products")
        .create({
          Product_left_id: productIds[productId], // (data.ts id) --> (Mongo ID)
          Seller_right_id: _id,
        });
    }
  }
new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: Number,
        enums: [
            0,    //'pending',
            1,    //'friends',
        ]
    },
    date: {
        type: Date,
        default: () => Date.now(),
    }
})

const Friends = mongoose.model("Friends", FriendsSchema);

module.exports = Friends;



const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(userSeeds);
};

seedDB().then(() => {
    mongoose.connection.close();
});

module.exports = userSeeds;