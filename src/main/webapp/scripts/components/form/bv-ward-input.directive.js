(function() {
    'use strict';

    var bvWardInput = {
		templateUrl : 'views/theme/components/partial.autocomplete-ward.section.html',
        controller: bvWardInputController,
        bindings: {
            label: '@', // Pass string
            isRequired: '<', // binding one way
            placeholder: '@',
            connectionModel: '='
        }
    };

    angular
        .module('app')
        .component('bvWardInput', bvWardInput);

    bvWardInputController.$inject = ['$scope', '$http'];

    function bvWardInputController($scope, $http) {
        var vm = this;
        vm.lstAddress = [];
        vm.connectionModel;
        
        // funcion
        vm.onChange = onChange;
        
        $scope.$on('$destroy', function () {
        	vm.lstAddress = [];
        });
        
        // Init function
        init();
        
        function init() {
        	console.log(vm.connectionModel);
        	$http.get('api/agency/common/getAddress').then(function(result) {
            	vm.lstAddress = result.data;
        		console.log(scope.lstAddress);
            });
        }
        
        function onChange(item) {
        	console.log(item);
        }
    }
})();


//(function() {
//    'use strict';
//
//    angular
//        .module('app')
//        .directive('bvWardInput', bvWardInput);
//    
//    bvWardInput.$inject = ['$http'];
//    function bvWardInput ($http) {
//        var directive = {
//            restrict: 'E',
////            replace: true,
//            require:  '?ngModel',
//            scope: {
////            	inputId: '@',
////            	placeHolder: '@',
////            	label: '@',
//            	isRequired: '=',
//            	options: '='
//            },
//            templateUrl : 'views/theme/components/partial.autocomplete-ward.section.html',
//            link: function(scope, element, attrs, ngModel) {
//            	// Init
//            	init();
//            	
//            	if (!ngModel) return;
//                
//                scope.onChange = function(selectedItem) {
//                	ngModel.$setViewValue(selectedItem.pkDistrict);
//                };
//                
//                ngModel.$render = function(){
//                  scope.value = ngModel.$modelValue;
//                };
//                
//                function init() {
//                	console.log(" ===> Called on View Load ") ;
//                	$http.get('api/agency/common/getAddress').then(function(result) {
//                        scope.lstAddress = result.data;
//                		console.log(scope.lstAddress);
//                    });
//                }
//            }
//        };
//
//        return directive;
//    }
//
//})();
