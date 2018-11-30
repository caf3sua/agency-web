(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactController', ContactController);


	ContactController.$inject = ['$rootScope', '$scope', '$stateParams', '$http', '$filter', 'ContactService'
		, 'ContactCommonDialogService', 'PAGINATION_CONSTANTS', '$ngConfirm', 'ReminderService', '$controller'];
	function ContactController($rootScope, $scope, $stateParams, $http, $filter, ContactService
		, ContactCommonDialogService, PAGINATION_CONSTANTS, $ngConfirm, ReminderService, $controller) {
    	var vm = this;
    	vm.contacts = [];
    	vm.selectedContact = null;
    	vm.groupType = 'POTENTIAL';
    	vm.Agreements = [];
    	vm.AgreementsInit = [];
    	
    	// paging
        vm.page = 1;
        vm.totalItems = null;
        vm.itemsPerPage = 10;
        vm.transition = transition;
        
    	// Function declare
    	vm.changeGroupType = changeGroupType;
    	vm.getAgrement = getAgrement;
    	vm.selectContact = selectContact;
    	vm.openMailDialog = openMailDialog;
		vm.confirmDeleteContact = confirmDeleteContact;
		vm.lstReminder = [];
    	vm.searchContact = searchContact;
		
		vm.searchCriterial = {
			"pageable": {
			    "page": 0,
			    "size": vm.itemsPerPage
			},
			"contactName": "",
			"email": "",
			"phone": "",
			"idNumber": "",
			"dateOfBirth": "",
			"groupType": "",
			"categoryType" : ""
    	}
		
    	angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			$controller('AgreementBaseController', { vm: vm, $scope: $scope });
  			
  			searchContact();
  		})();
  		
    	// Implement function
  		function searchContact() {
    		vm.totalItems = null;
  			vm.isLoading = true;
  			vm.contacts = [];

  			ContactService.search(vm.searchCriterial, onSearchSuccess, onSearchError);
  			function onSearchSuccess(result, headers) {
  				// Paging
  				vm.contacts = result;
  				vm.isLoading = false;
  				vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                toastr.success('Tìm thấy ' + vm.contacts.length + ' khách hàng phù hợp');
  	        }
  	        function onSearchError() {
  	        	vm.isLoading = false;
  	            toastr.error("Lỗi khi tìm kiếm khách hàng!");
  	        }
    	}
  		
  		function search(page) {
  			console.log('transition, page:' + vm.page);
  			vm.isLoading = true;
  			
  			var contact = {};
  			contact = vm.searchCriterial;
  			contact.pageable.page = vm.page - 1;
        	console.log('searchAllTransition, page: ' + contact.pageable.page);
        	
        	ContactService.search(contact, onSearchSuccess, onSearchError);
  			function onSearchSuccess(result, headers) {
  				// Paging
  				vm.contacts = result;
  				vm.isLoading = false;
  				toastr.success('Tìm thấy ' + vm.contacts.length + ' khách hàng phù hợp');
  	        }
  	        function onSearchError() {
  	        	vm.isLoading = false;
  	            toastr.error("Lỗi khi tìm kiếm khách hàng!");
  	        }
  		}
  		
  		function transition () {
    		search();
        }
  		
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
  		
  		function selectContact(contact){
  			resetSelectContact();
      		vm.selectedContact = contact;
  			vm.selectedContact.selected = true;
  			
  			// Call service to get agreement by contactcode
			  getAgrement();
			  
			  getReminderByContact();
		  };
		  
		function getReminderByContact() {
			vm.lstReminder = [];
			ReminderService.search({active: '1', contactId: vm.selectedContact.contactId}, onSuccess, onError);
			
			function onSuccess(result) {
				vm.lstReminder = result;
    		}
    		
    		function onError(result) {
    		}
		}
  		
    	function loadAll() {
    		console.log('searchContact');
    		
    		ContactService.getAll({}, onSuccess, onError);
    		
    		function onSuccess(result) {
    			vm.contacts = result;
    			changeGroupType('POTENTIAL');
    			// load state
    			loadSelectedContact()
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
    			loadAll();
    			toastr.success('Xóa khách hàng thành công!');
    		}
    		
    		function onError() {
    			toastr.error('Xóa khách hàng lỗi!');
    		}
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


