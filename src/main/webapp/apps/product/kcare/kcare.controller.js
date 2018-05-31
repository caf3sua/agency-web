(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductKcareController', ProductKcareController);

    ProductKcareController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ProductKcareService', 'ProductCommonService'];

    function ProductKcareController ($scope, $controller, Principal, $state, $rootScope, ProductKcareService, ProductCommonService) {
        var vm = this;

        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		vm.premium = {
  			  "gioiTinh": "0",
  			  "ngayBatDau": "dd/MM/yyyy",
  			  "ngaySinh": "dd/MM/yyyy",
  			  "premiumDiscount": 0,
  			  "premiumKCare": 0,
  			  "premiumNet": 0,
  			  "typeOfKcare": ""
  			};
  		
  		vm.getPremium = getPremium;
  		
  		vm.getPolicyNumber = getPolicyNumber;
  		vm.changeToDate = changeToDate;

  		var ngayKetThuc = "";
  		
  		// Initialize
  		
  		function getPolicyNumber() {
  			console.log('getPolicyNumber');
  			ProductCommonService.getPolicyNumber({lineId: 'KCR'}, onGetPolicyNumberSuccess, onGetPolicyNumberError);
  			
  			function onGetPolicyNumberSuccess(data, headers) {
  				vm.homePolicy.gycbhNumber = data.policyNumber;
  				createPolicy();
            }
            function onGetPolicyNumberError(error) {
                console.log(error.data.message);
            }
  		}
  		
  		function changeToDate() {
  			var toDate = vm.calculateToDate(vm.premium.ngayBatDau);
  			vm.ngayKetThuc = toDate;
  		}
  		
  		function getPremium() {
  			var postData = getPostData(false);
  			ProductKcareService.getPremium(postData, onGetPremiumSuccess, onGetPremiumError);
  			
  			function onGetPremiumSuccess(result) {
  	  			toastr.success('Create Invoice Success!', 'Successful!');
  	    	}
  	    	
  	    	function onGetPremiumError(result) {
  	    		toastr.error('Get data error!', 'Error');
  	    	}
  		}
  		
    	
    }
})();
