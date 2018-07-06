(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductTncController', ProductTncController);

    ProductTncController.$inject = ['$scope', '$controller', 'TncService', 'DateUtils', 'ProductCommonService', '$state', '$rootScope'];

    function ProductTncController ($scope, $controller, TncService, DateUtils, ProductCommonService, $state, $rootScope) {
    	var vm = this;

        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
        vm.product = {
            "insurancestartdate":"18/05/2018",
            "numbermonth": 0,
            "numberperson": "",
            "premiumPackage": "",
            "premiumdiscount": 0,
            "premiumnet": 0,
            "premiumtnc": 0
        }

        vm.policy = {
            "insuranceexpireddate":"28/05/2019",
            "insurancestartdate":"29/05/2018",
            "listTncAdd":[],
            "numbermonth":12,
            "numberperson":1,
            "premiumPackage":20000000,
            "premiumPackageplanid":2,
            "premiumdiscount":0,
            "premiumnet":0,
            "premiumtnc":0,
            "receiveMethod":"1"
        }

        vm.validatorCombo = validatorCombo;
        vm.addOrRemovePerson = addOrRemovePerson;
        vm.processComboResult = processComboResult;
        vm.getPremium = getPremium;
        vm.createNewPolicy = createNewPolicy;
        vm.premiumPackageOptions = [
            {id: '20000000', name: '20.000.000 VND'},
            {id: '30000000', name: '30.000.000 VND'},
            {id: '40000000', name: '40.000.000 VND'},
            {id: '50000000', name: '50.000.000 VND'},
            {id: '60000000', name: '60.000.000 VND'},
            {id: '70000000', name: '70.000.000 VND'},
            {id: '80000000', name: '80.000.000 VND'},
            {id: '90000000', name: '90.000.000 VND'},
            {id: '100000000', name: '100.000.000 VND'}
        ];

        vm.isShowPersonList = false;
        vm.isShowPremium = false;
        vm.isShowTotalPremium = false;

        // Initialize
        init();

        // Function
        function init() {
            var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.product.insurancestartdate = DateUtils.convertDate(startDate);

            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.product.insuranceexpireddate = DateUtils.convertDate(endDate);

            // Get gycbhNumber
            ProductCommonService.getPolicyNumber({lineId: 'TNC'}, onGetPolicyNumberSuccess, onGetPolicyNumberError);
            
            // Register disable 
            vm.registerDisableContactInfoValue('vm.product.premiumtnc');
        }

        function addOrRemovePerson() {
            if(vm.product.numberperson > 0) {
                vm.isShowPersonList = true;
            } else {
                vm.isShowPersonList = false;
            }
            if(vm.product.numberperson > vm.policy.listTncAdd.length) {
                addNewPerson();
            } else if(vm.product.numberperson < vm.policy.listTncAdd.length) {
                removePerson();
            }
            getPremium();
        }

        function addNewPerson() {
            var lineAdd = vm.product.numberperson - vm.policy.listTncAdd.length;
            for (var i=0; i < lineAdd; i++) {
                vm.policy.listTncAdd.push({
                    "dob":"",
                    "idPasswport":"",
                    "insuredName":"",
                    "title":""
                });
            }
        };

        function removePerson() {
            vm.policy.listTncAdd.splice(vm.product.numberperson, vm.policy.listTncAdd.length)
        };

        function processComboResult(data, type) {
            console.log(data);
            switch(type){
                case 'tnc-money':
                    getPremium();
                    break;
            }
        }

        function getPremium() {
            var postData = getPostData(false);
            if(postData.numberperson > 0 && postData.premiumPackage > 0) {
                vm.loading = true;
                TncService.getPremium(postData, onGetPremiumSuccess, onGetPremiumError);
            } else {
                vm.product.premiumnet = 0;
                vm.product.premiumtnc = 0;
                vm.product.premiumAverage = 0;
            }
        }

        function getPostData() {
            var postData = Object.assign({}, vm.product);

            postData.numbermonth = DateUtils.monthDiff(postData.insurancestartdate, postData.insuranceexpireddate);

            return postData;
        }

        function onGetPremiumSuccess(result) {
            vm.loading = false;
            if(vm.product.numberperson > 0) {
            	vm.product.premiumnet = result.premiumnet;
                vm.product.premiumtnc = result.premiumtnc;
                vm.isShowPremium = true;
                vm.isShowTotalPremium = true;
            } else {
            	vm.product.premiumnet = 0;
                vm.product.premiumtnc = 0;
                vm.isShowPremium = false;
                vm.isShowTotalPremium = false;
            }
            vm.product.premiumAverage = vm.product.premiumtnc / vm.product.numberperson;
            vm.clearResponseError();
        }

        function onGetPremiumError(result) {
            vm.loading = false;
            vm.validateResponse(result, 'getPremium');
        }

        function createNewPolicy() {
            var postData = getPostData(true);

            vm.policy.insuranceexpireddate = postData.insuranceexpireddate;
            vm.policy.insurancestartdate = postData.insurancestartdate;
            vm.policy.numbermonth = postData.numbermonth;
            vm.policy.numberperson = postData.numberperson;
            vm.policy.premiumPackage = postData.premiumPackage;
            vm.policy.premiumPackageplanid = postData.premiumPackage.toString()[0];
            vm.policy.premiumdiscount = postData.premiumdiscount;
            vm.policy.premiumnet = postData.premiumnet;
            vm.policy.premiumtnc = postData.premiumtnc;
            if(postData.receiveMethod) {
                vm.policy.receiveMethod = "2";
            } else {
                vm.policy.receiveMethod = "1";
            }

            // call base
            vm.createNewPolicyBase("TNC", vm.policy);
        }

        function onGetPolicyNumberSuccess(result) {
            vm.policy.gycbhNumber  = result.policyNumber;
            vm.clearResponseError();
        }

        function onGetPolicyNumberError(result) {
            vm.validateResponse(result, 'getPolicyNumber');
        }

        function validatorCombo(name) {
        	switch(name) {
  			case "premiumPackage":
  	            return true;
			}
        }
    }
})();
