(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductYcbhOfflineController', ProductYcbhOfflineController);

    ProductYcbhOfflineController.$inject = ['$scope', '$stateParams', '$controller', 'Principal', '$state', '$rootScope'
    	, 'ContactCommonDialogService', 'ProductCommonService', '$ngConfirm', 'ProductYcbhOfflineService', 'ContactService'];

    function ProductYcbhOfflineController ($scope, $stateParams, $controller, Principal, $state, $rootScope
    		, ContactCommonDialogService, ProductCommonService, $ngConfirm, ProductYcbhOfflineService, ContactService) {
        var vm = this;

        vm.policy = {
    		  "gycbhNumber": "",
    		  "contactCode": "",
    		  "documentContent": null,
    		  "gycbhContent": null,
    		  "anchiContent": null,
    		  "imgGiamdinhContent": null,
    		  "maSanPham": "",
    		  "totalPremium": ""
        };
		 vm.gycbhFile = null;
		 vm.documentFile = null;
		 vm.anchiFile = null;
		 vm.imgGiamdinhFile = null;
        
		 vm.gycbhFileModel;
		 vm.documentFileModel;
		 vm.anchiFileModel;
		 vm.imgGiamdinhFileModel;
		 
		 vm.isLoading = false;
		 
        // Properties & function declare
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
  			
  			vm.gycbhNumber = {
	  		    	  "gycbhNumber": ""
		    };
		    vm.gycbhNumber = $stateParams.id;
		    if (vm.gycbhNumber != null) {
		    	ProductYcbhOfflineService.getByGycbhNumber({gycbhNumber: vm.gycbhNumber}, onSuccess, onError);
	  			
	  			function onSuccess(data) {
	  				vm.policy = data;
	  				vm.policy.maSanPham = data.maSanPham;
	  				
	  				// Load file
	  				loadFileInEditMode();
	  				
	  				ContactService.getByCode({contactCode : data.contactCode} , onGetContactSuccess, onGetContactError);
	  				function onGetContactSuccess(result) {
	  					vm.policy.contactName = result.contactName;
	  	  			}
	  				
	  				function onGetContactError() {
	  	  			}
	  				
	  				toastr.success('Tải thông tin chi tiết hợp đồng thành công');
	  			}
	  			
	  			function onError() {
	  			}
		    }
  		})();
  		
  		function loadFileInEditMode() {
  			if (vm.policy.documentContent) {
  				let docFile = dataURLtoFile('data:image/*;base64,' + vm.policy.documentContent.content, 'document.jpg');
  				vm.documentFileModel = docFile;
  			}
  	  		
  			if (vm.policy.gycbhContent) {
  				let imgGycbhFile = dataURLtoFile('data:image/*;base64,' + vm.policy.gycbhContent.content, 'gycbhFile.jpg');
  	  	  		vm.gycbhFileModel = imgGycbhFile;
  			}
  			
  			if (vm.policy.anchiContent) {
  				let anchiFile = dataURLtoFile('data:image/*;base64,' + vm.policy.anchiContent.content, 'anchi.jpg');
  				vm.anchiFileModel = anchiFile;
  			}
  			
  			if (vm.policy.imgGiamdinhContent) {
  				let imgFile = dataURLtoFile('data:image/*;base64,' + vm.policy.imgGiamdinhContent.content, 'giamdinh.jpg');
  				vm.imgGiamdinhFileModel = imgFile;
  			}
  		}
  		
  		function dataURLtoFile(dataurl, filename) {
  		    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  		        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  		    while(n--){
  		        u8arr[n] = bstr.charCodeAt(n);
  		    }
  		    return new File([u8arr], filename, {type:mime});
  		}
  		
  		// watch
  		$scope.$watch('vm.gycbhFileModel', function () {
  			if (vm.gycbhFileModel != undefined && vm.gycbhFileModel != null && vm.gycbhFileModel) {
  				var file = vm.gycbhFileModel;
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
  		});
  		
  		$scope.$watch('vm.documentFileModel', function () {
  			if (vm.documentFileModel != undefined && vm.documentFileModel != null && vm.documentFileModel) {
  				var file = vm.documentFileModel;
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
  		});
  		
  		$scope.$watch('vm.anchiFileModel', function () {
  			if (vm.anchiFileModel != undefined && vm.anchiFileModel != null && vm.anchiFileModel) {
  				var file = vm.anchiFileModel;
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
  		});
  		
  		$scope.$watch('vm.imgGiamdinhFileModel', function () {
  			if (vm.imgGiamdinhFileModel != undefined && vm.imgGiamdinhFileModel != null && vm.imgGiamdinhFileModel) {
  				var file = vm.imgGiamdinhFileModel;
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
  		});
  		
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
  			if (vm.form.$invalid) {
  				return;
  			}
  			
  			vm.isLoading = true;
  			console.log('saveYcbhOffline');
  			vm.policy.documentContent = vm.documentFile;
  			vm.policy.anchiContent = vm.anchiFile;
  			vm.policy.gycbhContent = vm.gycbhFile;
  			vm.policy.imgGiamdinhContent = vm.imgGiamdinhFile;
  			
  			// Edit
  			if (vm.policy.agreementId != null && vm.policy.agreementId != undefined) {
  				// Edit
				// Save ycbh offline
      			ProductCommonService.saveYcbhOffline(vm.policy, onSuccess, onError);
      			
      			function onSuccess(data) {
      				vm.isLoading = false;
      				console.log(data);
      				showUpdateYcbhInfo(data);
      			}
      			
      			function onError(data) {
      				vm.isLoading = false;
      				toastr.error("Lỗi khi cập nhật yêu cầu bảo hiểm offline.");
      			}
  			} else {
  				ProductCommonService.getPolicyNumber({lineId: vm.policy.maSanPham}).$promise.then(function(result) {
  	            	console.log('Done get gychbhNumber: ' + result.policyNumber);
  	            	// Add ychbhNumber
  	            	vm.policy.gycbhNumber  = result.policyNumber;

  	            	// Save ycbh offline
  	      			ProductCommonService.saveYcbhOffline(vm.policy, onSuccess, onError);
  	      			
  	      			function onSuccess(data) {
  	      				vm.isLoading = false;
  	      				console.log(data);
  	      				showSaveSaveYcbhInfo(data);
  	      			}
  	      			
  	      			function onError(data) {
  	      				vm.isLoading = false;
  	      				toastr.error("Lỗi khi tạo yêu cầu bảo hiểm offline.");
  	      			}
  	            }).catch(function(data, status) {
  	    			console.log('Error get gychbhNumber');
  	    			toastr.error("Lỗi khi lấy số GYCBH");
  			    });
  			}
  		}
  		
  		function showSaveSaveYcbhInfo(data) {
        	var message = "Hợp đồng bảo hiểm offline <strong>" + data.gycbhNumber + "</strong> đã tạo thành công";
        	
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
  		
  		function showUpdateYcbhInfo(data) {
        	var message = "Hợp đồng bảo hiểm offline <strong>" + data.gycbhNumber + "</strong> đã cập nhật thành công";
        	
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
    }
})();
