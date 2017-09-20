'use strict';
angular.module('app')
  .controller('HomeCtrl', function ($scope, Restangular) {
    Restangular.one('/country').get().then(function (response) {
      if(response.code == 200) {
        $scope.countries = response.data
      }
    });
    $scope.labels = ["Year"];
    $scope.series = ["Population"];
    let yearStart = 1960;
    let yearEnd = 2015;
    for (let i = yearStart; i <= yearEnd; i++) {
      $scope.labels.push(i);
    }
    $scope.loadPopulation = function(){
      Restangular.one('/population/', $scope.selectedCountryId).get().then(function (response) {
        $scope.selectedCountryName = response.data.name;
        if(response.code == 200) {
          $scope.population = response.data.population
        }
        $scope.data = [[null]];
        for (let i = 0; i <= yearEnd - yearStart; i++) {
          $scope.data[0].push($scope.population[i].population);
        }
      })
    };
  });

