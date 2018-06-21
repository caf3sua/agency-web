(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavController', NavController);

    NavController.$inject = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll'
    	, '$timeout', '$window', 'Auth', '$state', 'Principal', 'ContactCommonDialogService', 'ReminderService', 'CONSTANT_REMINDER_RANGER_DATE'
    	, 'NavCommonService'];

    function NavController ($scope, $localStorage, $location, $rootScope, $anchorScroll
    		, $timeout, $window, Auth, $state, Principal, ContactCommonDialogService, ReminderService, CONSTANT_REMINDER_RANGER_DATE
    		, NavCommonService) {
    	var vm = this;
    	vm.countReminder = 0;
    	vm.processing = true;
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
    	vm.premium;
    	vm.urlCreatePolicy;
    	
    	// Product
    	vm.kcare = {
    		"gioiTinh": "1",
    		"ngayBatDau": "",
    		"ngaySinh": "",
    		"premiumDiscount": 0,
    		"premiumKCare": 0,
    		"premiumNet": 0,
    		"typeOfKcare": ""
    	};
    	
    	// Function declare
    	vm.logout = logout;
    	vm.calculatePremium = calculatePremium;

    	// Init controller
  		(function initController() {
  			console.log('NavController initController');
  			countReminder();
  		})();
  		
  		function calculatePremium() {
  			vm.isCanPremium = false;
  			vm.urlCreatePolicy = "";
  			switch(vm.selProduct){
	  	        case "KCARE":
	  	            console.log('calculate premium KCARE');
	  	            NavCommonService.getKcarePremium(vm.kcare, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.premiumKCare;
		  	            	vm.urlCreatePolicy = "product.kcare";
	  	            	}, function () {
	  	            	});
	  	            break;
	  	        case "KCARE":
	  	            console.log('calculate premium KCARE');
	  	            
	  	            break;
	  	        default: 
	  	            console.log('default');
	  	        break;
	  	    }
  		}
  		
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
