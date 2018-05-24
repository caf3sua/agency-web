(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductHomeController', ProductHomeController);

    ProductHomeController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ProductHomeService'];

    function ProductHomeController ($scope, $controller, Principal, $state, $rootScope, ProductHomeService) {
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
  				"baovietCompanyId": "CompanyId",
  				"baovietCompanyName": "Company Name",
  				"bars": "1",
  				"byNight": "byNight",
  				"contactCode": "4797",
  				"expiredDate": "23/04/2019",
  				"inceptionDate": "24/04/2018",
  				"insuranceAddress": "Address",
  				"insuranceName": "Name",
  				"insuredLocation": "Location",
  				"invoceNumber": "",
  				"invoiceInfo": {
  				"accountNo": "1151242",
  				"address": "address",
  				"check": "1",
  				"company": "company",
  				"name": "name",
  				"taxNo": "1101"
  				},
  				"loaiHinh": "1",
  				"premiumDiscount": 0,
  				"premiumHome": 0,
  				"premiumNet": 0,
  				"premiumsi": 0,
  				"premiumsiin": 0,
  				"receiverUser": {
  				"address": "address",
  				"addressDistrict": "",
  				"email": "abc@gmail.com",
  				"mobile": "0987111234",
  				"name": "name"
  				},
  				"si": "300000000",
  				"siPremium": 0,
  				"siin": "500000000",
  				"siinPremium": 0,
  				"totalUsedArea": "600000000",
  				"type": "ONL",
  				"userAgent": "1",
  				"windowLocks": "1",
  				"yearBuildCode": "1"
		};
  		
  		vm.getPremium = getPremium;
  		vm.createPolicy = createPolicy;
  		
  		// Function
  		function getPremium() {
  			ProductHomeService.getPremium(vm.homePremium, onGetPremiumSuccess, onGetPremiumError);
  			
  			function onGetPremiumSuccess(data, headers) {
  				vm.homePremium = data;
  				console.log(vm.homePremium);
            }
            function onGetPremiumError(error) {
                console.log(error.data.message);
            }
  		}

  		function createPolicy() {
  			ProductHomeService.createPolicy(vm.homePolicy, onSuccess, onError);
  			
  			function onSuccess(data, headers) {
  				vm.homePolicy = data;
  				console.log(vm.homePolicy);
            }
            function onError(error) {
                console.log(error.data.message);
            }
  		}
  		
    }
})();
