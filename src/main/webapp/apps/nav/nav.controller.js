(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavController', NavController);

    NavController.$inject = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll'
    	, '$timeout', '$window', 'Auth', '$state', 'Principal', 'ContactCommonDialogService', 'ReminderService', 'CONSTANT_REMINDER_RANGER_DATE'];

    function NavController ($scope, $localStorage, $location, $rootScope, $anchorScroll
    		, $timeout, $window, Auth, $state, Principal, ContactCommonDialogService, ReminderService, CONSTANT_REMINDER_RANGER_DATE) {
    	var vm = this;
    	vm.countReminder = 0;
    	vm.isCanPremium = false;
    	
    	vm.products = [
    		{"lineId": "", "lineName" : "-- Chọn sản phẩm --"}, 
    		{"lineId": "CAR", "lineName" : "Bảo hiểm ô tô"}, 
    		{"lineId": "BVP", "lineName" : "Bảo Việt An Gia"},
    		{"lineId": "KCARE", "lineName" : "Bảo hiểm bệnh ung thu"},
    		{"lineId": "TVC", "lineName" : "Bảo hiểm du lịch quốc tế"},
    		{"lineId": "TVI", "lineName" : "Bảo hiểm du lịch Việt Nam"},
    		{"lineId": "MOTO", "lineName" : "Bảo hiểm xe máy"},
    		{"lineId": "HOME", "lineName" : "Bảo hiểm nhà tư nhân"},
    		{"lineId": "KHC", "lineName" : "Bảo hiểm kết hợp con người"},
    		{"lineId": "TNC", "lineName" : "Bảo hiểm tai nạn con người"},
    		{"lineId": "HHVC", "lineName" : "Bảo hiểm vận chuyển hàng hóa"}
    	];
    	vm.selProduct = "";
    	
    	vm.logout = logout;

    	// Init controller
  		(function initController() {
  			console.log('NavController initController');
  			countReminder();
  		})();
  		
  		function countReminder() {
  			ReminderService.getCountReminder({numberDay: CONSTANT_REMINDER_RANGER_DATE}, onSuccess, onError);
    		
    		function onSuccess(result) {
    			vm.countReminder = result.count;
    		}
    		
    		function onError(result) {
    			
    		}
  		}
  		
    	function logout() {
    		console.log('logout');
            $state.go('access.signin');
        }

    }
})();
