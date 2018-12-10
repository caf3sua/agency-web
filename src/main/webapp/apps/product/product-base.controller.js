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

    ProductBaseController.$inject = ['vm', '$state', '$http', '$stateParams', '$rootScope', '$scope', '$window', '$compile', '$timeout'
    	, 'ContactCommonDialogService', 'ResponseValidateService', 'Principal'
    	, 'DateUtils', '$ngConfirm', 'ProductCommonService', '$filter', '$uibModal', '$localStorage', 'ContactService', 'API_SERVICE_URL'];

    function ProductBaseController(vm, $state, $http, $stateParams, $rootScope, $scope, $window, $compile, $timeout
    		, ContactCommonDialogService, ResponseValidateService, Principal
    		, DateUtils, $ngConfirm, ProductCommonService, $filter, $uibModal, $localStorage, ContactService, API_SERVICE_URL){
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
        vm.invoiceInfo = {  
				"accountNo":"",
				"address":"",
				"addressDistrict":"",
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
        vm.openSearchContactOther = openSearchContactOther;
		vm.openAddContact = openAddContact;

		vm.getName = getName;
        vm.dobValidator = dobValidator;
        vm.emailValidator = emailValidator;
        vm.validateResponse = validateResponse;
        vm.clearResponseError = clearResponseError;
        vm.registerDisableContactInfoValue = registerDisableContactInfoValue;
        vm.disableContactInfo = disableContactInfo;
        vm.isEditMode = isEditMode;
        vm.isCopyMode = isCopyMode;
        vm.selectedContactMode = selectedContactMode;
        vm.loadPolicyEdit = loadPolicyEdit;
        
        vm.savePolicyBase = savePolicyBase; 
        vm.showSavePolicySuccessInfo = showSavePolicySuccessInfo;
        vm.showOTPSavePolicySuccessInfo = showOTPSavePolicySuccessInfo;
        vm.confirmResendOTP = confirmResendOTP;
        vm.confirmCommunication = confirmCommunication;
        vm.showWarningEditPolicy = showWarningEditPolicy;
        vm.formatAddressEdit = formatAddressEdit; 
        vm.getAddressByPostCode = getAddressByPostCode;
        
        vm.changeCopyFromContact = changeCopyFromContact;
        vm.changeCopyFromContactInvoice = changeCopyFromContactInvoice;
        
        vm.cleanAllResponseError = cleanAllResponseError;
        
        vm.openSearchContactInvoice = openSearchContactInvoice;
        vm.openSearchContactReceiver = openSearchContactReceiver;
        vm.loadContactForInvoice = false;
    	vm.loadContactForReceiver = false;
    	vm.validateInvoice = validateInvoice;
    	
    	vm.selectedContactChange = selectedContactChange;
    	
    	vm.isImageFile = isImageFile;
    	vm.downloadAttachment = downloadAttachment;
    	
    	vm.confirmOTP = confirmOTP;
    	vm.showImportExcelPopup = showImportExcelPopup;
    	vm.exportExcel = exportExcel;
    	vm.openConfirmDialog = openConfirmDialog;
    	
    	// 15.08
    	vm.checkDate = checkDate;
    	var modalInstance = null;
    	
    	$scope.$on('selectedContactChange', selectedContactChange);
    	
    	$rootScope.$on('contactCreateSuccess', function() {
        	if ($rootScope.createContact != undefined && $rootScope.createContact != null) {
        		vm.policy.contactCode = $rootScope.createContact.contactCode;
        		vm.policy.contactName = $rootScope.createContact.contactName;
                vm.policy.contactDob = $rootScope.createContact.dateOfBirth;
                vm.policy.contactPhone = $rootScope.createContact.phone;
                vm.policy.contactEmail = $rootScope.createContact.email;
                vm.policy.contactIdNumber = $rootScope.createContact.idNumber;
                vm.policy.contactCategoryType = $rootScope.createContact.categoryType;
//                vm.policy.contactAddress = $rootScope.createContact.homeAddress;
                vm.policy.contactAddress = $rootScope.createContact.homeAddress.substring(0, $rootScope.createContact.homeAddress.indexOf("::"));
                
                let postcode = $rootScope.createContact.homeAddress.substring($rootScope.createContact.homeAddress.lastIndexOf("::") + 2);
                ProductCommonService.getAddressByPostcode({code: postcode}).$promise.then(function(data) {
                	vm.policy.contactAddressDistrictData = data;
                });
                
                
        	}
        });
    	
    	function checkDate(startDate, endDate){
    		var splitStart = startDate.split('/');
    	    var dateStart = new Date(splitStart[2], splitStart[1] - 1, splitStart[0]); //Y M D 
    	    var timesStart = dateStart.getTime();
    		
    		var splitEnd = endDate.split('/');
    	    var dateEnd = new Date(splitEnd[2], splitEnd[1] - 1, splitEnd[0]); //Y M D 
    	    var timesEnd = dateEnd.getTime();
    	    if (timesEnd < timesStart) {
    	        return false;
    	    }
    	    return true;
    	}
    	
    	function validateInvoice() {
    		console.log('validateInvoice');
    		if (vm.policy.invoiceInfo != null){
    			if (isNotEmptyString(vm.policy.invoiceInfo.name) && isNotEmptyString(vm.policy.invoiceInfo.company) 
    					&& isNotEmptyString(vm.policy.invoiceInfo.taxNo) && isNotEmptyString(vm.policy.invoiceInfo.address) 
    					&& vm.policy.invoiceInfo.addressDistrictData != undefined){
    				return true;        				
    			}
    			if (isEmptyString(vm.policy.invoiceInfo.name) && isEmptyString(vm.policy.invoiceInfo.company)
    					&& isEmptyString(vm.policy.invoiceInfo.taxNo) && isEmptyString(vm.policy.invoiceInfo.address) 
    					&& isEmptyString(vm.policy.invoiceInfo.addressDistrictData)){
    				return true;        				
    			}
    			
        		return false; 
    		}
    		return true;
    	}
    	
    	function openSearchContactInvoice() {
    		console.log('openSearchContactInvoice');
    		vm.loadContactForInvoice = true;
        	ContactCommonDialogService.openSearchDialog();
    	}
    	
    	function openSearchContactReceiver() {
    		console.log('openSearchContactReceiver');
    		vm.loadContactForReceiver = true;
        	ContactCommonDialogService.openSearchDialog();
    	}
    	
        function changeCopyFromContact() {
        	vm.policy.receiverUser = {};
	      	if (vm.copyFromContact) {
	      		if (vm.lineId == 'BVP') {
	      			if (vm.policy.agreementId != null && vm.policy.agreementId != undefined && vm.policy.agreementId != ""){
	      	    		vm.policy.receiverUser.name = vm.policy.contactName;
			      		vm.policy.receiverUser.address = vm.policy.contactAddress;
			      		vm.policy.receiverUser.mobile = vm.policy.contactPhone;
			      		vm.policy.receiverUser.email = vm.policy.contactEmail;
	                	vm.policy.receiverUser.addressDistrictData = vm.policy.contactAddressDistrictData;
	      			} else {
	      				var dataBVP = $rootScope.saveNguoiYcBVP;
		      			let address = dataBVP.homeAddress;
		      			vm.policy.receiverUser.name = dataBVP.contactName;
			      		vm.policy.receiverUser.address = address.substring(0, address.indexOf("::"));
			      		vm.policy.receiverUser.mobile = dataBVP.phone;
			      		vm.policy.receiverUser.email = dataBVP.email;

		                let postcode = address.substring(address.lastIndexOf("::") + 2);
		                ProductCommonService.getAddressByPostcode({code: postcode}).$promise.then(function(data) {
		                	vm.policy.receiverUser.addressDistrictData = data;
		                });
	      			}
	      		} else {
	      			vm.policy.receiverUser.name = vm.policy.contactName;
		      		vm.policy.receiverUser.address = vm.policy.contactAddress;
	      			
		      		vm.policy.receiverUser.addressDistrictData = vm.policy.contactAddressDistrictData;
		      		vm.policy.receiverUser.mobile = vm.policy.contactPhone;
		      		vm.policy.receiverUser.email = vm.policy.contactEmail;
	      		}
	      	}
        }
        
        function changeCopyFromContactInvoice() {
        	vm.policy.invoiceInfo = {};
	      	if (vm.copyFromContactInvoice) {
	      		if (vm.lineId == 'BVP') {
	      			if (vm.policy.agreementId != null && vm.policy.agreementId != undefined && vm.policy.agreementId != ""){
	      				vm.policy.invoiceInfo.name = vm.policy.contactName;
	      				if (vm.policy.contactCategoryType == "ORGANIZATION"){
		      				vm.policy.invoiceInfo.company = vm.policy.contactName;
		      				vm.policy.invoiceInfo.taxNo = vm.policy.contactIdNumber;
		      			}
	      				
	      				vm.policy.invoiceInfo.address = vm.policy.contactAddress;
			      		vm.policy.invoiceInfo.addressDistrictData = vm.policy.contactAddressDistrictData;
	      			} else {
	      				var dataBVP = $rootScope.saveNguoiYcBVP;
		      			let address = dataBVP.homeAddress;
		      			vm.policy.invoiceInfo.name = dataBVP.contactName;
		      			if (vm.policy.contactCategoryType == "ORGANIZATION"){
		      				vm.policy.invoiceInfo.company = vm.policy.contactName;
		      				vm.policy.invoiceInfo.taxNo = vm.policy.contactIdNumber;
		      			}
		      			
			      		vm.policy.invoiceInfo.address = address.substring(0, address.indexOf("::"));

		                let postcode = address.substring(address.lastIndexOf("::") + 2);
		                ProductCommonService.getAddressByPostcode({code: postcode}).$promise.then(function(data) {
		                	vm.policy.invoiceInfo.addressDistrictData = data;
		                });
	      			}
	      		} else {
	      			vm.policy.invoiceInfo.name = vm.policy.contactName;
	      			if (vm.policy.contactCategoryType == "ORGANIZATION"){
	      				vm.policy.invoiceInfo.company = vm.policy.contactName;
	      				vm.policy.invoiceInfo.taxNo = vm.policy.contactIdNumber;
	      			}
	      			
		      		vm.policy.invoiceInfo.address = vm.policy.contactAddress;
		      		vm.policy.invoiceInfo.addressDistrictData = vm.policy.contactAddressDistrictData;
	      		}
	      	}
        }
        
        // implement function
        function loadPolicyEdit(obj) {
        	if (!isEditMode()) {
        		return;
        	}
        	
        	// Load policy
        	$state.current.data.title = $state.current.data.title + '_EDIT';
        	
        	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
        		obj = result;
        		console.log('ProductCommonService');
        		console.log(obj);
            }).catch(function(data, status) {
    			console.log('Error get policy to edit');
    			vm.clearResponseError();
    			vm.validateResponse(data, 'getPolicyToEdit');
		    });
        }
        
        function isEditMode() {
        	if ($stateParams.id != undefined && $stateParams.id != null && $stateParams.id > 0 && $stateParams.copy == "false") {
        		return true;
        	}
        	
        	return false;
        }
        
        function isCopyMode() {
        	if ($stateParams.id != undefined && $stateParams.id != null && $stateParams.id > 0 && $stateParams.copy == "true") {
        		return true;
        	}
        	
        	return false;
        }
        
        function selectedContactMode() {
        	if ($stateParams.selContactId != undefined && $stateParams.selContactId != null) {
        		ContactService.get({id : $stateParams.selContactId}).$promise.then(function(result) {
        			// Store into rootScope
          			$rootScope.selectedContact = result;
          			selectedContactChange();
          			
                }).catch(function(data, status) {
        			console.log('Error get gychbhNumber');
    		    });
        	}
        }
        
        function formatAddressEdit(address) {
        	return address.substring(0, address.indexOf("::"));
        }
        
        function getAddressByPostCode(address) {
        	var postcode = address.substring(address.lastIndexOf("::") + 2);
        	return ProductCommonService.getAddressByPostcode({code: postcode}).$promise;
        }
        
        
        function savePolicyBase(productCode, obj) {
        	vm.loading = true;
        	vm.policy.receiverUser.address = vm.policy.receiverUser.address 
    			+ "::" + vm.policy.receiverUser.addressDistrictData.pkDistrict
    			+ "::" + vm.policy.receiverUser.addressDistrictData.pkPostcode;
        	
        	if (vm.policy.invoiceInfo.name != null && vm.policy.invoiceInfo.company != null && vm.policy.invoiceInfo.taxNo != null && vm.policy.invoiceInfo.address != null && vm.policy.invoiceInfo.accountNo != null && vm.policy.invoiceInfo.name != "" && vm.policy.invoiceInfo.company != "" && vm.policy.invoiceInfo.taxNo != "" && vm.policy.invoiceInfo.address != "" && vm.policy.invoiceInfo.accountNo != ""){
        		vm.policy.invoiceInfo.address = vm.policy.invoiceInfo.address 
    			+ "::" + vm.policy.invoiceInfo.addressDistrictData.pkDistrict
    			+ "::" + vm.policy.invoiceInfo.addressDistrictData.pkPostcode;	
        	}
        	
        	// Save or update
        	if (obj.agreementId != null && obj.agreementId != "") {
        		// Update
        		updatePolicy(productCode, obj);
        	} else {
        		ProductCommonService.getPolicyNumber({lineId: productCode}).$promise.then(function(result) {
        			vm.clearResponseError();
                	console.log('Done get gychbhNumber: ' + result.policyNumber);
                	// Add ychbhNumber
                	obj.gycbhNumber  = result.policyNumber;

                	// Add new
                	createNewPolicy(productCode, obj);
                }).catch(function(data, status) {
        			console.log('Error get gychbhNumber');
        			vm.clearResponseError();
        			vm.validateResponse(data, 'getPolicyNumber');
    		    });
        	}
        }
        
        function createNewPolicy(productCode, obj) {
        	if (vm.policy.departmentId == undefined || vm.policy.departmentId == null || vm.policy.departmentId == "") {
        		toastr.error("Cần chọn phòng ban");
        		return;
        	}
        	
        	console.log('create new policy: ' + productCode);
        	switch(productCode){
	  	        case "KCR":
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
		  	    case "HOM":
		  	    	ProductCommonService.createHomePolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
		            break;
		  	    case "MOT":
		  	    	ProductCommonService.createMotoPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
		            break;
		  	    case "HHV":
		  	    	ProductCommonService.createHhvcPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
		            break;
	  	        default: 
	  	            console.log('invalid product code');
	  	        break;
	  	    }
	
			function onCreatePolicySuccess(data, headers) {
				vm.clearResponseError();
	            vm.loading = false;
				// kiểm tra nếu TH đang soạn thì ko bật otp
//				if (data.statusPolicy == "90"){
					var checkOTP = vm.currentAccount.sendOtp;
		            if (checkOTP == 1){
		            	$rootScope.gycbhNumber = data.gycbhNumber;
		            	vm.showOTPSavePolicySuccessInfo();
		            } else {
		            	vm.showSavePolicySuccessInfo(obj);	
		            }	
//				} else {
//					vm.showSavePolicySuccessInfo(obj);
//				}
	        }
				
	        function onCreatePolicyError(error) {
	            vm.loading = false;
	            vm.validateResponse(error, 'createPolicy');
	        }
        }
        
        function updatePolicy(productCode, obj) {
        	console.log('update policy: ' + productCode);
        	switch(productCode){
	  	        case "KCR":
	  	        	ProductCommonService.updateKcarePolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
	  	            break;
	  	        case "CAR":
	  	        	ProductCommonService.updateCarPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
	  	            break;
	  	        case "BVP":
	  	        	ProductCommonService.updateBvpPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
	  	            break;
	  	        case "KHC":
	  	        	ProductCommonService.updateKhcPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
	  	            break;
	  	        case "TNC":
	  	        	ProductCommonService.updateTncPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
	  	            break;
		  	    case "TVC":
		  	    	ProductCommonService.updateTvcPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
	  	            break;
		  	    case "TVI":
		  	    	ProductCommonService.updateTviPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
		            break;
		  	    case "HOM":
		  	    	ProductCommonService.updateHomePolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
		            break;
		  	    case "MOT":
		  	    	ProductCommonService.updateMotoPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
		            break;
		  	    case "HHV":
		  	    	ProductCommonService.updateHhvcPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
		            break;
	  	        default: 
	  	            console.log('invalid product code');
	  	        break;
	  	    }
	
			function onUpdatePolicySuccess(data, headers) {
				vm.clearResponseError();
	            vm.loading = false;
	            // kiểm tra nếu TH đang soạn thì ko bật otp
//				if (data.statusPolicy == "90"){
					var checkOTP = vm.currentAccount.sendOtp;
		            if (checkOTP == 1){
		            	$rootScope.gycbhNumber = data.gycbhNumber;
		            	vm.showOTPSavePolicySuccessInfo();
		            } else {
		            	vm.showSavePolicySuccessInfo(obj);	
		            }	
//				} else {
//					vm.showSavePolicySuccessInfo(obj);
//				}
	        }
				
	        function onUpdatePolicyError(error) {
	            vm.loading = false;
	            vm.validateResponse(error, 'updatePolicy');
	        }
        }
        
        function showWarningEditPolicy() {
        	$ngConfirm({
                title: 'Dữ liệu không hợp lệ',
                icon: 'fas fa-exclamation-triangle',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Không tìm thấy hợp đồng</div>',
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
		
		function updateAgreementOTP(option, otp) {
			// option == 1 -> update OTP check
			if (option == "1") {
				var gycbhNumber = $rootScope.gycbhNumber;
        		vm.checkOtp = {  
        				"otp": otp,
        				"gycbhNumber": gycbhNumber
        			};
        		
        		ProductCommonService.checkOTP(vm.checkOtp, onSuccess, onError);
        		
        		function onSuccess(data, headers) {
        			if (data.statusPolicyId == "93"){
        				$state.go('order.baoviet');
        			} else {
        				$state.go('app.cart', {sel: $rootScope.gycbhNumber});	
        			}
        			$rootScope.$broadcast('agreementChangeSuccess');
        		}
    				
    	        function onError(error) {
    	        	toastr.error('Mã xác thực không chính xác. Đề nghị kiểm tra lại');
				}
			} else {
//				$state.go('app.cart', {sel: $rootScope.gycbhNumber});
				$state.go('order.agency');
				$rootScope.$broadcast('agreementChangeSuccess');
			}
		}
		
		function confirmCommunication(order) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fas fa-comments',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn trao đổi hợp đồng ' + order.gycbhNumber + ' này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	doCommunication(order);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
		
		function doCommunication(order) {
  			$rootScope.communication_GycbhNumber = order.gycbhNumber;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'apps/communication/view/communication-dialog.html',
                controller: 'CommunicationController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            });	            
  		}
		
		function confirmResendOTP(gycbhNumber) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fas fa-sync-alt',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn gửi lại otp ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	resendOTP(gycbhNumber);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
  		
  		function resendOTP(number) {
  			console.log('resendOTP');
  			$rootScope.gycbhNumber = number;
  			ProductCommonService.resendOtp({gycbhNumber: number}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				showOTPSavePolicySuccessInfo();
  				toastr.success('Đã gửi lại otp với mã đơn hàng: ' + result.gycbhNumber);
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi gửi lại otp đơn hàng!");
  			}
  		}
  		
  		function confirmOTP(number) {
  			console.log('resendOTP');
  			$rootScope.gycbhNumber = number;
  			showOTPSavePolicySuccessInfo();
  		}
        
        function showOTPSavePolicySuccessInfo() {
			$ngConfirm({
					title: 'Xác thực OTP',
                    icon: 'fa fa-info',
					theme: 'modern',
					type: 'blue',
					contentUrl: 'apps/product/partial/partial-OTP-modal.html',
                    closeIcon: false,
                    buttons: {
                        complete: {
							text: 'Hoàn thành',
                            disabled: true,
                            btnClass: 'btn-green',
                            action: function (scope) {
								updateAgreementOTP(scope.otpOptions, scope.otp);
                            }
                        }
                    },
                    onScopeReady: function (scope) {
						var self = this;
						scope.otpOptions = "1";
						scope.optionChange = function () {
							if (scope.otpOptions == "0") {
								self.buttons.complete.setDisabled(false);
								scope.otp = "";
							} else {
								self.buttons.complete.setDisabled(true);
							}
						}
						
						scope.otpChange = function () {
                            if (scope.otp != null && scope.otp.length == 6)
                                self.buttons.complete.setDisabled(false);
                            else
                                self.buttons.complete.setDisabled(true);
                        }
                    }
                });
        	}
        
        function showSavePolicySuccessInfo(obj) {
        	var message = "";
        	if (obj.agreementId != null && obj.agreementId != "") {
        		// Update
        		message = "Cập nhật hợp đồng " + obj.gycbhNumber + " thành công!";
        	} else {
        		message = "Tạo hợp đồng  " + obj.gycbhNumber + " thành công!";
        	}
        	
        	$ngConfirm({
                title: 'Thông báo',
                icon: 'fa fa-check',
                theme: 'modern',
                type: 'blue',
                content: '<div class="text-center">' + message + '</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đóng',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	$state.go('app.cart', {sel: obj.gycbhNumber});
	                    }
                    }
                },
            });
        	
        	$rootScope.$broadcast('agreementChangeSuccess');
        }
        
        
		function getAccount() {
  			Principal.identity().then(function(account) {
                vm.currentAccount = account;
                if (vm.currentAccount.lstDepartment != null && vm.currentAccount.lstDepartment.length > 0) {
                	vm.policy.departmentId = vm.currentAccount.lstDepartment[0].departmentId;
                }
            });
  		}
		
        function selectedContactChange() {
        	if ($rootScope.selectedContact != undefined && $rootScope.selectedContact != null) {
        		if (vm.loadContactForInvoice) {
        			if (vm.policy.invoiceInfo == null || vm.policy.invoiceInfo == undefined) {
        				vm.policy.invoiceInfo = {};
        			}
        			vm.policy.invoiceInfo.name = $rootScope.selectedContact.contactName;
        			if ($rootScope.selectedContact.categoryType == "ORGANIZATION"){
	      				vm.policy.invoiceInfo.company = vm.policy.contactName;
	      				vm.policy.invoiceInfo.taxNo = vm.policy.contactIdNumber;
	      			}
        			
        			let addressReceiver = $rootScope.selectedContact.homeAddress;
            		vm.policy.invoiceInfo.address = addressReceiver.substring(0, addressReceiver.indexOf("::"));

                    let postcodeReceiver = addressReceiver.substring(addressReceiver.lastIndexOf("::") + 2);
                    ProductCommonService.getAddressByPostcode({code: postcodeReceiver}).$promise.then(function(data) {
                    	vm.policy.invoiceInfo.addressDistrictData = data;
                    });
        			
                    // reset
                    vm.loadContactForInvoice = false;
            		return;
            	} else if (vm.loadContactForReceiver) {
            		if (vm.policy.receiverUser == null || vm.policy.receiverUser == undefined) {
            			vm.policy.receiverUser = {};
        			}
            		vm.policy.receiverUser.name = $rootScope.selectedContact.contactName;
            		vm.policy.receiverUser.mobile = $rootScope.selectedContact.phone;
            		vm.policy.receiverUser.email = $rootScope.selectedContact.email;
            		
            		let addressReceiver = $rootScope.selectedContact.homeAddress;
            		vm.policy.receiverUser.address = addressReceiver.substring(0, addressReceiver.indexOf("::"));

                    let postcodeReceiver = addressReceiver.substring(addressReceiver.lastIndexOf("::") + 2);
                    ProductCommonService.getAddressByPostcode({code: postcodeReceiver}).$promise.then(function(data) {
                    	vm.policy.receiverUser.addressDistrictData = data;
                    });
            		
                    // reset
                    vm.loadContactForReceiver = false;
            		return;
            	}
        		// xử lý trường hợp chọn contact ở BVP và KCR khi có nhiều selectedContactChange
        		if (vm.lineId == 'BVP' && vm.policy.nguoiycName != ""){
        			
        		} else if (vm.lineId == 'KCR' && vm.policy.contactCode != "" && vm.policy.contactCode != null && vm.policy.contactCode != undefined){
        			
        		} else if (vm.lineId == 'ANC'){
        			vm.policy.contactCode = $rootScope.selectedContact.contactCode;
            		vm.policy.contactName = $rootScope.selectedContact.contactName;
        		} else if (vm.lineId == 'OFF'){
        			vm.policy.contactCode = $rootScope.selectedContact.contactCode;
            		vm.policy.contactName = $rootScope.selectedContact.contactName;
            		vm.policy.dateOfBirth = $rootScope.selectedContact.dateOfBirth;
            		vm.policy.contactCategoryType = $rootScope.selectedContact.categoryType;
            		vm.policy.contactAddress = $rootScope.selectedContact.homeAddress;
            		
            		var now = new Date();
                    var nowStr = DateUtils.convertDate(now);
                    vm.policy.tuoi = DateUtils.yearDiff(vm.policy.dateOfBirth, nowStr);
                    
                    if (vm.policy.tuoi < 18){
                    	vm.isShowGKS = true;
                    } else{
                    	vm.isShowGKS = false;
                    }
        		} else {
        			vm.policy.contactCode = $rootScope.selectedContact.contactCode;
            		vm.policy.contactName = $rootScope.selectedContact.contactName;
                    vm.policy.contactDob = $rootScope.selectedContact.dateOfBirth;
                    vm.policy.contactPhone = $rootScope.selectedContact.phone;
                    vm.policy.contactEmail = $rootScope.selectedContact.email;
                    vm.policy.contactIdNumber = $rootScope.selectedContact.idNumber;
                    vm.policy.contactCategoryType = $rootScope.selectedContact.categoryType;

                    // vm.policy.contactAddress = $filter('address')($rootScope.selectedContact.homeAddress);
            		vm.policy.contactAddress = $rootScope.selectedContact.homeAddress.substring(0, $rootScope.selectedContact.homeAddress.indexOf("::"));
            		
                    let address = $rootScope.selectedContact.homeAddress;
                    let postcode = address.substring(address.lastIndexOf("::") + 2);
                    //vm.policy.contactAddressDistrictData = $rootScope.selectedContact.homeAddress;
                    ProductCommonService.getAddressByPostcode({code: postcode}).$promise.then(function(data) {
                    	vm.policy.contactAddressDistrictData = data;
                    	
                    	// Xy ly load THÔNG TIN CHỦ XE cho rieng CAR
                        if (vm.lineId == 'CAR') {
//                        	vm.policy.insuredName = vm.policy.contactName;
//                        	vm.policy.insuredAddress = vm.policy.contactAddress;
//                        	vm.policy.insuredAddressDistrict = vm.policy.contactAddressDistrictData;
                        } else if (vm.lineId == 'TVI') {
                        	// Bảo hiểm du lịch Việt Nam
                        	vm.policy.listTviAdd[0].insuredName = vm.policy.contactName;
                    		vm.policy.listTviAdd[0].idPasswport = vm.policy.contactIdNumber;
                    		vm.policy.listTviAdd[0].dob = vm.policy.contactDob;
                    		vm.policy.listTviAdd[0].relationshipId = "30"; // Ban than
                        } else if (vm.lineId == 'TVC') {
                        	// Bảo hiểm du lịch Quoc te
                        	if (vm.ngYcbhDicung && vm.policy.contactCategoryType != 'ORGANIZATION') {
                        		vm.policy.listTvcAddBaseVM[0].insuredName = vm.policy.contactName;
                        		vm.policy.listTvcAddBaseVM[0].idPasswport = vm.policy.contactIdNumber;
                        		vm.policy.listTvcAddBaseVM[0].dob = vm.policy.contactDob;
                        		vm.policy.listTvcAddBaseVM[0].relationship = "30"; // Ban than
                        	}
                        } else if (vm.lineId == 'TNC') {
                        	// Bảo hiểm tai nạn con người
                        	vm.policy.listTncAdd[0].insuredName = vm.policy.contactName;
                    		vm.policy.listTncAdd[0].idPasswport = vm.policy.contactIdNumber;
                    		vm.policy.listTncAdd[0].dob = vm.policy.contactDob;
                        }
                    });
        			
        		}
        	
        	}
        }

        function openSearchContact() {
        	console.log('openSearchContact');
        	ContactCommonDialogService.openSearchDialog('NYCBH');
        }
        
        function openSearchContactOther() {
        	console.log('openSearchContactOther');
        	ContactCommonDialogService.openSearchDialog();
        }
        
        function openAddContact() {
        	ContactCommonDialogService.openAddDialog();
        }

        function closeOpenStepMobile(type){
//            if(isNext) {
//                vm.nextCount++;
//            }
            if(type == "step1"){
                document.getElementById("bv-step-1").className = 'bv-step-1  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex widthStep98 display-flex OpenStepOne ';
                document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                if(document.getElementById("includeStep1")) {
                	document.getElementById("includeStep1").className = 'bv-display-step widthStep98';
                    document.getElementById("includeStep2").className = 'bv-display-step';
                    document.getElementById("includeStep3").className = 'bv-display-step';
                }
                document.getElementById("mobile-step-1").className = 'text-center display-inline-block bv-step-mobile active-mobile-tab';
                document.getElementById("mobile-step-2").className = 'text-center display-inline-block bv-step-mobile';
                document.getElementById("mobile-step-3").className = 'text-center display-inline-block bv-step-mobile';
//                vm.typeNameOne = "Tính phí";
//                vm.typeNameTwo = "2";
//                vm.typeNameThree = "3";
                checkCloseStepOne = true;
            }else if(type == "step2"){
                if(vm.nextCount >= 1) {
                    document.getElementById("bv-step-2").className = 'bv-step-2  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex  widthStep98 OpenStepTwo';
                    document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                    document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                    if(document.getElementById("includeStep1")) {
                    	document.getElementById("includeStep1").className = 'bv-display-step';
                        document.getElementById("includeStep2").className = 'bv-display-step widthStep98';
                        document.getElementById("includeStep3").className = 'bv-display-step';
                    }
                    document.getElementById("mobile-step-1").className = 'text-center display-inline-block bv-step-mobile ';
                    document.getElementById("mobile-step-2").className = 'text-center display-inline-block bv-step-mobile active-mobile-tab';
                    document.getElementById("mobile-step-3").className = 'text-center display-inline-block bv-step-mobile';
//                    vm.typeNameOne = "1";
//                    vm.typeNameTwo = "Thông tin giao hàng";
//                    vm.typeNameThree = "3";
                }
            }else if(type == "step3"){
        		if(vm.nextCount >= 2) {
                    document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                    document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                    document.getElementById("bv-step-3").className = 'bv-step-3 display-flex openStepOne col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex  widthStep98';
                    if(document.getElementById("includeStep1")) {
                    	document.getElementById("includeStep1").className = 'bv-display-step';
                        document.getElementById("includeStep2").className = 'bv-display-step ';
                        document.getElementById("includeStep3").className = 'bv-display-step widthStep98';
                    }
                    document.getElementById("mobile-step-1").className = 'text-center display-inline-block bv-step-mobile ';
                    document.getElementById("mobile-step-2").className = 'text-center display-inline-block bv-step-mobile ';
                    document.getElementById("mobile-step-3").className = 'text-center display-inline-block bv-step-mobile active-mobile-tab';
//                    vm.typeNameOne = "1";
//                    vm.typeNameTwo = "2";
//                    vm.typeNameThree = "Tóm tắt đơn hàng";
                }            		
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
                if(document.getElementById("includeStep1")) {
                	document.getElementById("includeStep1").className = 'bv-display-step widthStep98';
                    document.getElementById("includeStep2").className = 'bv-display-step';
                    document.getElementById("includeStep3").className = 'bv-display-step';
                }
                vm.typeArrowOne = "fa-angle-left";
                vm.typeArrowThree = "fa-angle-right";
                vm.typeArrowTwo = "fa-angle-right";
                checkCloseStepOne = true;
            }else if(type == "step2"){
            	if (validatorExtraInfo()) {
            		if(vm.nextCount >= 1) {
                        document.getElementById("bv-step-2").className = 'bv-step-2  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex  widthStep98 OpenStepTwo';
                        document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                        document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                        if(document.getElementById("includeStep1")) {
                        	document.getElementById("includeStep1").className = 'bv-display-step';
                            document.getElementById("includeStep2").className = 'bv-display-step widthStep98';
                            document.getElementById("includeStep3").className = 'bv-display-step';
                        }
                        vm.typeArrowOne = "fa-angle-right";
                        vm.typeArrowThree = "fa-angle-right";
                        vm.typeArrowTwo = "fa-angle-left";
                    }
            	}
            }else if(type == "step3"){
            	if(validateInvoice()){
	                if(vm.nextCount >= 2) {
	                    document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
	                    document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
	                    document.getElementById("bv-step-3").className = 'bv-step-3 display-flex openStepOne col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex  widthStep98';
	                    if(document.getElementById("includeStep1")) {
	                    	document.getElementById("includeStep1").className = 'bv-display-step';
	                        document.getElementById("includeStep2").className = 'bv-display-step ';
	                        document.getElementById("includeStep3").className = 'bv-display-step widthStep98';
	                    }
	                    vm.typeArrowOne = "fa-angle-right";
	                    vm.typeArrowThree = "fa-angle-left";
	                    vm.typeArrowTwo = "fa-angle-right";
	                }
            	} else{
            		if (vm.policy.invoiceInfo.name == "" || vm.policy.invoiceInfo.name == undefined){
        				angular.element('#invoiceInfoName').focus();
        				toastr.error("Cần nhập Họ và tên người mua");
        				return false;
        			}
        			if (vm.policy.invoiceInfo.company == "" || vm.policy.invoiceInfo.company == undefined){
        				angular.element('#invoiceInfoCompany').focus();
        				toastr.error("Cần nhập Tên đơn vị");
        				return false;
        			}
        			
        			if (vm.policy.invoiceInfo.taxNo == "" || vm.policy.invoiceInfo.taxNo == null || vm.policy.invoiceInfo.taxNo == undefined){
        				angular.element('#invoiceInfoTaxNo').focus();
        				toastr.error("Cần nhập Mã số thuế");
        				return false;
        			}
        			
        			if (vm.policy.invoiceInfo.address == "" || vm.policy.invoiceInfo.address == undefined){
        				angular.element('#invoiceInfoAddress').focus();
        				toastr.error("Cần nhập Địa chỉ đơn vị");
        				return false;
        			}
        			if (vm.policy.invoiceInfo.addressDistrictData == "" || vm.policy.invoiceInfo.addressDistrictData == null || vm.policy.invoiceInfo.addressDistrictData == undefined){
        				angular.element('#invoiceInfoAddressDistrict').focus();
        				toastr.error("Cần nhập Tên phường xã");
        				return false;
        			}
        			
        			/*if (vm.policy.invoiceInfo.accountNo == "" || vm.policy.invoiceInfo.accountNo == null || vm.policy.invoiceInfo.accountNo == undefined){
        				angular.element('#invoiceInfoAccountNo').focus();
        				toastr.error("Cần nhập Số tài khoản");
        				return false;
        			}*/
            	}
            }else{
                document.getElementById("bv-step-1").className = 'bv-step-1 col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex widthStep98';
                // document.getElementById("bv-step-2").className = 'bv-step-2 col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex widthStep2';
                // document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex ';
                checkCloseStepOne = false;
                vm.typeArrowOne = "fa-angle-left";
            }
        }
        
        function validatorExtraInfo() {
        	// clean error message
        	vm.cleanAllResponseError();
        	
        	switch(vm.lineId){
		  	    case "BVP":
		  	    	return validatorBVP();
	  	            break;
		  	    case "TVC":
		  	    	return validatorTVC();
	  	            break;
	  	        default: 
	  	        	break;
	  	    }
        	
        	return true;
        }
        
        function validatorTVC() {
        	console.log('validator extra TVC at step 2');
        	
        	// Validate CMND or Ngay sinh
        	let result = true; 
        	angular.forEach(vm.policy.listTvcAddBaseVM, function(item, key) {
        		if (isEmptyString(item.idPasswport) && isEmptyString(item.dob)) {
        			result = false;
        			// Show
        			let data = {
    	        		fieldName : "idPasswport" + key,
    	        		message : "Thiếu số hộ chiếu/CMND hoặc ngày sinh củangười được bảo hiểm"
        	        };
        	        
        	        ResponseValidateService.validateResponse(data)
        		}
		 	});
        	
        	if (result == false) {
        		toastr.error("Thiếu số hộ chiếu/CMND hoặc ngày sinh củangười được bảo hiểm");
        	}
        	
            return result;
        }
        
        function validatorBVP() {
        	if(vm.policy.q1 == 1 || vm.policy.q2 == 1 || vm.policy.q3 == 1) {
        		if (vm.policy.lstAdd[0].chuandoan == "" || vm.policy.lstAdd[0].chitietdieutri == "" || vm.policy.lstAdd[0].ketqua == ""){
        			toastr.error("Cần nhập đầy đủ thông tin trả lời tại các cột: Chẩn đoán, chi tiết điều trị, kết quả (tối thiểu 1 dòng)");
        			return false
        		}
        		
        		for (var i = 1; i < vm.policy.lstAdd.length; i ++ ){
        			if (vm.policy.lstAdd[i].ngaydieutri != "" || vm.policy.lstAdd[i].chuandoan != "" || vm.policy.lstAdd[i].chitietdieutri != "" || vm.policy.lstAdd[i].ketqua != "" || vm.policy.lstAdd[i].benhvienorbacsy != ""){
        				if (vm.policy.lstAdd[i].ngaydieutri == "" || vm.policy.lstAdd[i].chuandoan == "" || vm.policy.lstAdd[i].chitietdieutri == "" || vm.policy.lstAdd[i].ketqua == "" || vm.policy.lstAdd[i].benhvienorbacsy == ""){
        					toastr.error("Cần nhập đầy đủ thông tin trả lời tại các cột: Chẩn đoán, chi tiết điều trị, kết quả dòng thứ " + (i+1));
        					return false;
                		}
            		} 
        		}
        	}
        	
        	if(vm.policy.q1 == "" || vm.policy.q2 == "" || vm.policy.q3 == "") {
    			toastr.error("Cần trả lời các câu hỏi Thông tin tình trạng sức khỏe");
    			return false
        	}
        	
        	if(vm.policy.nguointNgaysinh != "" && vm.policy.nguointNgaysinh != null && vm.policy.nguointNgaysinh != undefined) {
        		var now = new Date();
                var nowStr = DateUtils.convertDate(now);
                var tuoi = DateUtils.yearDiff(vm.policy.nguointNgaysinh, nowStr);
                if (tuoi < 18){
                	toastr.error("Người nhận tiền bảo hiểm phải trên 18 tuổi.");
        			return false
                }
        	}
        	
            return true;
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
//                $("#contact-info").find("input,button").prop("disabled",false);
//                $("#contact-info").find(":button").prop("disabled",false);
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
                message = result.data.fieldName + ' dữ liệu không hợp lệ';
            }
            if(type == 'getPremium') {
                message = '' + message;
            } else if(type == 'createPolicy') {
                message = '' + message ;
            } else if(type == 'updatePolicy') {
                message = '' + message ;
            } else if(type == 'getPolicyNumber') {
                message = '' + message ;
            } else if(type == 'getPolicyToEdit') {
                message = '' + message ;
            }
            toastr.error(message);
        }
        
        function clearResponseError() {
        	ResponseValidateService.cleanResponseError(vm.errorField);
        }

        function cleanAllResponseError() {
        	ResponseValidateService.cleanAllResponseError();
        }

        function isImageFile(f) {
        	if (f == null || f == undefined || f.fileType == null || f.fileType == undefined ) {
        		return false;
        	}
        	
        	if (f.fileType.indexOf('image/') != -1) {
    			return true;
    		}
        	
        	return false;
        }
        
        function downloadAttachment(file) {
        	if (file.attachmentId != "" && file.attachmentId != null && file.attachmentId != undefined){
        		var templateRoute = API_SERVICE_URL + '/api/agency/document/download-attachment/' + file.attachmentId;
                $window.location = templateRoute;	
        	}
  		}
        
        function downloadTemplateTVC() {
        	console.log('download template TVC');
        	var templateRoute = API_SERVICE_URL + '/api/agency/document/download-template?filename=TVC_Template.xls';
            $window.location = templateRoute;
        }
        
        function exportExcel(lineId) {
        	switch(lineId){
		  	    case "TVC":
		  	    	let obj = {
		  	    		data : vm.policy.listTvcAddBaseVM
		  	    	};
		  	    	ProductCommonService.processExportExcelTvc(obj, onExportExcelSuccess, onExportExcelError);
	  	            break;
	  	        default: 
	  	            console.log('invalid product code');
	  	        break;
	  	    }
        	
        	function onExportExcelSuccess(result) {
        		if (result.error) {
        			// Download file loi
        			toastr.error("Lỗi khi xử lý xuất dữ liệu");
        			console.log('xu ly export loi');
        		} else {
        			toastr.success("Xuất dữ liệu thành công");
        			var templateRoute = API_SERVICE_URL + '/api/agency/document/download-file?path=' + window.encodeURIComponent(result.path);
                    $window.location = templateRoute;
        		}
        	}
        	function onExportExcelError(result) {
        		console.log(result);
        		toastr.error("Lỗi khi xử lý xuất dữ liệu");
        	}
        }
        
        function doUploadExcel(file) {
        	let uploadUrl = API_SERVICE_URL + '/api/agency/document/upload-file';
        	var myFormData = new FormData();

            myFormData.append('file', file);

            $http.post(uploadUrl, myFormData, {
                	transformRequest: angular.identity,
                	headers: {'Content-Type': undefined}
        	})
            .success(function(result){
            	console.log(result);
            	requestProcessImportExcel(result);
            })
            .error(function(error){
            	console.log(error);
            	toastr.error("Upload file lỗi");
            });
        }
        
        function requestProcessImportExcel(result) {
        	// Append more param
        	result.travelWithId = vm.policy.travelWithId;
        	result.contactCategoryType = vm.policy.contactCategoryType;
        	debugger
        	ProductCommonService.processImportExcelTvc(result, onProcessImportExcelSuccess, onProcessImportExcelError);
        	
        	function onProcessImportExcelSuccess(data) {
        		if (data.error) {
        			// Download file loi
        			toastr.error("Có lỗi import, mở file excel xem chi tiết");
        			console.log('xu ly import loi');
        			var templateRoute = API_SERVICE_URL + '/api/agency/document/download-file?path=' + window.encodeURIComponent(data.path);
                    $window.location = templateRoute;
        		} else {
            		vm.policy.soNguoiThamGia = data.data.length;
            		vm.policy.listTvcAddBaseVM = data.data;
            		
            		// generate code
            		angular.forEach(vm.policy.listTvcAddBaseVM, function(item, key) {
                		item.serial = generateId();
        		 	});
            		
            		$rootScope.$broadcast('tvcImportExcelSuccess');
            		console.log(data);
        		}
        	}
        	
        	function onProcessImportExcelError(error) {
        		console.log(error);
        		toastr.error("Có lỗi trong quá trình xử lý file import");
        	}
        }
        
        function showImportExcelPopup() {
        	$ngConfirm({
    			title: 'Import Excel',
                icon: 'far fa-file-excel',
    			theme: 'modern',
    			type: 'blue',
    			contentUrl: 'apps/product/partial/partial.import-excel.html',
                closeIcon: true,
                buttons: {
                    ok: {
                    	text: 'Thực hiện',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	var fileInput = $('#importExcelId');
                        	var input = fileInput.get(0);
                        	var fileImport = input.files[0];
                        	doUploadExcel(fileImport);
                        }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
                onScopeReady: function (scope) {
    				var self = this;
    				scope.downloadTemplate = function () {
    					downloadTemplateTVC();
    				}
    				
//    				scope.optionChange = function () {
//    					if (scope.otpOptions == "0") {
//    						self.buttons.complete.setDisabled(false);
//    						scope.otp = "";
//    					} else {
//    						self.buttons.complete.setDisabled(true);
//    					}
//    				}
//    				
//    				scope.otpChange = function () {
//                        if (scope.otp != null && scope.otp.length == 6)
//                            self.buttons.complete.setDisabled(false);
//                        else
//                            self.buttons.complete.setDisabled(true);
//                    }
                }
            });
        }
        
        function openConfirmDialog(message, callback) {
        	$ngConfirm({
                title: 'Xác nhận!',
                content: '<div class="text-center">' + message + '</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	callback;
	                    }
                    },
                    close: {
                    	text: 'Không',
                        action: function(scope, button){
	                    }
                    }
                },
            });
        }
        
    }
})();
