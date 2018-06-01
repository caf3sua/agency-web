(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductHomeController', ProductHomeController);

    ProductHomeController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ProductHomeService', 'ProductCommonService', 'DateUtils'];

    function ProductHomeController ($scope, $controller, Principal, $state, $rootScope, ProductHomeService, ProductCommonService, DateUtils) {
    	var vm = this;

        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		vm.homePremium = {
  			"premiumDiscount": 0,
  			"premiumHome": 0,
  			"premiumNet": 0,
  			"premiumSi": 0,
  			"premiumSiin": 0,
  			"si": "",
  			"siin": "",
  			"yearBuildCode": "1"
  		};
  		
  		vm.homePolicy = {
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
  		vm.createPolicy = createPolicy;
  		vm.getPolicyNumber = getPolicyNumber;
  		vm.changeToDate = changeToDate;
  		
  		// Initialize
  		init();
  		
  		// Function
  		function init() {
            var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.homePolicy.inceptionDate = DateUtils.convertDate(startDate);

            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.homePolicy.expiredDate = DateUtils.convertDate(endDate);
        }
  		
  		function getPremium() {
  			ProductHomeService.getPremium(vm.homePremium, onGetPremiumSuccess, onGetPremiumError);
  			
  			function onGetPremiumSuccess(data, headers) {
  				vm.homePremium = data;
  				vm.homePolicy.si = data.si;
  				vm.homePolicy.siin = data.siin;
  				vm.homePolicy.premiumsi = data.premiumSi;
  				vm.homePolicy.premiumsiin = data.premiumSiin;
  				vm.homePolicy.premiumNet = data.premiumNet;
  				vm.homePolicy.premiumHome = data.premiumHome;
  				vm.homePolicy.premiumDiscount = data.premiumDiscount;
  				vm.homePolicy.yearBuildCode = data.yearBuildCode;
  				console.log(vm.homePremium);
            }
            function onGetPremiumError(error) {
                console.log(error.data.message);
            }
  		}
  		
  		function getPolicyNumber() {
  			console.log('getPolicyNumber');
  			ProductCommonService.getPolicyNumber({lineId: 'HOM'}, onGetPolicyNumberSuccess, onGetPolicyNumberError);
  			
  			function onGetPolicyNumberSuccess(data, headers) {
  				vm.homePolicy.gycbhNumber = data.policyNumber;
  				createPolicy();
            }
            function onGetPolicyNumberError(error) {
                console.log(error.data.message);
            }
  		}

  		function createPolicy() {
  			console.log('createPolicy');
  			// NamNH fix: Append contactCode + invoiceInfo + receiverUser
  			vm.appendCommonData(vm.homePolicy);
  			
  			//debugger
  			ProductHomeService.createPolicy(vm.homePolicy, onSuccess, onError);
  			
  			function onSuccess(data, headers) {
  				vm.homePolicy = data;
  				console.log(vm.homePolicy);
  				toastr.success('Create Invoice Success!', 'Successful!');
            }
  			
            function onError(error) {
            	toastr.error('Create Invoice Error!', 'Error');
            }
  		}
  		
  		function changeToDate() {
  			var toDate = vm.calculateToDate(vm.homePolicy.inceptionDate);
  			vm.homePolicy.expiredDate = toDate;
  		}
  		
    }
})();
