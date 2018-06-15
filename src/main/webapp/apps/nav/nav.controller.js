(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavController', NavController);

    NavController.$inject = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll'
    	, '$timeout', '$window', 'Auth', '$state', 'Principal', 'ContactCommonDialogService'];

    function NavController ($scope, $localStorage, $location, $rootScope, $anchorScroll
    		, $timeout, $window, Auth, $state, Principal, ContactCommonDialogService) {
    	var vm = this;
    	vm.account = {
    			ten: "Nam"
    	}
    	
    	vm.logout = logout;

    	// Init controller
  		(function initController() {
  			console.log('NavController initController');
  		})();
  		
    	function logout() {
    		console.log('logout');
            $state.go('access.signin');
        }

    }
})();
