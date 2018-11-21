(function() {
    'use strict';

    angular
        .module('app')
        .directive('bvFileupload', bvFileupload);
    
    function bvFileupload () {
        var directive = {
            restrict: 'E',
            require:  '^form',
            scope: {
            	inputId: '@',
            	placeHolder: '@',
            	label: '@',
            	multiple : '=',
            	keepMode : '=',
            	isRequired: '=',
            	fileModel: '='
            },
            templateUrl : 'views/theme/components/partial.fileupload.section.html',
            link: function(scope, elem, attr) {
            	scope.error = elem.find('input').controller('ngModel').$error;

            	scope.$watch("fileModel", function() {
                    console.log("Changed");
                    printFilename();
                 }, true);
            	
            	scope.remove = function(f) {
            		let index = scope.fileModel.indexOf(f);
            		scope.fileModel.splice(index, 1);
            		console.log(scope.fileModel);
            		printFilename();
            	}
            	
            	scope.removeInvalid = function(f) {
            		let index = scope.invalidFiles.indexOf(f);
            		scope.invalidFiles.splice(index, 1);
            	}
            	
            	function printFilename() {
            		if (scope.fileModel != undefined && scope.fileModel.length > 0) {
            			console.log(scope.fileModel);
            			let filenames = [];
            			angular.forEach(scope.fileModel, function(value, key) {
            				console.log(value);
            				filenames.push(value.name);
            				
            				if (isImageType(value)) {
            					value.isImage = true;
            				} else {
            					value.isImage = false;	
            				}
          			 	});
            			
            			scope.fileNameInput = filenames.join(", ");
            		} else {
            			scope.fileNameInput = "";
            			
            			if (isImageType(scope.fileModel)) {
            				scope.fileModel.isImage = true;
        				} else {
        					scope.fileModel.isImage = false;	
        				}
            		}
            	}
            	
            	function isImageType(f) {
            		if (f.type.indexOf('image/') != -1) {
            			return true;
            		}
            		
            		return false;
            	}
            	
            }
        };

        return directive;
    }

})();
