(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductYcbhOfflineController', ProductYcbhOfflineController);

    ProductYcbhOfflineController.$inject = ['$scope', '$stateParams', '$controller', 'Principal', '$state', '$rootScope'
    	, 'ContactCommonDialogService', 'ProductCommonService'];

    function ProductYcbhOfflineController ($scope, $stateParams, $controller, Principal, $state, $rootScope
    		, ContactCommonDialogService, ProductCommonService) {
        var vm = this;

        vm.policy = {
    		  "contactCode": "",
    		  "documentContent": null,
    		  "gycbhAnchi": null,
    		  "anchiContent": null,
    		  "imgGiamdinhContent": null,
    		  "maSanPham": "",
    		  "totalPremium": null
        };
		 vm.gycbhFile = null;
		 vm.documentFile = null;
		 vm.anchiFile = null;
		 vm.imgGiamdinhFile = null;
        
		 vm.isLoading = false;
		 
        // Properties & function declare
        vm.uploadGycbh = uploadGycbh;
        vm.uploadImgGiamdinh = uploadImgGiamdinh;
        vm.uploadOtherDoc = uploadOtherDoc;
        vm.uploadAnchi = uploadAnchi;
        vm.saveYcbhOffline = saveYcbhOffline;
        vm.cancel = cancel;
        vm.openSearchContact = openSearchContact;
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  			$controller('ProductBaseController', { vm: vm, $scope: $scope });
  			
  			console.log($stateParams.productCode);
  			vm.policy.maSanPham = $stateParams.productCode;
  		})();
  		
  		$scope.$on('selectedContactChange', function() {
        	if ($rootScope.selectedContact != undefined && $rootScope.selectedContact != null) {
        		vm.policy.contactCode = $rootScope.selectedContact.contactCode;
        		vm.policy.contactName = $rootScope.selectedContact.contactName;
        	}
        });
  		
  		// Function
  		function openSearchContact() {
        	console.log('openSearchContact');
        	ContactCommonDialogService.openSearchDialog();
        }
  		
  		function cancel() {
  			$state.go("app.order");
  		}
  		
  		function saveYcbhOffline() {
  			vm.isLoading = true;
  			console.log('saveYcbhOffline');
  			vm.policy.documentContent = vm.documentFile;
  			vm.policy.anchiContent = vm.anchiFile;
  			vm.policy.gycbhContent = vm.gycbhFile;
  			vm.policy.imgGiamdinhContent = vm.imgGiamdinhFile;
  			
  			// Save ycbh offline
  			ProductCommonService.saveYcbhOffline(vm.policy, onSuccess, onError);
  			
  			function onSuccess(data) {
  				vm.isLoading = false;
  				console.log(data);
  				showSaveSaveYcbhInfo();
  			}
  			
  			function onError(data) {
  				vm.isLoading = false;
  				toastr.error("Lỗi khi tạo yêu cầu bảo hiểm offline.");
  			}
  		}
  		
  		function showSaveSaveYcbhInfo() {
        	var message = "Tạo yêu cầu bảo hiểm offline thành công";
        	
        	$ngConfirm({
                title: 'Thông báo',
                icon: 'fa fa-check',
                theme: 'modern',
                type: 'blue',
                content: '<div class="text-center">' + message + '</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đóng',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	$state.go('app.cart');
	                    }
                    }
                },
            });
        }
  		
  		function uploadGycbh(file, errFiles) {
        	// validate
            if (file) {
            	var fileReader = new FileReader();
            	fileReader.readAsDataURL(file);
            	fileReader.onload = function (e) {
            		var dataUrl = e.target.result;
            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
            	  	vm.gycbhFile = {
              			"content": base64Data,
              		    "fileType": file.type,
              		    "filename": file.name
              		};
            	};
            } else {
            	vm.gycbhFile = null;
            }
        }
  		
  		function uploadImgGiamdinh(file, errFiles) {
        	// validate
            if (file) {
            	var fileReader = new FileReader();
            	fileReader.readAsDataURL(file);
            	fileReader.onload = function (e) {
            		var dataUrl = e.target.result;
            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
            	  	vm.imgGiamdinhFile = {
                			"content": base64Data,
                		    "fileType": file.type,
                		    "filename": file.name
            		};
            	};
            } else {
            	vm.imgGiamdinhFile = null;
            }
        }
  		
  		function uploadOtherDoc(file, errFiles) {
        	// validate
            if (file) {
            	var fileReader = new FileReader();
            	fileReader.readAsDataURL(file);
            	fileReader.onload = function (e) {
            		var dataUrl = e.target.result;
            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
            	  	vm.documentFile = {
              			"content": base64Data,
              		    "fileType": file.type,
              		    "filename": file.name
          			};
            	};
            } else {
            	vm.documentFile = null;
            }
        }
  		
  		function uploadAnchi(file, errFiles) {
        	// validate
            if (file) {
            	var fileReader = new FileReader();
            	fileReader.readAsDataURL(file);
            	fileReader.onload = function (e) {
            		var dataUrl = e.target.result;
            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
            	  	vm.anchiFile = {
                			"content": base64Data,
                		    "fileType": file.type,
                		    "filename": file.name
        			};
            	};
            } else {
            	vm.anchiFile = null;
            }
        }
    }
})();
