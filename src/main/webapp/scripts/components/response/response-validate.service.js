(function() {
    'use strict';

    angular
        .module('app')
        .factory('ResponseValidateService', ResponseValidateService);

    ResponseValidateService.$inject = [];

    function ResponseValidateService () {
        var service = {
            validateReponse: validateReponse,
            cleanResponseError: cleanResponseError
        };

        return service;
        
        function cleanResponseError(fieldName) {
        	var modelName = 'vm.product.' + fieldName;
        	var element = angular.element('[ng-model="' + modelName + '"]');
        	
        	// Remove old validation message
        	element.parent().children('.control-label.has-error.validationMessage').remove();
        	element.parent().removeClass('has-error');
        }

        function validateReponse(data) {
        	var modelName = 'vm.product.' + data.fieldName;
        	var element = angular.element('[ng-model="' + modelName + '"]');
        	
        	// Remove old validation message
        	element.parent().children('.control-label.has-error.validationMessage').remove();
        	element.parent().removeClass('has-error');
        	
        	// Build and append new message
        	element.parent().addClass('has-error');
        	var elementName = "[name='" + data.fieldName + "']";
        	$("<label class='control-label has-error validationMessage'>This field is invalid!</label>").insertAfter(elementName);
        }
    }
})();
