(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductCarController', ProductCarController);

    ProductCarController.$inject = ['$scope', '$controller', 'CarService', '$state', '$rootScope'];

    function ProductCarController ($scope, $controller, CarService, $state, $rootScope) {
        var vm = this;

        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		vm.productCar = {
			"agencyRole": "1",
			"changePremium": "",
			"garage": false,
			"khauHao": false,
			"khauTru": false,
			"matCap": false,
			"namSX": 0,
			"ngapNuoc": false,
			"nntxCheck": false,
			"nntxPhi": 0,
			"nntxSoCho": "",
			"nntxSoTien": "",
			"premium": 0,
			"purposeOfUsageId": "15",
			"tndsSoCho": "",
			"tndsbbCheck": false,
			"tndsbbPhi": 0,
			"tndstnCheck": false,
			"tndstnPhi": 0,
			"tndstnSoTien": "",
			"totalPremium": 0,
			"vcxCheck": false,
			"vcxPhi": 0,
			"vcxSoTien": "",
			"chargeFree" : ""
		};
  		
  		vm.policy = {  
			"actualValue":8929000000,
			"changePremium":0,
			"chassisNumber":"",
			"contactCode":"4857",
			"engineNumber":"",
			"garageCheck":true,
			"insuredAddress":"",
			"insuredName":"",
			"invoiceInfo":{  
				"accountNo":"",
				"address":"",
				"check":"0",
				"company":"",
				"name":"",
				"taxNo":""
			},
			"khaoHaoCheck":true,
			"khauTruCheck":true,
			"makeId":"1",
			"makeName":"MERCEDES-BENZ",
			"matCapCheck":true,
			"modelId":"S63",
			"modelName":"S 63",
			"ngapNuocCheck":true,
			"nntxCheck":true,
			"passengersAccidentNumber":5,
			"passengersAccidentPremium":1000000,
			"passengersAccidentSi":200000000,
			"physicalDamagePremium":179544332,
			"physicalDamageSi":8929000000,
			"policyNumber":"",
			"premium":181734532,
			"purposeOfUsageId":"15",
			"receiveMethod" : "1",
			"receiverUser":{  
				"address":"Xã Hưng Thịnh",
				"addressDistrict":"string",
				"email":"a@gmail.com",
				"mobile":"0123456789",
				"name":"Nguyễn Văn 0"
			},
		   	"registrationNumber":"1212121",
		   	"thirdPartyPremium":480700,
		   	"thoihanden":"18/05/2019",
		   	"thoihantu":"19/05/2018",
		   	"tndsSocho":"1",
		   	"tndsbbCheck":true,
		   	"tndstnCheck":true,
		   	"tndstnPhi":709500,
		   	"tndstnSotien":150000000,
		   	"totalPremium":181734532,
		   	"type":"ONL",
		   	"vcxCheck":true,
		   	"yearOfMake":"2016"
		}
  		
  		vm.showChangePremium = showChangePremium;
  		vm.disableExtendedInsurance = disableExtendedInsurance;
  		vm.processComboResult = processComboResult;
  		vm.checkedChange = checkedChange;
  		vm.getPremium = getPremium;
  		vm.createNewPolicy = createNewPolicy;
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
  			// Load car branches
  			CarService.getCarBranches({}, getCarBranchesSuccess, getCarBranchesError);
  		}
  		
  		function getName(id, datas) {
  			var filterObj = datas.filter(function(e) {
  			  return e.id == id;
  			});
  			return filterObj.name;
  		}
  		
  		function getCarBranchesSuccess(result) {
  			result.forEach(function(item, index, arr) {
  				vm.manufacturerOptions.push({id: item, name: item});
  			})
    	}
    	
    	function getCarBranchesError(error) {
    		
    	}
    	
    	function checkedChange() {
    		if((!vm.productCar.tndsbbCheck && !vm.productCar.tndstnCheck && !vm.productCar.vcxCheck)) {
    			vm.productCar.nntxCheck = false;
    		}
    	}
  		
  		function showChangePremium() {
  			if((vm.productCar.tndsbbCheck && vm.productCar.tndsSoCho)
  					|| (vm.productCar.tndstnCheck && vm.productCar.tndsSoCho)) {
  				return true;
  			} else {
  				return false;
  			}
  		}
  		
  		function disableExtendedInsurance() {
  			if((!vm.productCar.tndsbbCheck && !vm.productCar.tndstnCheck && !vm.productCar.vcxCheck) 
  					|| (vm.productCar.tndsbbCheck && !vm.productCar.tndsSoCho)
  					|| (vm.productCar.tndstnCheck && !vm.productCar.tndsSoCho)) {
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
	            	vm.productCar.model = '';
	            	vm.productCar.namSX = '';
	            	vm.productCar.actualValue = '';
	            	vm.productCar.vcxSoTien = '';
	            	data.forEach(function(item, index, arr) {
	      				vm.modelOptions.push({id: item.carId, name: item.carName});
	      			})
	                break;
	            case 'car-model':
	            	vm.yearOptions = [];
	            	vm.productCar.namSX = '';
	            	vm.productCar.actualValue = '';
	            	vm.productCar.vcxSoTien = '';
	            	for(var i = data.min; i <= data.max; i++) {
	            		vm.yearOptions.push({id: i + ":" + vm.productCar.model, name: i});
	            	}
	                break;
	            case 'car-year':
	            	vm.productCar.vcxSoTien = '';
	            	vm.productCar.actualValue = data.price;
	                break;
	        }
  		}
  		
  		function getPremium() {
  			var postData = getPostData(false);
  			CarService.getPremium(postData, onGetPremiumSuccess, onGetPremiumError);
  		}
  		
  		function getPostData(isCreate) {
  			var postData = Object.assign({}, vm.productCar);
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
    		if(vm.productCar.tndsbbCheck && vm.productCar.tndsSoCho) {
    			vm.isShowTndsbbPhi = true;
    			vm.productCar.tndsbbPhi = result.tndsbbPhi;
    		}
    		if(vm.productCar.tndstnCheck && vm.productCar.tndsSoCho && vm.productCar.tndstnSoTien) {
    			vm.isShowTndstnPhi = true;
    			vm.productCar.tndstnPhi = result.tndstnPhi;
    		}
    		if(vm.productCar.nntxCheck && vm.productCar.nntxSoTien) {
    			vm.isShowNntxPhi = true;
    			vm.productCar.nntxPhi = result.nntxPhi;
    		}
    		if(vm.productCar.vcxCheck && vm.productCar.namSX && vm.productCar.vcxSoTien) {
    			vm.isShowVcxPhi = true;
    			vm.productCar.vcxPhi = result.vcxPhi;
    		}
    		if(vm.productCar.changePremium) {
    			vm.isShowChangePremium = true;
    			if(result.changePremium != 0) {
    				vm.productCar.chargeFree = Math.round((result.totalPremium * result.changePremium) / 100);
    			}
    		}
    		if((vm.productCar.tndsbbCheck && vm.productCar.tndsSoCho)
    				|| vm.productCar.tndstnCheck && vm.productCar.tndsSoCho && vm.productCar.tndstnSoTien) {
    			vm.isShowPremium = true;
          		vm.isShowTotalPremium = true;
          		vm.productCar.premium = result.premium;
          		vm.productCar.totalPremium = result.totalPremium;
    		}
    	}
    	
    	function onGetPremiumError(result) {
    		
    	}
    	
    	function createNewPolicy() {
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
	  		if(postData.receiveMethod) {
	  			vm.policy.receiveMethod = "2";
	  		} else {
	  			vm.policy.receiveMethod = "1";
	  		}
	  		vm.policy.thirdPartyPremium = postData.tndsbbPhi;
	  		vm.policy.tndsSocho = postData.tndsSoCho;
	  		vm.policy.tndsbbCheck = postData.tndsbbCheck;
	  		vm.policy.tndstnCheck = postData.tndstnCheck;
	  		vm.policy.tndstnPhi = postData.tndstnPhi;
	  		vm.policy.tndstnSotien = postData.tndstnSoTien;
	  		vm.policy.totalPremium = postData.totalPremium;
	  		vm.policy.type = "ONL";
	  		vm.policy.vcxCheck = postData.vcxCheck;
	  		vm.policy.yearOfMake = postData.namSX;
	  		
	  		CarService.createNewPolicy(vm.policy, onCreatePolicySuccess, onCreatePolicyError);
    	}
    	
    	function onCreatePolicySuccess(result) {
    		
    	}
    	
    	function onCreatePolicyError(result) {
    		
    	}
    }
})();
