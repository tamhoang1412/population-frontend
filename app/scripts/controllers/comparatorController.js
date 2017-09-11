'use strict';
// Here we attach this controller to our testApp module
angular.module('app')
// The controller function let's us give our controller a name: MainCtrl
// We'll then pass an anonymous function to serve as the controller itself.
  .controller('ComparatorCtrl', function ($scope, Restangular) {
    Restangular.one('/country').get().then(function (response) {
      if(response.code == 200) {
        $scope.countries = response.data
      }
    });
    $scope.labels = ["Year"];
    $scope.series = [];
    $scope.colors = ["#f44141", "#427df4"]
    var yearStart = 1960;
    var yearEnd = 2015;
    for (var i = yearStart; i <= yearEnd; i++) {
      $scope.labels.push(i);
    }
    $scope.selectedCountryName = "";
    $scope.data = [[], []];
    $scope.densityMatrixRange = [];
    for (var i = 0; i < 100; i++){
      $scope.densityMatrixRange.push(i)
    }

    $scope.datasetOverride = [{ yAxisID: 'y-axis' }];
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis',
            type: 'linear',
            display: true ,
            position: 'left'
          }
        ]
      }
    };

    $scope.loadPopulation1 = function(){
      clearDensity("first");
      Restangular.one('/population/', $scope.selectedCountryId1).get().then(function (response) {
        $scope.selectedCountryName1 = $scope.series[0] = response.data.name;
        if(response.code == 200) {
          const population = response.data.population
          $scope.data[0] = [null];
          for (var i = 0; i <= yearEnd - yearStart; i++) {
            $scope.data[0].push(population[i].population);
          }
          Restangular.one('/area/', $scope.selectedCountryId1).get().then(function (response) {
            const lastArea = response.data.area[response.data.area.length - 1].area;
            const lastPopulation = population[population.length - 1].population;
            const density = Math.floor(lastPopulation/lastArea);
            fillDensityFirstMatrix(density);
          })
        }
      });
    };

    $scope.loadPopulation2 = function(){
      clearDensity("second");
      Restangular.one('/population/', $scope.selectedCountryId2).get().then(function (response) {
        $scope.selectedCountryName2 = $scope.series[1]= response.data.name;
        if(response.code == 200) {
          const population = response.data.population
          $scope.data[1] = [null];
          for (var i = 0; i <= yearEnd - yearStart; i++) {
            $scope.data[1].push(population[i].population);
          }
          Restangular.one('/area/', $scope.selectedCountryId2).get().then(function (response) {
            const lastArea = response.data.area[response.data.area.length - 1].area;
            const lastPopulation = population[population.length - 1].population;
            const density = Math.floor(lastPopulation/lastArea);
            fillDensitySecondMatrix(density);
          })
        }
      });
    };
  });

function fillDensityFirstMatrix(density) {
  for (var i=0; i<density; i++){
    var index = Math.floor(Math.random() * 10000);
    $("#first-matrix-cell-".concat(index.toString())).addClass("red")
  }
}

function fillDensitySecondMatrix(density) {
  for (var i=0; i<density; i++){
    var index = Math.floor(Math.random() * 10000);
    $("#second-matrix-cell-".concat(index.toString())).addClass("blue")
  }
}

function clearDensity(matrixName){
  console.log("clear");
  for (var i=0; i<10000; i++){
    $("#" + matrixName + "-matrix-cell-" + i).removeClass("red");
    $("#" + matrixName + "-matrix-cell-" + i).removeClass("blue")
  }
}
