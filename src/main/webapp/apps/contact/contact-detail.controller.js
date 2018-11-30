(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactDetailController', ContactDetailController);


    ContactDetailController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$filter', 'ContactService'
		, 'ContactCommonDialogService', 'PAGINATION_CONSTANTS', '$ngConfirm', 'ReminderService', '$controller', 'entity'];
	function ContactDetailController($rootScope, $scope, $state, $stateParams, $http, $filter, ContactService
		, ContactCommonDialogService, PAGINATION_CONSTANTS, $ngConfirm, ReminderService, $controller, entity) {
    	var vm = this;
    	vm.contacts = [];
    	vm.selectedContact = entity;
    	vm.groupType = 'POTENTIAL';
    	vm.Agreements = [];
    	vm.AgreementsInit = [];
    	vm.goBack = goBack;
    	
    	// paging
        vm.page = 1;
        vm.totalItems = null;
        vm.itemsPerPage = 10;
        vm.transition = transition;
        
    	// Function declare
    	vm.changeGroupType = changeGroupType;
    	vm.getAgrement = getAgrement;
    	vm.openMailDialog = openMailDialog;
		vm.confirmDeleteContact = confirmDeleteContact;
		vm.lstReminder = [];
		
    	angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			$controller('AgreementBaseController', { vm: vm, $scope: $scope });
  			
  			getAgrement();
  			getReminderByContact();
  		})();
  		
    	// Implement function
  		
  		function openMailDialog() {
  			ContactCommonDialogService.openMailDialog();
  		}
  		
  		function changeGroupType(type) {
  			vm.groupType = type;
  			$rootScope.contactGroupType = type;
  			resetSelectContact();
  		}
  		
  		function resetSelectContact() {
  			vm.selectedContact = null;
  			angular.forEach(vm.contacts, function(contact) {
  				contact.selected = false;
  				contact.editing = false;
  			});
  		}
  		
		function getReminderByContact() {
			vm.lstReminder = [];
			ReminderService.search({active: '1', contactId: vm.selectedContact.contactId}, onSuccess, onError);
			
			function onSuccess(result) {
				vm.lstReminder = result;
    		}
    		
    		function onError(result) {
    		}
		}
  		
    	function findSelectedContact(selectedId) {
    		let selContact;
    		angular.forEach(vm.contacts, function(contact) {
  				if (contact.contactId == selectedId) {
  					selContact = contact;
  				}
  			});
    		return selContact;
    	}
    	
    	function loadSelectedContact() {
    		let groupType = $stateParams.groupType;
    		let selected = $stateParams.selected;
    		if (groupType != null && groupType != undefined && selected != null && selected != undefined) {
    			changeGroupType(groupType);
    			let contact = findSelectedContact(selected);
    			selectContact(contact);
    		}
    	}
    	
    	function getAgrement() {
    		vm.Agreements = [];
    		ContactService.getAgrement({
				contactId: vm.selectedContact.contactId,
    			page: vm.page - 1,
                size: vm.itemsPerPage
            }, onGetAgrementSuccess, onGetAgrementError);
    		
    		function onGetAgrementSuccess(result, headers) {
    			vm.Agreements = result;
    			vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
            }

            function onGetAgrementError(result) {
            }
  		}
    	
    	function deleteContact(selContact) {
    		console.log(vm.selectedContact);
    		ContactService.delete({contactId: vm.selectedContact.contactId}, onSucess, onError);
    		
    		function onSucess() {
    			toastr.success('Xóa khách hàng thành công!');
    		}
    		
    		function onError() {
    			toastr.error('Xóa khách hàng lỗi!');
    		}
    	}

    	function transition () {
    		getAgrement();
        }
    	
    	function goBack() {
    		$state.go("app.contact");
    	}
    	
    	function confirmDeleteContact() {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-times',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn xóa khách hàng này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	deleteContact();
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
    }
})();


