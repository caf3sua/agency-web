// code style: https://github.com/johnpapa/angular-styleguide
// Create by: Nam, Nguyen Hoai - ITSOL.vn

(function() {
    '';
    angular
      .module('app')
      .controller('ProductBaseController', ProductBaseController)
        .directive( 'elemReady', ['$parse', function( $parse ) {
            return {
                restrict: 'A',
                link: function( $scope, elem, attrs ) {
                    elem.ready(function(){
                        $scope.$apply(function(){
                            var func = $parse(attrs.elemReady);
                            func($scope);
                        })
                    })
                }
            }
        }]);

    ProductBaseController.$inject = ['vm', '$rootScope', '$scope', '$window', '$compile', '$timeout', 'ContactCommonDialogService', 'Principal'];

    function ProductBaseController(vm, $rootScope, $scope, $window, $compile, $timeout, ContactCommonDialogService, Principal){
		vm.message = { name: 'default entry from ProductBaseController' };

		var checkCloseStepOne = false;
        var checkCloseStepTwo = false;
        var checkCloseStepThree = false;
        vm.typeArrowOne = "fa-angle-left";
        vm.typeArrowTwo = "fa-angle-left";
        vm.typeArrowThree = "fa-angle-right";
        
        vm.currentAccount;
        vm.contactCode;
        vm.contactName;
        vm.contactDob;
        vm.receiverUserData = {  
			"address":"",
			"addressDistrict":"",
			"email":"",
			"mobile":"",
			"name":""
		};
        vm.invoiceInfoData = {  
				"accountNo":"",
				"address":"",
				"check":"0",
				"company":"",
				"name":"",
				"taxNo":""
        };
        
        // Init controller
  		(function initController() {
  			// instantiate base controller
  		    getAccount();
  		})();
  		
        // declare function
        vm.closeOpenStep = closeOpenStep;
        vm.calculateToDate = calculateToDate;
        vm.openSearchContact = openSearchContact;
		vm.appendCommonData = appendCommonData;
		vm.openAddContact = openAddContact;
        
        // implement function
		function getAccount() {
  			Principal.identity().then(function(account) {
                vm.currentAccount = account;
            });
  		}
		
        $scope.$on('selectedContactChange', function() {
        	if ($rootScope.selectedContact != undefined && $rootScope.selectedContact != null) {
        		vm.contactCode = $rootScope.selectedContact.contactCode;
        		vm.contactName = $rootScope.selectedContact.contactName;
                vm.contactDob = $rootScope.selectedContact.dateOfBirth;
        	}
        });

        function appendCommonData(policy) {
        	policy.contactCode = vm.contactCode;
        	// concat address + district
        	vm.receiverUserData.address = vm.receiverUserData.address + "::" + vm.receiverUserData.addressDistrict;
        	policy.receiverUser = vm.receiverUserData;
        	policy.invoiceInfo = vm.invoiceInfoData;
        }
        
        function openSearchContact() {
        	ContactCommonDialogService.openSearchDialog();
        }
        
        function openAddContact() {
        	ContactCommonDialogService.openAddDialog();
        }
        
        function closeOpenStep(type){
            if(type == "step1"){
                document.getElementById("bv-step-1").className = 'bv-step-1  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex widthStep98 display-flex OpenStepOne';
                document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                vm.typeArrowOne = "fa-angle-left";
                vm.typeArrowThree = "fa-angle-right";
                vm.typeArrowTwo = "fa-angle-right";
                checkCloseStepOne = true;
            }else if(type == "step2"){
                document.getElementById("bv-step-2").className = 'bv-step-2  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex  widthStep98 OpenStepTwo';
                document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                vm.typeArrowOne = "fa-angle-right";
                vm.typeArrowThree = "fa-angle-right";
                vm.typeArrowTwo = "fa-angle-left";
            }else if(type == "step3"){
                document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                document.getElementById("bv-step-3").className = 'bv-step-3 display-flex openStepOne col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex  widthStep98';
                vm.typeArrowOne = "fa-angle-right";
                vm.typeArrowThree = "fa-angle-left";
                vm.typeArrowTwo = "fa-angle-right";

                // NamNH fix: Append contactCode + invoiceInfo + receiverUser
                appendCommonData(vm.policy);
            }else{
                document.getElementById("bv-step-1").className = 'bv-step-1 col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex widthStep98';
                // document.getElementById("bv-step-2").className = 'bv-step-2 col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex widthStep2';
                // document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex ';
                checkCloseStepOne = false;
                vm.typeArrowOne = "fa-angle-left";
            }
        }
        
        function calculateToDate(fromDate) {
  			var fromDateObj = moment(fromDate, 'DD/MM/YYYY');
  			var toDateObj = fromDateObj.add(1, 'y').subtract(1, 'd');
  			var toDate = toDateObj.format('DD/MM/YYYY');
  			
  			return toDate;
  		}
    }
})();
