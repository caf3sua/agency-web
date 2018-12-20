(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactSearchDialogController', ContactSearchDialogController);


    	ContactSearchDialogController.$inject = ['$rootScope', '$scope', '$state', '$http', '$filter', '$uibModalInstance'
    		, 'ContactService', '$uibModal', '$ngConfirm', 'PAGINATION_CONSTANTS', 'dialogType'];
        function ContactSearchDialogController($rootScope, $scope, $state, $http, $filter, $uibModalInstance
        		, ContactService, $uibModal, $ngConfirm, PAGINATION_CONSTANTS, dialogType) {
        	var vm = this;
        	// paging
        	vm.page = 1;
            vm.totalItems = null;
            vm.itemsPerPage = 5;
            vm.transition = transition;
            
        	vm.contactCode;
        	vm.searchContact = searchContact;
        	vm.addNewContact = addNewContact;
        	vm.selectedContact = selectedContact;
        	vm.dialogType = dialogType;
        	
        	vm.searchCriterial = {
    			"pageable": {
    			    "page": 0,
    			    "size": vm.itemsPerPage
    			},
    			"contactName": "",
    			"phone": "",
    			"idNumber": "",
    			"dateOfBirth": "",
    			"categoryType" : ""
        	}
        	vm.contacts = [];
        	vm.contactsInit = [];
        	var modalInstance = null;
        	
        	vm.contact = {
			  "contactName": "",
			  "contactSex": "1",
			  "dateOfBirth": "",
			  "email": "",
			  "groupType": "POTENTIAL",
			  "homeAddress": "",
			  "idNumber": "",
			  "listContactProduct": [],
			  "listRelationship": [],
			  "listReminders": [],
			  "occupation": "",
			  "phone": "",
			  "facebookId": ""
			};
        	
        	// Init controller
      		(function initController() {
      			if (vm.dialogType != undefined && vm.dialogType != null){
      				if (vm.dialogType == 'PERSON'){
      					vm.searchCriterial.categoryType = "PERSON";
      				} else {
      					
      				}
      			}
      			searchContact();
      		})();

      		function transition () {
            	// search
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
      	        }
      	        function onSearchError() {
      	        	vm.isLoading = false;
      	            toastr.error("Lỗi khi tìm kiếm khách hàng!");
      	        }
            }
      		
        	function selectedContact(row) {
        		console.log('selected contact:' + row);
        		$uibModalInstance.close(row);
        	}
        	
        	function searchContact() {
        		vm.totalItems = null;
  	  			vm.isLoading = true;
  	  			vm.contacts = [];
  	  			var contact = {};
  	  			contact = vm.searchCriterial;
  	  			contact.pageable.page = vm.page - 1;

  	  			ContactService.search(contact, onSearchSuccess, onSearchError);
  	  			function onSearchSuccess(result, headers) {
  	  				// Paging
  	  				vm.contacts = result;
  	  				vm.isLoading = false;
  	  				vm.totalItems = headers('X-Total-Count');
  	                vm.queryCount = vm.totalItems;
  	  	        }
  	  	        function onSearchError() {
  	  	        	vm.isLoading = false;
  	  	            toastr.error("Lỗi khi tìm kiếm khách hàng!");
  	  	        }
        	}
        	
        	function addNewContact() {
        		$uibModalInstance.dismiss('cancel');
//        		$state.go('app.contact-new');
        		if (modalInstance !== null) return;
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'apps/contact/contact-new-dialog.html',
                    controller: 'ContactNewDialogController',
                    controllerAs: 'vm',
                    size: 'lg',
                    resolve: {
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('global');
                            return $translate.refresh();
                        }],
                        loadPlugin: function ($ocLazyLoad) {
    	            		return $ocLazyLoad.load(['apps/contact/contact-new-dialog.controller.js']);
                        }
                    }
                });
        	}
        	
        	vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
})();
