/**
 * Created by tam_ht on 9/30/17.
 */

angular.module('app').controller('mainCtrl', mainCtrl);

function mainCtrl($scope, $rootScope, $localStorage, Restangular) {
  $scope.userLoggedIn = false;

  $rootScope.$on('user_logged_in', function () {
    $scope.userLoggedIn = true;
    $rootScope.currentUser = $localStorage.currentUser;
  })

  function loadCurrentUser() {
    if($localStorage.accessToken != null) {
      Restangular.one("getUserByAccessToken?token=" + $localStorage.accessToken).get().then(function (response) {
        if(response.code = 200){
            $localStorage.currentUser = response.data.user;
            $rootScope.$broadcast('user_logged_in');
        }
        else{
          $scope.loginNotice = "Something wrong happened. Please try again later."
        }
      })
    }
  }

  loadCurrentUser();

  $scope.logOut = function () {
    if($localStorage.accessToken != null) {
      Restangular.one("logout?token=" + $localStorage.accessToken).get().then(function (response) {
        if(response.code = 200){
          $localStorage.currentUser = null;
          $localStorage.accessToken = null;
          window.location.reload(true);
        }
        else{
          $scope.loginNotice = "Something wrong happened. Please try again later."
        }
      })
    }
  }
}
