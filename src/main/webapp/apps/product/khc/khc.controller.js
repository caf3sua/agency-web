(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductKhcController', ProductKhcController);

    ProductKhcController.$inject = ['$scope', '$controller', 'KhcService', 'DateUtils', 'ProductCommonService', '$state', '$rootScope'];

    function ProductKhcController ($scope, $controller, KhcService, DateUtils, ProductCommonService, $state, $rootScope) {
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
        vm.product = {
            "insuranceStartDate": "",
            "numberMonth": 0,
            "numberPerson": "",
            "premiumDiscount": 0,
            "premiumKhc": 0,
            "premiumKhcList":[],
            "premiumNet": 0,
            "premiumPackage": ""
        }

        vm.policy = {
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
        vm.processComboResult = processComboResult;
        vm.getPremium = getPremium;
        vm.savePolicy = savePolicy;
        vm.premiumPackageOptions = [
            {id: '20000000', name: '20000000 VND'},
            {id: '30000000', name: '30000000 VND'},
            {id: '40000000', name: '40000000 VND'},
            {id: '50000000', name: '50000000 VND'}
        ];

        vm.isShowPersonList = false;
        vm.isShowPremium = false;
        vm.isShowTotalPremium = false;
        vm.postPremiumKhcListIndex = [];

        // Initialize
        init();

        // Function
        function init() {
            var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.product.insuranceStartDate = DateUtils.convertDate(startDate);

            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.product.insuranceEndDate = DateUtils.convertDate(endDate);

            // Register disable 
            vm.registerDisableContactInfoValue('vm.product.premiumKhc');
        }

        function onDobChange(index) {
            if(vm.product.premiumKhcList[index]) {
                var now = new Date();
                var nowStr = DateUtils.convertDate(now);
                vm.product.premiumKhcList[index].yearOld = DateUtils.yearDiff(vm.product.premiumKhcList[index].dob, nowStr);
            }

            if(vm.product.numberPerson > 0 && vm.product.premiumPackage) {
                getPremium();
            }
        }

        function addOrRemovePerson() {
            if(vm.product.numberPerson > 0) {
                vm.isShowPersonList = true;
            } else {
                vm.isShowPersonList = false;
            }
            if(vm.product.numberPerson > vm.product.premiumKhcList.length) {
                addNewPerson();
            } else if(vm.product.numberPerson < vm.product.premiumKhcList.length) {
                removePerson();
            }
            getPremium();
        }

        function addNewPerson() {
            var lineAdd = vm.product.numberPerson - vm.product.premiumKhcList.length;
            for (var i=0; i < lineAdd; i++) {
                vm.product.premiumKhcList.push({
                    "dob": "",
                    "insuredName": "",
                    "premium": 0,
                    "yearOld" : 0,
                    "idPasswport": ""
                });
            }
        };

        function removePerson() {
            vm.product.premiumKhcList.splice(vm.product.numberPerson, vm.product.premiumKhcList.length)
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
            var postData = getPostData(false);

            if(postData.premiumKhcList.length > 0) {
            	vm.loading = true;
                KhcService.getPremium(postData, onGetPremiumSuccess, onGetPremiumError);
            }
        }

        function getPostData() {
            var postData = Object.assign({}, vm.product);

            vm.postPremiumKhcListIndex = [];
            var realPremiumKhcList = [];
            for (var i=0; i < postData.premiumKhcList.length; i++) {
                if(postData.premiumKhcList[i].dob) {
                    vm.postPremiumKhcListIndex.push(i);
                    realPremiumKhcList.push(postData.premiumKhcList[i]);
                }
            }

            postData.premiumKhcList = realPremiumKhcList;
            postData.numberMonth = DateUtils.monthDiff(postData.insuranceStartDate, postData.insuranceEndDate) + 1;
            postData.numberPerson = realPremiumKhcList.length;

            return postData;
        }

        function onGetPremiumSuccess(result) {
            vm.loading = false;
            for (var i=0; i < vm.postPremiumKhcListIndex.length; i++) {
                vm.product.premiumKhcList[vm.postPremiumKhcListIndex[i]].dob = result.premiumKhcList[i].dob;
	            vm.product.premiumKhcList[vm.postPremiumKhcListIndex[i]].insuredName = result.premiumKhcList[i].insuredName;
	            vm.product.premiumKhcList[vm.postPremiumKhcListIndex[i]].premium = result.premiumKhcList[i].premium;
            }
            
            var count = 0;
            for (var i=0; i < vm.product.premiumKhcList.length; i++) {
            	if(vm.product.premiumKhcList[i].premium > 0) {
            		count++
            	}
            }

            if(vm.product.numberPerson > 0 && count == vm.product.premiumKhcList.length) {
            	vm.product.premiumNet = result.premiumNet;
                vm.product.premiumKhc = result.premiumKhc;
                vm.isShowPremium = true;
                vm.isShowTotalPremium = true;
            } else {
            	vm.product.premiumNet = 0;
                vm.product.premiumKhc = 0;
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
            var postData = getPostData(true);
            vm.policy.inceptionDate = postData.insuranceStartDate;
            vm.policy.permanentTotalDisablement = postData.numberPerson;
            vm.policy.plan = postData.premiumPackage.toString()[0];
            if(postData.receiveMethod) {
                vm.policy.receiveMethod = "2";
            } else {
                vm.policy.receiveMethod = "1";
            }
            vm.policy.tlAddcollections = postData.premiumKhcList;

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
