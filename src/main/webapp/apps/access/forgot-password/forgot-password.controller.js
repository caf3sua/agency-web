// code style: https://github.com/johnpapa/angular-styleguide 
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ForgotPasswordController', ForgotPasswordController);


    ForgotPasswordController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', 'Principal', '$window'];

    function ForgotPasswordController ($rootScope, $state, $timeout, Auth, Principal, $window) {
    		var vm = this;

        vm.authenticationError = false;
        vm.username = null;
        
        vm.isOpen = false;
        
        vm.resetPassword = resetPassword;
        
        // Init controller
  		(function initController() {
            Auth.logout();
  		})();

        $timeout(function (){angular.element('#username').focus();});

        function resetPassword () {
        	
        }
        
    }
})();
