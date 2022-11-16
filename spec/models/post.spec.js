require('../mongodb_helper')
const mongoose = require('mongoose')
const mockingoose = require('mockingoose')
const Post = require('../../models/post')

describe('Post model', () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done()
    })
  })

  it('has a message', () => {
    const post = new Post({ message: 'some message' })
    expect(post.message).toEqual('some message')
  })

  it('can list all posts', (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull()
      expect(posts).toEqual([])
      done()
    })
  })

  it('can save a post', (done) => {
    const post = new Post({ message: 'some message' })

    post.save((err) => {
      expect(err).toBeNull()

      Post.find((err, posts) => {
        expect(err).toBeNull()

        expect(posts[0]).toMatchObject({ message: 'some message' })
        done()
      })
    })
  })

  // it ('should return the list of messages in order of creation', async () => {
  //   mockingoose(Post).toReturn([
  //     {
  //       message: 'Book 1',
  //       likes: '2',
  //       timestamps: '"$date":"2022-07-16T14:21:00.779Z"'
  //     },
  //     {
  //       message: 'Book 2',
  //       likes: '3',
  //       timestamps: '"$date":"2022-09-14T14:21:00.779Z"'
  //     }
  //   ], 'find');
  //   const results = await PostsController.find();
  //   expect(results[0].message).toBe('Book 2');
  // })

  // __tests__/user.test.js

  // it('should return the list of messages in order of creation', () => {
  //   const post1 = {
  //     message: 'Book 1',
  //     likes: '2',
  //     timestamps: '"$date":"2022-07-16T14:21:00.779Z"'
  //   };
  //   const post2 = {
  //     message: 'Book 2',
  //     likes: '1',
  //     timestamps: '"$date":"2022-09-16T14:21:00.779Z"'
  //   };


  //   const finderMock = query => {
  //     expect(query.getQuery()).toMatchSnapshot('findAll query');

  //     if (query.getQuery()) {
  //       return [post2, post1];
  //     }
  //   };

  //   mockingoose(model).toReturn(finderMock, 'find'); // findById is findOne

  //   return model.findById('507f191e810c19729de860ea').then(doc => {
  //     expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
  //   });
  // });
})
