(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductMotoHondaController', ProductMotoHondaController);

    ProductMotoHondaController.$inject = ['$scope', '$controller', 'DateUtils', 'ProductCommonService', '$state'
    	, '$rootScope', '$stateParams' , 'ResponseValidateService'];

    function ProductMotoHondaController ($scope, $controller, DateUtils, ProductCommonService, $state
    		, $rootScope, $stateParams, ResponseValidateService) {
    	var vm = this;
    	vm.lineId = 'MOH';
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
        vm.policy = {
        	// add 26/03/2019
        	"namSd": "",
        	"goi": "",
        	"idModel": "",
        	"soTienBh": "",
        	"phi1": "",
        	"phi2": "",
        	"phi3": "",
        		
			// premium
			"typeOfMoto": "",
			"chaynoCheck": false,
            "chaynoPhi": 0,
            "chaynoStbh": "",
            "nntxCheck": false,
            "nntxPhi": 0,
            "nntxSoNguoi": 1,
            "nntxStbh": "",
            "tndsbbCheck": false,
            "tndsbbPhi": 0,
            "tndstnCheck": false,
            "tndstnPhi": 0,
            "tndstnSotien": "",
			//create
            "hieuxe":"",
            "insuredAddress":"",
            "insuredName":"",
            "insuredPhone":"",
            "insuredEmail":"",
            "receiveMethod":"",
            "registrationNumber":"",
            "sokhung":"",
            "somay":"",
            "thoihanden":"",
            "thoihantu":"",
            "tongPhi":0,
            "invoiceInfo": {  
              	"accountNo":"",
  				"address":"",
  				"addressDistrict":"",
  				"check":"0",
  				"company":"",
  				"name":"",
  				"taxNo":""
  	        }
        }

        vm.processComboResult = processComboResult;
        vm.getPremium = getPremium;
        vm.savePolicy = savePolicy;
        vm.onThoihanChange = onThoihanChange;

        vm.isShowTndsbbPhi = false;
        vm.isShowTndstnPhi = false;
        vm.isShowNntxPhi = false;
        vm.isShowChaynoPhi = false;
        vm.isShowPremium = false;
        vm.isShowTotalPremium = false;
        vm.changeCopyFromNycbh = changeCopyFromNycbh;
		
        vm.validatorCombo = validatorCombo;
		vm.modelOptions = [];
		vm.yearOptions = [
        	{id: '0', name: 'Xe mới (< 90 ngày)'},
            {id: '1', name: 'Xe cũ (90 ngày đến dưới 1 năm)'},
            {id: '2', name: 'Xe cũ (1 năm đến dưới 2 năm)'},
            {id: '3', name: 'Xe cũ (2 năm đến dưới 3 năm)'}
        ];
		vm.changePackage = changePackage;
		vm.isShow1 = true;
		vm.isShow1 = true;
		vm.isShow1 = true;

		vm.checkDongYHD = false;
		
        // Initialize
        init();

        // Function
        function init() {
        	var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate());
            vm.policy.thoihantu = DateUtils.convertDate(startDate);

            var endDate = moment(vm.policy.thoihantu, "DD/MM/YYYY").add(1, 'years').add(-1, 'days').format("DD/MM/YYYY");
        	vm.policy.thoihanden = endDate;

        	// Register disable 
            vm.registerDisableContactInfoValue('vm.policy.tongPhi');
            
            // Edit
            if (vm.isEditMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = 'PRODUCT_MOTO_EDIT';
            	
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
            	$state.current.data.title = 'PRODUCT_MOTO';
            	
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
        }
        
        function validatorCombo(name) {
  			switch(name) {
	  			case "year":
	  	        	if(!vm.policy.namSd) {
	  	        		return "Chưa lựa chọn năm sử dụng!";
	  	        	}
	  	            return true;
	  			case "model":
	  	        	if(!vm.policy.idModel) {
	  	        		return "Cần lựa chọn mẫu xe!";
	  	        	}
	  	            return true;
  			}
        }
        
        function changeCopyFromNycbh() {
        	vm.policy.insuredName = "";
        	vm.policy.insuredAddress= "";
        	vm.policy.insuredAddressDistrict = "";
        	vm.policy.insuredPhone= "";
        	vm.policy.insuredEmail= "";
	      	if (vm.copyFromNguoiycbh) {
	      		vm.policy.insuredName = vm.policy.contactName;
	      		vm.policy.insuredAddress = vm.policy.contactAddress;
	      		vm.policy.insuredAddressDistrict = vm.policy.contactAddressDistrictData;
	      		vm.policy.insuredPhone= vm.policy.contactPhone;
	        	vm.policy.insuredEmail= vm.policy.contactEmail;
	      	}
        }

        function formatEditData(result) {
        	if (result.namSd) {
        		ProductCommonService.getMauXe({id : result.namSd}, getHondaModelSuccess, getHondaModelError);
  			}
  		}
        
        function getHondaModelSuccess(data) {
  			data.forEach(function(item, index, data) {
  				vm.modelOptions.push({id: item.id, name: item.tenHienThi});
  			});
    	}
    	
    	function getHondaModelError(data) {
    		toastr.error('Không thể lấy thông tin mẫu xe');
    	}
        
        function onThoihanChange(year) {
        	let inputYear = '';
        	if (year != null && year != undefined && year != ""){
        		inputYear = year;
        	} else {
        		inputYear = vm.policy.goi;
        	}
        	var endDate = moment(vm.policy.thoihantu, "DD/MM/YYYY").add(inputYear, 'years').add(-1, 'days').format("DD/MM/YYYY");
            // add a day
        	vm.policy.thoihanden = endDate;
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
  			var insuredAddress = vm.policy.insuredAddress;
    		vm.policy.insuredAddress = vm.formatAddressEdit(insuredAddress);
    		vm.getAddressByPostCode(insuredAddress).then(function (data) {
    			vm.policy.insuredAddressDistrict = data;
    		});
    		
    		var contactAddress = vm.policy.contactAddress;
    		vm.policy.contactAddress = vm.formatAddressEdit(contactAddress);
    		vm.getAddressByPostCode(contactAddress).then(function (data) {
    			vm.policy.contactAddressDistrictData = data;
    		});
  		}
        
        function changePackage (){
        	let type = vm.policy.goi;
        	if (type == 1){
        		vm.policy.goi = type;   
        		vm.policy.tongPhi = vm.policy.phi1;
        		onThoihanChange(1);
        	} else if (type == 2){
        		vm.policy.goi = type;
        		vm.policy.tongPhi = vm.policy.phi2;
        		onThoihanChange(2);
        	} else {
        		vm.policy.goi = type;
        		vm.policy.tongPhi = vm.policy.phi3;
        		onThoihanChange(3);
        	}
        }
        
        function processComboResult(data, type) {
            console.log(data);
            switch(type){
				case 'moto-year':
	            	vm.modelOptions = [];
	            	vm.policy.idModel = '';
	            	vm.policy.soTienBh = '';
	            	vm.policy.tongPhi = '';
	            	vm.policy.phi1 = '';
	            	vm.policy.phi2 = '';
	            	vm.policy.phi3 = '';
	            	vm.policy.goi = 0;
	            	data.forEach(function(item, index, arr) {
	      				vm.modelOptions.push({id: item.id, name: item.tenHienThi});
	      			})
	                break;
                case 'moto-model':
                	vm.policy.soTienBh = '';
                	vm.policy.phi1 = '';
	            	vm.policy.phi2 = '';
	            	vm.policy.phi3 = '';
	            	vm.policy.goi = 0;
	            	vm.policy.tongPhi = 0;
                	if (vm.policy.idModel){
                		ProductCommonService.getChiTietXe({id : vm.policy.idModel}, getChiTietXeSuccess, getChiTietXeError);	
                	}
                	
                	getPremium();
                    break;
            }
        }
        
        function getChiTietXeSuccess(data) {
        	vm.policy.hieuxe = data.mauXe;
    	}
    	
    	function getChiTietXeError(data) {
    		toastr.error('Không thể lấy thông tin mẫu xe');
    	}

        function getPremium() {
        	// clean error message
        	vm.cleanAllResponseError();
    		vm.loading = true;
            var postData = getPostData(false);
            ProductCommonService.getMOHPremium(postData, onGetPremiumSuccess, onGetPremiumError);	
        }

        function getPostData(isCreate) {
            var postData = Object.assign({}, vm.policy);

            if(postData.chaynoCheck == false) {
                postData.chaynoStbh = 0;
                postData.chaynoCheck = false;
                postData.chaynoPhi = 0;
            }

            if(postData.nntxCheck == false) {
                postData.nntxSoNguoi = 0;
                postData.nntxCheck = false;
                postData.nntxStbh = 0;
                postData.nntxPhi = 0;
            }

            if(postData.tndstnCheck == false) {
                postData.tndstnSotien = 0;
                postData.tndstnCheck = false;
                postData.tndstnPhi = 0;
            }

            // Remove unuse
            if(!isCreate) {
                delete postData.receiveMethod;
            }

            return postData;
        }

        function onGetPremiumSuccess(result) {
            vm.loading = false;
        	
        	vm.policy.soTienBh = result.soTienBh;
        	vm.policy.phi1 = result.tongPhi1;
        	vm.policy.phi2 = result.tongPhi2;
        	vm.policy.phi3 = result.tongPhi3;
        	
            if(vm.policy.tndsbbCheck) {
                vm.isShowTndsbbPhi = true;
                vm.policy.tndsbbPhi = result.tndsbbPhi;
                vm.isShowPremium = true;
                vm.isShowTotalPremium = true;
                vm.policy.tongPhi = result.tongPhi;
            }
            if(vm.policy.tndstnCheck && vm.policy.tndstnSotien) {
                vm.isShowTndstnPhi = true;
                vm.policy.tndstnPhi = result.tndstnPhi;
            }
            if(vm.policy.tndstnCheck == false) {
                vm.isShowTndstnPhi = false;
                vm.policy.tndstnPhi = 0;
            }
            if(vm.policy.nntxCheck) {
                vm.isShowNntxPhi = true;
                vm.policy.nntxPhi = result.nntxPhi;
            }
            if(vm.policy.nntxCheck == false) {
                vm.isShowNntxPhi = false;
                vm.policy.nntxPhi = 0;
            }
            if(vm.policy.chaynoCheck && vm.policy.chaynoStbh) {
                vm.isShowChaynoPhi = true;
                vm.policy.chaynoPhi = result.chaynoPhi;
            }
            if(vm.policy.chaynoCheck == false) {
                vm.isShowChaynoPhi = false;
                vm.policy.chaynoPhi = 0;
            }

            vm.clearResponseError();
        }

        function onGetPremiumError(result) {
            vm.loading = false;
            vm.clearResponseError();
            resetDataPremium();
//            vm.validateResponse(result, 'getPremium');
            ResponseValidateService.validateResponse(result.data);
        }
        
        function resetDataPremium() {
        	vm.policy.tongPhi = 0;
        	vm.policy.chaynoPhi = 0;
        	vm.policy.nntxPhi = 0;
        	vm.policy.tndstnPhi = 0;
        	vm.policy.tndsbbPhi = 0;
        }

        function savePolicy() {
        	vm.policy.insuredAddress = vm.policy.insuredAddress
				+ "::" + vm.policy.insuredAddressDistrict.pkDistrict + "::" + vm.policy.insuredAddressDistrict.pkPostcode;
        	
            var postData = getPostData(true);
            vm.policy.chaynoCheck = postData.chaynoCheck;
            vm.policy.chaynoPhi = postData.chaynoPhi;
            vm.policy.chaynoStbh = postData.chaynoStbh;
            vm.policy.nntxCheck = postData.nntxCheck;
            vm.policy.nntxSoNguoi = postData.nntxSoNguoi;
            vm.policy.nntxStbh = postData.nntxStbh;
            vm.policy.premium = postData.premium;
            vm.policy.tndsBbPhi = postData.tndsbbPhi;
            vm.policy.tndsTnNntxPhi = postData.nntxPhi;
            vm.policy.tndsTnPhi = postData.tndstnPhi;
            vm.policy.tndsTnSotien = postData.tndstnSotien;
            vm.policy.tndsbbCheck = postData.tndsbbCheck;
            vm.policy.tongPhi = postData.tongPhi;
            vm.policy.typeOfMotoId = postData.typeOfMoto;
            
            if (vm.policy.insuredName == vm.policy.contactName){
            	if (vm.policy.insuredPhone == vm.policy.contactPhone){
                	vm.policy.insuredPhone = vm.policy.contactPhone;	
                } else {
                	vm.policy.insuredPhone = "";
                }
                
                if (vm.policy.insuredEmail == vm.policy.contactEmail){
                	vm.policy.insuredEmail = vm.policy.contactEmail;
                } else {
                	vm.policy.insuredEmail = "";
                }	
            } else {
            	vm.policy.insuredPhone = "";
            	vm.policy.insuredEmail = "";
            }
            
            // call base
            vm.savePolicyBase("MOH", vm.policy);
        }
        
    }
})();
