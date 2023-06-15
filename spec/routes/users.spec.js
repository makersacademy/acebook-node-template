const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");
const UserController = require("../../controllers/users")
const sinon = require('sinon');

describe("User controller", () => {
    beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => {
        done();
        });
    });

    it('should return an error if user already exists', (done) => {
        const req = {
        body: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: 'password!123',
            confirmPassword: 'password!123'
        }
        };
        const res = {
        status: (code) => {
            expect(code).toEqual(400);
            return {
            render: (view, options) => {
                expect(view).toEqual('users/new');
                expect(options.error).toEqual('Email address already taken');
                done();
            }
            };
        }
        };
        // Simulate finding an existing user with the same email address
        User.findOne = sinon.stub().yields(null, { email: 'johndoe@example.com' });

        UserController.Create(req, res);
    });

    it('password and confirm password must match', (done) => {
        const req = {
        body: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: 'password!123',
            confirmPassword: 'passwar!123'
        }
        };
        const res = {
        status: (code) => {
            expect(code).toEqual(400);
            return {
            render: (view, options) => {
                expect(view).toEqual('users/new');
                expect(options.error).toEqual('Passwords did not match');
                done();
            }
            };
        }
        };
    
        UserController.Create(req, res);
    });
});