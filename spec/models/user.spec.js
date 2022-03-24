const mongoose = require("mongoose");
const Post = require("../../models/post");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has an empty array of friends", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "test name",
    })
    expect(user.friends.length).toEqual(0);
  })

  it("can add one friend to a user", () => {
    const user1 = new User({
      email: "someone@example.com",
      password: "password",
      name: "test name",
    })

    const user2 = new User({
      email: "someone@example.com",
      password: "password",
      name: "test name",
    })

    user1.friends.push(user2.id)

    expect(user1.friends.length).toEqual(1);
    expect(user1.friends[0]).toEqual(user2.id);
  })

  it("has an empty array of posts", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "test name",
    })

    expect(user.posts.length).toEqual(0)
  })

  it("has a post", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "test name",
    })
    // Add a post to the user
    const post = new Post({ message: "Test Message" } )
    user.posts.push (post._id)

    expect(user.posts.length).toEqual(1)
    expect(user.posts[0]).toEqual(post._id)    
    
  })

  it("has 2 posts", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "test name",
    })
    // Add a post to the user
    const postOne = new Post({ message: "Test Message" } )
    const postTwo = new Post({ message: "Another Test" } )

    user.posts.push (postOne._id)
    user.posts.push (postTwo._id)

    expect(user.posts.length).toEqual(2)
    expect(user.posts[1]).toEqual(postTwo._id)    
    
  })

  it("has a name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "test name",
    })
    expect(user.name).toEqual("test name");
  })

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      email: "someone@example.com",
      password: "password"
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password"
        });
        done();
      });
    });
  });
});
