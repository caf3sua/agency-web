(function() {
    'use strict';

    angular
        .module('app')
        .controller('CarUpdateController', CarUpdateController);

    CarUpdateController.$inject = ['$scope', '$stateParams', '$controller', 'Principal', '$state', '$rootScope'
    	, 'ProductCommonService', '$ngConfirm', 'CarService', 'DateUtils', '$uibModalInstance', '$window', 'API_SERVICE_URL'];

    function CarUpdateController ($scope, $stateParams, $controller, Principal, $state, $rootScope
    		, ProductCommonService, $ngConfirm, CarService, DateUtils, $uibModalInstance, $window, API_SERVICE_URL) {
        var vm = this;

        vm.phaiDauFile = null;
  		vm.phaiDauFileModel;
  		
  		vm.traiDauFile = null;
  		vm.traiDauFileModel;
  		
  		vm.phaiDuoiFile = null;
  		vm.phaiDuoiFileModel;
  		
  		vm.traiDuoiFile = null;
  		vm.traiDuoiFileModel;
  		
  		vm.dangKiemFile = null;
  		vm.dangKiemFileModel;
  		
        // Properties & function declare
		vm.validator = validator;
        vm.cancel = cancel;
        vm.updateImage = updateImage;
        
        vm.udImage = {
  				"gycbhNumber": "",
	  	        "imgPDau": {
		            "attachmentId": "",
		            "content": "",
		            "fileType": "",
		            "filename": ""
		          },
		        "imgTDau": {
		            "attachmentId": "",
		            "content": "",
		            "fileType": "",
		            "filename": ""
		          },
		        "imgPDuoi": {
		            "attachmentId": "",
		            "content": "",
		            "fileType": "",
		            "filename": ""
		          },
	            "imgTDuoi": {
		            "attachmentId": "",
		            "content": "",
		            "fileType": "",
		            "filename": ""
		          },
	             "imgDKiem": {
		            "attachmentId": "",
		            "content": "",
		            "fileType": "",
		            "filename": ""
		          }
  			}
        
        angular.element(document).ready(function () {
        	
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  			$controller('ProductBaseController', { vm: vm, $scope: $scope });
		    
  		})();
  		
  		// watch
  		$scope.$watch('vm.phaiDauFileModel', function () {
  			if (vm.phaiDauFileModel != undefined && vm.phaiDauFileModel != null && vm.phaiDauFileModel) {
  				var file = vm.phaiDauFileModel;
  				
  				var strDateFile = file.lastModifiedDate;
          	  	var strNow = new Date();
          	  	var dateNow = DateUtils.convertDate(strNow);
          	  	var dateFile = DateUtils.convertDate(strDateFile);
              	var countDate = DateUtils.dateDiff(dateFile, dateNow);
              	if (countDate > 3){
              		vm.phaiDauFileModel = null;
              		vm.phaiDauFile = null;
              		toastr.error('Ảnh chụp không thỏa mãn điều kiện trong vòng 3 ngày!');
              		angular.element('#upload-phaiDau').focus();
              	} else {
              		var fileReader = new FileReader();
                	fileReader.readAsDataURL(file);
                	fileReader.onload = function (e) {
                		var dataUrl = e.target.result;
                	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
                	  	vm.phaiDauFile = {
                  			"content": base64Data,
                  		    "fileType": file.type,
                  		    "filename": file.name
                  		};
                	};
      				console.log(vm.phaiDauFile);
              	}
  			} else {
  				vm.phaiDauFile = null;
  			}
  		});
  		
  		$scope.$watch('vm.traiDauFileModel', function () {
  			if (vm.traiDauFileModel != undefined && vm.traiDauFileModel != null && vm.traiDauFileModel) {
  				var file = vm.traiDauFileModel;
  				
  				var strDateFile = file.lastModifiedDate;
          	  	var strNow = new Date();
          	  	var dateNow = DateUtils.convertDate(strNow);
          	  	var dateFile = DateUtils.convertDate(strDateFile);
              	var countDate = DateUtils.dateDiff(dateFile, dateNow);
              	if (countDate > 3){
              		vm.traiDauFileModel = null;
              		vm.traiDauFile = null;
              		toastr.error('Ảnh chụp không thỏa mãn điều kiện trong vòng 3 ngày!');
              		angular.element('#upload-traiDau').focus();
              	} else {
              		var fileReader = new FileReader();
                	fileReader.readAsDataURL(file);
                	fileReader.onload = function (e) {
                		var dataUrl = e.target.result;
                	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
                	  	vm.traiDauFile = {
                  			"content": base64Data,
                  		    "fileType": file.type,
                  		    "filename": file.name
                  		};
                	};
      				console.log(vm.traiDauFile);
              	}
  			} else {
  				vm.traiDauFile = null;
  			}
  		});
  		
  		$scope.$watch('vm.phaiDuoiFileModel', function () {
  			if (vm.phaiDuoiFileModel != undefined && vm.phaiDuoiFileModel != null && vm.phaiDuoiFileModel) {
  				var file = vm.phaiDuoiFileModel;
  				
  				var strDateFile = file.lastModifiedDate;
          	  	var strNow = new Date();
          	  	var dateNow = DateUtils.convertDate(strNow);
          	  	var dateFile = DateUtils.convertDate(strDateFile);
              	var countDate = DateUtils.dateDiff(dateFile, dateNow);
              	if (countDate > 3){
              		vm.phaiDuoiFileModel = null;
              		vm.phaiDuoiFile = null;
              		toastr.error('Ảnh chụp không thỏa mãn điều kiện trong vòng 3 ngày!');
              		angular.element('#upload-phaiDuoi').focus();
              	} else {
              		var fileReader = new FileReader();
                	fileReader.readAsDataURL(file);
                	fileReader.onload = function (e) {
                		var dataUrl = e.target.result;
                	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
                	  	vm.phaiDuoiFile = {
                  			"content": base64Data,
                  		    "fileType": file.type,
                  		    "filename": file.name
                  		};
                	};
      				console.log(vm.phaiDuoiFile);
              	}
  			} else {
  				vm.phaiDuoiFile = null;
  			}
  		});
  		
  		$scope.$watch('vm.traiDuoiFileModel', function () {
  			if (vm.traiDuoiFileModel != undefined && vm.traiDuoiFileModel != null && vm.traiDuoiFileModel) {
  				var file = vm.traiDuoiFileModel;
  				
  				var strDateFile = file.lastModifiedDate;
          	  	var strNow = new Date();
          	  	var dateNow = DateUtils.convertDate(strNow);
          	  	var dateFile = DateUtils.convertDate(strDateFile);
              	var countDate = DateUtils.dateDiff(dateFile, dateNow);
              	if (countDate > 3){
              		vm.traiDuoiFileModel = null;
              		vm.traiDuoiFile = null;
              		toastr.error('Ảnh chụp không thỏa mãn điều kiện trong vòng 3 ngày!');
              		angular.element('#upload-traiDuoi').focus();
              	} else {
              		var fileReader = new FileReader();
                	fileReader.readAsDataURL(file);
                	fileReader.onload = function (e) {
                		var dataUrl = e.target.result;
                	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
                	  	vm.traiDuoiFile = {
                  			"content": base64Data,
                  		    "fileType": file.type,
                  		    "filename": file.name
                  		};
                	};
      				console.log(vm.traiDuoiFile);
              	}
  			} else {
  				vm.traiDuoiFile = null;
  			}
  		});
  		
  		$scope.$watch('vm.dangKiemFileModel', function () {
  			if (vm.dangKiemFileModel != undefined && vm.dangKiemFileModel != null && vm.dangKiemFileModel) {
  				var file = vm.dangKiemFileModel;
  				
  				var strDateFile = file.lastModifiedDate;
          	  	var strNow = new Date();
          	  	var dateNow = DateUtils.convertDate(strNow);
          	  	var dateFile = DateUtils.convertDate(strDateFile);
              	var countDate = DateUtils.dateDiff(dateFile, dateNow);
              	if (countDate > 3){
              		vm.dangKiemFileModel = null;
              		vm.dangKiemFile = null;
              		toastr.error('Ảnh chụp không thỏa mãn điều kiện trong vòng 3 ngày!');
              		angular.element('#upload-dangkiem').focus();
              	} else {
              		var fileReader = new FileReader();
                	fileReader.readAsDataURL(file);
                	fileReader.onload = function (e) {
                		var dataUrl = e.target.result;
                	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
                	  	vm.dangKiemFile = {
                  			"content": base64Data,
                  		    "fileType": file.type,
                  		    "filename": file.name
                  		};
                	};
      				console.log(vm.dangKiemFile);
              	}
  			} else {
  				vm.dangKiemFile = null;
  			}
  		});
  		
  		
  		// Function
  		function cancel() {
  			let lineId = $rootScope.lineId;
  			if (lineId != null && lineId != undefined && lineId == 'CAR'){
  				$state.go('order.baoviet');
  			} else {
  				$uibModalInstance.dismiss('cancel');		
  			}
  		}
  		
  		function updateImage() {
  			if (validator()){
  				vm.udImage.gycbhNumber = $rootScope.gycbhNumber;
  	  			
  	        	if (vm.phaiDauFile != null && vm.phaiDauFile.content.length > 0){
  	            	vm.udImage.imgPDau = vm.phaiDauFile;	
  	            }
  	        	
  	        	if (vm.traiDauFile != null && vm.traiDauFile.content.length > 0){
  	            	vm.udImage.imgTDau = vm.traiDauFile;	
  	            }
  	        	
  	        	if (vm.phaiDuoiFile != null && vm.phaiDuoiFile.content.length > 0){
  	            	vm.udImage.imgPDuoi = vm.phaiDuoiFile;	
  	            }
  	        	
  	        	if (vm.traiDuoiFile != null && vm.traiDuoiFile.content.length > 0){
  	            	vm.udImage.imgTDuoi = vm.traiDuoiFile;	
  	            }
  	        	
  	        	if (vm.dangKiemFile != null && vm.dangKiemFile.content.length > 0){
  	            	vm.udImage.imgDKiem = vm.dangKiemFile;	
  	            }
  	    		
  		  		// call base to create policy
  	        	CarService.updateImagesPolicy(vm.udImage, onUpdateImagePolicySuccess, onUpdateImagePolicyError);
  	        	
  	        	function onUpdateImagePolicySuccess(data) {
  	    			vm.clearResponseError();
  	                vm.loading = false;
  	                
  	    			// kiểm tra nếu TH đang soạn thì ko bật otp
  	    			var checkOTP = vm.currentAccount.sendOtp;
  	                if (checkOTP == 1){
  	                	cancel();
  	                	$rootScope.gycbhNumber = data.gycbhNumber;
  	                	vm.showOTPSavePolicySuccessInfo();
  	                } else {
  	                	vm.showSavePolicySuccessInfo(obj);	
  	                }
  	            }
  	      		
  	      		function onUpdateImagePolicyError(error) {
  	                vm.loading = false;
  	                vm.validateResponse(error, 'createPolicy');
  	            }
  			}
    	}
  		
  		function validator() {
  			if (vm.phaiDauFileModel != undefined && vm.phaiDauFileModel != null && vm.phaiDauFileModel) {
  				var file = vm.phaiDauFileModel;
  				
  				var strDateFile = file.lastModifiedDate;
          	  	var strNow = new Date();
          	  	var dateNow = DateUtils.convertDate(strNow);
          	  	var dateFile = DateUtils.convertDate(strDateFile);
              	var countDate = DateUtils.dateDiff(dateFile, dateNow);
              	if (countDate > 3){
              		vm.phaiDauFileModel = null;
              		vm.phaiDauFile = null;
              		toastr.error('Ảnh chụp không thỏa mãn điều kiện trong vòng 3 ngày!');
              		angular.element('#upload-phaiDau').focus();
              		return false;
              	} 
  			} else {
  				vm.phaiDauFile = null;
  				toastr.error('Cần up ảnh chụp của xe!');
          		angular.element('#upload-phaiDau').focus();
          		return false;
  			}
  			
  			if (vm.traiDauFileModel != undefined && vm.traiDauFileModel != null && vm.traiDauFileModel) {
  				var file = vm.traiDauFileModel;
  				
  				var strDateFile = file.lastModifiedDate;
          	  	var strNow = new Date();
          	  	var dateNow = DateUtils.convertDate(strNow);
          	  	var dateFile = DateUtils.convertDate(strDateFile);
              	var countDate = DateUtils.dateDiff(dateFile, dateNow);
              	if (countDate > 3){
              		vm.traiDauFileModel = null;
              		vm.traiDauFile = null;
              		toastr.error('Ảnh chụp không thỏa mãn điều kiện trong vòng 3 ngày!');
              		angular.element('#upload-traiDau').focus();
              		return false;
              	}
  			} else {
  				vm.traiDauFile = null;
  				toastr.error('Cần up ảnh chụp của xe!');
          		angular.element('#upload-traiDau').focus();
          		return false;
  			}
  			
  			if (vm.phaiDuoiFileModel != undefined && vm.phaiDuoiFileModel != null && vm.phaiDuoiFileModel) {
  				var file = vm.phaiDuoiFileModel;
  				
  				var strDateFile = file.lastModifiedDate;
          	  	var strNow = new Date();
          	  	var dateNow = DateUtils.convertDate(strNow);
          	  	var dateFile = DateUtils.convertDate(strDateFile);
              	var countDate = DateUtils.dateDiff(dateFile, dateNow);
              	if (countDate > 3){
              		vm.phaiDuoiFileModel = null;
              		vm.phaiDuoiFile = null;
              		toastr.error('Ảnh chụp không thỏa mãn điều kiện trong vòng 3 ngày!');
              		angular.element('#upload-phaiDuoi').focus();
              		return false;
              	}
  			} else {
  				vm.phaiDuoiFile = null;
  				toastr.error('Cần up ảnh chụp của xe!');
          		angular.element('#upload-phaiDuoi').focus();
          		return false;
  			}
  			
  			if (vm.traiDuoiFileModel != undefined && vm.traiDuoiFileModel != null && vm.traiDuoiFileModel) {
  				var file = vm.traiDuoiFileModel;
  				
  				var strDateFile = file.lastModifiedDate;
          	  	var strNow = new Date();
          	  	var dateNow = DateUtils.convertDate(strNow);
          	  	var dateFile = DateUtils.convertDate(strDateFile);
              	var countDate = DateUtils.dateDiff(dateFile, dateNow);
              	if (countDate > 3){
              		vm.traiDuoiFileModel = null;
              		vm.traiDuoiFile = null;
              		toastr.error('Ảnh chụp không thỏa mãn điều kiện trong vòng 3 ngày!');
              		angular.element('#upload-traiDuoi').focus();
              		return false;
              	}
  			} else {
  				vm.traiDuoiFile = null;
  				toastr.error('Cần up ảnh chụp của xe!');
          		angular.element('#upload-traiDuoi').focus();
          		return false;
  			}
  			
  			if (vm.dangKiemFileModel != undefined && vm.dangKiemFileModel != null && vm.dangKiemFileModel) {
  				var file = vm.dangKiemFileModel;
  				
  				var strDateFile = file.lastModifiedDate;
          	  	var strNow = new Date();
          	  	var dateNow = DateUtils.convertDate(strNow);
          	  	var dateFile = DateUtils.convertDate(strDateFile);
              	var countDate = DateUtils.dateDiff(dateFile, dateNow);
              	if (countDate > 3){
              		vm.dangKiemFileModel = null;
              		vm.dangKiemFile = null;
              		toastr.error('Ảnh chụp không thỏa mãn điều kiện trong vòng 3 ngày!');
              		angular.element('#upload-dangkiem').focus();
              		return false;
              	}
  			} else {
  				vm.dangKiemFile = null;
  				toastr.error('Cần up ảnh chụp của xe!');
          		angular.element('#upload-dangkiem').focus();
          		return false;
  			}
        	
        	return true;
        };
  		
    }
})();
