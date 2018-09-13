app.controller('homeCtrl', function ($scope, $state, UserService, toastr, $mdDialog) {
  $scope.isCurentTransaction = false;
  $scope.loginUserData = {};
  localStorage.getItem('userData');
  var userData = JSON.parse(localStorage.getItem('userData'));
  $scope.loginUserData = userData;
  $scope.onLogout = function () {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    $state.go('login');
  };
  // this is for Showing All contract information model
  $scope.onClickAllContract = function (event) {
    var url = 'http://localhost:8080/tradeFinance/getAllContractBytoken';
    $scope.isCurentTransaction = false;
    var register = UserService.getAllContract(url);
    $scope.allContracts = [];
    register.then(function (res) {
      toastr.success('successfully loaded all contracts');
      $scope.allContracts = res.data.contracts;
      $mdDialog.show({
        locals: { data: $scope.allContracts },
        controller: allContractController,
        templateUrl: 'template/displayAllContract.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
      });
    }, function (error) {
      console.error('Error While getting all Contracts::-->', error);
    });
  }


  // this is for Creating New contract Modal
  $scope.onCreateContract = function (event) {
    $scope.isCurentTransaction = false;
    $mdDialog.show({
      controller: createContractController,
      templateUrl: 'template/createContract.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
    });
  }


  function createContractController($scope, $mdDialog) {
    $scope.onSubmitContract = function () {
      var url = 'http://localhost:8080/tradeFinance/createContractToken';
      var contractModel = {
        contractId: $scope.contractId,
        contentDescription: $scope.contentDescription,
        contractMoney: $scope.contractMoney,
        exporterId: $scope.exporterId,
        importerId: $scope.importerId,
        importerBankId: $scope.importerBankId,
        insuranceId: $scope.insuranceId,
        customId: $scope.customId,
        portOfLoadin: $scope.portOfLoadin,
        portOfEntry: $scope.portOfEntry,
        exporterCheck: $scope.exporterCheck,
        importerCheck: $scope.importerCheck,
        importerBankCheck: $scope.importerBankCheck,
        insuranceCheck: $scope.insuranceCheck,
        customCheck: $scope.customCheck
      }
      var register = UserService.createContract(contractModel, url);
      register.then(function (response) {
        toastr.success('successfully created', 'contract');
        console.log('contractData:::--->', response);
      }, function (error) {
        console.error('Error While Creating Contract::-->', error);
      });
      $mdDialog.cancel();
    };
  }

  function allContractController($scope, data) {
    $scope.data = data;
  }

  $scope.showCurrentBalance = function (ev) {
    $scope.isCurentTransaction = false;
    var baseURL = 'http://localhost:8080/tradeFinance/getBalance';

    var login = UserService.getBalanceBy(baseURL);
    login.then(function (res) {
      toastr.success('Load Ballance Succesfully');
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .textContent('Your Available Balance Is $ ' + res.data.balance)
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    }, function (error) {
      toastr.error('Eror While getting balance', error);
    });
  };

  $scope.onClickCurrentTransaction = function () {
    $scope.isCurentTransaction = true;
  }

  $scope.onSelectItem = function (selectorType) {
    console.log('::selectorType::---.>', selectorType);
  }

  // here we updating transaction based on token
  function updateTrasaction() {
    var baseURL = 'http://localhost:8080/tradeFinance/updateContractByToken';
    UserService.updateContractByToken(baseURL).then(function (res) {
      console.log('updateContractByToken:::--->', res);
    }, function (error) {
      toastr.error('Eror While calling updateContractByToken API', error);
    });
  }
});
