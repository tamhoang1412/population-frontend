'use strict';

angular.module('app').controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $rootScope, $state, Restangular, $localStorage) {
  $scope.loginNotice = "";
  if($scope.userLoggedIn){
    $state.go('home');
  }

  $rootScope.$on('event:social-sign-in-success', function(event, userDetails){
    console.log(userDetails)
  })

  gapi.load('auth2', function() {
    gapi.auth2.init(
      {
        client_id: GOOGLE_CLIENT_ID
      }
    );
    let GoogleAuth  = gapi.auth2.getAuthInstance();
    $scope.onLogInButtonClick = function() {
      GoogleAuth.signIn().then(function(response) {
        var token = response.Zi.id_token;
        var userInfo = {
          "token": token
        };
        Restangular.all("login").post(userInfo).then(function (response) {
          if(response.code = 200){
            if(response.data.user) {
              $localStorage.currentUser = response.data.user;
              $localStorage.accessToken = response.data.accessToken;
              $rootScope.$broadcast('user_logged_in');
            }
            $state.go('home', {notify: false});
          }
          else{
            $scope.loginNotice = "Something wrong happened. Please try again later."
          }
        })
      });
    };
  });
}
