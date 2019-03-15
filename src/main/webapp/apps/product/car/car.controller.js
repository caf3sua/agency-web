(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductCarController', ProductCarController);

    ProductCarController.$inject = ['$rootScope', '$scope', '$controller', 'CarService', 'DateUtils', 'ProductCommonService', '$state'
    	, '$stateParams', 'ResponseValidateService'];

    function ProductCarController ($rootScope, $scope, $controller, CarService, DateUtils, ProductCommonService, $state
    		, $stateParams, ResponseValidateService) {
        var vm = this;
        vm.lineId = 'CAR';
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
			  $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		vm.policy = {
  				// add 01.03.2019
  				"categoryType": "",
  				"packageType": "", // gois bao hiem
  				"monthOfMake": "2",
  				"khauTruSoTien": "",
  				"premiumCB":0,
  				"totalPremiumCB":0,
  				"premiumNC":0,
  				"totalPremiumNC":0,
  				"premiumTC":0,
  				"totalPremiumTD":0,
  				
  				// Premium
  	  			"agencyRole": "1",
  	  			"garage": false,
  	  			"khauHao": false,
  				"khauTru": false,
  				"matCap": false,
  				"namSX": 0,
  				"ngapNuoc": false,
  				"nntxPhi": 0,
  				"nntxSoCho": "",
  				"nntxSoTien": "",
  				"tndsbbPhi": 0,
  				"vcxPhi": 0,
  				"vcxSoTien": "",
  				"chargeFree" : "",
  	  			
  	  			// Create policy  				
  				"actualValue":0,
  				"changePremium": "",
  				"chassisNumber":"",
  				"engineNumber":"",
  				"garageCheck":false,
  				"insuredAddress":"",
  				"insuredName":"",
  				"khaoHaoCheck":false,
  				"khauTruCheck":false,
  				"makeId":"1",
  				"makeName":"",
  				"matCapCheck":false,
  				"modelId":"",
  				"modelName":"",
  				"ngapNuocCheck":false,
  				"nntxCheck":false,
  				"passengersAccidentNumber":0,
  				"passengersAccidentPremium":0,
  				"passengersAccidentSi":0,
  				"physicalDamagePremium":0,
  				"physicalDamageSi":0,
  				"policyNumber":"",
  				"premium":0,
  				"purposeOfUsageId":"15",
  				"receiveMethod" : "",
  			   	"registrationNumber":"",
  			   	"thirdPartyPremium":0,
  			   	"thoihanden":"",
  			   	"thoihantu":"",
  			   	"tndsSocho":"",
  			   	"tndsbbCheck":true,
  			   	"tndstnCheck":false,
  			   	"tndstnPhi":0,
  			    "tndstnSoTien": "",
  			   	"totalPremium":0,
  			   	"vcxCheck":false,
  			   	"yearOfMake":"",
	  			"invoiceInfo": {  
	              	"accountNo":"",
	  				"address":"",
	  				"addressDistrict":"",
	  				"check":"0",
	  				"company":"",
	  				"name":"",
	  				"taxNo":""
	  	        },
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
  		
  		vm.showChangePremium = showChangePremium;
  		vm.disableExtendedInsurance = disableExtendedInsurance;
  		vm.processComboResult = processComboResult;
  		vm.checkedChange = checkedChange;
  		vm.getPremium = getPremium;
  		vm.savePolicy = savePolicy;
  		vm.validatorCombo = validatorCombo;
  		vm.validatorNntxSoCho = validatorNntxSoCho;
  		vm.validatorVcxSoTien = validatorVcxSoTien;
  		vm.onThoihanChange = onThoihanChange;
  		vm.getCarModelSuccess = getCarModelSuccess;
  		vm.getCarModelError = getCarModelError;
  		vm.getCarNamSanXuatMax = getCarNamSanXuatMax;
  		vm.getCarNamSanXuatMin = getCarNamSanXuatMin;
  		vm.changeCopyFromNycbh = changeCopyFromNycbh;
  		
  		vm.tndsSoChoOptions = [
  	      {id: '1', name: 'Loại xe dưới 6 chỗ ngồi'},
  	      {id: '2', name: 'Loại xe từ 6 đến 11 chỗ ngồi'},
  	      {id: '3', name: 'Loại xe từ 12 đến 24 chỗ ngồi'},
  	      {id: '4', name: 'Loại xe trên 24 chỗ ngồi'},
  	      {id: '5', name: 'Xe vừa chở người vừa chở hàng(Pickup, Minivan)'}
  	    ];
  		vm.tndstnSoTienOptions = [
	      {id: '50000000', name: '50trđ/người/vụ về người - 50trđ/vụ về tài sản'},
	      {id: '100000000', name: '100trđ/người/vụ về người - 100trđ/vụ về tài sản'},
	      {id: '150000000', name: '150trđ/người/vụ về người - 150trđ/vụ về tài sản'}
	    ];
  		vm.nntxSoTienOptions = [
  	      {id: '10000000', name: '10 triệu đồng/người/vụ'},
  	      {id: '20000000', name: '20 triệu đồng/người/vụ'},
  	      {id: '30000000', name: '30 triệu đồng/người/vụ'},
  	      {id: '40000000', name: '40 triệu đồng/người/vụ'},
  	      {id: '50000000', name: '50 triệu đồng/người/vụ'},
  	      {id: '100000000', name: '100 triệu đồng/người/vụ'},
  	      {id: '150000000', name: '150 triệu đồng/người/vụ'},
  	      {id: '200000000', name: '200 triệu đồng/người/vụ'}
  	    ];
  		
  		vm.vatChatXeKhauTruOptions = [
    	      {id: '500000', name: '500.000'},
    	      {id: '1000000', name: '1.000.000'}
    	    ];
  		vm.categoryTypeOptions = [
    	      {id: 'PERSON', name: 'Khách hàng cá nhân'},
    	      {id: 'ORGANIZATION', name: 'Khách hàng tổ chức'}
    	    ];
  		vm.monthOptions = [
	  	    {id: '1', name: '1'},
	  	    {id: '2', name: '2'},
	  	    {id: '3', name: '3'},
	  	    {id: '4', name: '4'},
	  	    {id: '5', name: '5'},
	  	    {id: '6', name: '6'},
	  	    {id: '7', name: '7'},
	  	    {id: '8', name: '8'},
	  	    {id: '9', name: '9'},
	  	    {id: '10', name: '10'},
	  	    {id: '11', name: '11'},
	  	    {id: '12', name: '12'}
  	    ];
  		
  		vm.manufacturerOptions = [];
  		vm.modelOptions = [];
  		vm.yearOptions = [];
  		
  		vm.isShowTndsbbPhi = false;
  		vm.isShowTndstnPhi = false;
  		vm.isShowNntxPhi = false;
  		vm.isShowVcxPhi = false;
  		vm.isShowChangePremium = false;
  		vm.isShowPremium = false;
  		vm.isShowTotalPremium = false;
  		
  		vm.changePackage1 = changePackage1;
  		vm.changePackage2 = changePackage2;
  		vm.isCollapsedCommonCar = false;
  		vm.isShowPackage1 = false;
  		vm.isShowPackage2 = false;
  		vm.nextPackage1 = nextPackage1;
  		vm.nextPackage2 = nextPackage2;
  		vm.isShowCollapsedContact = false;
  		vm.checkReuse = checkReuse;
  		vm.onchangePlan = onchangePlan;
  		vm.typePlan = "";
  		
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
  		
//  		vm.cancel = cancel;
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
  		
  		// Initialize
  		init();
  		
  		// Function
  		function init() {
  			var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.policy.thoihantu = DateUtils.convertDate(startDate);

            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.policy.thoihanden = DateUtils.convertDate(endDate);
  			
            vm.policy.insuranceTarget = "New";
            
  			// Load car branches
  			CarService.getCarBranches({}, getCarBranchesSuccess, getCarBranchesError);
            vm.registerDisableContactInfoValue('vm.policy.premium');
            
            // Edit
            if (vm.isEditMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = 'PRODUCT_CAR_EDIT';
            	
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		// Format to display and calculate premium again
            		formatEditData(result);
            		vm.loading = false;
            		vm.policy = result;
            		
            		if (vm.policy.packageType == 1){
            			initPremium();
            		}
            		
            		// Open view and step - calculate premium again
            		getPremium();
            		vm.nextCount = 2;
            		formatAddressEdit();
                }).catch(function(data, status) {
                	vm.loading = false;
                	vm.showWarningEditPolicy();
    		    });
            }
            
            // Copy
            if (vm.isCopyMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = 'PRODUCT_CAR';
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		// Format to display and calculate premium again
            		formatEditData(result);
            		vm.loading = false;
            		vm.policy = result;
            		
            		if (vm.policy.packageType == 1){
            			initPremium();
            		}
            		
            		// copy
            		vm.policy.agreementId = null;
            		vm.policy.gycbhId = null;
            		vm.policy.gycbhNumber =  null;
            		// Open view and step - calculate premium again
            		getPremium();
            		vm.nextCount = 2;
            		formatAddressEdit();
                }).catch(function(data, status) {
                	vm.loading = false;
                	vm.showWarningEditPolicy();
    		    });
            }
            
            // Load contact
  		    vm.selectedContactMode();
  		}
  		
  		function updateImage() {
  			
  			vm.udImage.gycbhNumber = $rootScope.car_GycbhNumber;
  			
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
  		
  		function initPremium(){
  			getPremiumInit(1);
  		}
  		
  		function onchangePlan(type) {
  			vm.policy.tndsbbCheck = true;
			vm.policy.nntxCheck = true;
			vm.policy.tndstnCheck = true;
			vm.policy.vcxCheck = true;
			vm.policy.khauHao = true;
			vm.policy.garage = true;
			vm.policy.ngapNuoc = true;
			vm.policy.matCap = false;
			vm.policy.khauTru = true;
			
			if (type == 1){
  				vm.policy.nntxSoTien = 10000000;
  				vm.policy.tndstnSoTien = 50000000;
  				vm.policy.ngapNuoc = false;
  				vm.policy.khauTruSoTien = 500000;
  			} else if (type == 2){
  				vm.policy.nntxSoTien = 20000000;
  				vm.policy.tndstnSoTien = 100000000;
  				vm.policy.khauTruSoTien = 1000000;
  			} else if (type == 3){
  				vm.policy.nntxSoTien = 50000000;
  				vm.policy.tndstnSoTien = 150000000;
  				vm.policy.matCap = true;
  				vm.policy.khauTruSoTien = 2000000;
  			}
  			getPremium();
        }
  		
  		function checkReuse(){
  			vm.policy.insuranceTargetReuse = "";
  			toastr.error('Hiện tại phần mềm chưa hỗ trợ Tái tục trên kênh này, vui lòng liên hệ phòng Hỗ trợ kinh doanh để được tiếp tục.');
  		}
  		
  		function nextPackage1(type) {
			onchangePlan(type);
			vm.isCollapsedContact = false;
			vm.isCollapsedCommonCar = true;
			vm.isCollapsedPackage1 = true;
			vm.isShowCollapsedContact = true;
			vm.isShowPackage2 = false;
			vm.isShowPackage1 = true;
        }
  		
  		function nextPackage2() {
  			if (validatorInputCar()){
  				vm.isCollapsedContact = false;
  				vm.isCollapsedCommonCar = true;
				vm.isCollapsedPackage2 = true;
				vm.isShowCollapsedContact = true;
				vm.isShowPackage2 = true;
				vm.isShowPackage1 = false;
  			}
        }
  		
  		function changePackage1() {
  			vm.policy.packageType = 1;
  			if (validatorInputCar()){
  				// tính phí các gói cơ bản trước
  	  		    initPremium();
  	  		    if (vm.isCollapsedCommonCar == false){
  					vm.isCollapsedCommonCar = true;
  	  				vm.isCollapsedContact = true;
  	  				vm.isShowPackage1 = true;
  	  				vm.isShowPackage2 = false;
  	  				vm.isCollapsedPackage1 = false;
  	  			}	
  			}
        }
  		
  		function changePackage2() {
  			vm.policy.packageType = 2;
  			resetDataPremium();
  			if (validatorInputCar()){
  				vm.policy.tndsbbCheck = true;
  				vm.policy.nntxCheck = false;
  				vm.policy.tndstnCheck = false;
  				vm.policy.vcxCheck = false;
  				getPremium();
  				if (vm.isCollapsedCommonCar == false){
  	  				vm.isCollapsedCommonCar = true;
  	  				vm.isCollapsedContact = true;
  	  				vm.isShowPackage2 = true;
  	  				vm.isShowPackage1 = false;
  	  				vm.isCollapsedPackage2 = false;
  	  			}	
  			}
        }
  		
  		function validatorInputCar(){
  			if(!vm.policy.categoryType) {
  				toastr.error('Chưa lựa chọn loại khách hàng!');
	        	return false;
	        }
  			if(!vm.policy.tndsSoCho) {
  				toastr.error('Chưa lựa chọn số chỗ/trọng tải xe!');
	        	return false;
	        }
  			if(!vm.policy.manufacturer) {
  				toastr.error('Cần lựa chọn hãng xe!');
	        	return false;
	        }
  			if(vm.policy.manufacturer && !vm.policy.model) {
  				toastr.error('Cần lựa chọn dòng xe!');
	        	return false;
	        }
  			if(vm.policy.model && !vm.policy.namSX) {
  				toastr.error('Cần lựa chọn năm sản xuất!');
	        	return false;
        	}
  			if(vm.policy.namSX && !vm.policy.vcxSoTien) {
  				toastr.error('Chưa điền giá trị xe tham gia bảo hiểm!');
	        	return false;
        	}
  			
  			return true;
  		}
  		
  		function changeCopyFromNycbh() {
        	vm.policy.insuredName = "";
        	vm.policy.insuredAddress = "";
        	vm.policy.insuredAddressDistrict = "";
	      	if (vm.copyFromNguoiycbh) {
	      		vm.policy.insuredName = vm.policy.contactName;
	      		vm.policy.insuredAddress = vm.policy.contactAddress;
	      		vm.policy.insuredAddressDistrict = vm.policy.contactAddressDistrictData;
	      	}
        }
  		
  		function formatEditData(result) {
  			if (result.makeName) {
  				CarService.getCarModel({model : result.makeName}, getCarModelSuccess, getCarModelError);
  				getCarNamSanXuatMax(result.modelId);
  			}
  			
  			result.nntxSoCho = result.passengersAccidentNumber;
  			result.nntxSoTien = result.passengersAccidentSi.toString();
  			result.nntxPhi = result.passengersAccidentPremium;
  			result.tndsbbPhi = result.thirdPartyPremium;
  		    result.tndsSoCho = result.tndsSoCho.toString();
  			result.tndstnSoTien = result.tndstnSotien.toString();
  			result.manufacturer = result.makeName;
  		    result.model = result.modelId;
  		    result.namSX = result.yearOfMake.toString() + ":" + result.modelId;
  		    result.vcxPhi = result.physicalDamagePremium;
			result.vcxSoTien = result.physicalDamageSi;
  		    result.ngapNuoc = result.ngapNuocCheck;
  			result.khauHao = result.khaoHaoCheck;
  			result.khauTru = result.khauTruCheck;
  			result.garage = result.garageCheck;
  			result.matCap = result.matCapCheck;

  			if (result.oldGycbhNumber == null){
  				result.insuranceTarget = "New";	
  			} else {
  				result.insuranceTarget = "Reuse";
  			}
  			
  			if(result.packageType == 1){
  				vm.isCollapsedContact = false;
  				vm.isCollapsedCommonCar = false;
  				vm.isCollapsedPackage1 = false;
  				vm.isShowCollapsedContact = true;
  				vm.isShowPackage2 = false;
  				vm.isShowPackage1 = true;
  			} else if(result.packageType == 2){
  				vm.isCollapsedContact = false;
  				vm.isCollapsedCommonCar = false;
				vm.isCollapsedPackage2 = false;
				vm.isShowCollapsedContact = true;
				vm.isShowPackage2 = true;
				vm.isShowPackage1 = false;
  			} else{}
  		}
  		
  		function getCarNamSanXuatMax(modelId) {
  			CarService.getMaxManufactureYear({carId : modelId}, getSuccess, getError);
  			function getSuccess(result) {
  				vm.namSxMax = result.max;
  				getCarNamSanXuatMin(modelId);
  	    	}
  	    	
  	    	function getError(result) {
  	    		toastr.error('Không thể lấy thông tin năm sản xuất của xe');
  	    	}
    	}
  		
  		function getCarNamSanXuatMin(modelId) {
  			CarService.getMinManufactureYear({carId : modelId}, getSuccess, getError);
  			function getSuccess(result) {
  				vm.namSxMin = result.min;
  				var min = parseInt(vm.namSxMin, 10);
  				var max = parseInt(vm.namSxMax, 10);
  				
  				if (min > 0 && max > 0){
      				for (var i = min; i < max; i++) { 
      					vm.yearOptions.push({id: i + ":" + modelId, name: i});
      				}
      			}
  	    	}
  	    	
  	    	function getError(result) {
  	    		toastr.error('Không thể lấy thông tin năm sản xuất của xe');
  	    	}
    	}
  		
  		function getCarModelSuccess(data) {
  			data.forEach(function(item, index, data) {
  				vm.modelOptions.push({id: item.carId, name: item.carName});
  			});
    	}
    	
    	function getCarModelError(data) {
    		toastr.error('Không thể lấy thông tin hãng xe');
    	}
  		
  		function formatAddressEdit() {
  			// Address at step 2
  			var receiverAddress = vm.policy.receiverUser.address;
  			vm.policy.receiverUser.address = vm.formatAddressEdit(receiverAddress);
  			vm.getAddressByPostCode(receiverAddress).then(function (data) {
  				vm.policy.receiverUser.addressDistrictData = data;
    		});
  			
  			// invoice
  			var invoiceInfoAddress = vm.policy.invoiceInfo.address;
  			if (invoiceInfoAddress != null && invoiceInfoAddress != undefined) {
  				vm.policy.invoiceInfo.address = vm.formatAddressEdit(invoiceInfoAddress);
  	  			vm.getAddressByPostCode(invoiceInfoAddress).then(function (data) {
  	  				vm.policy.invoiceInfo.addressDistrictData = data;
  	    		});
  			}
  			
  			// extra
  			var insuredAddress = vm.policy.insuredAddress;
    		vm.policy.insuredAddress = vm.formatAddressEdit(insuredAddress);
    		vm.getAddressByPostCode(insuredAddress).then(function (data) {
    			vm.policy.insuredAddressDistrict = data;
    		});
    		
    		var contactAddress = vm.policy.contactAddress;
    		vm.policy.contactAddress = vm.formatAddressEdit(contactAddress);
    		vm.getAddressByPostCode(contactAddress).then(function (data) {
    			vm.policy.contactAddressDistrictData = data;
    		});
  		}
  		
  		function onThoihanChange() {
        	var endDate = moment(vm.policy.thoihantu, "DD/MM/YYYY").add(1, 'years').add(-1, 'days').format("DD/MM/YYYY");
            // add a day
        	vm.policy.thoihanden = endDate;
        }
  		
  		function getCarBranchesSuccess(result) {
  			result.forEach(function(item, index, arr) {
  				vm.manufacturerOptions.push({id: item, name: item});
  			})
    	}
    	
    	function getCarBranchesError(error) {
    		
    	}
    	
    	function checkedChange() {
    		getPremium();
    	}
  		
  		function showChangePremium() {
  			if((vm.policy.tndsbbCheck && vm.policy.tndsSoCho)
  					|| (vm.policy.tndstnCheck && vm.policy.tndsSoCho)) {
  				return true;
  			} else {
  				return false;
  			}
  		}
  		
  		function disableExtendedInsurance() {
  			if((!vm.policy.tndsbbCheck && !vm.policy.tndstnCheck && !vm.policy.vcxCheck)
  					|| (vm.policy.tndsbbCheck && !vm.policy.tndsSoCho)
  					|| (vm.policy.tndstnCheck && !vm.policy.tndsSoCho)) {
  				return true;
  			} else {
  				return false;
  			}
  		}
  		
  		function processComboResult(data, type) {
  			console.log(data);
  			switch(type){
	  			case 'car-vatChatXeKhauTru-sotien':
	            	if(vm.policy.khauTruSoTien != "") {
//	            		getPremium();	
	            		break;
	            	}
  				case 'car-tndstn-sotien':
	            	if(vm.policy.tndstnSoTien != "") {
	            		getPremium();	
	            		break;
	            	}
	            case 'car-socho':
	            	if (vm.policy.tndstnCheck == true && vm.policy.tndstnSoTien != "") {
	            		getPremium();	
	            		break;
	            	} else if (vm.policy.tndsbbCheck == true && vm.policy.tndsSoCho != undefined && vm.policy.tndsSoCho != null && vm.policy.tndsSoCho != "") {
	            		if (vm.policy.tndsSoCho == 1){
	            			vm.policy.nntxSoCho = 5;
	            		} else if (vm.policy.tndsSoCho == 2){
	            			vm.policy.nntxSoCho = 11;
	            		} else if (vm.policy.tndsSoCho == 3){
	            			vm.policy.nntxSoCho = 24;
	            		} else if (vm.policy.tndsSoCho == 4){
	            			vm.policy.nntxSoCho = 50;
	            		} else {
	            			vm.policy.nntxSoCho = 5;
	            		}
	            		getPremium();	
	            		break;
	            	} else {
	            		break;
	            	}
	            case 'car-nntx-sotien':
	            	getPremium();
	            	break;
	            case 'car-manufacturer':
	            	vm.modelOptions = [];
	            	vm.policy.model = '';
	            	vm.policy.namSX = '';
	            	vm.policy.actualValue = '';
	            	vm.policy.vcxSoTien = '';
	            	data.forEach(function(item, index, arr) {
	      				vm.modelOptions.push({id: item.carId, name: item.carName});
	      			})
	                break;
	            case 'car-model':
	            	vm.yearOptions = [];
	            	vm.policy.namSX = '';
	            	vm.policy.actualValue = '';
	            	vm.policy.vcxSoTien = '';
	            	for(var i = data.min; i <= data.max; i++) {
	            		vm.yearOptions.push({id: i + ":" + vm.policy.model, name: i});
	            	}
	                break;
	            case 'car-year':
	            	vm.policy.vcxSoTien = '';
	            	vm.policy.actualValue = data.price;
	            	vm.policy.vcxSoTien = data.price;
	            	vm.policy.khauHao = true;
	            	getPremium();
	                break;
	            case 'car-month':
	                break;
	        }
  		}
  		
  		function getPremiumInit(type) {
  			vm.policy.tndsbbCheck = true;
			vm.policy.nntxCheck = true;
			vm.policy.tndstnCheck = true;
			vm.policy.vcxCheck = true;
			vm.policy.khauHao = true;
			vm.policy.garage = true;
			vm.policy.ngapNuoc = true;
			vm.policy.matCap = false;
			vm.policy.khauTru = true;
  			
        	// clean error message
        	vm.cleanAllResponseError();
        	if (type == 1){
        		vm.typePlan = 1;
  				vm.policy.nntxSoTien = 10000000;
  				vm.policy.tndstnSoTien = 50000000;
  				vm.policy.ngapNuoc = false;
  				vm.policy.khauTruSoTien = 500000;
  			} else if (type == 2){
  				vm.typePlan = 2;
  				vm.policy.nntxSoTien = 20000000;
  				vm.policy.tndstnSoTien = 100000000;
  				vm.policy.khauTruSoTien = 1000000;
  			} else if (type == 3){
  				vm.typePlan = 3;
  				vm.policy.nntxSoTien = 50000000;
  				vm.policy.tndstnSoTien = 150000000;
  				vm.policy.matCap = true;
  				vm.policy.khauTruSoTien = 2000000;
  			}
        	
            vm.loading = true;
  			var postData = getPostData(false);
  			ProductCommonService.getCarPremium(postData, onGetPremiumSuccessInit, onGetPremiumError);
  		}
  		
  		function getPremium() {
        	// clean error message
        	vm.cleanAllResponseError();
        	
            vm.loading = true;
  			var postData = getPostData(false);
  			ProductCommonService.getCarPremium(postData, onGetPremiumSuccess, onGetPremiumError);
  		}
  		
  		function getPostData(isCreate) {
  			var postData = Object.assign({}, vm.policy);
  			if(!postData.changePremium || postData.changePremium == "") {
  				postData.changePremium = 0;
  			}
  			if(postData.nntxSoCho == "") {
  				postData.nntxCheck = false;
  				postData.nntxSoCho = 0;
  				postData.nntxSoTien = 0;
  			}
  			if(postData.nntxSoTien == "") {
  				postData.nntxCheck = false;
  				postData.nntxSoCho = 0;
  				postData.nntxSoTien = 0;
  			}
  			if(postData.tndstnSoTien == "") {
  				postData.tndstnSoTien = 0;
  			}
  			if(!postData.vcxSoTien || postData.vcxSoTien == "") {
  				postData.vcxCheck = false;
  				postData.namSX = 0;
  				postData.vcxSoTien = 0;
  			} else {
  				postData.namSX = postData.namSX.split(":")[0];
  			}
  			
  			
  			// Remove unuse
  			if(!isCreate) {
  				delete postData.chargeFree;
  	  			delete postData.manufacturer;
  	  			delete postData.model;
  	  			delete postData.actualValue;
  	  			delete postData.receiveMethod;
  			}
  			
  			return postData;
  		}
  		
  		function onGetPremiumSuccess(result) {
            vm.loading = false;
    		if(vm.policy.tndsbbCheck && vm.policy.tndsSoCho) {
    			vm.isShowTndsbbPhi = true;
    			vm.policy.tndsbbPhi = result.tndsbbPhi;
    		}
    		if(vm.policy.tndsbbCheck == false) {
    			vm.isShowTndsbbPhi = false;
    			vm.policy.tndsbbPhi = 0;
    		}
    		if(vm.policy.tndstnCheck && vm.policy.tndsSoCho && vm.policy.tndstnSoTien) {
    			vm.isShowTndstnPhi = true;
    			vm.policy.tndstnPhi = result.tndstnPhi;
    		}
    		if(vm.policy.tndstnCheck == false) {
    			vm.isShowTndstnPhi = false;
    			vm.policy.tndstnPhi = 0;
    		}
    		if(vm.policy.nntxCheck && vm.policy.nntxSoTien) {
    			vm.isShowNntxPhi = true;
    			vm.policy.nntxPhi = result.nntxPhi;
    		}
    		if(vm.policy.nntxCheck == false) {
    			vm.isShowNntxPhi = false;
    			vm.policy.nntxPhi = 0;
    		}
    		if(vm.policy.vcxCheck && vm.policy.namSX && vm.policy.vcxSoTien) {
    			vm.isShowVcxPhi = true;
    			vm.policy.vcxPhi = result.vcxPhi;
    		}
    		if(vm.policy.vcxCheck == false) {
    			vm.isShowVcxPhi = false;
    			vm.policy.vcxPhi = 0;
    		}
    		if(vm.policy.changePremium) {
    			vm.isShowChangePremium = true;
    			if(result.changePremium != 0) {
    				vm.policy.chargeFree = Math.round((result.totalPremium * result.changePremium) / 100);
    			} else {
    				vm.policy.chargeFree = 0;
    			}
    		} else {
    			vm.isShowChangePremium = false;
    			vm.policy.chargeFree = 0;
    		}
    		if((vm.policy.tndsbbCheck && vm.policy.tndsSoCho)
    				|| (vm.policy.tndstnCheck && vm.policy.tndsSoCho && vm.policy.tndstnSoTien) || (vm.policy.vcxCheck && vm.policy.vcxSoTien)) {
    			vm.isShowPremium = true;
          		vm.isShowTotalPremium = true;
          		vm.policy.premium = result.premium;
          		vm.policy.totalPremium = result.totalPremium;
    		} else{
    			vm.isShowPremium = false;
          		vm.isShowTotalPremium = false;
          		vm.policy.premium = result.premium;
          		vm.policy.totalPremium = result.totalPremium;
    		}
    		
            vm.clearResponseError();
    	}
  		
  		function onGetPremiumSuccessInit(result) {
            vm.loading = false;
    		if(vm.policy.tndsbbCheck && vm.policy.tndsSoCho) {
    			vm.isShowTndsbbPhi = true;
    			vm.policy.tndsbbPhi = result.tndsbbPhi;
    		}
    		if(vm.policy.tndsbbCheck == false) {
    			vm.isShowTndsbbPhi = false;
    			vm.policy.tndsbbPhi = 0;
    		}
    		if(vm.policy.tndstnCheck && vm.policy.tndsSoCho && vm.policy.tndstnSoTien) {
    			vm.isShowTndstnPhi = true;
    			vm.policy.tndstnPhi = result.tndstnPhi;
    		}
    		if(vm.policy.tndstnCheck == false) {
    			vm.isShowTndstnPhi = false;
    			vm.policy.tndstnPhi = 0;
    		}
    		if(vm.policy.nntxCheck && vm.policy.nntxSoTien) {
    			vm.isShowNntxPhi = true;
    			vm.policy.nntxPhi = result.nntxPhi;
    		}
    		if(vm.policy.nntxCheck == false) {
    			vm.isShowNntxPhi = false;
    			vm.policy.nntxPhi = 0;
    		}
    		if(vm.policy.vcxCheck && vm.policy.namSX && vm.policy.vcxSoTien) {
    			vm.isShowVcxPhi = true;
    			vm.policy.vcxPhi = result.vcxPhi;
    		}
    		if(vm.policy.vcxCheck == false) {
    			vm.isShowVcxPhi = false;
    			vm.policy.vcxPhi = 0;
    		}
    		if(vm.policy.changePremium) {
    			vm.isShowChangePremium = true;
    			if(result.changePremium != 0) {
    				vm.policy.chargeFree = Math.round((result.totalPremium * result.changePremium) / 100);
    			} else {
    				vm.policy.chargeFree = 0;
    			}
    		} else {
    			vm.isShowChangePremium = false;
    			vm.policy.chargeFree = 0;
    		}
    		if((vm.policy.tndsbbCheck && vm.policy.tndsSoCho)
    				|| (vm.policy.tndstnCheck && vm.policy.tndsSoCho && vm.policy.tndstnSoTien) || (vm.policy.vcxCheck && vm.policy.vcxSoTien)) {
    			vm.isShowPremium = true;
          		vm.isShowTotalPremium = true;
          		vm.policy.premium = result.premium;
          		vm.policy.totalPremium = result.totalPremium;
    		} else{
    			vm.isShowPremium = false;
          		vm.isShowTotalPremium = false;
          		vm.policy.premium = result.premium;
          		vm.policy.totalPremium = result.totalPremium;
    		}
    		
    		// add 05.03.2019
    		if (vm.typePlan == 1){
    			vm.policy.premiumCB = vm.policy.premium;
    			vm.policy.totalPremiumCB = vm.policy.totalPremium;
    			getPremiumInit(2);
    		} else if (vm.typePlan == 2){
    			vm.policy.premiumNC = vm.policy.premium;
    			vm.policy.totalPremiumNC = vm.policy.totalPremium;
    			getPremiumInit(3);
    		} else if (vm.typePlan == 3){
    			vm.policy.premiumTD = vm.policy.premium;
    			vm.policy.totalPremiumTD = vm.policy.totalPremium;
    		} else {
    			
    		}

            vm.clearResponseError();
    	}
    	
    	function onGetPremiumError(result) {
            vm.loading = false;
    		vm.clearResponseError();
    		resetDataPremium();
//            vm.validateResponse(result, 'getPremium');
    		ResponseValidateService.validateResponse(result.data);
    	}
    	
    	function resetDataPremium() {
    		vm.policy.totalPremium = 0;
        	vm.policy.chargeFree = 0;
            vm.policy.premium = 0;
            vm.policy.vcxPhi = 0;
            vm.policy.nntxPhi = 0;
            vm.policy.tndstnPhi = 0;
            vm.policy.tndsbbPhi = 0;
        }
    	
        function savePolicy() {
//      	if (type == "0"){
      		vm.policy.statusPolicy = "80"; // dang soan
//      	} else {
//      		vm.policy.statusPolicy = "90"; // cho thanh toan
//      	}
        	
        	if (vm.phaiDauFile != null && vm.phaiDauFile.content.length > 0){
            	vm.policy.imgPDau = vm.phaiDauFile;	
            }
        	
        	if (vm.traiDauFile != null && vm.traiDauFile.content.length > 0){
            	vm.policy.imgTDau = vm.traiDauFile;	
            }
        	
        	if (vm.phaiDuoiFile != null && vm.phaiDuoiFile.content.length > 0){
            	vm.policy.imgPDuoi = vm.phaiDuoiFile;	
            }
        	
        	if (vm.traiDuoiFile != null && vm.traiDuoiFile.content.length > 0){
            	vm.policy.imgTDuoi = vm.traiDuoiFile;	
            }
        	
        	if (vm.dangKiemFile != null && vm.dangKiemFile.content.length > 0){
            	vm.policy.imgDKiem = vm.dangKiemFile;	
            }
    		
    		var postData = getPostData(true);
    		
    	  	vm.policy.actualValue = postData.actualValue;
	  		vm.policy.changePremium = postData.changePremium;
	  		vm.policy.garageCheck  = postData.garage;
	  		vm.policy.khaoHaoCheck = postData.khauHao;
	  		vm.policy.khauTruCheck = postData.khauTru;
	  		vm.policy.makeName = postData.manufacturer;
	  		vm.policy.matCapCheck = postData.matCap;
	  		vm.policy.modelId = postData.model;
	  		vm.policy.modelName = postData.model;
	  		vm.policy.ngapNuocCheck = postData.ngapNuoc;
	  		vm.policy.nntxCheck = postData.nntxCheck;
	  		vm.policy.passengersAccidentNumber = postData.nntxSoCho;
	  		vm.policy.passengersAccidentPremium = postData.nntxPhi;
	  		vm.policy.passengersAccidentSi = postData.nntxSoTien;
	  		vm.policy.physicalDamagePremium = postData.vcxPhi;
	  		vm.policy.physicalDamageSi = postData.vcxSoTien;
	  		vm.policy.premium = postData.premium;
	  		vm.policy.purposeOfUsageId = postData.purposeOfUsageId;
	  		vm.policy.thirdPartyPremium = postData.tndsbbPhi;
	  		vm.policy.tndsSoCho = postData.tndsSoCho;
	  		vm.policy.tndsbbCheck = postData.tndsbbCheck;
	  		vm.policy.tndstnCheck = postData.tndstnCheck;
	  		vm.policy.tndstnPhi = postData.tndstnPhi;
	  		vm.policy.tndstnSotien = postData.tndstnSoTien;
	  		vm.policy.totalPremium = postData.totalPremium;
	  		vm.policy.vcxCheck = postData.vcxCheck;
	  		vm.policy.yearOfMake = postData.namSX;
            vm.policy.receiverMoible =  postData.receiverUser.mobile;
            
            vm.policy.insuredAddress = vm.policy.insuredAddress
				+ "::" + vm.policy.insuredAddressDistrict.pkDistrict + "::" + vm.policy.insuredAddressDistrict.pkPostcode;
            
	  		// call base to create policy
	  		vm.savePolicyBase("CAR", vm.policy);
    	}
    	
        function validatorNntxSoCho() {
        	if(!vm.policy.nntxCheck) {
        		return true;
        	}
        	if(!vm.policy.nntxSoCho) {
        		return "Chưa chọn số người tham gia bảo hiểm!";
        	}
            return true;
        }
        
        function validatorVcxSoTien() {
        	if(!vm.policy.vcxCheck) {
        		return true;
        	}
        	if(!vm.policy.namSX) {
        		return true;
        	}
        	if(!vm.policy.vcxSoTien) {
        		return "Chưa điền giá trị xe tham gia bảo hiểm!";
        	}
            return true;
        }
        
        function validatorCombo(name) {
  			switch(name) {
	  			case "categoryType":
	  	        	if(!vm.policy.categoryType) {
	  	        		return "Chưa lựa chọn loại khách hàng!";
	  	        	}
	  	            return true;
  				case "tndsSoCho":
	  				if(!vm.policy.tndsbbCheck) {
	  	        		return true;
	  	        	}
	  	        	if(!vm.policy.tndsSoCho) {
	  	        		return "Chưa lựa chọn số chỗ/trọng tải xe!";
	  	        	}
	  	            return true;
	  			case "tndstnSoTien":
	  				if(!vm.policy.tndstnCheck) {
	  	        		return true;
	  	        	}
	  	        	if(!vm.policy.tndstnSoTien) {
	  	        		return "Cần lựa chọn mức trách nhiệm!";
	  	        	}
	  	            return true;
	  			case "nntxSoTien":
	  				if(!vm.policy.nntxCheck) {
	  	        		return true;
	  	        	}
	  	        	if(!vm.policy.nntxSoTien) {
	  	        		return "Cần lựa chọn mức trách nhiệm!";
	  	        	}
	  	            return true;
	  			case "manufacturer":
	  	        	if(!vm.policy.manufacturer) {
	  	        		return "Cần lựa chọn hãng xe!";
	  	        	}
	  	            return true;
	  			case "model":
	  	        	if(vm.policy.manufacturer && !vm.policy.model) {
	  	        		return "Cần lựa chọn dòng xe!";
	  	        	}
	  	            return true;
	  			case "namSX":
	  	        	if(vm.policy.model && !vm.policy.namSX) {
	  	        		return "Cần lựa chọn năm sản xuất!";
	  	        	}
	  	            return true;
	  			case "monthOfMake":
	  	        	if(vm.policy.model && !vm.policy.monthOfMake) {
	  	        		return "Cần lựa chọn tháng sản xuất!";
	  	        	}
	  	            return true;
  			}
        }
    }
})();