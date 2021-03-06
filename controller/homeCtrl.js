app.controller('homeCtrl', function ($scope, $state, UserService, toastr, $mdDialog) {

    $scope.onSelectFile = function ($files) {
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            $upload.upload({
                url: 'api/HomeControler/upload',
                file: $file,
                progress: function (e) {

                }
            })
                .then(function (data, status, headers, config) {
                    alert('file is uploaded successfully');
                });
        }
        alert('file is uploaded successfully');

    }

    // initialise varialbe here to manage transaction progress bar
    $scope.isCurentTransaction = false;
    // $scope.isCustom = false;
    // $scope.isInsurance = false;
    // $scope.isImporter = false;
    // $scope.isImporterBank = 45false;

    $scope.updateContractRes = {};
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
            } else {
                $scope.updateContractRes = $scope.allContracts[$scope.allContracts.length - 1];
                var contractModel = $scope.allContracts[$scope.allContracts.length - 1];
                var loginUser = JSON.parse(localStorage.getItem('userData'));
                if (Object.keys(contractModel).length > 0) {
                    if (contractModel.customCheck) {
                        $scope.isCustom = contractModel.customCheck;
                    }
                    if (contractModel && contractModel['portOfLoadin'] != 'INDIA' && loginUser.role !== 'custom') {
                        onRejectContract();
                        return;
                    }
                    if (contractModel.insuranceCheck) {
                        $scope.isInsurance = contractModel.insuranceCheck;
                    }
                    if (contractModel.importerCheck) {
                        $scope.isImporter = contractModel.importerCheck;
                    }
                    if (contractModel.importerBankCheck) {
                        $scope.isImporterBank = contractModel.importerBankCheck;
                    }
                }
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
            };

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
        var loginUser = JSON.parse(localStorage.getItem('userData'));
        if (loginUser.role != 'exporter') {
            loadAllTransaction(false);
        }
        $scope.isCurentTransaction = true;
    };

    $scope.onSelectItem = function (role, selectorType) {
        var contractModel = $scope.allContracts[$scope.allContracts.length - 1];
        var loginUser = JSON.parse(localStorage.getItem('userData'));
        var isValid = role === loginUser.role;
        if (contractModel && contractModel['portOfLoadin'] != 'INDIA') {
            onRejectContract();
            return;
        }
        if (isValid && !contractModel[selectorType] && loginUser.role !== 'exporter') {
            if (selectorType === 'customCheck') {
                updateTransaction(selectorType, contractModel);
            } else if (selectorType === 'insuranceCheck' && contractModel['customCheck']) {
                updateTransaction(selectorType, contractModel);
            } else if (selectorType === 'importerCheck' && contractModel['customCheck'] && contractModel['insuranceCheck']) {
                updateTransaction(selectorType, contractModel);
            } else if (selectorType === 'importerBankCheck' && contractModel['customCheck'] && contractModel['insuranceCheck'] && contractModel['importerCheck']) {
                updateTransaction(selectorType, contractModel);
            }
        }
        console.log('::selectorType::---.>', selectorType);
    };

    // here we updating transaction based on token
    function updateTransaction(selectedType, contractModel) {
        var baseURL = 'http://localhost:8080/tradeFinance/updateContractByToken';
        UserService.updateContractByToken(contractModel, baseURL).then(function (res) {
            $scope.updateContractRes = res.data['contractModel'];
            onSetSelectedContractType(selectedType);
        }, function (error) {
            toastr.error('Eror While calling updateContractByToken API', error);
        });
    }

    function onSetSelectedContractType(selectedType) {
        console.log('$scope.updateContractRes-->', $scope.updateContractRes);
        if (selectedType === 'customCheck') {
            if ($scope.updateContractRes[selectedType]) {
                $scope.isCustom = true;
                toastr.success('successfully accepted contract by custom');
            } else {
                toastr.error('contract rejected by custom');
                onRejectContract();
            }
        } else if (selectedType === 'insuranceCheck') {
            toastr.success('successfully accepted contract by insurance');
            $scope.isCustom = true;
            $scope.isInsurance = true;
        }
        else if (selectedType === 'importerCheck') {
            toastr.success('successfully accepted contract by importer');
            $scope.isImporter = true;
            $scope.isCustom = true;
            $scope.isInsurance = true;
        }
        else if (selectedType === 'importerBankCheck') {
            toastr.success('successfully accepted contract by importerBank');
            $scope.isImporter = true;
            $scope.isCustom = true;
            $scope.isInsurance = true;
            $scope.isImporterBank = true;
        }
    }
    function onRejectContract() {
        $scope.isImporter = false;
        $scope.isCustom = false;
        $scope.isInsurance = false;
        $scope.isImporterBank = false;
    }
});
