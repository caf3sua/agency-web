(function() {
    'use strict';

    angular
        .module('app')
        .factory('ResponseValidateService', ResponseValidateService);

    ResponseValidateService.$inject = [];

    function ResponseValidateService () {
        var service = {
            validateResponse: validateResponse,
            cleanResponseError: cleanResponseError,
            cleanAllResponseError: cleanAllResponseError
        };

        return service;
        
        function cleanAllResponseError() {
        	$("label").removeClass("has-error");
        	$('.validationMessage').remove();
        }
        
        function cleanResponseError(fieldName) {
        	var modelName = 'vm.policy.' + fieldName;
        	var element = angular.element('[ng-model="' + modelName + '"]');
        	
        	// Remove old validation message
        	element.parent().children('.control-label.has-error.validationMessage').remove();
        	element.parent().removeClass('has-error');
        }

        function validateResponse(data) {
        	var modelName = 'vm.policy.' + data.fieldName;
        	var element = angular.element('[ng-model="' + modelName + '"]');

        	// Remove old validation message
        	element.parent().children('.control-label.has-error.validationMessage').remove();
        	element.parent().removeClass('has-error');
        	$('#response-error-id').remove();
        	
        	// Build and append new message
        	element.parent().addClass('has-error');
        	element.addClass('data-invalid');
        	var elementName = "[name='" + data.fieldName + "']";
        	var message = data.message;
        	if(!message) {
                message = "Dữ liệu không hợp lệ!";
            }
        	
        	// tip-trick
        	if ($(elementName).length > 1) {
        		$(elementName).append("<label id='response-error-id' class='control-label has-error validationMessage'>" + message + "</label>");
        	} else {
        		$("<label id='response-error-id' class='control-label has-error validationMessage'>" + message + "</label>").insertAfter(elementName);
        	}

        	return data.message;
        }
        
        function appendErrorMessage(data) {
        	cleanAllResponseError();
        	$("label").removeClass("has-error");
        	
        	// Build and append new message
//        	element.parent().addClass('has-error');
//        	element.addClass('data-invalid');
        	var elementName = "[name='" + data.fieldName + "']";
        	var message = data.message;
        	if(!message) {
                message = "Dữ liệu không hợp lệ!";
            }
        	
        	// tip-trick
        	if ($(elementName).length > 1) {
        		$(elementName).append("<label id='response-error-id' class='control-label has-error validationMessage'>" + message + "</label>");
        	} else {
        		$("<label id='response-error-id' class='control-label has-error validationMessage'>" + message + "</label>").insertAfter(elementName);
        	}
        }
    }
})();
