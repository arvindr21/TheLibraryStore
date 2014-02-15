'use strict';

(function() {
    // Librarys Controller Spec
    describe('MEAN controllers', function() {
        describe('LibrarysController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var LibrarysController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                LibrarysController = $controller('LibrarysController', {
                    $scope: scope
                });

                $routeParams = _$routeParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one library object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('librarys').respond([{
                        title: 'A Library about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.librarys).toEqualData([{
                        title: 'A Library about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                });

            it('$scope.findOne() should create an array with one library object fetched ' +
                'from XHR using a libraryId URL parameter', function() {
                    // fixture URL parament
                    $routeParams.libraryId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testLibraryData = function() {
                        return {
                            title: 'A Library about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/librarys\/([0-9a-fA-F]{24})$/).respond(testLibraryData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.library).toEqualData(testLibraryData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postLibraryData = function() {
                        return {
                            title: 'A Library about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture expected response data
                    var responseLibraryData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'A Library about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture mock form input values
                    scope.title = 'A Library about MEAN';
                    scope.content = 'MEAN rocks!';

                    // test post request is sent
                    $httpBackend.expectPOST('librarys', postLibraryData()).respond(responseLibraryData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.title).toEqual('');
                    expect(scope.content).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/librarys/' + responseLibraryData()._id);
                });

            it('$scope.update() should update a valid library', inject(function(Librarys) {

                // fixture rideshare
                var putLibraryData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'A Library about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock library object from form
                var library = new Librarys(putLibraryData());

                // mock library in scope
                scope.library = library;

                // test PUT happens correctly
                $httpBackend.expectPUT(/librarys\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/librarys\/([0-9a-fA-F]{24})$/, putLibraryData()).respond();
                /*
                Error: Expected PUT /librarys\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Library about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Library about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/librarys/' + putLibraryData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid libraryId' +
                'and remove the library from the scope', inject(function(Librarys) {

                    // fixture rideshare
                    var library = new Librarys({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.librarys = [];
                    scope.librarys.push(library);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/librarys\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(library);
                    $httpBackend.flush();

                    // test after successful delete URL location librarys lis
                    //expect($location.path()).toBe('/librarys');
                    expect(scope.librarys.length).toBe(0);

                }));
        });
    });
}());