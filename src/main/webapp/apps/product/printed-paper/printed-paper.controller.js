(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductPrintedPaperController', ProductPrintedPaperController);

    ProductPrintedPaperController.$inject = ['$rootScope', '$scope', '$stateParams', '$controller', 'Principal', '$state'
    	, 'CommonDialogService', 'ContactCommonDialogService', 'ProductCommonService', '$ngConfirm', 'PrintedPaperService', 'ContactService'];

    function ProductPrintedPaperController ($rootScope, $scope, $stateParams, $controller, Principal, $state
    		, CommonDialogService, ContactCommonDialogService, ProductCommonService, $ngConfirm, PrintedPaperService, ContactService) {
        var vm = this;

        vm.isSaveAndNewFlag = false;
        vm.policy = {
        		  "gycbhNumber": "",
        		  "contactCode": "",
        		  "imgGcn": null,
        		  "imgGycbh": null,
        		  "imgHd": null,
        		  "maSanPham": "",
        		  "ngayCap": "",
        		  "ngayHieulucDen": "",
        		  "ngayHieulucTu": "",
        		  "phiBaoHiem": "",
        		  "soAnchi": "",
        		  "tenAnchi": "",
        		  "tinhTrangCap": "TTCM",
        		  "tongTienTT": ""
        };
        
        vm.gycbhFile = null;
        vm.hoadonFile = null;
        vm.gcnFile = null;
        
        vm.gycbhFileModel;
        vm.hoadonFileModel;
        vm.gcnFileModel;
        
        
        vm.isLoading = false;
        // Properties & function declare
        vm.saveAnchiPolicy = saveAnchiPolicy;
        vm.openSearchAnchi = openSearchAnchi;
        vm.openSearchContact = openSearchContact;
        vm.cancel = cancel;
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		    
  		    console.log($stateParams.productCode);
//			vm.policy.productCode = $stateParams.productCode;
//			vm.policy.maSanPham = $stateParams.productCode;
			
  		    
			vm.gycbhNumber = {
	  		    	  "gycbhNumber": ""
  		    };
  		    vm.gycbhNumber = $stateParams.id;
  		    if (vm.gycbhNumber != null) {
  		    	PrintedPaperService.getByGycbhNumber({gycbhNumber: vm.gycbhNumber}, onSuccess, onError);
	  			
	  			function onSuccess(data) {
	  				vm.policy = data;
	  				vm.policy.productCode = data.maSanPham;
	  				vm.policy.maSanPham = data.maSanPham;
	  				
	  				vm.gcnFile = {
              			"content": vm.policy.imgGcn.content,
              		    "fileType": "",
              		    "filename": ""
              		};
	  				
	  				ContactService.getByCode({contactCode : data.contactCode} , onGetContactSuccess, onGetContactError);
	  				function onGetContactSuccess(result) {
	  					vm.policy.contactName = result.contactName;
	  	  			}
	  				
	  				function onGetContactError() {
	  	  			}
	  				
	  				toastr.success('Tải thông tin chi tiết hợp đồng');
	  			}
	  			
	  			function onError() {
	  			}
  		    }
  		})();
  		
  		// watch
  		$scope.$watch('vm.gcnFileModel', function () {
  			if (vm.gcnFileModel != undefined && vm.gcnFileModel != null && vm.gcnFileModel) {
  				var file = vm.gcnFileModel;
            	var fileReader = new FileReader();
            	fileReader.readAsDataURL(file);
            	fileReader.onload = function (e) {
            		var dataUrl = e.target.result;
            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
            	  	vm.gcnFile = {
              			"content": base64Data,
              		    "fileType": file.type,
              		    "filename": file.name
              		};
            	};
  			} else {
  				vm.gcnFile = null;
  			}
  		});
  		
  		$scope.$watch('vm.hoadonFileModel', function () {
  			if (vm.hoadonFileModel != undefined && vm.hoadonFileModel != null && vm.hoadonFileModel) {
  				var file = vm.hoadonFileModel;
            	var fileReader = new FileReader();
            	fileReader.readAsDataURL(file);
            	fileReader.onload = function (e) {
            		var dataUrl = e.target.result;
            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
            	  	vm.hoadonFile = {
              			"content": base64Data,
              		    "fileType": file.type,
              		    "filename": file.name
              		};
            	};
  			} else {
  				vm.hoadonFile = null;
  			}
  		});
  		
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
  		
  		$scope.$on('selectedAnchiChange', function() {
        	if ($rootScope.selectedAnchi != undefined && $rootScope.selectedAnchi != null) {
        		console.log($rootScope.selectedAnchi);
        		vm.policy.soAnchi = $rootScope.selectedAnchi.ACHI_SO_ANCHI;
        		vm.policy.tenAnchi = $rootScope.selectedAnchi.ACHI_TEN_ANCHI;
        	}
        });
  		
  		$scope.$on('selectedContactChange', function() {
        	if ($rootScope.selectedContact != undefined && $rootScope.selectedContact != null) {
        		vm.policy.contactCode = $rootScope.selectedContact.contactCode;
        		vm.policy.contactName = $rootScope.selectedContact.contactName;
        	}
        });
  		
  		// Function
  		function openSearchAnchi() {
  			console.log('openSearchAnchi');
  			CommonDialogService.openSearchAnchiDialog();
  		}
  		
  		function openSearchContact() {
        	console.log('openSearchContact');
        	ContactCommonDialogService.openSearchDialog();
        }
  		
  		function cancel() {
  			$state.go("app.order");
  		}
  		
  		function saveAnchiPolicy() {
  			console.log('saveAnchiPolicy');
  			vm.isLoading = true;
  			console.log('saveAnchiPolicy');
  			vm.policy.imgGcn = vm.gcnFile;
  			vm.policy.imgHd = vm.hoadonFile;
  			vm.policy.imgGycbh = vm.gycbhFile;
  			
  			ProductCommonService.getPolicyNumber({lineId: vm.policy.maSanPham}).$promise.then(function(result) {
            	console.log('Done get gychbhNumber: ' + result.policyNumber);
            	// Add ychbhNumber
            	vm.policy.gycbhNumber  = result.policyNumber;

            	// Save ycbh offline
      			ProductCommonService.saveAnchiPolicy(vm.policy, onSuccess, onError);
      			
      			function onSuccess(data) {
      				vm.isLoading = false;
      				console.log(data);
      				showSaveAnchiPolicy(data);
      			}
      			
      			function onError(data) {
      				vm.isLoading = false;
      				toastr.error("Lỗi khi cấp đơn ấn chỉ.");
      			}
            }).catch(function(data, status) {
    			console.log('Error get gychbhNumber');
    			toastr.error("Lỗi khi lấy số GYCBH");
		    });
  		}
  		
  		function gotoAfterSave() {
  			if (vm.isSaveAndNewFlag == true) {
  				// reload
  				$state.reload();
  			} else {
  				$state.go('app.cart');
  			}
  		}
  		
  		function showSaveAnchiPolicy(data) {
        	var message = "Cấp đơn Ấn chỉ <strong>" + data.gycbhNumber + "</strong> thành công";
        	
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
                        	gotoAfterSave();
	                    }
                    }
                },
            });
        }
    }
})();
