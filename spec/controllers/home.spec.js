// var HomeController = require('../../controllers/home')
// var mongoose = require('mongoose');
// var User = require('../../models/user');
// var mock = require('@jest-mock/express');
// jest.setTimeout(30000);
// //import { getMockReq, getMockRes } from '@jest-mock/express';

// describe('Home Controller', function(){
//     beforeEach(function(done) {
//         mongoose.connection.collections.users.drop(function() {
//             done();
//         });
//     });

//     it('can register a new user', function(){
//         var name = 'Michael'
//         var pword = 'smooth_criminal'
        
//         const req = mock.getMockReq({body: {
//             username: name,
//             password: pword
//         }})

//         const res = mock.getMockRes()

//         HomeController.Registration(req, res)
//         User.findOne({username: "Michael"}, (err, result) => {
//             if (err) {
//                 throw err;
//             }
//             console.log(result)
//             expect(result.username).toEqual('Michael')
//         })

        
         
//     });
    
    // it('can login an existing user', function(){
    //     var name = 'Prince'
    //     var pword = 'purple_rain'
        
    //     const req = mock.getMockReq({body: {
    //         username: name,
    //         password: pword,
    //         loginUsername: name,
    //         loginPassword: pword
    //     }})

    //     const res = mock.getMockRes()

    //     HomeController.Registration(req, res)

    //     const req = mock.getMockReq({body: {
    //         username: name,
    //         password: pword,
    //         loginUsername: name,
    //         loginPassword: pword
    //     }})

    //     const res = mock.getMockRes()

    //     expect(function() {HomeController.Login(req, res)}).not.toThrow();

    // });

//});
