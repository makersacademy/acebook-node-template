const users = [
    {
        email: "test@example.com",
        password: "12345",
        firstName: "test1first",
        lastName: "test1last",
        img: {
            data: `<svg version="1.1" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="red" />
            <circle cx="50" cy="50" r="80" fill="green" />
          </svg>`,
            contentType: "image/svg+xml"
        },
        bio: "example 1 bio"
    },

    {
        email: "test2@example.com",
        password: "password",
        firstName: "Hello",
        lastName: "World",
        img: {
            data: `<svg version="1.1" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="red" />
            <circle cx="50" cy="50" r="80" fill="green" />
          </svg>`,
            contentType: "image/svg+xml"
        },
        bio: "Hello World!"
    }];

describe("All user page", () => {
    it("Shows a list of all users", () => {
        cy.visit("/users/all")
            .then(() => cy.dropCollection("users")
            .then(() => cy.insertMany(users, "users")
            .then(() => {
                for (const user of users) {
                    cy.get("div.all-users").should("contain", `${user.firstName} ${user.lastName}`)
                   // cy.get("div.all-users").should("contain", 
                   // `data:${user.img.contentType};base64,${Buffer.from(user.img.data).toString('base64')}`)
                }
            })));
    })
});