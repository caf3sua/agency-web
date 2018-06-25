(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavController', NavController);

    NavController.$inject = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll'
    	, '$timeout', '$window', 'Auth', '$state', 'Principal', 'ContactCommonDialogService', 'ReminderService', 'CONSTANT_REMINDER_RANGER_DATE'
    	, 'NavCommonService'];

    function NavController ($scope, $localStorage, $location, $rootScope, $anchorScroll
    		, $timeout, $window, Auth, $state, Principal, ContactCommonDialogService, ReminderService, CONSTANT_REMINDER_RANGER_DATE
    		, NavCommonService) {
    	var vm = this;
    	vm.countReminder = 0;
    	vm.maxYear = 0;
    	vm.minYear = 0;
    	vm.processing = true;
    	vm.isCanPremium = false;
    	
    	vm.products = [
    		{"lineId": "", "lineName" : "-- Chọn sản phẩm --"}, 
    		{"lineId": "CAR", "lineName" : "Bảo hiểm ô tô"}, 
    		{"lineId": "BVP", "lineName" : "Bảo Việt An Gia"},
    		{"lineId": "KCARE", "lineName" : "Bảo hiểm bệnh ung thu"},
    		{"lineId": "TVC", "lineName" : "Bảo hiểm du lịch quốc tế"},
    		{"lineId": "TVI", "lineName" : "Bảo hiểm du lịch Việt Nam"},
    		{"lineId": "MOTO", "lineName" : "Bảo hiểm xe máy"},
    		{"lineId": "HOME", "lineName" : "Bảo hiểm nhà tư nhân"},
    		{"lineId": "KHC", "lineName" : "Bảo hiểm kết hợp con người"},
    		{"lineId": "TNC", "lineName" : "Bảo hiểm tai nạn con người"},
    		{"lineId": "HHVC", "lineName" : "Bảo hiểm vận chuyển hàng hóa"}
    	];
    	vm.selProduct = "";
    	vm.premium;
    	vm.urlCreatePolicy;
    	
    	// Product
    	vm.kcare = {
    		"gioiTinh": "1",
    		"ngayBatDau": "",
    		"ngaySinh": "",
    		"premiumDiscount": 0,
    		"premiumKCare": 0,
    		"premiumNet": 0,
    		"typeOfKcare": ""
    	};
    	
    	vm.makeCars = [];
    	vm.modelCars = [];
    	vm.yearOfMakeCars = [];
    	
    	vm.car = {
    			"GARAGE": true,
    			"agencyRole": "1",
    			"changePremium": 0,
    			"garage": true,
    			"khauHao": false,
    			"khauTru": false,
    			"matCap": false,
    			"namSX": 0,
    			"ngapNuoc": false,
    			"nntxCheck": false,
    			"nntxPhi": 0,
    			"nntxSoCho": 0,
    			"nntxSoTien": 0,
    			"premium": 0,
    			"purposeOfUsageId": "15",
    			"tndsSoCho": "1",
    			"tndsbbCheck": true,
    			"tndsbbPhi": 5000000,
    			"tndstnCheck": false,
    			"tndstnPhi": 0,
    			"tndstnSoTien": 0,
    			"totalPremium": 0,
    			"vcxCheck": true,
    			"vcxPhi": 0,
    			"vcxSoTien": 0
    			};
    	
    	// KHC, TNC, HOME
    	vm.khc = {
    			"endDate": "",
    			"insuranceStartDate": "",
    			"numberMonth": 12,
    			"numberPerson": 1,
    			"premiumDiscount": 0,
    			"premiumKhc": 0,
    			"premiumKhcList": [
	    			{
	    			"dob": "",
	    			"personName": "Đức",
	    			"premiumPerson": 0
	    			}
    			],
    			"premiumNet": 0,
    			"premiumPackage": ""
    			};
    	vm.tnc = {
    			"endDate": "",
    			"insurancestartdate": "",
    			"numbermonth": 12,
    			"numberperson": "",
    			"premiumPackage": "",
    			"premiumdiscount": 0,
    			"premiumnet": 0,
    			"premiumtnc": 0
    			};
    	vm.home = {
    			"premiumDiscount": 0,
    			"premiumHome": 0,
    			"premiumNet": 0,
    			"premiumSi": 0,
    			"premiumSiin": 0,
    			"si": "",
    			"siin": "",
    			"yearBuildCode": "" // Thoi han bao hiem
    			};
    	
    	// Function declare
    	vm.logout = logout;
    	vm.calculatePremium = calculatePremium;
    	vm.onCarMakesSel = onCarMakesSel;
    	vm.onCarModelSel = onCarModelSel;
    	vm.onYearSel = onYearSel;

    	// Init controller
  		(function initController() {
  			console.log('NavController initController');
  			countReminder();
  			// Load init for car
  			NavCommonService.getCarBranches({}, getCarBranchesSuccess, getCarBranchesError);
  		})();

  		$scope.$watch('vm.khc.insuranceStartDate', function (value) {
  			console.log('change vm.khc.insuranceStartDate' + vm.khc.insuranceStartDate);
  			var isValid = moment(vm.khc.insuranceStartDate, "DD/MM/YYYY", true).isValid();
  			
  			if (isValid) {
  				var fromDateObj = moment(vm.khc.insuranceStartDate, 'DD/MM/YYYY');
  	  			var toDateObj = fromDateObj.add(1, 'y').subtract(1, 'd');
  	  			var toDate = toDateObj.format('DD/MM/YYYY');
  	  			vm.khc.endDate = toDate;
  			} else {
  				vm.khc.endDate = "";
  			}
  		});
  		
  		$scope.$watch('vm.tnc.insurancestartdate', function (value) {
  			console.log('change vm.tnc.insurancestartdate' + vm.tnc.insurancestartdate);
  			var isValid = moment(vm.tnc.insurancestartdate, "DD/MM/YYYY", true).isValid();
  			
  			if (isValid) {
  				var fromDateObj = moment(vm.tnc.insurancestartdate, 'DD/MM/YYYY');
  	  			var toDateObj = fromDateObj.add(1, 'y').subtract(1, 'd');
  	  			var toDate = toDateObj.format('DD/MM/YYYY');
  	  			vm.tnc.endDate = toDate;
  			} else {
  				vm.tnc.endDate = "";
  			}
  		});
  		
  		function getCarBranchesSuccess(result) {
  			result.forEach(function(item, index, arr) {
  				vm.makeCars.push({id: item, name: item});
  			})
    	}
  		
    	
    	function getCarBranchesError(error) {
    	}

    	function onCarMakesSel(makeId) {
    		vm.modelCars = [];
    		vm.yearOfMakeCars = [];
    		vm.car.vcxSoTien = 0;
    		NavCommonService.getCarModel({model : makeId}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				result.forEach(function(item, index, arr) {
  					vm.modelCars.push({carId: item.carId, carName: item.carName});
  	  			})
            }
            function onError(error) {
                vm.validateResponse(error, 'Get data error!');
            }
  		}
    	
    	function onCarModelSel(modelId) {
    		vm.maxYear = 0;
        	vm.minYear = 0;
        	vm.yearOfMakeCars = [];
        	vm.car.vcxSoTien = 0;
    		NavCommonService.getMaxManufactureYear({carId : modelId}, function(maxYear) {
    			vm.maxYear = maxYear.max;
        		NavCommonService.getMinManufactureYear({carId : modelId}, function(minYear) {
        			vm.minYear = minYear.min
        			for (vm.minYear; vm.minYear <= vm.maxYear; vm.minYear++){
        				vm.yearOfMakeCars.push({year: vm.minYear});
        			}
        		}, onError);
        	}, onError);
    		
            function onError(error) {
                vm.validateResponse(error, 'Get data error!');
            }
  		}
    	
    	function onYearSel(year) {
    		vm.car.vcxSoTien = 0;
    		NavCommonService.getCarPriceWithYear({carId : vm.car.modelId,year : year}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				vm.car.vcxSoTien = result.price;
            }
            function onError(error) {
                vm.validateResponse(error, 'Get data error!');
            }
  		}
    	
  		function calculatePremium() {
  			vm.isCanPremium = false;
  			vm.urlCreatePolicy = "";
  			switch(vm.selProduct){
	  	        case "KCARE":
	  	            console.log('calculate premium KCARE');
	  	            NavCommonService.getKcarePremium(vm.kcare, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.premiumKCare;
		  	            	vm.urlCreatePolicy = "product.kcare";
	  	            	}, function () {
	  	            	});
	  	            break;
	  	        case "CAR":
	  	        	console.log('calculate premium CAR');
	  	            NavCommonService.getCarPremium(vm.car, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.totalPremium;
		  	            	vm.urlCreatePolicy = "product.car";
	  	            	}, function () {
	  	            	});
	  	            break;
	  	        case "BVP":
	  	            break;
	  	        case "KHC":
	  	        	console.log('calculate premium KHC');
	  	            NavCommonService.getKhcPremium(vm.khc, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.premiumKhc;
		  	            	vm.urlCreatePolicy = "product.khc";
	  	            	}, function () {
	  	            	});
	  	            break;
	  	        case "TNC":
	  	        	console.log('calculate premium TNC');
	  	            NavCommonService.getTncPremium(vm.tnc, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.premiumtnc;
		  	            	vm.urlCreatePolicy = "product.tnc";
	  	            	}, function () {
	  	            	});
	  	            break;
		  	    case "TVC":
	  	            break;
		  	    case "TVI":
		            break;
		  	    case "HOME":
		  	    	console.log('calculate premium HOME');
	  	            NavCommonService.getHomePremium(vm.home, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.premiumHome;
		  	            	vm.urlCreatePolicy = "product.home";
	  	            	}, function () {
	  	            	});
		            break;
		  	    case "MOTO":
		            break;
		  	    case "HHVC":
		            break;
	  	        default: 
	  	            console.log('default');
	  	        break;
	  	    }
  		}
  		
  		function countReminder() {
  			ReminderService.getCountReminder({numberDay: CONSTANT_REMINDER_RANGER_DATE}, onSuccess, onError);
    		
    		function onSuccess(result) {
    			vm.countReminder = result.count;
    		}
    		function onError(result) {
    			
    		}
  		}
  		
    	function logout() {
    		console.log('logout');
            $state.go('access.signin');
        }

    }
})();
