'use strict';

var app = angular.module('app', [
	'restangular',
	'ui.router',
  'chart.js',
  'socialLogin',
  'ngStorage'
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  'RestangularProvider',
  'ChartJsProvider',
  '$locationProvider',
function ($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider){
    RestangularProvider.setBaseUrl(BACKEND_HOST);
    RestangularProvider.setRequestInterceptor(function (elem, operation ) {
      if (operation === 'put') {
        elem._id = undefined;
      }
      return elem;
    });
    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json'
    });

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
      })
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

app.config(function(socialProvider){
  socialProvider.setGoogleKey(GOOGLE_CLIENT_ID);
});
