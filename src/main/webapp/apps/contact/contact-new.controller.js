(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactNewController', ContactNewController);


    	ContactNewController.$inject = ['$rootScope', '$scope', '$http', '$filter',
    		'ContactService', 'MessageService', '$controller', 'ContactCommonDialogService'];
        function ContactNewController($rootScope, $scope, $http, $filter
        		, ContactService, MessageService, $controller, ContactCommonDialogService) {
        	
        	var vm = this;
        	
        	// variable
        	vm.contactRelationId = "";
		    vm.contactRelationName = "";
		    vm.relationId;
        	vm.relationships = [
        		{"relationId": "30", "relationName" : "Bản thân"}, 
        		{"relationId": "31", "relationName" : "Vợ/Chồng"},
        		{"relationId": "32", "relationName" : "Con"},
        		{"relationId": "33", "relationName" : "Bố/Mẹ"},
        		{"relationId": "34", "relationName" : "Bố mẹ của vợ/chồng"},
        		{"relationId": "35", "relationName" : "Anh chị em ruột"},
        		{"relationId": "36", "relationName" : "Anh chị em ruột của vợ/chồng"},
        		{"relationId": "37", "relationName" : "Ông bà"},
        		{"relationId": "38", "relationName" : "Cháu"},
        		{"relationId": "41", "relationName" : "Giới thiệu"}
        	];
        	
        	vm.products = [
        		{"productCode": "CAR", "productName" : "Bảo hiểm ô tô"}, 
        		{"productCode": "BVP", "productName" : "Bảo hiểm An Gia"},
        		{"productCode": "KCR", "productName" : "Bảo hiểm bệnh ung thư"},
        		{"productCode": "TVC", "productName" : "Bảo hiểm du lịch quốc tế"},
        		{"productCode": "TVI", "productName" : "Bảo hiểm du lịch Việt Nam"},
        		{"productCode": "MOT", "productName" : "Bảo hiểm xe máy"},
        		{"productCode": "HOM", "productName" : "Bảo hiểm nhà tư nhân"},
        		{"productCode": "KHC", "productName" : "Bảo hiểm kết hợp con người"},
        		{"productCode": "TNC", "productName" : "Bảo hiểm tai nạn con người"},
        		{"productCode": "HHV", "productName" : "Bảo hiểm hàng hóa vận chuyển"}
        	];
        	
        	vm.selRelationship = {};
        	vm.selProduct = {};
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
      			  "occupation": "",
      			  "phone": ""
      			}
        	
        	// function
        	vm.createNewContact = createNewContact;
        	vm.addProduct = addProduct;
        	vm.addRelationship = addRelationship;
        	vm.openSearchContact = openSearchContact;
        	vm.deleteContactProduct = deleteContactProduct;
        	vm.deleteRelationship = deleteRelationship;
        	
        	
        	angular.element(document).ready(function () {
            });

        	// Init controller
      		(function initController() {
      			// instantiate base controller
      		    console.log('Init ContactNewController');
      		})();
      		
      		$scope.$on('selectedContactChange', function() {
            	if ($rootScope.selectedContact != undefined && $rootScope.selectedContact != null) {
            		console.log($rootScope.selectedContact);
            		vm.contactRelationName = $rootScope.selectedContact.contactName;
            		vm.contactRelationId = $rootScope.selectedContact.contactId;
            	}
            });
      		
      		// Implement function
      		function openSearchContact() {
            	console.log('openSearchContact');
            	ContactCommonDialogService.openSearchDialog();
            }
      		
      		function addProduct() {
      			if (vm.contact.listContactProduct.indexOf(vm.selProduct) == -1) {
      				vm.contact.listContactProduct.push(vm.selProduct);
      			}
    		}
      		
      		function deleteContactProduct(index) {
      			console.log('deleteContactProduct');
      			vm.contact.listContactProduct.splice(index, 1);
    		}
      		
      		function addRelationship() {
      			// Get relationId
      			if (vm.selRelationship != null && vm.selRelationship.relationId != null && vm.contactRelationId != ""
      				&& vm.contactRelationName != "") {
      				// Add to list
      				var relatioship = {
          			      "contactRelationId": vm.contactRelationId,
          			      "contactRelationName": vm.contactRelationName,
          			      "relationId": vm.selRelationship.relationId,
          			      "relationName": vm.selRelationship.relationName
        			};
      				vm.contact.listRelationship.push(relatioship);
      			} else {
      				toastr.error('Lỗi!', 'Dữ liệu không hợp lệ');
      			}
      			
      			// Get ContactRelationId, contactRelationName
      			vm.contactRelationId = "";
      			vm.contactRelationName = "";
      			vm.selRelationship = {};
    		}
      		
      		function deleteRelationship(index) {
      			console.log('deleteRelationship');
      			vm.contact.listRelationship.splice(index, 1);
    		}
      		
      		
        	function createNewContact() {
        		console.log('createNewContact');
        		
        		ContactService.create(vm.contact, onSuccess, onError);
        		
        		function onSuccess(result) {
        			MessageService.showSuccessMessage('Tạo khách hàng thành công');
        		}
        		
        		function onError(result) {
        			toastr.error('Error!', 'Error');
        		}
        	}
        	
        }
})();
