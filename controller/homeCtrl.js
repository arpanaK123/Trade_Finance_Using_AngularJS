app.controller('homeCtrl', function ($scope, $state, UserService, toastr, $mdDialog) {

  // initialise varialbe here
  $scope.isCurentTransaction = false;
  $scope.isCustom = false;
  $scope.isInsurance = false;
  $scope.isImporter = false;
  $scope.isImporterBank = false;

  $scope.updateContractRes = {};
  $scope.loginUserData = {};
  localStorage.getItem('userData');
  var userData = JSON.parse(localStorage.getItem('userData'));
  $scope.loginUserData = userData;
  $scope.onLogout = function () {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('contractModel');
    $state.go('login');
  };
  // this is for Showing All contract information model
  $scope.onClickAllContract = function (event) {
    loadAllTransaction(true);
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

  function loadAllTransaction(showModel) {
    var url = 'http://localhost:8080/tradeFinance/getAllContractBytoken';
    $scope.isCurentTransaction = false;
    var register = UserService.getAllContract(url);
    $scope.allContracts = [];
    register.then(function (res) {
      toastr.success('success');
      $scope.allContracts = res.data.contracts;
      if (showModel) {
        $mdDialog.show({
          locals: { data: $scope.allContracts },
          controller: allContractController,
          templateUrl: 'template/displayAllContract.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
        });
      }
    }, function (error) {
      console.error('Error While getting all Contracts::-->', error);
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

      localStorage.setItem('contractModel', JSON.stringify(contractModel));
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
    loadAllTransaction(false);
    var loginUser = JSON.parse(localStorage.getItem('userData'));
    var role = loginUser.role;
    onSetSelectedContractType(role);
    $scope.isCurentTransaction = true;
  }

  $scope.onSelectItem = function (selectorType) {
    var contractModel = $scope.allContracts[$scope.allContracts.length - 1];
    var loginUser = JSON.parse(localStorage.getItem('userData'));
    var isValid = selectorType === loginUser.role;
    if (isValid && contractModel) {
      updateTrasaction(selectorType, contractModel);
    } else if (!isValid && selectorType === 'custom') {
      $scope.isCustom == false;
    } else if (!isValid && selectorType === 'insurance') {
      $scope.isInsurance = false;
    } else if (!isValid && selectorType === 'importer') {
      $scope.isImporter = false;
    } else if (!isValid && selectorType === 'importerBank') {
      $scope.isImporterBank = false;
    }
    console.log('::selectorType::---.>', selectorType);
  }

  // here we updating transaction based on token
  function updateTrasaction(selectedType, contractModel) {
    var baseURL = 'http://localhost:8080/tradeFinance/updateContractByToken';
    UserService.updateContractByToken(contractModel, baseURL).then(function (res) {
      console.log('updateContractByToken-->', res);
      $scope.updateContractRes = res.contractModel;
      onSetSelectedContractType(selectedType);
    }, function (error) {
      toastr.error('Eror While calling updateContractByToken API', error);
    });
  }

  function onSetSelectedContractType(selectedType) {
    if (selectedType === 'custom') {
      $scope.isCustom = true;

    } else if (selectedType === 'insurance') {
      $scope.isInsurance = true;
    }
    else if (selectedType === 'importer') {
      $scope.isImporter = true;
    }
    else if (selectedType === 'importerBank') {
      $scope.isImporterBank = true;
    }
  }
});
