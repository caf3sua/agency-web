// code style: https://github.com/johnpapa/angular-styleguide 
(function() {
    'use strict';

    angular
        .module('app')
        .controller('SigninController', SigninController);


    SigninController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', 'Principal', '$window'];

    function SigninController ($rootScope, $state, $timeout, Auth, Principal, $window) {
    		var vm = this;

        vm.authenticationError = false;
        vm.cancel = cancel;
        vm.credentials = {};
        vm.login = login;
        vm.logout = logout;
        vm.password = null;
        vm.rememberMe = true;
        vm.username = null;
        
        vm.isOpen = false;
        
        // Init controller
  		(function initController() {
            Auth.logout();
            //$state.go('home');
  		})();

        $timeout(function (){angular.element('#username').focus();});

        function cancel () {
            vm.credentials = {
                username: null,
                password: null,
                rememberMe: true
            };
            vm.authenticationError = false;
        }

        function login () {
            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe
            }).then(function () {
            		$rootScope.isAuthentication = true;
                vm.authenticationError = false;
//                if ($state.current.name === 'register' || $state.current.name === 'activate' ||
//                    $state.current.name === 'finishReset' || $state.current.name === 'requestReset' ||
//                    $state.current.name === 'signin') {
//                    $state.go('/');
//                }
                $rootScope.$broadcast('authenticationSuccess');

                $state.go('app.dashboard');
                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is successful, go to stored previousState and clear previousState
//                if (Auth.getPreviousState()) {
//                    var previousState = Auth.getPreviousState();
//                    Auth.resetPreviousState();
//                    $state.go(previousState.name, previousState.params);
//                }
            }).catch(function () {
                vm.authenticationError = true;
            });
        }
        
        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }
    }
})();
