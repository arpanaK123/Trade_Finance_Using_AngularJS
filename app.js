var app = angular.module('app', ['ui.router', 'ngMaterial','toastr','ui.router']);

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
      url: '/resetPassword/:key',
      templateUrl: 'template/resetpassword.html',
      controller: 'resetpasswordCtrl',
      // resolve: {
			// 	resolveId: function($stateParams) {
			// 		return $stateParams.key;
			// 	}
			// }
    })
    .state('home.dashBoard', {
      url: '/dashBoard',
      templateUrl: 'template/dashBoard.html',
      controller: 'dashboardController'
    });
  $urlRouterProvider.otherwise('/login');
}]);
