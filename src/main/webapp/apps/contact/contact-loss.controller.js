(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactLossController', ContactLossController);


    ContactLossController.$inject = ['$rootScope', '$scope', '$state', '$http', '$filter',
    		'ContactService','$controller', 'entity', 'ReportService'];
        function ContactLossController($rootScope, $scope, $state, $http, $filter
        		, ContactService, $controller, entity, ReportService) {
        	
        	var vm = this;
        	vm.contactSelected = entity;
        	
        	vm.his = [];
        	vm.hisInit = [];
        	vm.totalPremium = 0;
        	vm.totalNumberClaim = 0;
        	vm.goBack = goBack;
        	
        	// variable
        	angular.element(document).ready(function () {
            });

        	// Init controller
      		(function initController() {
      			// instantiate base controller
      			loadAll();
      		})();
      		
      		// function
      		function goBack() {
      			// $state.go("app.contact", {selected: vm.contactSelected.contactId, groupType: $rootScope.contactGroupType});
      			$state.go("app.contact-detail", {id: vm.contactSelected.contactId});
      		}
      		
      		function loadAll() {
      			ReportService.getReportHistoryLoss({contactId: vm.contactSelected.contactId}, onSuccess, onError);
      			
      			function onSuccess(data, headers) {
                	vm.his = data;
                	calculateTotalPremium(vm.his);
                }
                function onError(result) {
                	let message = 'Lỗi khi lấy dữ liệu eclaim';
                	toastr.error(message);
                }
      		}
      		
      		function calculateTotalPremium(data) {
      			angular.forEach(data, function(value, key) {
      				vm.totalPremium = vm.totalPremium + value.claim_amount;
      				vm.totalNumberClaim = vm.totalNumberClaim + value.numberClaim;
  			 	});
      		}
        }
})();
