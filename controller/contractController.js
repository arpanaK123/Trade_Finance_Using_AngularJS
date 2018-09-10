app.controller('contractCtrl',function($scope, $state,UserService,toastr,$location) {
    var baseURL = 'http://localhost:8080/tradeFinance/'
    // $scope.submit = function() {
      //	$state.go('/login');
  
  //  console.log('userModel::--', userModel);
    var url=baseURL +"createContractToken";
    $scope.submit=function(){
      var userModel = {
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
      console.log(userModel);
    var register = UserService.registerPostData( userModel, url );
    register.then(function(response) {
                toastr.success('registration successfull plz check mail to verify','registration');
                console.log('registerData:::--->',response);
                $location.path('/login');
            }, function(response) {
                console.log(response);
            });
      }
  // }
  });
  