(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('ProductCarController', ProductCarController);

    ProductCarController.$inject = ['$scope', '$controller', 'Principal', 'LoginService', '$state', '$rootScope'];

    function ProductCarController ($scope, $controller, Principal, LoginService, $state, $rootScope) {
        var vm = this;

        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('AgencyBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		vm.productCar = {};
  		vm.showChangePremium = showChangePremium;
  		vm.disableExtendedInsurance = disableExtendedInsurance;
  		vm.tndsSoChoOptions = [
  	      {id: '1', name: 'Loại xe dưới 6 chỗ ngồi'},
  	      {id: '2', name: 'Loại xe từ 6 đến 11 chỗ ngồi'},
  	      {id: '3', name: 'Loại xe từ 12 đến 24 chỗ ngồi'},
  	      {id: '4', name: 'Loại xe trên 24 chỗ ngồi'},
  	      {id: '5', name: 'Xe vừa chở người vừa chở hàng(Pickup, Minivan)'}
  	    ];
  		vm.tndstnSoTienOptions = [
	      {id: '50000000', name: '50trđ/người/vụ về người - 50trđ/vụ về tài sản'},
	      {id: '100000000', name: '100trđ/người/vụ về người - 100trđ/vụ về tài sản'},
	      {id: '150000000', name: '150trđ/người/vụ về người - 150trđ/vụ về tài sản'}
	    ];
  		vm.nntxSoTienOptions = [
  	      {id: '10000000', name: '10 triệu đồng/người/vụ'},
  	      {id: '20000000', name: '20 triệu đồng/người/vụ'},
  	      {id: '30000000', name: '30 triệu đồng/người/vụ'},
  	      {id: '40000000', name: '40 triệu đồng/người/vụ'},
  	      {id: '50000000', name: '50 triệu đồng/người/vụ'},
  	      {id: '100000000', name: '100 triệu đồng/người/vụ'},
  	      {id: '150000000', name: '150 triệu đồng/người/vụ'},
  	      {id: '200000000', name: '200 triệu đồng/người/vụ'}
  	    ];
  		vm.manufacturerOptions = [];
  		vm.modelOptions = [];
  		vm.yearOptions = [];
  		
  		
  		// Function
  		function showChangePremium() {
  			if((vm.productCar.tndsbbCheck && vm.productCar.tndsSoCho)
  					|| (vm.productCar.tndstnCheck && vm.productCar.tndsSoCho)) {
  				return true;
  			} else {
  				return false;
  			}
  		}
  		
  		function disableExtendedInsurance() {
  			if((!vm.productCar.tndsbbCheck && !vm.productCar.tndstnCheck) 
  					|| (vm.productCar.tndsbbCheck && !vm.productCar.tndsSoCho)
  					|| (vm.productCar.tndstnCheck && !vm.productCar.tndsSoCho)) {
  				return true;
  			} else {
  				return false;
  			}
  		}
    }
})();
