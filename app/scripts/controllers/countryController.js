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
    $scope.labels = ["Year"];
    $scope.data = [[null]];
    $scope.series = ["Population"];
    var yearStart = 1960;
    var yearEnd = 2015;
    for (var i = yearStart; i <= yearEnd; i++) {
      $scope.labels.push(i);
    }
    $scope.selectedCountryName = "";

    $scope.loadPopulation = function(){
      Restangular.one('/population/', $scope.selectedCountry).get().then(function (response) {
        $scope.selectedCountryName = $scope.countries[$scope.selectedCountry - 1].name;
        if(response.code == 200) {
          $scope.population = response.data
        }
        $scope.data = [[null]];
        for (var i = 0; i <= yearEnd - yearStart; i++) {
          $scope.data[0].push($scope.population[i].population);
        }
      })
    }
    $scope.datasetOverride = [{ yAxisID: 'y-axis' }];
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis',
            type: 'linear',
            display: true,
            position: 'left'
          }
        ]
      }
    };
  });

