(function() {
    'use strict';

    angular
        .module('app')
        .directive('bvFileupload', bvFileupload);
    
    function bvFileupload () {
        var directive = {
            restrict: 'E',
//            replace: true,
            require:  '^form',
            scope: {
            	inputId: '@',
            	placeHolder: '@',
            	label: '@',
//            	funcUploadCallback: '&',
            	isRequired: '=',
            	fileModel: '='
            },
            templateUrl : 'views/theme/components/partial.fileupload.section.html',
            link: function(scope, elem, attr) {
            	scope.error = elem.find('input').controller('ngModel').$error;
//            	scope.callback = function($file, $invalidFiles) {
//            		debugger
//                    scope.funcUploadCallback($file, $invalidFiles);
//            	} 
            }
        };

        return directive;
    }

})();
