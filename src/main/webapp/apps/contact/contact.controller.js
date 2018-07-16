(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactController', ContactController);


    ContactController.$inject = ['$scope', '$http', '$filter', 'ContactService', 'ContactCommonDialogService', 'PAGINATION_CONSTANTS'];
    function ContactController($scope, $http, $filter, ContactService, ContactCommonDialogService, PAGINATION_CONSTANTS) {
    	var vm = this;
    	vm.contacts = [];
    	vm.selectedContact = null;
    	vm.groupType = 'POTENTIAL';
    	vm.Agreements = [];
    	vm.AgreementsInit = [];
    	
    	// paging
        vm.page = 1;
        vm.totalItems = null;
        vm.itemsPerPage = 5;
        vm.transition = transition;
        
    	// Function declare
    	vm.changeGroupType = changeGroupType;
    	vm.getAgrement = getAgrement;
    	vm.selectContact = selectContact;
    	vm.openMailDialog = openMailDialog;
    	
    	angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			loadAll();
  		})();
  		
    	// Implement function
  		function openMailDialog() {
  			ContactCommonDialogService.openMailDialog();
  		}
  		
  		function changeGroupType(type) {
  			vm.groupType = type;
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
  		};
  		
    	function loadAll() {
    		console.log('searchContact');
    		
    		ContactService.getAll({}, onSuccess, onError);
    		
    		function onSuccess(result) {
    			vm.contacts = result;
    		}
    		
    		function onError(result) {
    			
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
    	
    	function transition () {
    		getAgrement();
        }
    }
})();


