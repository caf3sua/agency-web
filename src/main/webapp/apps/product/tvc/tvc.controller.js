(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductTvcController', ProductTvcController);

    ProductTvcController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'TvcService', 'toastr'];

    function ProductTvcController ($scope, $controller, Principal, $state, $rootScope, TvcService, toastr) {
    	var vm = this;
    	vm.tvcBaseVM = {};
        vm.premiumTvcVM = {};
        vm.getPremium = getPremium;
        vm.onchangePlan = onchangePlan;
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();

  		// Properties & function declare
  		
  		
  		// Function
        function onchangePlan() {
            getPremium();
        }
        function getPremium() {
            vm.premiumTvcVM.destination =  vm.tvcBaseVM.destinationId;
            vm.premiumTvcVM.ngayDi =  vm.tvcBaseVM.ngayDi;
            vm.premiumTvcVM.ngayVe  =  vm.tvcBaseVM.ngayVe;
            vm.premiumTvcVM.numberOfPerson  =  1;
            vm.premiumTvcVM.planId  =  vm.tvcBaseVM.planId;
            vm.premiumTvcVM.premiumDiscount  =  0;
            vm.premiumTvcVM.premiumNet  =  0;
            vm.premiumTvcVM.premiumPackage  =  vm.tvcBaseVM.travelWithId;
            vm.premiumTvcVM.premiumTvc  = 0;
            vm.premiumTvcVM.songay  = 0;
            TvcService.getPremium(vm.premiumTvcVM, onGetPremiumSuccess, onGetPremiumError);
        }
        function onGetPremiumSuccess(result) {
            vm.tvcBaseVM.premiumTvc = result.premiumTvc;
        }

        function onGetPremiumError(result) {
            toastr.error('Get data error!', 'Error');
        }
    }
})();
