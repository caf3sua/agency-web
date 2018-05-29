(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductHomeController', ProductHomeController);

    ProductHomeController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ProductHomeService', 'ProductCommonService'];

    function ProductHomeController ($scope, $controller, Principal, $state, $rootScope, ProductHomeService, ProductCommonService) {
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
  				"bars": "1",
  				"byNight": "0198711131",
  				"contactCode": "DUC001",
  				"expiredDate": "29/05/2019",
  				"gycbhNumber": "ITSOL.HOM.18.78",
  				"inceptionDate": "30/05/2018",
  				"insuranceAddress": "HN",
  				"insuranceName": "HN",
  				"insuredLocation": "HN",
  				"invoceNumber": "0198711131",
  				"invoiceInfo": {
  				"accountNo": "",
  				"address": "",
  				"check": "0",
  				"company": "",
  				"name": "",
  				"taxNo": ""
  				},
  				"loaiHinh": "1",
  				"policyNumber": "",
  				"premiumDiscount": 0,
  				"premiumHome": 0,
  				"premiumNet": 0,
  				"premiumsi": 0,
  				"premiumsiin": 0,
  				"receiveMethod": "1",
  				"receiverUser": {
  				"address": "",
  				"addressDistrict": "",
  				"email": "",
  				"mobile": "",
  				"name": ""
  				},
  				"si": "300000000",
  				"siPremium": 0,
  				"siin": "100000000",
  				"siinPremium": 0,
  				"totalUsedArea": "100000000",
  				"userAgent": "",
  				"windowLocks": "1",
  				"yearBuildCode": "1"
  				};
  		
  		vm.getPremium = getPremium;
  		vm.createPolicy = createPolicy;
  		vm.getPolicyNumber = getPolicyNumber;
  		
  		// Function
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
  			ProductCommonService.getPolicyNumber({lineId: 'HOM'}, onGetPolicyNumberSuccess, onGetPolicyNumberError);
  			
  			function onGetPolicyNumberSuccess(data, headers) {
  				vm.homePolicy.gycbhNumber = data;
  				createPolicy();
            }
            function onGetPolicyNumberError(error) {
                console.log(error.data.message);
            }
  		}

  		function createPolicy() {
  			console.log('createPolicy');
  			debugger
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
  		
    }
})();
