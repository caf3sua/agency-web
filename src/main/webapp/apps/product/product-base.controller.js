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

    ProductBaseController.$inject = ['vm', '$rootScope', '$scope', '$window', '$compile', '$timeout', 'ContactSearchDialogService'];

    function ProductBaseController(vm, $rootScope, $scope, $window, $compile, $timeout, ContactSearchDialogService){
		vm.message = { name: 'default entry from ProductBaseController' };

		var checkCloseStepOne = false;
        var checkCloseStepTwo = false;
        var checkCloseStepThree = false;
        vm.typeArrowOne = "fa-angle-left";
        vm.typeArrowTwo = "fa-angle-left";
        vm.typeArrowThree = "fa-angle-right";
        
        vm.contactCode;
        vm.receiverUserData = {  
			"address":"Duy Tân",
			"addressDistrict":"Cầu Giấy",
			"email":"a@gmail.com",
			"mobile":"0123456789",
			"name":"Nguyễn Văn 0"
		};
        vm.invoiceInfoData = {  
				"accountNo":"",
				"address":"",
				"check":"0",
				"company":"",
				"name":"",
				"taxNo":""
        };
        
        // declare function
        vm.closeOpenStep = closeOpenStep;
        vm.calculateToDate = calculateToDate;
        vm.openSearchContact = openSearchContact;
		vm.appendCommonData = appendCommonData;
        
        // implement function
        $scope.$on('contactCodeChange', function() {
        	if ($rootScope.selectedContactCode != undefined && $rootScope.selectedContactCode != "") {
        		vm.contactCode = $rootScope.selectedContactCode;
        	}
        });

        function appendCommonData(policy) {
        	policy.contactCode = vm.contactCode;
        	policy.receiverUser = vm.receiverUserData;
        	policy.invoiceInfo = vm.invoiceInfoData;
        }
        
        function openSearchContact() {
        	ContactSearchDialogService.open();
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
