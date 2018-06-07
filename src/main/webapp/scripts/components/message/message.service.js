(function() {
    'use strict';

    angular
        .module('app')
	    .factory('MessageService', MessageService);
	
    MessageService.$inject = ['$rootScope'];

    function MessageService ($rootScope, $uibModal) {
        var service = {
    		showSuccessMessage: showSuccessMessage,
    		showErrorMessage: showErrorMessage
        };

        return service;

        
        
        function showSuccessMessage (content) {
        	toastr.success('Thành công!', content);
        }
        
        function showErrorMessage () {
            
        }
    }

})();


