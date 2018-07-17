(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductMotoController', ProductMotoController);

    ProductMotoController.$inject = ['$scope', '$controller', 'DateUtils', 'ProductCommonService', '$state', '$rootScope'];

    function ProductMotoController ($scope, $controller, DateUtils, ProductCommonService, $state, $rootScope) {
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
  		vm.product = {
            "chaynoCheck": false,
            "chaynoPhi": 0,
            "chaynoStbh": "",
            "nntxCheck": false,
            "nntxPhi": 0,
            "nntxSoNguoi": "",
            "nntxStbh": "",
            "tndsbbCheck": false,
            "tndsbbPhi": 0,
            "tndstnCheck": false,
            "tndstnPhi": 0,
            "tndstnSotien": "",
            "tongPhi": 0,
            "typeOfMoto": ""
        }

        vm.policy = {
            "chaynoCheck":false,
            "chaynoPhi":0,
            "chaynoStbh":0,
            "hieuxe":"",
            "insuredAddress":"",
            "insuredName":"",
            "nntxCheck":false,
            "nntxSoNguoi":0,
            "nntxStbh":0,
            "policyNumber":"",
            "receiveMethod":"1",
            "registrationNumber":"",
            "sokhung":"",
            "somay":"",
            "thoihanden":"",
            "thoihantu":"",
            "tndsBbPhi":66000,
            "tndsTnNntxPhi":0,
            "tndsTnPhi":0,
            "tndsTnSotien":0,
            "tndsbbCheck":true,
            "tndstnCheck":false,
            "tongPhi":66000,
            "typeOfMotoId":"2"
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
            vm.registerDisableContactInfoValue('vm.product.tongPhi');
            
            // Edit
            if (vm.isEditMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = $state.current.data.title + '_EDIT';
            	
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		vm.loading = false;
            		vm.policy = result;
                }).catch(function(data, status) {
                	vm.loading = false;
                	vm.showWarningEditPolicy();
    		    });
            }
        }

        function checkedChange() {
            if((!vm.product.tndsbbCheck && !vm.product.tndstnCheck && !vm.product.vcxCheck)) {
                vm.product.nntxCheck = false;
            }
        }

        function processComboResult(data, type) {
            console.log(data);
            switch(type){
                case 'moto-type':
                    vm.product.tndsbbCheck = true;
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
            var postData = Object.assign({}, vm.product);

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
            if(vm.product.tndsbbCheck) {
                vm.isShowTndsbbPhi = true;
                vm.product.tndsbbPhi = result.tndsbbPhi;
                vm.isShowPremium = true;
                vm.isShowTotalPremium = true;
                vm.product.tongPhi = result.tongPhi;
            }
            if(vm.product.tndstnCheck && vm.product.tndstnSotien) {
                vm.isShowTndstnPhi = true;
                vm.product.tndstnPhi = result.tndstnPhi;
            }
            if(vm.product.nntxCheck) {
                vm.isShowNntxPhi = true;
                vm.product.nntxPhi = result.nntxPhi;
            }
            if(vm.product.chaynoCheck && vm.product.chaynoStbh) {
                vm.isShowChaynoPhi = true;
                vm.product.chaynoPhi = result.chaynoPhi;
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
            if(postData.receiveMethod) {
                vm.policy.receiveMethod = "2";
            } else {
                vm.policy.receiveMethod = "1";
            }
            vm.policy.tndsBbPhi = postData.tndsbbPhi;
            vm.policy.tndsTnNntxPhi = postData.nntxPhi;
            vm.policy.tndsTnPhi = postData.tndstnPhi;
            vm.policy.tndsTnSotien = postData.tndstnSotien;
            vm.policy.tndsbbCheck = postData.tndsbbCheck;
            vm.policy.tongPhi = postData.tongPhi;
            vm.policy.typeOfMotoId = postData.typeOfMoto;

            // call base
            vm.savePolicyBase("MOTO", vm.policy);
        }

        function validatorNntxSoNguoi() {
        	if(!vm.product.nntxCheck) {
        		return true;
        	}
        	if(!vm.product.nntxSoNguoi) {
        		return "Chưa chọn số người tham gia bảo hiểm!";
        	}
            return true;
        }
        
        function validatorNntxStbh() {
        	if(!vm.product.nntxCheck) {
        		return true;
        	}
        	if(!vm.product.nntxStbh) {
        		return "Chưa chọn số tiền bảo hiểm!";
        	}
            return true;
        }
        
        function validatorChaynoStbh() {
        	if(!vm.product.chaynoCheck) {
        		return true;
        	}
        	if(!vm.product.nntxStbh) {
        		return "Chưa nhâp số tiền bảo hiểm cháy nổ!";
        	}
            return true;
        }
        
        function validatorCombo(name) {
  			switch(name) {
	  			case "typeOfMoto":
	  	            return true;
	  			case "tndstnSotien":
	  				if(!vm.product.tndstnCheck) {
	  	        		return true;
	  	        	}
	  	        	if(!vm.product.tndstnSotien) {
	  	        		return "Cần lựa chọn mức trách nhiệm!";
	  	        	}
	  	            return true;
  			}
        }
    }
})();
