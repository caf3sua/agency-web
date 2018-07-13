(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductHomeController', ProductHomeController);

    ProductHomeController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ProductHomeService', 'ProductCommonService', 'DateUtils'];

    function ProductHomeController ($scope, $controller, Principal, $state, $rootScope, ProductHomeService, ProductCommonService, DateUtils) {
    	var vm = this;
    	vm.lineId = 'HOM';
    	
        vm.changeYear = changeYear;
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		vm.product = {
  			"premiumDiscount": 0,
  			"premiumHome": 0,
  			"premiumNet": 0,
  			"premiumSi": 0,
  			"premiumSiin": 0,
  			"si": "",
  			"siin": "",
  			"yearBuildCode": "1"
  		};
  		
  		vm.policy = {
  				"bankId": "0",
  				"baovietCompanyId": "",
  				"baovietCompanyName": " ",
  				"bars": "0",
  				"byNight": "",
//  				"contactCode": "DUC001",
  				"expiredDate": "",
  				"gycbhNumber": "",
  				"inceptionDate": "",
  				"insuranceAddress": "",
  				"insuranceName": "",
  				"insuredLocation": "",
  				"invoceNumber": "",
//  				"invoiceInfo": {
//	  				"accountNo": "",
//	  				"address": "",
//	  				"check": "0",
//	  				"company": "",
//	  				"name": "",
//	  				"taxNo": ""
//  				},
  				"loaiHinh": "0",
  				"policyNumber": "",
  				"premiumDiscount": 0,
  				"premiumHome": 0,
  				"premiumNet": 0,
  				"premiumsi": 0,
  				"premiumsiin": 0,
  				"receiveMethod": "1",
//  				"receiverUser": {
//	  				"address": "",
//	  				"addressDistrict": "",
//	  				"email": "",
//	  				"mobile": "",
//	  				"name": ""
//  				},
  				"si": "",
  				"siPremium": 0,
  				"siin": "",
  				"siinPremium": 0,
  				"totalUsedArea": "",
  				"userAgent": "",
  				"windowLocks": "0",
  				"yearBuildCode": "1"
  				};
  		
  		vm.getPremium = getPremium;
  		vm.createNewPolicy = createNewPolicy;
  		vm.getPolicyNumber = getPolicyNumber;
  		vm.changeToDate = changeToDate;
  		vm.siValidator = siValidator;
  		
  		// Initialize
  		init();
  		
  		// Function
  		function init() {
            var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.policy.inceptionDate = DateUtils.convertDate(startDate);
            getPolicyNumber();
            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.policy.expiredDate = DateUtils.convertDate(endDate);
            vm.registerDisableContactInfoValue('vm.product.premiumHome');

        }
  		
  		function getPremium() {
            vm.loading = true;
  			ProductHomeService.getPremium(vm.product, onGetPremiumSuccess, onGetPremiumError);
  			
  			function onGetPremiumSuccess(data, headers) {
                vm.loading = false;
  				vm.product = data;
  				vm.policy.si = data.si;
  				vm.policy.siin = data.siin;
  				vm.policy.premiumsi = data.premiumSi;
  				vm.policy.premiumsiin = data.premiumSiin;
  				vm.policy.premiumNet = data.premiumNet;
  				vm.policy.premiumHome = data.premiumHome;
  				vm.policy.premiumDiscount = data.premiumDiscount;
  				vm.policy.yearBuildCode = data.yearBuildCode;
  				console.log(vm.product);

                vm.clearResponseError();
            }
            function onGetPremiumError(error) {
                vm.loading = false;
                console.log(error.data.message);
                vm.product.premiumHome = 0;
            	vm.product.premiumNet = 0;
            	vm.product.premiumSi= 0;
            	vm.product.premiumSiin= 0;
                vm.validateResponse(error, 'getPremium');
            }
  		}
  		
  		function getPolicyNumber() {
  			console.log('getPolicyNumber');
  			ProductCommonService.getPolicyNumber({lineId: 'HOM'}, onGetPolicyNumberSuccess, onGetPolicyNumberError);
  			
  			function onGetPolicyNumberSuccess(data, headers) {
  				vm.policy.gycbhNumber = data.policyNumber;
                vm.clearResponseError();
            }
            function onGetPolicyNumberError(error) {
                vm.validateResponse(error, 'getPolicyNumber');
            }
  		}

  		function createNewPolicy() {
  			// NamNH fix: Append contactCode + invoiceInfo + receiverUser
  			vm.appendCommonData(vm.policy);
  			
  			// call base
  			vm.createNewPolicyBase("HOME", vm.policy);
  		}
  		
  		function changeToDate() {
  			var toDate = vm.calculateToDate(vm.policy.inceptionDate);
  			vm.policy.expiredDate = toDate;
  		}
  		
  		
  		function siValidator(siStr) {
            if(!siStr){return;}

            if (siStr < 300000000 || siStr > 5000000000) {
                return "Bảo Việt chỉ bảo hiểm cho phần ngôi nhà trong giới hạn từ 300 triệu đồng đến 5 tỷ đồng";
            }
            return true;
        };
  		function changeYear() {
            if(vm.product.si != ""){
                getPremium();
            }
        }
    }
})();
