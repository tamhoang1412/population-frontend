'use strict';

// Here we attach this controller to our testApp module
angular.module('app')

  // The controller function let's us give our controller a name: MainCtrl
  // We'll then pass an anonymous function to serve as the controller itself.
  .controller('MainCtrl', function ($scope, Restangular) {
    $scope.countries = Restangular.one('/country').get()
    $scope.countryList = $scope.countries

  });
