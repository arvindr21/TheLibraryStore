'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Library = mongoose.model('Library');

//Globals
var user;
var library;

//The tests
describe('<Unit Test>', function() {
    describe('Model Library:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                library = new Library({
                    title: 'Library Title',
                    content: 'Library Content',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return library.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                library.title = '';

                return library.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Library.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            Library.remove().exec();
            User.remove().exec();
            done();
        });
    });
});