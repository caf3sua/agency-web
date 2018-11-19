(function() {
    'use strict';
    angular
        .module('app')
        .controller('ReminderController', ReminderController);


    ReminderController.$inject = ['$rootScope', '$scope', '$http', '$filter', 'ReminderService'];
    function ReminderController($rootScope, $scope, $http, $filter, ReminderService) {
    	var vm = this;
    	
    	vm.reminders = [];
    	vm.remindersInit = [];
    	vm.updateReminderStatus = updateReminderStatus;
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			loadAll();
  		})();
  		
  		// Properties & function declare
  		
  		// Function
  		vm.deleteReminder = deleteReminder;
  		
  		function updateReminderStatus(reminder) {
  			ReminderService.updateStatus({reminderId: reminder.id, active: reminder.active}, onUpdateStatusSuccess, onUpdateStatusError);
  			
  			function onUpdateStatusSuccess(data) {
				  console.log('onUpdateStatusSuccess reminder');
				  $rootScope.$broadcast('reminderChangeSuccess');
            }
            function onUpdateStatusError(error) {
				let message = error.data.message || 'Lỗi khi cập nhật trạng thái thông báo';
				toastr.error(message);
            }
  		}
  		
  		function loadAll() {
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
				toastr.success('Xóa nhắc nhở thành công');
				$rootScope.$broadcast('reminderChangeSuccess');
				loadAll();
            }
            function onDeleteError(error) {
                vm.validateResponse(error, 'deleteReminder');
            }
  		}
  		
    }
})();

