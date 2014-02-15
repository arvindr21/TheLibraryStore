'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Library = mongoose.model('Library'),
    _ = require('lodash');


/**
 * Find library by id
 */
exports.library = function(req, res, next, id) {
    Library.load(id, function(err, library) {
        if (err) return next(err);
        if (!library) return next(new Error('Failed to load library ' + id));
        req.library = library;
        next();
    });
};

/**
 * Create a library
 */
exports.create = function(req, res) {
    var library = new Library(req.body);
    library.user = req.user;

    library.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                library: library
            });
        } else {
            res.jsonp(library);
        }
    });
};

/**
 * Update a library
 */
exports.update = function(req, res) {
    var library = req.library;

    library = _.extend(library, req.body);

    library.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                library: library
            });
        } else {
            res.jsonp(library);
        }
    });
};

/**
 * Delete an library
 */
exports.destroy = function(req, res) {
    var library = req.library;

    library.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                library: library
            });
        } else {
            res.jsonp(library);
        }
    });
};

/**
 * Show an library
 */
exports.show = function(req, res) {
    res.jsonp(req.library);
};

/**
 * List of Librarys
 */
exports.all = function(req, res) {
    Library.find().sort('-created').populate('user', 'name email').exec(function(err, librarys) { // I know its libraries :P
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(librarys);
        }
    });
};