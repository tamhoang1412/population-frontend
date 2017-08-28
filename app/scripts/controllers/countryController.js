'use strict';
// Here we attach this controller to our testApp module
angular.module('app')
  // The controller function let's us give our controller a name: MainCtrl
  // We'll then pass an anonymous function to serve as the controller itself.
  .controller('CountryCtrl', function ($scope, Restangular) {
    Restangular.one('/country').get().then(function (response) {
      if(response.code == 200) {
        $scope.countries = response.data
      }
    });
    $scope.labels = [];
    $scope.data = [];
    var yearStart = 1960;
    var yearEnd = 2015;
    for (var i = yearStart; i <= yearEnd; i++) {
      $scope.labels.push(i);
    }

    $scope.loadPopulation = function(){
      console.log($scope.selectedCountry);
      Restangular.one('/population/', $scope.selectedCountry).get().then(function (response) {
        if(response.code == 200) {
          $scope.population = response.data
        }
        $scope.data = [];
        for (var i = 0; i <= yearEnd - yearStart; i++) {
          $scope.data.push($scope.population[i].population);
        }
      })
    }
  });

