'use strict';

// Here we attach this controller to our testApp module
angular.module('testApp')

  // The controller function let's us give our controller a name: MainCtrl
  // We'll then pass an anonymous function to serve as the controller itself.
  .controller('MainCtrl', function ($scope, Restangular) {

    // Using AngularJS dependency injection, we've injected the $scope variable
    // Anything we attach to scope will be available to us in the view.

    // In this case, we're attaching a collection of Awesome Things to display
    // in app/views/main.html
    $scope.content = Restangular.one('posts/2').get()
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'SitePoint'
    ];
  });
