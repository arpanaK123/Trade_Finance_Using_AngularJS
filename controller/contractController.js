app.controller('contractCtrl',function($scope, $state,UserService,toastr,$location) {
    var baseURL = 'http://localhost:8080/tradeFinance/'
    // $scope.submit = function() {
      //	$state.go('/login');
  
  //  console.log('userModel::--', userModel);
    var url=baseURL +"createContract";
    $scope.submit=function(){
      var contractModel = {
        contractId: $scope.contractId,
        contentDescription: $scope.contentDescription,
        contractMoney: $scope.contractMoney,
        exporterId: $scope.exporterId,
        importerId: $scope.importerId,
        importerBankId: $scope.importerBankId,
        insuranceId : $scope.insuranceId,
        customId : $scope.customId,
        portOfLoadin: $scope.portOfLoadin,
        portOfEntry: $scope.portOfEntry,
        exporterCheck: $scope.exporterCheck,
        importerCheck: $scope.importerCheck,
        importerBankCheck: $scope.importerBankCheck,
        insuranceCheck: $scope.insuranceCheck,
        customCheck: $scope.customCheck
      }
      console.log(contractModel);
    var register = UserService.createContract( contractModel, url );
    register.then(function(response) {
                toastr.success('successfully created','contract');
                console.log('contractData:::--->',response);
                 localStorage.setItem('contractId',response.data.contractModel.contractId);
                // localStorage.getItem('contractId')
                $location.path('/home');
            }, function(response) {
                console.log(response);
            });
      }
  // }
  });
  