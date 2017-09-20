'use strict';
angular.module('app').controller('ComparatorCtrl', ComparatorCtrl);

function ComparatorCtrl($scope, Restangular) {
  fetchCountryData($scope, Restangular);
  $scope.chartLabels = ["Year"];
  $scope.chartSeries = [];
  $scope.chartColors = ["#f44141", "#427df4"];
  let yearStart = 1960;
  let yearEnd = 2015;
  for (let i = yearStart; i <= yearEnd; i++) {
    $scope.chartLabels.push(i);
  }
  $scope.selectedCountryName = "";
  $scope.data = [[], []];
  $scope.densityMatrixRange = [];
  for (let i = 0; i < 100; i++){
    $scope.densityMatrixRange.push(i)
  }

  $scope.loadPopulation1 = function(){
    clearDensity("first");
    Restangular.one('/population/', $scope.selectedCountryId1).get().then(function (response) {
      $scope.selectedCountryName1 = $scope.chartSeries[0] = response.data.name;
      if(response.code == 200) {
        const population = response.data.population;
        $scope.data[0] = [null];
        for (let i = 0; i <= yearEnd - yearStart; i++) {
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
      $scope.selectedCountryName2 = $scope.chartSeries[1]= response.data.name;
      if(response.code == 200) {
        const population = response.data.population;
        $scope.data[1] = [null];
        for (let i = 0; i <= yearEnd - yearStart; i++) {
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

  function fetchCountryData($scope, Restangular){
    Restangular.one('/country').get().then(function (response) {
      $scope.countries = response.data
    });
  }

  function fillDensityFirstMatrix(density) {
    for (let i=0; i<density; i++){
      let index = Math.floor(Math.random() * 10000);
      $("#first-matrix-cell-".concat(index.toString())).addClass("red")
    }
  }

  function fillDensitySecondMatrix(density) {
    for (let i=0; i<density; i++){
      let index = Math.floor(Math.random() * 10000);
      $("#second-matrix-cell-".concat(index.toString())).addClass("blue")
    }
  }

  function clearDensity(matrixName){
    console.log("clear");
    for (let i=0; i<10000; i++){
      $("#" + matrixName + "-matrix-cell-" + i).removeClass("red").removeClass("blue")
    }
  }
}
