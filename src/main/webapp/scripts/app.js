/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
(function() {
    'use strict';
    angular
      .module('app', [
          // Core module
          'tmh.dynamicLocale',
          'pascalprecht.translate',
          'ngCookies',
          'ngAria',
          'ngCacheBuster',
          'ui.bootstrap',
//          'ui.bootstrap.datetimepicker',
          'infinite-scroll',
          'angular-loading-bar',
          // Theme
		 'ngAnimate',
		 'ngResource',
		 'ngSanitize',
		 'ngTouch',
		 'ngStorage',
		 'ngStore',
		 'ui.router',
		 'ui.utils',
		 'ui.load',
		 'ui.jp',
		 'oc.lazyLoad',
		 'highcharts-ng',
		 'ngScrollbars', 
		 'toastr',
		 'smart-table',
		 'disableAll',
         'angularValidator'
      ])
      .run(run)
      .run(stateChange);
    
    run.$inject = ['stateHandler', 'translationHandler'];

    function run(stateHandler, translationHandler) {
        stateHandler.initialize();
        translationHandler.initialize();
    }
    
    // Check state change
    stateChange.$inject = ['$rootScope', '$state', '$stateParams', 'Principal'];

    function stateChange($rootScope, $state, $stateParams, Principal) {
    	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    		console.log('stateChange:' + toState.name);

    		var blackList = ['access.signin', 'access.forgot-password'];
    		// black list
    		if (blackList.indexOf(toState.name) != -1) {
    			return;
    		}
    		
    		Principal.identity().then(function(account) {
                if (Principal.isAuthenticated() == false) {
                	console.log('not authenticated');
                	event.preventDefault();
        			$state.go('access.signin');
        			return;
                }
            });
    	});
    }
    
})();
