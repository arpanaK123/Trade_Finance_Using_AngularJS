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
    .state('createContract', {
      url: '/createContract',
      templateUrl: 'template/createContract.html',
      controller: 'contractCtrl'
    })

     .state('getContractById', {
      url: '/getContractBy',
      templateUrl: 'template/getContractBy.html',
      controller: 'contractCtrl'
    })
    .state('updateContractByToken', {
      url: '/updateContractByToken',
      templateUrl: 'template/updateContract.html',
      controller: 'contractCtrl'
    })

    .state('home.dashBoard', {
      url: '/dashBoard',
      templateUrl: 'template/dashBoard.html',
      controller: 'dashboardController'
    });
  $urlRouterProvider.otherwise('/login');
}]);
