(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductKhcController', ProductKhcController);

    ProductKhcController.$inject = ['$scope', '$controller', 'DateUtils', 'ProductCommonService', '$state', '$rootScope'
    	, '$stateParams'];

    function ProductKhcController ($scope, $controller, DateUtils, ProductCommonService, $state, $rootScope
    		, $stateParams) {
    	var vm = this;
    	vm.lineId = 'KHC';
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();

        // Properties & function declare
        vm.policy = {
        	// premium
    		"insuranceStartDate": "",
            "numberMonth": 0,
            "numberPerson": "",
            "premiumDiscount": 0,
            "premiumKhc": 0,
            "premiumKhcList":[],
            "premiumNet": 0,
            "premiumPackage": "",	
        	// create
            "inceptionDate":"",
            "permanentTotalDisablement":1,
            "plan":2,
            "receiveMethod":"1",
            "tlAddcollections":[],
            "userAgent":""
        }

        vm.validatorCombo = validatorCombo;
        vm.addOrRemovePerson = addOrRemovePerson;
        vm.onDobChange = onDobChange;
        vm.onThoihanChange = onThoihanChange;
        vm.processComboResult = processComboResult;
        vm.getPremium = getPremium;
        vm.savePolicy = savePolicy;
        vm.premiumPackageOptions = [
            {id: '20000000', name: '20000000 VND'},
            {id: '30000000', name: '30000000 VND'},
            {id: '40000000', name: '40000000 VND'},
            {id: '50000000', name: '50000000 VND'}
        ];

        vm.isShowPremium = false;
        vm.isShowTotalPremium = false;
//        vm.postPremiumKhcListIndex = [];

        // Initialize
        init();

        // Function
        function init() {
        	// add a day
        	vm.policy.insuranceStartDate = moment().add(1, 'days').format("DD/MM/YYYY");
            // add a day
        	vm.policy.insuranceEndDate = moment(vm.policy.insuranceStartDate, "DD/MM/YYYY").add(1, 'years').add(-1, 'days').format("DD/MM/YYYY");

            // Register disable 
            vm.registerDisableContactInfoValue('vm.policy.premiumKhc');
            
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
        	result.premiumKhcList = result.tlAddcollections;
        	result.premiumPackage = (result.plan * 10000000).toString();
        	result.numberPerson = result.permanentTotalDisablement;
        	result.insuranceStartDate = result.inceptionDate;
        	result.premiumKhc = 0;
        	result.premiumNet = 0;
        	result.premiumDiscount = 0;
//            vm.policy.insuranceEndDate = DateUtils.convertDate(endDate);
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

        function onDobChange(index) {
            if(vm.policy.premiumKhcList[index]) {
                var now = new Date();
                var nowStr = DateUtils.convertDate(now);
                vm.policy.premiumKhcList[index].yearOld = DateUtils.yearDiff(vm.policy.premiumKhcList[index].dob, nowStr);
            }

            if(vm.policy.numberPerson > 0 && vm.policy.premiumPackage) {
                getPremium();
            }
        }
        
        function onThoihanChange() {
        	var endDate = moment(vm.policy.insuranceStartDate, "DD/MM/YYYY").add(1, 'years').format("DD/MM/YYYY");
            // add a day
            vm.policy.insuranceEndDate = endDate;
        }

        function addOrRemovePerson() {
            if(vm.policy.numberPerson > vm.policy.premiumKhcList.length) {
                addNewPerson();
            } else if(vm.policy.numberPerson < vm.policy.premiumKhcList.length) {
                removePerson();
            }
            getPremium();
        }

        function addNewPerson() {
            var lineAdd = vm.policy.numberPerson - vm.policy.premiumKhcList.length;
            for (var i=0; i < lineAdd; i++) {
                vm.policy.premiumKhcList.push({
                    "dob": "",
                    "insuredName": "",
                    "premium": 0,
                    "yearOld" : 0,
                    "idPasswport": ""
                });
            }
        };

        function removePerson() {
            vm.policy.premiumKhcList.splice(vm.policy.numberPerson, vm.policy.premiumKhcList.length)
        };

        function processComboResult(data, type) {
            console.log(data);
            switch(type){
                case 'khc-money':
                    getPremium();
                    break;
            }
        }

        function getPremium() {
//            var postData = getPostData(false);

        	var isValid = true;
        	angular.forEach(vm.policy.premiumKhcList, function(value, key) {
        		if (value.dob == "" || value.yearOld == 0) {
        			isValid = false;
        		}
		 	});
        	
            if(isValid && vm.policy.premiumKhcList.length > 0 && vm.policy.premiumPackage != "") {
            	vm.loading = true;
            	ProductCommonService.getKhcPremium(vm.policy, onGetPremiumSuccess, onGetPremiumError);
            }
        }

//        function getPostData() {
//            var postData = Object.assign({}, vm.policy);
//
//            vm.postPremiumKhcListIndex = [];
//            var realPremiumKhcList = [];
//            for (var i=0; i < postData.premiumKhcList.length; i++) {
//                if(postData.premiumKhcList[i].dob) {
//                    vm.postPremiumKhcListIndex.push(i);
//                    realPremiumKhcList.push(postData.premiumKhcList[i]);
//                }
//            }
//
//            postData.premiumKhcList = realPremiumKhcList;
//            postData.numberMonth = DateUtils.monthDiff(postData.insuranceStartDate, postData.insuranceEndDate) + 1;
//            postData.numberPerson = realPremiumKhcList.length;
//
//            return postData;
//        }

        function onGetPremiumSuccess(result) {
            vm.loading = false;
            var now = new Date();
            var nowStr = DateUtils.convertDate(now);
//            vm.policy.premiumKhcList = result.premiumKhcList;
            for (var i=0; i < vm.policy.premiumKhcList.length; i++) {
                vm.policy.premiumKhcList[i].dob = result.premiumKhcList[i].dob;
	            vm.policy.premiumKhcList[i].insuredName = result.premiumKhcList[i].insuredName;
	            vm.policy.premiumKhcList[i].premium = result.premiumKhcList[i].premium;
	            vm.policy.premiumKhcList[i].yearOld = DateUtils.yearDiff(vm.policy.premiumKhcList[i].dob, nowStr);
            }
            
            var count = 0;
            for (var i=0; i < vm.policy.premiumKhcList.length; i++) {
            	if(vm.policy.premiumKhcList[i].premium > 0) {
            		count++;
            	}
            }

            if(vm.policy.numberPerson > 0 && count == vm.policy.premiumKhcList.length) {
            	vm.policy.premiumNet = result.premiumNet;
                vm.policy.premiumKhc = result.premiumKhc;
                vm.isShowPremium = true;
                vm.isShowTotalPremium = true;
            } else {
            	vm.policy.premiumNet = 0;
                vm.policy.premiumKhc = 0;
                vm.isShowPremium = false;
                vm.isShowTotalPremium = false;
            }

            vm.clearResponseError();
        }

        function onGetPremiumError(result) {
            vm.loading = false;
            vm.validateResponse(result, 'getPremium');
        }

        function savePolicy() {
            vm.policy.inceptionDate = vm.policy.insuranceStartDate;
            vm.policy.tlAddcollections = vm.policy.premiumKhcList;
            vm.policy.permanentTotalDisablement = vm.policy.numberPerson;
            
            // call base
            vm.savePolicyBase("KHC", vm.policy);
        }

        function validatorCombo(name) {
        	switch(name) {
  			case "premiumPackage":
  	            return true;
			}
        }
    }
})();
