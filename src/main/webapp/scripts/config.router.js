/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
(function() {
    'use strict';
    angular
      .module('app')
      .run(runBlock)
      .config(function (ScrollBarsProvider) {
			ScrollBarsProvider.defaults = {
				axis: 'y' // enable 2 axis scrollbars by default
			};
	  })
      .config(config);

      runBlock.$inject = ['$rootScope', '$state', '$stateParams'];
      function runBlock($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }

      config.$inject =  ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'MODULE_CONFIG'];
      function config( $stateProvider,   $urlRouterProvider,   $locationProvider, MODULE_CONFIG ) {
        
        $urlRouterProvider
        		.otherwise('/app/dashboard');
        $stateProvider
        		.state('app', {
        			abstract: true,
        			url: '/app',
        			views: {
        				'': {
        					templateUrl: '../views/theme/layout/layout.html'
        				}
        			},
        			resolve: {
//        				authorize: ['Auth',
//	                        function (Auth) {
//	                            return Auth.authorize();
//	                        }
//	                    ],
	                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
	                        $translatePartialLoader.addPart('global');
	                        return $translate.refresh();
	                    }]
        			}
        		})
        		
            // form routers
//            .state('app.form', {
//              url: '/form',
//              template: '<div ui-view></div>'
//            })
//              .state('app.form.layout', {
//                url: '/layout',
//                templateUrl: '../views/form/form.layout.html',
//                data : { title: 'Layouts' }
//              })
//              .state('app.form.element', {
//                url: '/element',
//                templateUrl: '../views/form/form.element.html',
//                data : { title: 'Elements' }
//              })              
//              .state('app.form.validation', {
//                url: '/validation',
//                templateUrl: '../views/form/ng.validation.html',
//                data : { title: 'Validations' }
//              })
//              .state('app.form.select', {
//                url: '/select',
//                templateUrl: '../views/form/ng.select.html',
//                data : { title: 'Selects' },
//                controller: 'SelectCtrl',
//                resolve: load(['ui.select','scripts/controllers/select.js'])
//              })
//              .state('app.form.editor', {
//                url: '/editor',
//                templateUrl: '../views/form/ng.editor.html',
//                data : { title: 'Editor' },
//                controller: 'EditorCtrl',
//                resolve: load(['summernote','scripts/controllers/editor.js'])
//              })
//              .state('app.form.slider', {
//                url: '/slider',
//                templateUrl: '../views/form/ng.slider.html',
//                data : { title: 'Slider' },
//                controller: 'SliderCtrl',
//                resolve: load(['vr.directives.slider','scripts/controllers/slider.js'])
//              })
//              .state('app.form.tree', {
//                url: '/tree',
//                templateUrl: '../views/form/ng.tree.html',
//                data : { title: 'Tree' },
//                controller: 'TreeCtrl',
//                resolve: load(['angularBootstrapNavTree','scripts/controllers/tree.js'])
//              })
//              .state('app.form.file-upload', {
//                url: '/file-upload',
//                templateUrl: '../views/form/ng.file-upload.html',
//                data : { title: 'File upload' },
//                controller: 'UploadCtrl',
//                resolve: load(['angularFileUpload', 'scripts/controllers/upload.js'])
//              })
//              .state('app.form.image-crop', {
//                url: '/image-crop',
//                templateUrl: '../views/form/ng.image-crop.html',
//                data : { title: 'Image Crop' },
//                controller: 'ImgCropCtrl',
//                resolve: load(['ngImgCrop','scripts/controllers/imgcrop.js'])
//              })
//              .state('app.form.editable', {
//                url: '/editable',
//                templateUrl: '../views/form/ng.xeditable.html',
//                data : { title: 'Xeditable' },
//                controller: 'XeditableCtrl',
//                resolve: load(['xeditable','scripts/controllers/xeditable.js'])
//              })

//          .state('app.page', {
//            url: '/page',
//            template: '<div ui-view></div>'
//          })
//            .state('app.page.profile', {
//              url: '/profile',
//              templateUrl: '../views/page/profile.html',
//              data : { title: 'Profile' }
//            })
//            .state('app.page.setting', {
//              url: '/setting',
//              templateUrl: '../views/page/setting.html',
//              data : { title: 'Setting' }
//            })
//            .state('app.page.search', {
//              url: '/search',
//              templateUrl: '../views/page/search.html',
//              data : { title: 'Search' }
//            })
//            .state('app.page.faq', {
//              url: '/faq',
//              templateUrl: '../views/page/faq.html',
//              data : { title: 'FAQ' }
//            })
//            .state('app.page.gallery', {
//              url: '/gallery',
//              templateUrl: '../views/page/gallery.html',
//              data : { title: 'Gallery' }
//            })
//            .state('app.page.invoice', {
//              url: '/invoice',
//              templateUrl: '../views/page/invoice.html',
//              data : { title: 'Invoice' }
//            })
//            .state('app.page.price', {
//              url: '/price',
//              templateUrl: '../views/page/price.html',
//              data : { title: 'Price' }
//            })
//            .state('app.page.blank', {
//              url: '/blank',
//              templateUrl: '../views/page/blank.html',
//              data : { title: 'Blank' }
//            })
//            .state('app.docs', {
//              url: '/docs',
//              templateUrl: '../views/page/docs.html',
//              data : { title: 'Documents' }
//            })
            .state('404', {
              url: '/404',
              templateUrl: '../views/misc/404.html'
            })
            .state('403', {
              url: '/403',
              templateUrl: '../views/misc/403.html'
            })
            .state('503', {
              url: '/503',
              templateUrl: '../views/misc/503.html'
            })
            .state('505', {
              url: '/505',
              templateUrl: '../views/misc/505.html'
            })
            	
        		//$locationProvider.html5Mode(true); //activate HTML5 Mode
          ;

        function load(srcs, callback) {
          return {
              deps: ['$ocLazyLoad', '$q',
                function( $ocLazyLoad, $q ){
                  var deferred = $q.defer();
                  var promise  = false;
                  srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                  if(!promise){
                    promise = deferred.promise;
                  }
                  angular.forEach(srcs, function(src) {
                    promise = promise.then( function(){
                      angular.forEach(MODULE_CONFIG, function(module) {
                        if( module.name == src){
                          src = module.module ? module.name : module.files;
                        }
                      });
                      return $ocLazyLoad.load(src);
                    } );
                  });
                  deferred.resolve();
                  return callback ? promise.then(function(){ return callback(); }) : promise;
              }]
          }
        }

        function getParams(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
      }
})();
