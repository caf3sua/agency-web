(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductMotoController', ProductMotoController);

    ProductMotoController.$inject = ['$scope', '$controller', 'DateUtils', 'ProductCommonService', '$state'
    	, '$rootScope', '$stateParams'];

    function ProductMotoController ($scope, $controller, DateUtils, ProductCommonService, $state
    		, $rootScope, $stateParams) {
    	var vm = this;
    	vm.lineId = 'MOT';
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
//  		vm.product = {
////            "chaynoCheck": false,
////            "chaynoPhi": 0,
////            "chaynoStbh": "",
////            "nntxCheck": false,
////            "nntxPhi": 0,
////            "nntxSoNguoi": "",
////            "nntxStbh": "",
//            "tndsbbCheck": false,
//            "tndsbbPhi": 0,
//            "tndstnCheck": false,
//            "tndstnPhi": 0,
//            "tndstnSotien": "",
//            "tongPhi": 0,
//            "typeOfMoto": ""
//        }

        vm.policy = {
  				// premium
  				"nntxPhi": 0,
  				//create
            "chaynoCheck":false,
            "chaynoPhi":0,
            "chaynoStbh":"",
            "hieuxe":"",
            "insuredAddress":"",
            "insuredName":"",
            "nntxCheck":false,
            "nntxSoNguoi":"",
            "nntxStbh":"",
            "policyNumber":"",
            "receiveMethod":"1",
            "registrationNumber":"",
            "sokhung":"",
            "somay":"",
            "thoihanden":"",
            "thoihantu":"",
            "tndsBbPhi":0,
            "tndsTnNntxPhi":0,
            "tndsTnPhi":0,
            "tndsTnSotien":"",
            "tndsbbCheck":true,
            "tndstnCheck":false,
            "tongPhi":0,
            "typeOfMotoId":""
        }

        vm.processComboResult = processComboResult;
        vm.checkedChange = checkedChange;
        vm.getPremium = getPremium;
        vm.savePolicy = savePolicy;
        vm.validatorNntxSoNguoi = validatorNntxSoNguoi;
        vm.validatorNntxStbh = validatorNntxStbh;
        vm.validatorChaynoStbh = validatorChaynoStbh;
        vm.validatorCombo = validatorCombo;
        vm.typeOfMotoOptions = [
            {id: '2', name: 'Xe Mô tô 2 bánh dung tích trên 50cc'},
            {id: '1', name: 'Xe Mô tô 2 bánh dung tích từ 50cc trở xuống'}
        ];
        vm.tndstnSoTienOptions = [
            {id: '50000000', name: '50trđ/người/vụ về người - 50trđ/vụ về tài sản'},
            {id: '100000000', name: '100trđ/người/vụ về người - 100trđ/vụ về tài sản'},
        ];

        vm.isShowTndsbbPhi = false;
        vm.isShowTndstnPhi = false;
        vm.isShowNntxPhi = false;
        vm.isShowChaynoPhi = false;
        vm.isShowPremium = false;
        vm.isShowTotalPremium = false;

        // Initialize
        init();

        // Function
        function init() {
        	var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.policy.thoihantu = DateUtils.convertDate(startDate);

            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.policy.thoihanden = DateUtils.convertDate(endDate);

        	// Register disable 
            vm.registerDisableContactInfoValue('vm.policy.tongPhi');
            
            // Edit
            if (vm.isEditMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = $state.current.data.title + '_EDIT';
            	
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
        }

        function formatEditData(result) {
  		}
        
        function formatAddressEdit() {
  			// Address at step 2
  			var receiverAddress = vm.policy.receiverUser.address;
  			vm.policy.receiverUser.address = vm.formatAddressEdit(receiverAddress);
  			vm.getAddressByPostCode(receiverAddress).then(function (data) {
  				vm.policy.receiverUser.addressDistrictData = data;
    		});
  			
  			// extra
  		}
        
        function checkedChange() {
            if((!vm.policy.tndsbbCheck && !vm.policy.tndstnCheck && !vm.policy.vcxCheck)) {
                vm.policy.nntxCheck = false;
            }
        }

        function processComboResult(data, type) {
            console.log(data);
            switch(type){
                case 'moto-type':
                    vm.policy.tndsbbCheck = true;
                case 'moto-tndstn-sotien':
                    getPremium();
                    break;
            }
        }

        function getPremium() {
            vm.loading = true;
            var postData = getPostData(false);
            ProductCommonService.getMotoPremium(postData, onGetPremiumSuccess, onGetPremiumError);
        }

        function getPostData(isCreate) {
            var postData = Object.assign({}, vm.policy);

            if(postData.chaynoStbh == "") {
                postData.chaynoStbh = 0;
                postData.chaynoCheck = false;
            }

            if(postData.nntxSoNguoi == "") {
                postData.nntxSoNguoi = 0;
                postData.nntxCheck = false;
                postData.nntxStbh = 0;
            }

            if(postData.nntxStbh == "") {
                postData.nntxSoNguoi = 0;
                postData.nntxCheck = false;
                postData.nntxStbh = 0;
            }

            if(postData.tndstnSotien == "") {
                postData.tndstnSotien = 0;
                postData.tndstnCheck = false;
            }

            // Remove unuse
            if(!isCreate) {
                delete postData.receiveMethod;
            }

            return postData;
        }

        function onGetPremiumSuccess(result) {
            vm.loading = false;
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
            if(vm.policy.nntxCheck) {
                vm.isShowNntxPhi = true;
                vm.policy.nntxPhi = result.nntxPhi;
            }
            if(vm.policy.chaynoCheck && vm.policy.chaynoStbh) {
                vm.isShowChaynoPhi = true;
                vm.policy.chaynoPhi = result.chaynoPhi;
            }

            vm.clearResponseError();
        }

        function onGetPremiumError(result) {
            vm.loading = false;
            vm.validateResponse(result, 'getPremium');
        }

        function savePolicy() {
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

            // call base
            vm.savePolicyBase("MOT", vm.policy);
        }

        function validatorNntxSoNguoi() {
        	if(!vm.policy.nntxCheck) {
        		return true;
        	}
        	if(!vm.policy.nntxSoNguoi) {
        		return "Chưa chọn số người tham gia bảo hiểm!";
        	}
            return true;
        }
        
        function validatorNntxStbh() {
        	if(!vm.policy.nntxCheck) {
        		return true;
        	}
        	if(!vm.policy.nntxStbh) {
        		return "Chưa chọn số tiền bảo hiểm!";
        	}
            return true;
        }
        
        function validatorChaynoStbh() {
        	if(!vm.policy.chaynoCheck) {
        		return true;
        	}
        	if(!vm.policy.nntxStbh) {
        		return "Chưa nhâp số tiền bảo hiểm cháy nổ!";
        	}
            return true;
        }
        
        function validatorCombo(name) {
  			switch(name) {
	  			case "typeOfMoto":
	  	            return true;
	  			case "tndstnSotien":
	  				if(!vm.policy.tndstnCheck) {
	  	        		return true;
	  	        	}
	  	        	if(!vm.policy.tndstnSotien) {
	  	        		return "Cần lựa chọn mức trách nhiệm!";
	  	        	}
	  	            return true;
  			}
        }
    }
})();
