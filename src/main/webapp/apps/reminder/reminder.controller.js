(function() {
    'use strict';
    angular
        .module('app')
        .controller('ReminderController', ReminderController);


    ReminderController.$inject = ['$scope', '$http', '$filter', 'ReminderService'];
    function ReminderController($scope, $http, $filter, ReminderService) {
    	var vm = this;
    	
    	vm.reminders = [];
    	vm.remindersInit = [];
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			loadAll();
  		})();
  		
  		// Properties & function declare
  		
  		// Function
  		vm.deleteReminder = deleteReminder;
  		
  		function loadAll() {
//  			vm.reminders = [
//  				// More contactName, groupType 
//  				{
//  		    	    "active": "string",
//  		    	    "contactId": "string",
//  		    	    "content": "Sắp mua ô tô",
//  		    	    "createdDate": "dd/MM/yyyy",
//  		    	    "id": "string",
//  		    	    "note": "Sắp mua ô tô",
//  		    	    "productCode": "string",
//  		    	    "remindeDate": "15/07/2018",
//  		    	    "type": "Mã khách hàng"
//  		    	}
//  			];
  			console.log('searchReminder');
    		
  			ReminderService.getAll({}, onSuccess, onError);
    		
    		function onSuccess(result) {
    			vm.reminders = result;
    		}
    		
    		function onError(result) {
    			
    		}
  		}
  		
  		function deleteReminder(id) {
  			console.log('deleteReminder');
  			
  			ReminderService.delete({id: id}, onDeleteSuccess, onDeleteError);
  			
  			function onDeleteSuccess(data) {
  				toastr.success('Successful!');
  				loadAll();
            }
            function onDeleteError(error) {
                vm.validateResponse(error, 'deleteReminder');
            }
  		}
  		
    }
})();

