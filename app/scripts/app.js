'use strict';

// Here we set up an angular module. We'll attach controllers and
// other components to this module.
// angular.module('testApp', ['ui.bootstrap'])

//   // Angular supports chaining, so here we chain the config function onto
//   // the module we're configuring.
//   .config(function ($routeProvider) {

//     // We use AngularJS dependency injection to fetch the route provider.
//     // The route provider is used to setup our app's routes.

//     // The config below simply says when you visit '/' it'll render
//     // the views/main.html template controlled by the MainCtrl controller.

//     // The otherwise method specifies what the app should do if it doesn't recognise
//     // the route entered by a user. In this case, redirect to home.
//     $routeProvider
//     .when('/', {
//       templateUrl: 'views/main.html',
//       controller: 'MainCtrl'
//     })
//     .otherwise({
//       redirectTo: '/'
//     });
//   });

var app = angular.module('app', [
	'restangular',
	'ui.router'
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  'RestangularProvider',
function ($stateProvider,
          $urlRouterProvider,
          $httpProvider,
          RestangularProvider){
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
        abstract: true,
        templateUrl: 'index.html'
      })
        .state('home.homepage', {
            url: '/home',
            templateUrl: '/views/country.html',
            controller: 'CountryCtrl'
          });


}]);

