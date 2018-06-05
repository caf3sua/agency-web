(function() {
    'use strict';

    angular
        .module('app')
        .factory('ResponseValidateService', ResponseValidateService);

    ResponseValidateService.$inject = [];

    function ResponseValidateService () {
        var service = {
            validateReponse: validateReponse
        };

        return service;

        function validateReponse($scope, data) {
        	console.log($scope.myForm["numbermonth"])
        	var modelName = 'vm.product.' + data.fieldName
        	var element = angular.element('[ng-model="' + modelName + '"]');
        	
        	var elementName = "[name='" + data.fieldName + "']";
        	$('<label class="control-label has-error validationMessage">This field is invalid!</label>').insertAfter(elementName);
        }
    }
})();
