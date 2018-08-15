(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductPrintedPaperController', ProductPrintedPaperController);

    ProductPrintedPaperController.$inject = ['$rootScope', '$scope', '$stateParams', '$controller', 'Principal', '$state'
    	, 'CommonDialogService', 'ContactCommonDialogService', 'ProductCommonService', '$ngConfirm', 'ProductPrintedPaperService', 'ContactService'
    	, 'PrintedPaperService'];

    function ProductPrintedPaperController ($rootScope, $scope, $stateParams, $controller, Principal, $state
    		, CommonDialogService, ContactCommonDialogService, ProductCommonService, $ngConfirm, ProductPrintedPaperService, ContactService
    		, PrintedPaperService) {
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
        vm.saveAnchiPolicyCart = saveAnchiPolicyCart;
        vm.saveAnchiPolicyReload = saveAnchiPolicyReload;
        vm.openSearchAnchi = openSearchAnchi;
        vm.openSearchContact = openSearchContact;
        vm.cancel = cancel;
        vm.changeDate = changeDate;
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		    
  		    console.log($stateParams.productCode);
			vm.policy.productCode = $stateParams.productCode;
			vm.policy.maSanPham = $stateParams.productCode;
			loadAnchiInfo($stateParams.anchiId);
  		    
			vm.gycbhNumber = {
				"gycbhNumber": ""
  		    };
  		    vm.gycbhNumber = $stateParams.id;
  		    if (vm.gycbhNumber != null) {
  		    	ProductPrintedPaperService.getByGycbhNumber({gycbhNumber: vm.gycbhNumber}, onSuccess, onError);
	  			
	  			function onSuccess(data) {
	  				vm.policy = data;
	  				vm.policy.productCode = data.maSanPham;
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
  		
  		function loadAnchiInfo(anchiId) {
  			if (anchiId == null || anchiId == undefined) {
  				return;
  			}
  			
  			vm.searchNew = {
				"number" : decodeURIComponent(anchiId)
  			};
  			PrintedPaperService.searchNew(vm.searchNew, onSuccess, onError);
  			
  			function onSuccess(data) {
  				if (data != null && data.length == 1) {
  					let item = data[0];
  					vm.policy.soAnchi = item.ACHI_SO_ANCHI;
  	        		vm.policy.tenAnchi = item.ACHI_TEN_ANCHI;
  				}
  			}
  			
  			function onError() {
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

  		function loadFileInEditMode() {
  			if (vm.policy.imgGcn) {
  				let gcnFile = dataURLtoFile('data:image/*;base64,' + vm.policy.imgGcn.content, 'gnc.jpg');
  	  	  		vm.gcnFileModel = gcnFile;
  			}
  	  		
  			if (vm.policy.imgGycbh) {
  				let imgGycbhFile = dataURLtoFile('data:image/*;base64,' + vm.policy.imgGycbh.content, 'gycbhFile.jpg');
  	  	  		vm.gycbhFileModel = imgGycbhFile;
  			}
  			
  			if (vm.policy.imgHd) {
  				let imgHdFile = dataURLtoFile('data:image/*;base64,' + vm.policy.imgHd.content, 'hoadon.jpg');
  	  	  		vm.hoadonFileModel = imgHdFile;
  			}
  		}
  		
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
  			$state.go('app.order');
  		}
  		
  		function changeDate(){
  			if (vm.policy.ngayHieulucTu != "" && vm.policy.ngayHieulucDen != ""){
  				if(!vm.checkDate(vm.policy.ngayHieulucTu, vm.policy.ngayHieulucDen)){
  					toastr.error("Thời gian từ ngày - đến ngày không phù hợp");
  					return false;
  				}
  				return true;
  			}
  		}
  		
  		function saveAnchiPolicyCart() {
  			if(changeDate()){
  				vm.isSaveAndNewFlag = false;
  	  			saveBase();	
  			} 
  		}
  		
  		function saveAnchiPolicyReload() {
  			if(changeDate()){
  				vm.isSaveAndNewFlag = true;
  	  			saveBase();	
  			}
  		}
  		
  		function saveBase() {
  			if (vm.form.$invalid) {
  				return;
  			}
  			console.log('saveAnchiPolicy');
  			vm.isLoading = true;
  			vm.policy.imgGcn = vm.gcnFile;
  			vm.policy.imgHd = vm.hoadonFile;
  			vm.policy.imgGycbh = vm.gycbhFile;
  			
  			if (vm.policy.agreementId != null && vm.policy.agreementId != undefined) {
  				// Edit
  				ProductCommonService.saveAnchiPolicy(vm.policy, onSuccess, onError);
      			
      			function onSuccess(data) {
      				vm.isLoading = false;
      				console.log(data);
      				showUpdateAnchiPolicy(data);
      			}
      			
      			function onError(result) {
      				vm.isLoading = false;
      				let message = result.data.message || "Lỗi khi cấp đơn ấn chỉ.";
      				toastr.error(message);
      			}
  			} else{
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
  	      			
  	      			function onError(result) {
  	      				vm.isLoading = false;
  	      				let message = result.data.message || "Lỗi khi cấp đơn ấn chỉ.";
  	      				toastr.error(message);
  	      			}
  	            }).catch(function(data, status) {
  	    			toastr.error("Lỗi khi lấy số GYCBH");
  			    });
  			}
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
  		
  		function showUpdateAnchiPolicy(data) {
        	var message = "Cập nhật đơn Ấn chỉ <strong>" + data.gycbhNumber + "</strong> thành công";
        	
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
