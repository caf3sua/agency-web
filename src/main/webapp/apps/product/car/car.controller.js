(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductCarController', ProductCarController);

    ProductCarController.$inject = ['$scope', '$controller', 'CarService', 'DateUtils', 'ProductCommonService', '$state', '$rootScope'];

    function ProductCarController ($scope, $controller, CarService, DateUtils, ProductCommonService, $state, $rootScope) {
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
//  		vm.product = {
//			"agencyRole": "1",
//			"changePremium": "",
//			"garage": false,
//			"khauHao": false,
//			"khauTru": false,
//			"matCap": false,
//			"namSX": 0,
//			"ngapNuoc": false,
//			"nntxCheck": false,
//			"nntxPhi": 0,
//			"nntxSoCho": "",
//			"nntxSoTien": "",
//			"premium": 0,
//			"purposeOfUsageId": "15",
//			"tndsSoCho": "",
//			"tndsbbCheck": false,
//			"tndsbbPhi": 0,
//			"tndstnCheck": false,
//			"tndstnPhi": 0,
//			"tndstnSoTien": "",
//			"totalPremium": 0,
//			"vcxCheck": false,
//			"vcxPhi": 0,
//			"vcxSoTien": "",
//			"chargeFree" : ""
//		};
  		
  		vm.policy = {
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
  				"changePremium":0,
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
  				"receiveMethod" : "1",
  			   	"registrationNumber":"",
  			   	"thirdPartyPremium":0,
  			   	"thoihanden":"",
  			   	"thoihantu":"",
  			   	"tndsSocho":"",
  			   	"tndsbbCheck":false,
  			   	"tndstnCheck":false,
  			   	"tndstnPhi":0,
  			    "tndstnSoTien": "",
  			   	"totalPremium":0,
  			   	"vcxCheck":false,
  			   	"yearOfMake":""
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
  			
  			// Load car branches
  			CarService.getCarBranches({}, getCarBranchesSuccess, getCarBranchesError);
            vm.registerDisableContactInfoValue('vm.policy.premium');
            
            // Edit
            if (vm.isEditMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = $state.current.data.title + '_EDIT';
            	
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		vm.loading = false;
            		vm.policy = result;
                }).catch(function(data, status) {
                	vm.loading = false;
                	vm.showWarningEditPolicy();
    		    });
            }
  		}
  		
  		function getCarBranchesSuccess(result) {
  			result.forEach(function(item, index, arr) {
  				vm.manufacturerOptions.push({id: item, name: item});
  			})
    	}
    	
    	function getCarBranchesError(error) {
    		
    	}
    	
    	function checkedChange() {
    		if((!vm.policy.tndsbbCheck && !vm.policy.tndstnCheck && !vm.policy.vcxCheck)) {
    			vm.policy.nntxCheck = false;
    		}
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
	  			case 'car-socho':
	            case 'car-tndstn-sotien':
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
	                break;
	        }
  		}
  		
  		function getPremium() {
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
    		if(vm.policy.tndstnCheck && vm.policy.tndsSoCho && vm.policy.tndstnSoTien) {
    			vm.isShowTndstnPhi = true;
    			vm.policy.tndstnPhi = result.tndstnPhi;
    		}
    		if(vm.policy.nntxCheck && vm.policy.nntxSoTien) {
    			vm.isShowNntxPhi = true;
    			vm.policy.nntxPhi = result.nntxPhi;
    		}
    		if(vm.policy.vcxCheck && vm.policy.namSX && vm.policy.vcxSoTien) {
    			vm.isShowVcxPhi = true;
    			vm.policy.vcxPhi = result.vcxPhi;
    		}
    		if(vm.policy.changePremium) {
    			vm.isShowChangePremium = true;
    			if(result.changePremium != 0) {
    				vm.policy.chargeFree = Math.round((result.totalPremium * result.changePremium) / 100);
    			}
    		}
    		if((vm.policy.tndsbbCheck && vm.policy.tndsSoCho)
    				|| vm.policy.tndstnCheck && vm.policy.tndsSoCho && vm.policy.tndstnSoTien) {
    			vm.isShowPremium = true;
          		vm.isShowTotalPremium = true;
          		vm.policy.premium = result.premium;
          		vm.policy.totalPremium = result.totalPremium;
    		}

            vm.clearResponseError();
    	}
    	
    	function onGetPremiumError(result) {
            vm.loading = false;
    		vm.clearResponseError();
            vm.validateResponse(result, 'getPremium');
    	}
    	
    	function savePolicy() {
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
	  		vm.policy.tndsSocho = postData.tndsSoCho;
	  		vm.policy.tndsbbCheck = postData.tndsbbCheck;
	  		vm.policy.tndstnCheck = postData.tndstnCheck;
	  		vm.policy.tndstnPhi = postData.tndstnPhi;
	  		vm.policy.tndstnSotien = postData.tndstnSoTien;
	  		vm.policy.totalPremium = postData.totalPremium;
	  		vm.policy.vcxCheck = postData.vcxCheck;
	  		vm.policy.yearOfMake = postData.namSX;
            vm.policy.receiverMoible =  vm.receiverUserData.mobile;
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
	  				if(!vm.policy.vcxCheck) {
	  	        		return true;
	  	        	}
	  	        	if(!vm.policy.manufacturer) {
	  	        		return "Cần lựa chọn hãng xe!";
	  	        	}
	  	            return true;
	  			case "model":
	  				if(!vm.policy.vcxCheck) {
	  	        		return true;
	  	        	}
	  	        	if(vm.policy.manufacturer && !vm.policy.model) {
	  	        		return "Cần lựa chọn dòng xe!";
	  	        	}
	  	            return true;
	  			case "namSX":
	  				if(!vm.policy.vcxCheck) {
	  	        		return true;
	  	        	}
	  	        	if(vm.policy.model && !vm.policy.namSX) {
	  	        		return "Cần lựa chọn năm sản xuất!";
	  	        	}
	  	            return true;
  			}
        }
    }
})();
