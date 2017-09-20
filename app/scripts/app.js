'use strict';

var app = angular.module('app', [
	'restangular',
	'ui.router',
  'chart.js'
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  'RestangularProvider',
  'ChartJsProvider',
  '$locationProvider',
function ($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider){
    RestangularProvider.setBaseUrl('http://localhost:1412/');
    RestangularProvider.setRequestInterceptor(function (elem, operation, what) {
      if (operation === 'put') {
        elem._id = undefined;
      }
      return elem;
    });

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl'
      })
      .state('comparator', {
        url: '/comparator',
        templateUrl: '/views/comparator.html',
        controller: 'ComparatorCtrl'
      })
}]);

