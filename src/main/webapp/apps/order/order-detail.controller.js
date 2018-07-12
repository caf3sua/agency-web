(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderDetailController', OrderDetailController);

    OrderDetailController.$inject = ['$scope', 'Principal', '$state'
    	, '$stateParams', '$rootScope', 'OrderService', '$ngConfirm', '$timeout'];

    function OrderDetailController ($scope, Principal, $state
    		, $stateParams, $rootScope, OrderService, $ngConfirm, $timeout) {
    	var vm = this;
        
    	vm.policy;
    	vm.contactName;
    	vm.contactDob;
    	vm.gotoOrder = gotoOrder;
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			OrderService.getById({id: $stateParams.id}, onSuccess, onError);
  			
  			function onSuccess(data) {
  				vm.policy = data;
  				toastr.success('Tải thông tin chi tiết hợp đồng');
  			}
  			
  			function onError() {
  			}
  		})();
  		
  		// Properties & function declare
  		function loadContactInfo() {
  			
  		}
  		
  		function gotoOrder() {
  			$state.go('app.order');
  		}
    }
})();
