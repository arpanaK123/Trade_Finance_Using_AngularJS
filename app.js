var app = angular.module('app', ['ui.router', 'ngMaterial','toastr']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'template/login.html',
      controller: 'loginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'template/register.html',
      controller: 'registerCtrl'
    })

    .state('userverify', {
      url: '/userverify',
      templateUrl: 'template/userverify.html',
      controller: 'userverifyCtrl'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'template/home.html',
      controller: 'homeCtrl'
    })
    .state('resetPassword', {
      url: '/resetPassword/:id',
      templateUrl: 'template/resetpassword.html',
      controller: 'resetpasswordCtrl'
    })

  $urlRouterProvider.otherwise('/login');
}]);
