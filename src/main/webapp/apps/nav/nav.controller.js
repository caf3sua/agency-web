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
