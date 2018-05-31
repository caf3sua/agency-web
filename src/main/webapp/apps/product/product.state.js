// Create by: Nam, Nguyen Hoai - ITSOL.vn
(function () {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig ($stateProvider) {
	    	$stateProvider
			.state('product', {
				abstract: true,
				url: '/product',
				views: {
					'': {
						templateUrl: '../views/theme/layout/layout.html'
					}
				},
				resolve: {
//					authorize: ['Auth',
//		                function (Auth) {
//		                    return Auth.authorize();
//		                }
//		            ],
		            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
		                $translatePartialLoader.addPart('product');
		                return $translate.refresh();
		            }],
		            loadPlugin: function ($ocLazyLoad) {
		            		return $ocLazyLoad.load(['ui.bootstrap'
                                , 'scripts/components/form/relation-combo.directive.js'
		            			, 'apps/product/product-base.service.js'
		            			, 'apps/contact/contact-search-dialog.controller.js'
		            			, 'apps/contact/contact.service.js'
		            			, 'apps/product/product-base.controller.js']);
			        }
		        }
		});    
    }
})();