(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductTvcController', ProductTvcController);

    ProductTvcController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ProductCommonService'
    	, '$stateParams' , 'DateUtils', '$ngConfirm', '$timeout', 'ResponseValidateService'];

    function ProductTvcController ($scope, $controller, Principal, $state, $rootScope, ProductCommonService
    		, $stateParams, DateUtils, $ngConfirm, $timeout, ResponseValidateService) {
    	var vm = this;
    	vm.lineId = 'TVC';
    	vm.docsInit = [];
    	vm.docsInitSummary = [];
    	
    	vm.policy = {
    			// premium
    			premiumDiscount: "",
    			//
                agreementId: "",
                changePremium: "",
                contactCode: "",
                destinationId: "",
                expiredDate: "",
                gycbhNumber: "",
                inceptionDate: "",
                invoiceInfo: {
                    check: "0",
                 },
                listTvcAddBaseVM: [
                ],
                loaitien: "USD",
                netPremium: 0,
                paymentMethod:"paymentMethod",
                planId:"1",
                policyNumber: "",
                premium: 0,
                propserCellphone: "",
                propserName: "",
                propserNgaysinh: "",
                receiveMethod: "",
                receiverUser: {
                    address: "",
                    addressDistrict: "",
                    email: "",
                    mobile: "",
                    name: ""
                },
                invoiceInfo: {  
                  	accountNo:"",
      				address:"",
      				addressDistrict:"",
      				check:"0",
      				company:"",
      				name:"",
      				taxNo:""
      	        },
	            soNguoiThamGia: 0,
	            travelCareId: 1,
	            travelWithId: "",
	            tvcPackage: "",
	            songay: 0,
	            destinationDetail: ""
        };
        vm.listTvcAddBaseInit = [];
        vm.product = {};
        vm.getPremium = getPremium;
        vm.onchangePlan = onchangePlan;
        vm.infoPerson = infoPerson;
        vm.onchangeReceiveMethod = false;
        vm.savePolicy = savePolicy;
        vm.showChangePremium = showChangePremium;
        vm.addOrRemovePerson =addOrRemovePerson;
        vm.addNewPerson = addNewPerson;
        vm.removePerson = removePerson;
        vm.removeRow = removeRow;
        vm.addNewRow = addNewRow;
        vm.isShowChangePremium = false;
        vm.onchangeTravel = onchangeTravel;
        vm.isShowChangeTravel = false;
        vm.isShowUSD = true;
        vm.isShowEUR = false;
        vm.changeLoaitien = changeLoaitien;
        vm.ngYcbhDicung = false;
        vm.changeNgYcbhDicung = changeNgYcbhDicung;
        
        // check all on data table
        vm.checkAllDataTable = false;
        vm.checkBoxAllChange = checkBoxAllChange;
        vm.btnRemoveAllDisabled = true;
        vm.selectCheckBoxTableData = selectCheckBoxTableData;
        vm.lstPersonRemove = [];
        vm.removeAllRow = removeAllRow;
        
        vm.isFullScreen = false;
        vm.goFullScreenViaWatcher = goFullScreenViaWatcher;
        vm.blankTableContent = blankTableContent;
        
        vm.showLeftSidebar = true;
        vm.toogleSidebar = toogleSidebar;
        
        // vm.checkNycbhcdc = checkNycbhcdc;
        angular.element(document).ready(function () {
        });
        
    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
            vm.registerDisableContactInfoValue('vm.policy.premium');

            var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.policy.inceptionDate = DateUtils.convertDate(startDate);
            
            // Edit
            if (vm.isEditMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = 'PRODUCT_TVC_EDIT';
            	
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		// Format to display and calculate premium again
            		formatEditData(result);
            		
            		vm.loading = false;
            		vm.policy = result;
            		// Open view and step - calculate premium again
            		getPremium();
            		vm.nextCount = 2;
            		formatAddressEdit();
                }).catch(function(data, status) {
                	vm.loading = false;
                	vm.showWarningEditPolicy();
    		    });
            }
            
            // Copy
            if (vm.isCopyMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = 'PRODUCT_TVC';
            	
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		// Format to display and calculate premium again
            		formatEditData(result);
            		
            		vm.loading = false;
            		vm.policy = result;
            		
            		// copy
            		vm.policy.agreementId = null;
            		vm.policy.gycbhId = null;
            		vm.policy.gycbhNumber =  null;
            		
            		// Open view and step - calculate premium again
            		getPremium();
            		vm.nextCount = 2;
            		formatAddressEdit();
                }).catch(function(data, status) {
                	vm.loading = false;
                	vm.showWarningEditPolicy();
    		    });
            }
            
            // Load contact
  		    vm.selectedContactMode();
            
  		})();
  		
  		function toogleSidebar() {
  			vm.showLeftSidebar = !vm.showLeftSidebar;
  		}
  		
  		function formatAddressEdit() {
  			// Address at step 2
  			var receiverAddress = vm.policy.receiverUser.address;
  			vm.policy.receiverUser.address = vm.formatAddressEdit(receiverAddress);
  			vm.getAddressByPostCode(receiverAddress).then(function (data) {
  				vm.policy.receiverUser.addressDistrictData = data;
    		});
  			
  			// invoice
  			var invoiceInfoAddress = vm.policy.invoiceInfo.address;
  			if (invoiceInfoAddress != null && invoiceInfoAddress != undefined) {
  				vm.policy.invoiceInfo.address = vm.formatAddressEdit(invoiceInfoAddress);
  	  			vm.getAddressByPostCode(invoiceInfoAddress).then(function (data) {
  	  				vm.policy.invoiceInfo.addressDistrictData = data;
  	    		});
  			}
  			
  			// extra
  			var contactAddress = vm.policy.contactAddress;
    		vm.policy.contactAddress = vm.formatAddressEdit(contactAddress);
    		vm.getAddressByPostCode(contactAddress).then(function (data) {
    			vm.policy.contactAddressDistrictData = data;
    		});
    		
    		var a = moment(vm.policy.inceptionDate, 'DD/MM/YYYY');
			var b = moment(vm.policy.expiredDate, 'DD/MM/YYYY');
			vm.policy.songay = b.diff(a, 'days') + 1;
  		}
  		
        function showChangePremium() {
            if(vm.policy.destinationId != "") {
                return true;
            } else {
                return false;
            }
        }
  		// Properties & function declare

        function formatEditData(result) {
        	vm.copyFromContact = false;
        	result.contactDob = result.propserNgaysinh;
  		}
        
  		// Function
        function changeNgYcbhDicung() {
        	console.log('changeNgYcbhDicung');
        	if (vm.policy.travelWithId == '1') {
        		if (vm.policy.contactCategoryType != 'ORGANIZATION') {
            		if (vm.ngYcbhDicung) {
                		vm.policy.listTvcAddBaseVM[0].insuredName = vm.policy.contactName;
                		vm.policy.listTvcAddBaseVM[0].idPasswport = vm.policy.contactIdNumber;
                		vm.policy.listTvcAddBaseVM[0].dob = vm.policy.contactDob;
                		vm.policy.listTvcAddBaseVM[0].relationship = "30"; // Ban than
                		vm.policy.listTvcAddBaseVM[0].isOwer = true;
                	} else {
                		vm.policy.listTvcAddBaseVM[0].insuredName = "";
                		vm.policy.listTvcAddBaseVM[0].idPasswport = "";
                		vm.policy.listTvcAddBaseVM[0].dob = "";
                		vm.policy.listTvcAddBaseVM[0].relationship = ""; // Ban than
                		vm.policy.listTvcAddBaseVM[0].isOwer = false;
                	}
                	let temp = [].concat(vm.policy.listTvcAddBaseVM); 
                	vm.policy.listTvcAddBaseVM = temp;
            	}
        	} else {
        		if (vm.ngYcbhDicung) {
        			vm.policy.listTvcAddBaseVM.push({
                        "dob": vm.policy.contactDob,
                        "insuredName": vm.policy.contactName,
                        "idPasswport": vm.policy.contactIdNumber,
                        "relationship" : "30",
                        "serial" : generateId()
                    });
                    
                    vm.policy.soNguoiThamGia = vm.policy.listTvcAddBaseVM.length;
            		
                	// Tinh lai phi
                	getPremium();
        		} else {
        			for(var i = 0; i < vm.policy.listTvcAddBaseVM.length; i++) {
        		        if (vm.policy.listTvcAddBaseVM[i].relationship == 30) {
        		        	vm.policy.listTvcAddBaseVM.splice(i, 1);
        		        }
        		    }
        			vm.policy.soNguoiThamGia = vm.policy.listTvcAddBaseVM.length;
             		
                 	// Tinh lai phi
                 	getPremium();
        		}
        	}
        }
        
        $rootScope.$on('contactCreateSuccess', function() {
        	vm.policy.listTvcAddBaseVM[0].insuredName = vm.policy.contactName;
    		vm.policy.listTvcAddBaseVM[0].idPasswport = vm.policy.contactIdNumber;
    		vm.policy.listTvcAddBaseVM[0].dob = vm.policy.contactDob;
    		vm.policy.listTvcAddBaseVM[0].relationship = "30"; // Ban than
    		vm.policy.listTvcAddBaseVM[0].isOwer = true;
        });
        
        function onchangeTravel() {
        	vm.ngYcbhDicung = false;
        	vm.policy.listTvcAddBaseVM = [];
            if (vm.policy.travelWithId == '1'){
            	vm.policy.soNguoiThamGia = 1;
            	addOrRemovePerson();
            	vm.isShowChangeTravel = true;
            } else{
            	vm.policy.soNguoiThamGia = 2;
            	addOrRemovePerson();
            	vm.isShowChangeTravel = false;
            }
            if (vm.policy.expiredDate != "" && vm.policy.expiredDate != null){
            	getPremium();	
            }
        }
        
        function changeLoaitien() {
  			var loaitien = vm.policy.loaitien;
  			
  			if (loaitien == "USD") {
  				vm.isShowUSD = true;
  	  	        vm.isShowEUR = false;
  			} else if (loaitien == "EUR") {
  				vm.isShowUSD = false;
  	  	        vm.isShowEUR = true;
  			} else {
  				vm.isShowUSD = false;
  	  	        vm.isShowEUR = false;
  			}
  		}
        
        function onchangePlan() {
        	if (vm.policy.expiredDate != ""){
        		if (vm.checkDate(vm.policy.inceptionDate, vm.policy.expiredDate)){
        			
        			var a = moment(vm.policy.inceptionDate, 'DD/MM/YYYY');
        			var b = moment(vm.policy.expiredDate, 'DD/MM/YYYY');
        			vm.policy.songay = b.diff(a, 'days') + 1;
        			getPremium();	
        		} else{
//        	        toastr.error('Thời gian ngày khởi hành - ngày trở về không phù hợp');
        	        resetDataPremium();
        	        let data = {
    	        		fieldName : "expiredDate",
    	        		message : "Thời gian ngày khởi hành - ngày trở về không phù hợp"
        	        };
        	        
        	        ResponseValidateService.validateResponse(data)
        		}
        	}
        	
        	if (vm.policy.destinationId == 1){
        		vm.policy.planId = 1;
        	}
        }
        
        function getPremium() {
        	// clean error message
        	vm.cleanAllResponseError();
        	
            vm.loading = true;
            vm.product.destination =  vm.policy.destinationId;
            vm.product.ngayDi =  vm.policy.inceptionDate;
            vm.product.ngayVe  =  vm.policy.expiredDate;
            vm.product.numberOfPerson  =  vm.policy.soNguoiThamGia;
            vm.product.planId  =  vm.policy.planId;
            vm.product.premiumNet  =  0;
            vm.product.premiumPackage  =  vm.policy.travelWithId;
            vm.product.premiumTvc  = 0;
            if(vm.product.premiumDiscount > 0 ){
                vm.product.premiumDiscount = vm.policy.premiumDiscount;
            }else{
                vm.product.premiumDiscount  = 0;
            }
            vm.product.songay = 0;
            
            // check param
//            if (isEmptyString(vm.product.destination) || isEmptyString(vm.product.ngayDi) 
//            		|| isEmptyString(vm.product.ngayVe) || isEmptyString(vm.product.numberOfPerson) || isEmptyString( vm.product.planId)) {
//            	return;
//            }
            if (vm.policy.destinationId == 1){
            	vm.policy.destinationDetail = "";
            }
            
            ProductCommonService.getTvcPremium(vm.product, onGetPremiumSuccess, onGetPremiumError);
        }
        function onGetPremiumSuccess(result) {
            vm.loading = false;
            vm.policy.premium  = result.premiumTvc;
            vm.policy.soNguoiThamGia  = result.numberOfPerson;
            vm.policy.netPremium   = result.premiumNet;
            vm.policy.changePremium  = result.premiumDiscount;
            if(result.premiumDiscount > 0){
                vm.isShowChangePremium = true;
                vm.sumPremiumDiscount =  vm.policy.netPremium - vm.policy.premium ;
            }

            vm.clearResponseError();
//            vm.changeNgYcbhDicung(); // duclm comment 07/12 Issue #316 
            // "premiumTvc": 104500,
            //     "premiumNet": 110000,sumPremiumDiscount
        }

        function onGetPremiumError(result) {
            vm.loading = false;
             vm.validateResponse(result, 'getPremium');
            resetDataPremium();
//            ResponseValidateService.validateResponse(result.data);
        }
        function infoPerson() {
            vm.policy.listTvcAddBaseVM.push(vm.tvcAddBaseVM);
            vm.tvcAddBaseVM = {};
            console.log(vm.policy);
        }

//      function savePolicy(type) {		// TH để lưu tạm
        function savePolicy() {
//      	if (type == "0"){
//      		vm.policy.statusPolicy = "80"; // dang soan
//      	} else {
//      		vm.policy.statusPolicy = "90"; // cho thanh toan
//      	}
        	
            vm.loading = true;
            vm.policy.propserName = vm.policy.contactName;
            vm.policy.propserNgaysinh = vm.policy.contactDob;
            vm.policy.propserCellphone  = vm.policy.contactPhone;
            vm.policy.tvcPackage = vm.policy.travelWithId;
            vm.policy.receiverMoible =  vm.policy.receiverUser.mobile;
            
            // call base
            vm.savePolicyBase("TVC", vm.policy);
        }

        function addOrRemovePerson() {
            if(vm.policy.soNguoiThamGia> vm.policy.listTvcAddBaseVM.length) {
                addNewPerson();
            } else if(vm.policy.soNguoiThamGia< vm.policy.listTvcAddBaseVM.length) {
                removePerson();
            }
            if (vm.policy.expiredDate != "" && vm.policy.expiredDate != null){
            	// Tinh lai phi
            	getPremium();	
            }
        }

        function addNewPerson() {
            var lineAdd = vm.policy.soNguoiThamGia- vm.policy.listTvcAddBaseVM.length;
            let relationship = "";
            // Check khach doan 3
            if (vm.policy.travelWithId == '3') {
            	relationship = "39";
            }
            
            for (var i=0; i < lineAdd; i++) {
                vm.policy.listTvcAddBaseVM.push({
                    "dob": "",
                    "insuredName": "",
                    "idPasswport": null,
                    "relationship" : relationship,
                    "serial" : generateId()
                });
            }
        };

        function addNewRow() {
        	// Validate
        	// Check khach ca nhan
            if (vm.policy.travelWithId == '1') {
            	return;
            }
        	
        	
            let relationship = "";
            // Check khach doan 3
            if (vm.policy.travelWithId == '3') {
            	relationship = "39";
            }
            
            vm.policy.listTvcAddBaseVM.push({
                "dob": "",
                "insuredName": "",
                "idPasswport": null,
                "relationship" : relationship,
                "serial" : generateId()
            });
            
            vm.policy.soNguoiThamGia = vm.policy.listTvcAddBaseVM.length;
    		
        	// Tinh lai phi
        	getPremium();
        };
        
        function removePerson() {
            vm.policy.listTvcAddBaseVM.splice(vm.policy.soNguoiThamGia, vm.policy.listTvcAddBaseVM.length)
        };
        
        function removeItemInArray(array, key) {
        	for (var i=0; i < array.length; i++) {
        		if (array[i].serial == key) {
    				vm.policy.listTvcAddBaseVM.splice(i, 1);
    				break;
    			}
        	}
        }
        
        function dooRemoveAllRow() {
        	if (vm.checkAllDataTable) {
        		vm.policy.listTvcAddBaseVM = [];
        	} else {
        		angular.forEach(vm.lstPersonRemove, function(item, key) {
        			removeItemInArray(vm.policy.listTvcAddBaseVM, item);
    		 	});
        	}

        	vm.lstPersonRemove = [];
        	vm.policy.soNguoiThamGia = vm.policy.listTvcAddBaseVM.length;
        	// Tinh lai phi
        	getPremium();
        }
        
        function removeAllRow() {
        	let numberRemove = vm.lstPersonRemove.length;
        	if (vm.policy.listTvcAddBaseVM.length - numberRemove < 2) {
        		toastr.error("Số người tham gia phải từ 2 người");
            	return;
        	}
        	
        	$ngConfirm({
                title: 'Xác nhận!',
                content: '<div class="text-center">Bạn chắc chắn xóa những người được bảo hiểm này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	dooRemoveAllRow();
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
        
        function validateRemoveOneRow() {
        	// Check khach ca nhan
            if (vm.policy.travelWithId == '1') {
            	toastr.error("Số người tham gia phải = 1");
            	return false;
            }
            
            if (vm.policy.travelWithId == '2') {
	            if (vm.policy.listTvcAddBaseVM.length == 2) {
	            	toastr.error("Số người tham gia phải từ 2 người");
	            	return false;
	            }
            }
            
            if (vm.policy.travelWithId == '3') {
	            if (vm.policy.listTvcAddBaseVM.length < 1) {
	            	toastr.error("Số người tham gia phải từ 1 người");
	            	return false;
	            }
            }
            return true;
        }
        
        function doRemoveRow(index) {
        	vm.policy.listTvcAddBaseVM.splice(index, 1);
        	console.log(vm.policy.listTvcAddBaseVM);
        	
        	vm.policy.soNguoiThamGia = vm.policy.listTvcAddBaseVM.length;
    		
        	// Tinh lai phi
        	getPremium();
        }
        
        function removeRow(index) {
        	if (validateRemoveOneRow() == false) {
        		return;
        	}
        	
//        	var r = confirm("Bạn chắc chắn xóa người được bảo hiểm này ?");
//        	if (r == true) {
//        		doRemoveRow(index);
//        	}
        	
        	// Check empty data
        	let item = vm.policy.listTvcAddBaseVM[index];
        	if (isEmptyString(item.insuredName) && isEmptyString(item.idPasswport) && isEmptyString(item.dob)) {
        		doRemoveRow(index);
        	} else {
        		$ngConfirm({
                    title: 'Xác nhận!',
                    content: '<div class="text-center">Bạn chắc chắn xóa người được bảo hiểm này ?</div>',
                    animation: 'scale',
                    closeAnimation: 'scale',
                    buttons: {
                        ok: {
                        	text: 'Đồng ý',
                            btnClass: "btn-blue",
                            action: function(scope, button){
                            	doRemoveRow(index);
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
        
        function calculateCheckAll() {
        	// != 100
        	let value = true;
        	vm.btnRemoveAllDisabled = true;
        	angular.forEach(vm.policy.listTvcAddBaseVM, function(order, key) {
    			if (order.check != true) {
    				value = false;
    			} else {
    				vm.btnRemoveAllDisabled = false;
    			}
		 	});
        	vm.checkAllDataTable = value;
        	console.log(vm.lstPersonRemove);
        }
        
        function selectCheckBoxTableData(data) {
        	if(data.check == true){
                vm.lstPersonRemove.push(data.serial);
            }else {
                var index = vm.lstPersonRemove.indexOf(data.serial);
                if (index !== -1) {
            		vm.lstPersonRemove.splice(index, 1);
                }
            }
            calculateCheckAll();
        }
        
        function checkBoxAllChange() {
        	let value = vm.checkAllDataTable;
        	vm.lstPersonRemove = [];
        	if (value == true) {
        		vm.btnRemoveAllDisabled = false;
        		angular.forEach(vm.policy.listTvcAddBaseVM, function(order, key) {
        			vm.lstPersonRemove.push(order.serial);
    		 	});
        	} else {
        		vm.btnRemoveAllDisabled = true;
        	}
        	
        	angular.forEach(vm.policy.listTvcAddBaseVM, function(item, key) {
        		item.check = value;
		 	});
        }
        
//        vm.policy.listTvcAddBaseVM[0].insuredName = vm.policy.contactName;
//		vm.policy.listTvcAddBaseVM[0].idPasswport = vm.policy.contactIdNumber;
//		vm.policy.listTvcAddBaseVM[0].dob = vm.policy.contactDob;
//		vm.policy.listTvcAddBaseVM[0].relationship = "30"; // Ban than
		
        // Check nguoi yeu cau bao hiem di cung
        function checkNgycbhDiCungInArrayTVC() {
        	if (vm.policy.contactCategoryType == 'ORGANIZATION') {
        		return;
        	}
        	
        	if (vm.ngYcbhDicung) {
        		let isExit = false;
        		angular.forEach(vm.policy.listTvcAddBaseVM, function(item, key) {
        			// Case CMND trung -> Thong bao da co nguoi nay trong danh sach -> focus
        			if (item.idPasswport == vm.policy.contactIdNumber) {
        				item.isOwer = true;
        				isExit = true;
        			}
        			
        			// Case Ten + Ngay sinh trung: -> Thong bao da co nguoi nay trong danh sach ban co muon them vao khong -> focus
        			if (item.insuredName == vm.policy.contactName && item.dob == vm.policy.contactDob) {
        				item.isOwer = true;
        				isExit = true;
        			}
    		 	});
        		
        		if (isExit) {
        			toastr.success("Người yêu cầu bảo hiểm đã có trong danh sách");
        		} else {
        			// ng-confirm 
        			$ngConfirm({
                        title: 'Xác nhận!',
                        content: '<div class="text-center">Người yêu cầu bảo hiểm chưa có trong danh sách, Có muốn bổ sung vào danh sách không ?</div>',
                        animation: 'scale',
                        closeAnimation: 'scale',
                        buttons: {
                            ok: {
                            	text: 'Đồng ý',
                                btnClass: "btn-blue",
                                action: function(scope, button){
                                	let arr = [{
                                		insuredName : vm.policy.contactName,
                                		idPasswport : vm.policy.contactIdNumber,
                                		dob : vm.policy.contactDob,
                                		relationship : "30", // Ban than
                                		isOwer : true
                                	}];
                                	// case : ca nhan
                                	if (vm.policy.travelWithId == '1') {
                                    	vm.policy.listTvcAddBaseVM = arr; 
                                    	vm.policy.soNguoiThamGia = vm.policy.listTvcAddBaseVM.length;
                                	} else {
                                    	vm.policy.listTvcAddBaseVM = arr.concat(vm.policy.listTvcAddBaseVM); 
                                    	vm.policy.soNguoiThamGia = vm.policy.listTvcAddBaseVM.length;
                                	}
                                	
                                	// Display
                                	addOrRemovePerson();
                                	// Tinh lai phi
                                	getPremium();
        	                    }
                            },
                            close: {
                            	text: 'Không',
                                action: function(scope, button){
                                	let temp = {
                                		insuredName : vm.policy.listTvcAddBaseVM[0].insuredName,
                                		idPasswport : vm.policy.listTvcAddBaseVM[0].idPasswport,
                                		dob : vm.policy.listTvcAddBaseVM[0].dob,
                                		relationship : vm.policy.listTvcAddBaseVM[0].relationship // Ban than
                                	};
                                	vm.ngYcbhDicung = false;
                                	//$state.go('app.cart');
                                	
                                	// Display
                                	// addOrRemovePerson();
                                	// Tinh lai phi
                                	getPremium();
                                	$timeout(function (){
                            			vm.policy.listTvcAddBaseVM[0] = temp;
                                		let tempArr = [].concat(vm.policy.listTvcAddBaseVM); 
                                    	vm.policy.listTvcAddBaseVM = tempArr;
                        			} , 500);
        	                    }
                            }
                        },
                    });
        		}
        	}
        }
        
        function resetDataPremium() {
        	vm.policy.netPremium = 0;
            vm.sumPremiumDiscount = 0;
            vm.policy.premium = 0;
        }
        
        function blankTableContent() {
        	vm.ngYcbhDicung = false;
        	vm.policy.listTvcAddBaseVM = [];
        	
        	// Check khach doan 3
        	let relationship = "";
            if (vm.policy.travelWithId == '3') {
            	relationship = "39";
            }
            
        	// Check khach ca nhan
            if (vm.policy.travelWithId == '1') {
            	vm.policy.listTvcAddBaseVM.push({
                    "dob": "",
                    "insuredName": "",
                    "idPasswport": null,
                    "relationship" : relationship,
                    "serial" : generateId()
                });
            } else {
            	vm.policy.listTvcAddBaseVM.push({
                    "dob": "",
                    "insuredName": "",
                    "idPasswport": null,
                    "relationship" : relationship,
                    "serial" : generateId()
                });
            	vm.policy.listTvcAddBaseVM.push({
                    "dob": "",
                    "insuredName": "",
                    "idPasswport": null,
                    "relationship" : relationship,
                    "serial" : generateId()
                });
            }
        	
            vm.policy.soNguoiThamGia = vm.policy.listTvcAddBaseVM.length;
    		
        	// Tinh lai phi
        	getPremium();
        }
        
        $rootScope.$on('tvcImportExcelSuccess', tvcImportExcelSuccess);
        function tvcImportExcelSuccess() {
        	console.log('TVC tvcImportExcelSuccess');

        	checkNgycbhDiCungInArrayTVC();
        	
        	getPremium();
        }
        
        function goFullScreenViaWatcher() {
            vm.isFullScreen = !vm.isFullScreen;
         }
        
    }
})();
