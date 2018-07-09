(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];

    function stateConfig($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
        $stateProvider
	        .state('app.contact', {
	            url: '/contact',
	            templateUrl: 'apps/contact/contact.html',
	            data : { title: 'CONTACT' },
	            controller: "ContactController",
	            controllerAs: 'vm',
	            resolve: {
	            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
	        				$translatePartialLoader.addPart('global');
	        				return $translate.refresh();
	            		}],
	            		loadPlugin: function ($ocLazyLoad) {
		            		return $ocLazyLoad.load(['apps/contact/contact.controller.js', 'apps/contact/contact-mail-dialog.controller.js']);
			        }
	            }
	        })
	        .state('app.contact-new', {
	            url: '/contact-new',
	            templateUrl: 'apps/contact/contact-new.html',
	            data : { title: 'CONTACT_NEW' },
	            controller: "ContactNewController",
	            controllerAs: 'vm',
	            resolve: {
	            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
	        				$translatePartialLoader.addPart('global');
	        				return $translate.refresh();
	            		}],
	            		loadPlugin: function ($ocLazyLoad) {
		            		return $ocLazyLoad.load(['apps/contact/contact-search-dialog.controller.js', 'apps/contact/contact-new.controller.js']);
			        }
	            }
	        })
	        .state('app.contact-edit', {
	            url: '/contact-edit/{id}',
	            templateUrl: 'apps/contact/contact-new.html',
	            data : { title: 'CONTACT_EDIT' },
	            controller: "ContactEditController",
	            controllerAs: 'vm',
	            resolve: {
	            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
	        				$translatePartialLoader.addPart('global');
	        				return $translate.refresh();
	            		}],
	            		entity: ['$stateParams', 'ContactService', function($stateParams, ContactService) {
	                        return ContactService.get({id : $stateParams.id}).$promise;
	                    }],
	            		loadPlugin: function ($ocLazyLoad) {
		            		return $ocLazyLoad.load(['apps/contact/contact-search-dialog.controller.js', 'apps/contact/contact-edit.controller.js']);
			        }
	            }
	        });
    }
})();
