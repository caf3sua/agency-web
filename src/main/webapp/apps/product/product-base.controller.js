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

    ProductBaseController.$inject = ['vm', '$state', '$rootScope', '$scope', '$window', '$compile', '$timeout'
    	, 'ContactCommonDialogService', 'ResponseValidateService', 'Principal', 'DateUtils', '$ngConfirm', 'ProductCommonService'];

    function ProductBaseController(vm, $state, $rootScope, $scope, $window, $compile, $timeout
    		, ContactCommonDialogService, ResponseValidateService, Principal, DateUtils, $ngConfirm, ProductCommonService){
		vm.message = { name: 'default entry from ProductBaseController' };

		var checkCloseStepOne = false;
        var checkCloseStepTwo = false;
        var checkCloseStepThree = false;
        vm.loading = false;
        vm.typeArrowOne = "fa-angle-left";
        vm.typeArrowTwo = "fa-angle-left";
        vm.typeArrowThree = "fa-angle-right";

        vm.typeNameOne = "1";
        vm.typeNameTwo = "2";
        vm.typeNameThree = "3";
        vm.currentAccount;
        vm.contactCode;
        vm.contactName;
        vm.contactDob;
        vm.nextCount = 0;
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
        vm.closeOpenStepMobile = closeOpenStepMobile;
        vm.calculateToDate = calculateToDate;
        vm.openSearchContact = openSearchContact;
		vm.appendCommonData = appendCommonData;
		vm.openAddContact = openAddContact;

		vm.getName = getName;
        vm.dobValidator = dobValidator;
        vm.emailValidator = emailValidator;
        vm.validateResponse = validateResponse;
        vm.clearResponseError = clearResponseError;
        vm.registerDisableContactInfoValue = registerDisableContactInfoValue;
        
        vm.createNewPolicyBase = createNewPolicyBase; 
        vm.showCreatePolicySuccessInfo = showCreatePolicySuccessInfo;
        // implement function
        function createNewPolicyBase(productCode, obj) {
        	vm.loading = true;
        	console.log('create new policy: ' + productCode);
        	switch(productCode){
	  	        case "KCARE":
	  	        	ProductCommonService.createKcarePolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
	  	            break;
	  	        case "CAR":
	  	        	ProductCommonService.createCarPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
	  	            break;
	  	        case "BVP":
	  	        	ProductCommonService.createBvpPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
	  	            break;
	  	        case "KHC":
	  	        	ProductCommonService.createKhcPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
	  	            break;
	  	        case "TNC":
	  	        	ProductCommonService.createTncPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
	  	            break;
		  	    case "TVC":
		  	    	ProductCommonService.createTvcPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
	  	            break;
		  	    case "TVI":
		  	    	ProductCommonService.createTviPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
		            break;
		  	    case "HOME":
		  	    	ProductCommonService.createHomePolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
		            break;
		  	    case "MOTO":
		  	    	ProductCommonService.createMotoPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
		            break;
		  	    case "HHVC":
		  	    	ProductCommonService.createHhvcPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
		            break;
	  	        default: 
	  	            console.log('invalid product code');
	  	        break;
	  	    }

  			function onCreatePolicySuccess(data, headers) {
  				vm.clearResponseError();
                vm.loading = false;
  				vm.showCreatePolicySuccessInfo();
            }
  			
            function onCreatePolicyError(error) {
                vm.loading = false;
                vm.validateResponse(error, 'createPolicy');
            }
        }
        
        function showCreatePolicySuccessInfo() {
        	$ngConfirm({
                title: 'Thông báo',
                icon: 'fa fa-check',
                theme: 'modern',
                type: 'blue',
                content: '<div class="text-center">Tạo hợp đồng thành công!</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đóng',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	$state.go('app.cart');
	                    }
                    }
                },
            });
        }
        
        
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
                vm.contactEmail = $rootScope.selectedContact.email;
                vm.contactPhone = $rootScope.selectedContact.handPhone;
                vm.contactAddress = $rootScope.selectedContact.homeAddress;
                vm.contactAddressDistrict = $rootScope.selectedContact.homeAddress;
                vm.handPhone = $rootScope.selectedContact.handPhone;
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
        	console.log('openSearchContact');
        	ContactCommonDialogService.openSearchDialog();
        }
        
        function openAddContact() {
        	ContactCommonDialogService.openAddDialog();
        }

        function closeOpenStepMobile(type){
            if(isNext) {
                vm.nextCount++;
            }
            if(type == "step1"){
                document.getElementById("bv-step-1").className = 'bv-step-1  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex widthStep98 display-flex OpenStepOne ';
                document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                document.getElementById("mobile-step-1").className = 'text-center display-inline-block bv-step-mobile active-mobile-tab';
                document.getElementById("mobile-step-2").className = 'text-center display-inline-block bv-step-mobile';
                document.getElementById("mobile-step-3").className = 'text-center display-inline-block bv-step-mobile';
                vm.typeNameOne = "Tính phí";
                vm.typeNameTwo = "2";
                vm.typeNameThree = "3";
                checkCloseStepOne = true;
            }else if(type == "step2"){
                if(vm.nextCount >= 1) {
                    document.getElementById("bv-step-2").className = 'bv-step-2  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex  widthStep98 OpenStepTwo';
                    document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                    document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                    document.getElementById("mobile-step-1").className = 'text-center display-inline-block bv-step-mobile ';
                    document.getElementById("mobile-step-2").className = 'text-center display-inline-block bv-step-mobile active-mobile-tab';
                    document.getElementById("mobile-step-3").className = 'text-center display-inline-block bv-step-mobile';
                    vm.typeNameOne = "1";
                    vm.typeNameTwo = "Thông tin giao hàng";
                    vm.typeNameThree = "3";
                }
            }else if(type == "step3"){
                if(vm.nextCount >= 2) {
                    document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                    document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                    document.getElementById("bv-step-3").className = 'bv-step-3 display-flex openStepOne col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex  widthStep98';
                    document.getElementById("mobile-step-1").className = 'text-center display-inline-block bv-step-mobile ';
                    document.getElementById("mobile-step-2").className = 'text-center display-inline-block bv-step-mobile ';
                    document.getElementById("mobile-step-3").className = 'text-center display-inline-block bv-step-mobile active-mobile-tab';
                    vm.typeNameOne = "1";
                    vm.typeNameTwo = "2";
                    vm.typeNameThree = "Tóm tắt đơn hàng";
                }

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


        function closeOpenStep(type, isNext){
            if(isNext) {
                vm.nextCount++;
            }
            if(type == "step1"){
                document.getElementById("bv-step-1").className = 'bv-step-1  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex widthStep98 display-flex OpenStepOne';
                document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                vm.typeArrowOne = "fa-angle-left";
                vm.typeArrowThree = "fa-angle-right";
                vm.typeArrowTwo = "fa-angle-right";
                checkCloseStepOne = true;
            }else if(type == "step2"){
                if(vm.nextCount >= 1) {
                    document.getElementById("bv-step-2").className = 'bv-step-2  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex  widthStep98 OpenStepTwo';
                    document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                    document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                    vm.typeArrowOne = "fa-angle-right";
                    vm.typeArrowThree = "fa-angle-right";
                    vm.typeArrowTwo = "fa-angle-left";
                }
            }else if(type == "step3"){
                if(vm.nextCount >= 2) {
                    document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                    document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                    document.getElementById("bv-step-3").className = 'bv-step-3 display-flex openStepOne col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex  widthStep98';
                    vm.typeArrowOne = "fa-angle-right";
                    vm.typeArrowThree = "fa-angle-left";
                    vm.typeArrowTwo = "fa-angle-right";

                    // NamNH fix: Append contactCode + invoiceInfo + receiverUser
                    appendCommonData(vm.policy);
                }
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
        
        function getName(id, datas) {
  			var filterObj = datas.filter(function(e) {
  			  return e.id == id;
  			});
  			if (filterObj[0] != null && filterObj[0] != undefined) {
  				return filterObj[0].name;
  			}
  		}

  		// FOR DISABLE ALL
		function registerDisableContactInfoValue(model) {
			$scope.$watch(model, function(value) {
		    	if(value > 0) {
		            disableContactInfo(false);
		        } else {
		            disableContactInfo(true);
		        }
		    }, true);
		}
		
        function disableContactInfo(isDisable) {
            if(isDisable) {
                $("#contact-info").addClass("disable-all");
            } else {
                $("#contact-info").removeClass("disable-all");
            }
        }

  		// FOR VALIDATOR
        // Date of birth validator
        function dobValidator(dobStr) {
            if(!dobStr){return;}

            var now = new Date();
            var nowStr = DateUtils.convertDate(now);

            var dateDiff = DateUtils.dateDiff(dobStr, nowStr);
            var yearDiff = DateUtils.yearDiff(dobStr, nowStr);

            if (dateDiff < 15 || yearDiff > 70) {
                return "Ngày Sinh: Chỉ nhận bh cho đối tượng, từ 15 ngày tuổi đến 70 tuổi";
            }
            return true;
        };
        
        function emailValidator() {
            if(!vm.receiverUserData.email){return;}

            if (myForm.input.$error.email) {
                return "Không đúng định dạng email!";
            }
            return true;
        };
        
        function validateResponse(result, type) {
        	vm.errorField = result.data.fieldName;

            var message = ResponseValidateService.validateResponse(result.data);
            if(!message) {
                message = result.data.fieldName + ' is invalid';
            }
            if(type == 'getPremium') {
                message = '' + message;
            } else if(type == 'createPolicy') {
                message = '' + message ;
            } else if(type == 'getPolicyNumber') {
                message = '' + message ;
            }
            toastr.error(message, 'Lỗi');
        }
        
        function clearResponseError() {
        	ResponseValidateService.cleanResponseError(vm.errorField);
        }
    }
})();
