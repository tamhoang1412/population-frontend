'use strict';
// Here we attach this controller to our testApp module
angular.module('app')

  // The controller function let's us give our controller a name: MainCtrl
  // We'll then pass an anonymous function to serve as the controller itself.
  .controller('CountryCtrl', function ($scope, Restangular) {
    Restangular.one('/country').get().then(function (response) {
      if(response.code == 200) {
        $scope.countries = response.data
        $scope.selected = $scope.countries[0].name;
      }
    })
  });

