const mongoose = require('mongoose')

require('../mongodb_helper')
const User = require('../../models/user')

describe('User model', () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done()
    })
  })

  it('has an email address', () => {
    const user = new User({
      email: 'someone@example.com',
      password: 'pasSword!2'
    })
    expect(user.email).toEqual('someone@example.com')
  })

  it('has a password', () => {
    const user = new User({
      email: 'someone@example.com',
      password: 'pasSword!2'
    })
    expect(user.password).toEqual('password')
  })

  it('has a first name', () => {
    const user = new User({
      first_name: 'Sarah',
      last_name: 'Smith',
      DOB: '1981-11-06',
      email: 'someone@example.com',
      password: 'pasSword!2'
    })
    expect(user.first_name).toEqual('Sarah')
  })

  it('has a last name', () => {
    const user = new User({
      first_name: 'Sarah',
      last_name: 'Smith',
      DOB: '1981-11-06',
      email: 'someone@example.com',
      password: 'pasSword!2'
    })
    expect(user.last_name).toEqual('Smith')
  })

  it('has a date of birth', () => {
    const user = new User({
      first_name: 'Sarah',
      last_name: 'Smith',
      DOB: '1981-11-06',
      email: 'someone@example.com',
      password: 'pasSword!2'
    })
    expect(user.DOB).toContain('1981-11-06')
  })

  it('can list all users', (done) => {
    User.find((err, users) => {
      expect(err).toBeNull()
      expect(users).toEqual([])
      done()
    })
  })

  it('can save a user', (done) => {
    const user = new User({
      email: 'someone@example.com',
      password: 'pasSword!2'
    })

    user.save((err) => {
      expect(err).toBeNull()

      User.find((err, users) => {
        expect(err).toBeNull()

        expect(users[0]).toMatchObject({
          email: 'someone@example.com',
          password: 'pasSword!2'
        })
        done()
      })
    })
  })
})
