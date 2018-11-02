(function() {
    'use strict';

    angular
        .module('app')
        .controller('CommunicationController', CommunicationController);

    CommunicationController.$inject = ['$scope', '$stateParams', '$controller', 'Principal', '$state', '$rootScope'
    	, 'ContactCommonDialogService', 'ProductCommonService', '$ngConfirm', 'CommunicationService', 'ContactService', 'DateUtils'];

    function CommunicationController ($scope, $stateParams, $controller, Principal, $state, $rootScope
    		, ContactCommonDialogService, ProductCommonService, $ngConfirm, CommunicationService, ContactService, DateUtils) {
        var vm = this;

        vm.policy = {
    		  "title": "",
    		  "imgGycbhContents": null,
    		  "sendEmail": "",
    		  "conversationContent": ""
        };
		 vm.gycbhFiles = [];
		 vm.gycbhFileModel = [];
		 vm.isLoading = false;
		 
        // Properties & function declare
		vm.validator = validator;
        vm.saveCommunication = saveCommunication;
        vm.cancel = cancel;
        
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
		    
		    // Edit
		    if (vm.gycbhNumber != null) {
		    	CommunicationService.getByGycbhNumber({gycbhNumber: vm.gycbhNumber}, onSuccess, onError);
	  			
	  			function onSuccess(data) {
	  				vm.policy = data;
	  				vm.policy.maSanPham = data.maSanPham;
	  				
	  				// Load file
	  				loadFileInEditMode();
	  				
	  				ContactService.getByCode({contactCode : data.contactCode} , onGetContactSuccess, onGetContactError);
	  				function onGetContactSuccess(result) {
	  					vm.policy.contactName = result.contactName;
	  					vm.policy.dateOfBirth = result.dateOfBirth;
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
  			console.log('loadFileInEditMode');
  			if (vm.policy.imgGycbhContents) {
  	  	  		var files = vm.policy.imgGycbhContents;
				angular.forEach(files, function(file, key) {
					let docFile = dataURLtoFile('data:image/*;base64,' + file.content, 'gycbhFile'+key+'.jpg');
					vm.gycbhFileModel.push(docFile);
			 	});
				console.log(vm.gycbhFileModel);
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
  			if (vm.gycbhFileModel != undefined && vm.gycbhFileModel != null && vm.gycbhFileModel && vm.gycbhFileModel.length > 0) {
  				vm.gycbhFiles = [];
  				var files = vm.gycbhFileModel;
  				
  				angular.forEach(files, function(file) {
  					var fileReader = new FileReader();
  					fileReader.readAsDataURL(file);
  	            	fileReader.onload = function (e) {
  	            		var dataUrl = e.target.result;
  	            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
  	            	  	let gycbhFiles = {
  	              			"content": base64Data,
  	              		    "fileType": file.type,
  	              		    "filename": file.name
  	              		};
  	            	  	vm.gycbhFiles.push(gycbhFiles);
  	            	};
  			 	});
  				console.log(vm.gycbhFiles);
  			} else {
  				vm.gycbhFiles = [];
  			}
  		}, true);
  		
  		// Function
  		function cancel() {
  			$state.go("app.order");
  		}
  		
  		function saveCommunication(type) {
  			if (validator()){
  			
  			if (vm.form.$invalid) {
  				return;
  			}
  			
        	if (type == "0"){
        		vm.policy.statusPolicy = "80"; // dang soan
	    	} else {
	    		vm.policy.statusPolicy = "93"; // gửi BV giám định
	    	}
  			
  			vm.isLoading = true;
  			console.log('saveCommunication');
  			vm.policy.imgDocumentContents = vm.documentFiles;
  			vm.policy.imgGycbhContents = vm.gycbhFiles;
  			vm.policy.imgKhaisinhContents = vm.khaisinhFiles;
  			
  			var copyAgreement = $stateParams.copy;
  			if (copyAgreement == "true"){
  				vm.policy.agreementId = null;
  				vm.policy.gycbhNumber =  null;
  			}
  			
  			// Edit
  			if (vm.policy.agreementId != null && vm.policy.agreementId != undefined) {
  				console.log('Update ycbh offline' + JSON.stringify(vm.policy));
  				// Edit
				// Save ycbh offline
      			ProductCommonService.saveCommunication(vm.policy, onSuccess, onError);
      			
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
  	      			ProductCommonService.saveCommunication(vm.policy, onSuccess, onError);
  	      			
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
  		
  		function validator() {
        	if(vm.policy.title == "") {
        		toastr.error("Cấn tiêu đề");
        		angular.element('#title').focus();
        		return false;
        	}
        	if(vm.gycbhFiles.length == 0) {
        		toastr.error("Cấn nhập giấy yêu cầu bảo hiểm");
        		angular.element('#upload-1').focus();
        		return false;
        	}
        	
        	return true;
        };
  		
    }
})();
