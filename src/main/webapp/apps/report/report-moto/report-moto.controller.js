(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReportMotoController', ReportMotoController);

    ReportMotoController.$inject = ['$scope', '$controller', '$stateParams', '$state', '$rootScope', '$ngConfirm', '$timeout', 'PAGINATION_CONSTANTS', 'ReportService', 'ProductCommonService'];

    function ReportMotoController ($scope, $controller, $stateParams, $state, $rootScope, $ngConfirm, $timeout, PAGINATION_CONSTANTS, ReportService, ProductCommonService) {
    	var vm = this;
        
    	// Properties & function declare
        // paging
    	vm.page = 1;
        vm.totalItems = null;
        vm.itemsPerPage = PAGINATION_CONSTANTS.itemsPerPage;
        vm.transition = transition;
        
  		vm.isLoading = false;
  		vm.orders = [];
  		vm.searchCriterial = {
  			  "fromDate": "",
  			  "toDate": ""
  		};
  		
  		vm.searchReportMoto = searchReportMoto;
  		vm.gotoDetail = gotoDetail;
  		
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		    
  		    searchReportMoto();
  		})();
  		
  		// Function
  		function gotoDetail(id) {
  			$state.go("order.order-detail", {id: id});
  		}
  		
  		function searchReportMoto() {
  			vm.totalItems = null;
  			vm.isLoading = true;
  			vm.orders = [];

  			// Keep filter from root scope
  			ReportService.getReportMoto(vm.searchCriterial, onSuccess, onError);
            function onSuccess(data, headers) {
            	vm.isLoading = false;
            	vm.orders = data;
            	toastr.success('Tìm thấy ' + vm.orders.length + ' đơn hàng phù hợp');
            }
            function onError(error) {
            	toastr.error("Lỗi khi lấy giao dịch chuyển tiền");
            }
  		}
  		
  		function search(page) {
  			console.log('transition, page:' + vm.page);
  			vm.isLoading = true;

  			var order = {};
  			order = vm.searchCriterial;
  			order.pageable.page = vm.page - 1;
        	console.log('searchAllTransition, page: ' + order.pageable.page);
        	
        	ReportService.getReportMoto(order, onSearchSuccess, onSearchError);
  			function onSearchSuccess(data, headers) {
  				// Paging
  				vm.orders = data;
  				vm.isLoading = false;
  				toastr.success('Tìm thấy ' + vm.orders.length + ' đơn hàng phù hợp');
  	        }
  	        function onSearchError() {
  	        	vm.isLoading = false;
  	            toastr.error("Lỗi khi tìm kiếm đơn hàng!");
  	        }
  		}
  		
        function transition () {
        	// search
        	search();
        }
        
    }
})();
