(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactNewController', ContactNewController);


    	ContactNewController.$inject = ['$scope', '$http', '$filter',
    		'ContactService', 'MessageService', '$controller', 'ContactCommonDialogService'];
        function ContactNewController($scope, $http, $filter
        		, ContactService, MessageService, $controller, ContactCommonDialogService) {
        	
        	var vm = this;
        	
        	// variable
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
        	vm.contactAdd = {
      			  "contactName": "Tên khách hàng",
      			  "contactSex": "1",
      			  "dateOfBirth": "24/06/1989",
      			  "email": "email@gmail.com",
      			  "groupType": "POTENTIAL",
      			  "homeAddress": "Địa chỉ",
      			  "idNumber": "CMT14141001",
      			  "listContactProduct": [],
      			  "listRelationship": [
      			    {
      			      "contactRelationId": "string",
      			      "contactRelationName": "string",
      			      "relationId": "30"
      			    }
      			  ],
      			  "occupation": "Công nghệ thông tin",
      			  "phone": "0989888999"
      			}
        	
        	// function
        	vm.createNewContact = createNewContact;
        	vm.addProduct = addProduct;
        	vm.addRelationship = addRelationship;
        	vm.openSearchContact = openSearchContact;
        	
        	angular.element(document).ready(function () {
            });

        	// Init controller
      		(function initController() {
      			// instantiate base controller
      		    console.log('Init ContactNewController');
      		})();
      		
      		// Implement function
      		function openSearchContact() {
            	console.log('openSearchContact');
            	ContactCommonDialogService.openSearchDialog();
            }
      		
      		function addProduct() {
      			if (vm.contactAdd.listContactProduct.indexOf(vm.selProduct) == -1) {
      				vm.contactAdd.listContactProduct.push(vm.selProduct);
      			}
    		}
      		
      		function addRelationship() {
      			vm.contactAdd.listRelationship.push(vm.selRelationship);
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
