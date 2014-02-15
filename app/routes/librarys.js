'use strict';

// Librarys routes use librarys controller
var librarys = require('../controllers/library');
var authorization = require('./middlewares/authorization');

// Library authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.library.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/librarys', librarys.all);
    app.post('/librarys', authorization.requiresLogin, librarys.create);
    app.get('/librarys/:libraryId', librarys.show);
    app.put('/librarys/:libraryId', authorization.requiresLogin, hasAuthorization, librarys.update);
    app.del('/librarys/:libraryId', authorization.requiresLogin, hasAuthorization, librarys.destroy);

    // Finish with setting up the libraryId param
    app.param('libraryId', librarys.library);

};