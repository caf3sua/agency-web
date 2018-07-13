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
    	vm.insuranceEndDate;
    	vm.gotoOrder = gotoOrder;
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			OrderService.getById({id: $stateParams.id}, onSuccess, onError);
  			
  			function onSuccess(data) {
  				vm.policy = data;
  				// Load contact
  				loadContactInfo(data.contactCode);
  				
  				switch (data.lineId) {
  					case 'BVP':
  						formatBvpData(data);
  						break;
  					case 'CAR':
  						formatCarData(data);
  						break;
  					case 'HOM':
  						formatHomeData(data);
  						break;
  					case 'KCR':
  						formatKcareData(data);
  						break;
  					case 'MOT':
  						formatMotoData(data);
  						break;
  					case 'TNC':
  						formatTncData(data);
  						break;
  					case 'KHC':
  						formatKhcData(data);
  						break;
  					case 'TVC':
  						formatTvcData(data);
  						break;
  					case 'TVI':
  						formatTviData(data);
  						break;
  					case 'HHV':
  						formatHhvcData(data);
  						break;
					default:
						break;
  				}
  				
  				toastr.success('Tải thông tin chi tiết hợp đồng');
  			}
  			
  			function onError() {
  			}
  		})();
  		
  		function formatBvpData(data) {
  			vm.policy.premiumNet = data.chuongtrinhPhi + data.ngoaitruPhi + data.tncnPhi + data.sinhmangPhi + data.nhakhoaPhi + data.thaisanPhi;
			vm.policy.phiBH = data.chuongtrinhPhi + data.ngoaitruPhi + data.tncnPhi + data.sinhmangPhi + data.nhakhoaPhi + data.thaisanPhi - data.tanggiamPhi;
  		}
  		
  		function formatCarData(data) {
  		}
  		
  		function formatHomeData(data) {
  		}
  		
  		function formatKcareData(data) {
  		}
  		
  		function formatKhcData(data) {
  		}
  		
  		function formatMotoData(data) {
  		}
  		
  		function formatTncData(data) {
  		}
  		
  		function formatTvcData(data) {
  		}
  		
  		function formatTviData(data) {
  		}
  		
  		function formatHhvcData(data) {
  		}
  		
  		// Properties & function declare
  		function loadContactInfo(coCode) {
  			vm.contactName = "";
  	    	vm.contactDob = "";
  			OrderService.getByContactCode({contactCode: coCode}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				vm.contactName = result.contactName;
  				vm.contactDob = result.dateOfBirth;
  				toastr.success('Tải thông tin chi tiết hợp đồng');
  			}
  			
  			function onError() {
  			}
  		}
  		
  		function gotoOrder() {
  			$state.go('app.order');
  		}
    }
})();
