(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductBvpController', ProductBvpController);

    ProductBvpController.$inject = ['$rootScope', '$scope', '$controller', 'DateUtils', 'ProductCommonService'
    	, '$state', '$stateParams'];

    function ProductBvpController ($rootScope, $scope, $controller, DateUtils, ProductCommonService
    		, $state, $stateParams) {
    	var vm = this;
    	vm.lineId = 'BVP';
    	
        vm.tvc ={
        };
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
        vm.policy = {
  				// premium
  				"chuongTrinh": "",
  				"ngaySinh": "",
  				"tuoi": 0,
  				"ngoaitruChk": false,
  				"tncnChk": false,
  				"tncnSi": "",
  				"smcnChk": false,
  				"smcnSi": "",
  				"smcnPhi": 0,
  				"nhakhoaChk": false,
  				"thaisanChk": false,
  				"thoihanbhTu": "",
  				"qlChinhPhi": 0,
  				"phiBH": 0,
  				"premiumNet": 0,
  				"premiumDiscount": 0,
  				"pagencyRole": "1",
  				
  				// create policy
    		"chuongtrinhBh": "5",
    		"chuongtrinhPhi": 0,
    		"discount": 0,
    		"expiredDate": "",
    		"files":"",
    		"hasExtracare": false,
    		"hasNguoinhantien": false,
    		"hasNguoithuhuong": false,
    		"inceptionDate": "",
    		"lstAdd": [
	    		{
		    		"benhvienorbacsy": "",
		    		"chitietdieutri": "",
		    		"chuandoan": "",
		    		"ketqua": "",
		    		"ngaydieutri": ""
	    		},
	    		{
		    		"benhvienorbacsy": "",
		    		"chitietdieutri": "",
		    		"chuandoan": "",
		    		"ketqua": "",
		    		"ngaydieutri": ""
	    		},
	    		{
		    		"benhvienorbacsy": "",
		    		"chitietdieutri": "",
		    		"chuandoan": "",
		    		"ketqua": "",
		    		"ngaydieutri": ""
	    		}
    		],
    		"ngoaitru": "1",
    		"ngoaitruPhi": 0,
    		"nguoidbhCmnd": "",
    		"nguoidbhName": "",
    		"nguoidbhNgaysinh": "",
    		"nguoidbhQuanhe": "",
    		"nguoinhanCmnd": "",
    		"nguoinhanName": "",
    		"nguoinhanNgaysinh": "",
    		"nguoinhanQuanhe": "",
    		"nguointNgaysinh": "",
    		"nguoithCmnd": "",
    		"nguoithName": "",
    		"nguoithNgaysinh": "",
    		"nguoithQuanhe": "",
    		"nguoiycName": "",
    		"nguoiycNgaysinh": "",
    		"nhakhoa": "0",
    		"nhakhoaPhi": 0,
    		"policyNumber": "",
    		"policyParent": "",
    		"q1": "",
    		"q2": "",
    		"q3": "",
    		"receiveMethod": "1",
    		"sinhmang": "1",
    		"sinhmangPhi": 0,
    		"sinhmangPhiSi": 0,
    		"sinhmangSotienbh": 0,
    		"tanggiamPhi": 0,
    		"tanggiamPhiNoidung": "",
    		"thaisan": "0",
    		"thaisanPhi": 0,
    		"tncn": "0",
    		"tncnPhi": 0,
    		"tncnPhiSi": 0,
    		"tncnSotienbh": 0
		}
  		
  		$rootScope.nguoidbh = {
			"cmnd" : "", 
			"quanhe" : ""
		}
  		
  		$rootScope.nguoith = {
			"cmnd" : "", 
			"quanhe" : ""
		}

  		vm.onDobChange = onDobChange;
        vm.isHealthyPersonChange = isHealthyPersonChange;
  		vm.openSearchContactForPanel = openSearchContactForPanel;
        vm.processComboResult = processComboResult;
        vm.getPremium = getPremium;
        vm.savePolicy = savePolicy;
        vm.validatorCombo = validatorCombo;
        vm.insuranceTypeOptions = [
            {id: '1', name: 'Đồng'},
            {id: '2', name: 'Bạc'},
            {id: '3', name: 'Vàng'},
            {id: '4', name: 'Bạch Kim'},
            {id: '5', name: 'Kim Cương'}
        ];
        vm.siOptions = [
            {id: '50000000', name: '50 triệu'},
            {id: '100000000', name: '100 triệu'},
            {id: '200000000', name: '200 triệu'},
            {id: '300000000', name: '300 triệu'},
            {id: '400000000', name: '400 triệu'},
            {id: '500000000', name: '500 triệu'},
            {id: '600000000', name: '600 triệu'},
            {id: '700000000', name: '700 triệu'},
            {id: '800000000', name: '800 triệu'},
            {id: '900000000', name: '900 triệu'},
            {id: '1000000000', name: '1 tỷ'}
        ];
        vm.relationOptions = [
            {id: '30', name: 'Bản thân'},
            {id: '31', name: 'Vợ/Chồng'},
            {id: '32', name: 'Con'},
            {id: '33', name: 'Bố/Mẹ'},
            {id: '34', name: 'Bố mẹ của Vợ/Chồng'}
        ];
        vm.relationOptions = [
            {id: 'New', name: 'Mới'},
            {id: 'Reuse', name: 'Tái tục'}
        ];

        vm.isShowPersonList = false;
        vm.isShowPremium = false;
        vm.isShowTotalPremium = false;
        vm.isHealthyPerson = false;

        // Initialize
        init();

        // Function
        function init() {
            var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.policy.thoihanbhTu = DateUtils.convertDate(startDate);

            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.policy.thoihanbhDen = DateUtils.convertDate(endDate);

            vm.registerDisableContactInfoValue('vm.policy.phiBH');

            // Edit
            if (vm.isEditMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = $state.current.data.title + '_EDIT';
            	
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		// Format to display and calculate premium again
            		formatEditData(result);
            		
            		vm.loading = false;
            		vm.policy = result;
            		// Open view and step - calculate premium again
            		getPremium();
            		vm.nextCount = 2;
            		formatAddressEdit();
                }).catch(function(data, status) {
                	vm.loading = false;
                	vm.showWarningEditPolicy();
    		    });
            }
        }
        
        function formatEditData(result) {
  		}
        
        function formatAddressEdit() {
  			// Address at step 2
  			var receiverAddress = vm.policy.receiverUser.address;
  			vm.policy.receiverUser.address = vm.formatAddressEdit(receiverAddress);
  			vm.getAddressByPostCode(receiverAddress).then(function (data) {
  				vm.policy.receiverUser.addressDistrictData = data;
    		});
  			
  			// extra
  		}
        
        // watch
        $scope.$watch('$root.nguoith', function () {
        	vm.policy.nguoithCmnd = $rootScope.nguoith.cmnd;
        	vm.policy.nguoithQuanhe = $rootScope.nguoith.quanhe;
  		}, true);
        
        $scope.$watch('$root.nguoidbh', function () {
        	vm.policy.nguoidbhCmnd = $rootScope.nguoidbh.cmnd;
        	vm.policy.nguoidbhQuanhe = $rootScope.nguoidbh.quanhe;
  		}, true);
        
        $scope.$on('selectedContactChange', function() {
            if ($rootScope.selectedContact != undefined && $rootScope.selectedContact != null) {
                switch (vm.panelType) {
                    case 'contact':
                    	vm.policy.nguoiycName = $rootScope.selectedContact.contactName;
                    	vm.policy.nguoiycNgaysinh = $rootScope.selectedContact.dateOfBirth;
                        break;
                    case 'insured':
                    	vm.policy.nguoidbhName = $rootScope.selectedContact.contactName;
                    	vm.policy.nguoidbhNgaysinh = $rootScope.selectedContact.dateOfBirth;
                        break;
                    case 'requirement':
                    	vm.policy.nguoithName = $rootScope.selectedContact.contactName;
                    	vm.policy.nguoithNgaysinh = $rootScope.selectedContact.dateOfBirth;
                        break;
                }
            }
        });
        
        function isHealthyPersonChange() {
        	if(vm.isHealthyPerson) {
        		vm.policy.q1 = "";
        		vm.policy.q2 = "";
        		vm.policy.q3 = "";
        	}
        }
        
        function onDobChange() {
        	var now = new Date();
            var nowStr = DateUtils.convertDate(now);
            vm.policy.tuoi = DateUtils.yearDiff(vm.policy.ngaySinh, nowStr);
            
            if(vm.policy.chuongTrinh) {
            	getPremium();
            }
        }
        
        function processComboResult(data, type) {
            console.log(data);
            switch(type){
                case 'bvp-insurance-type':
                case 'bvp-tncn':
            	case 'bvp-smcn':
                    getPremium();
                    break;
            }
        }

        function getPremium() {
            var postData = getPostData(false);

            if(postData.chuongTrinh) {
            	vm.loading = true;
            	ProductCommonService.getBvpPremium(postData, onGetPremiumSuccess, onGetPremiumError);
            } else {
                vm.policy.premiumNet = 0;
                vm.policy.phiBH = 0;
            }
        }

        function getPostData() {
            var postData = Object.assign({}, vm.policy);
            
            if(postData.chuongTrinh == 1 || postData.chuongTrinh == 2 || postData.chuongTrinh == 3) {
            	postData.thaisanChk = false;
            }
            
            if(postData.tncnSi == "") {
            	postData.tncnChk = false;
            	postData.tncnSi = 0;
            }
            if(postData.smcnSi == "") {
            	postData.smcnChk = false;
            	postData.smcnSi = 0;
            }
            
            return postData;
        }

        function onGetPremiumSuccess(result) {
            vm.loading = false;
            vm.policy.premiumNet = result.premiumNet;
            vm.policy.phiBH = result.phiBH;
            vm.policy.qlChinhPhi = result.qlChinhPhi;
            vm.policy.ngoaitruPhi = result.ngoaitruPhi;
            vm.policy.tncnPhi = result.tncnPhi;
            vm.policy.nhakhoaPhi = result.nhakhoaPhi;
            vm.policy.sinhmangPhi = result.smcnPhi;


            if(vm.policy.chuongTrinh) {
                vm.isShowPremium = true;
                vm.isShowTotalPremium = true;
            } else {
                vm.isShowPremium = false;
                vm.isShowTotalPremium = false;
            }

            vm.clearResponseError();
        }

        function onGetPremiumError(result) {
            vm.loading = false;
            vm.validateResponse(result, 'getPremium');
        }

        function savePolicy() {
            var postData = getPostData(true);
            
            if(vm.isHealthyPerson) {
        		vm.policy.q1 = "0";
        		vm.policy.q2 = "0";
        		vm.policy.q3 = "0";
        	}
            
            vm.policy.chuongtrinhBh = postData.chuongTrinh;
            vm.policy.chuongtrinhPhi = vm.policy.qlChinhPhi;
            vm.policy.expiredDate = postData.thoihanbhDen;
            vm.policy.inceptionDate = postData.thoihanbhTu;
            vm.policy.ngoaitruPhi =vm.policy.ngoaitruPhi;
            vm.policy.tncnPhi =vm.policy.tncnPhi;
            vm.policy.smcnPhi =vm.policy.smcnPhi;
            vm.policy.nhakhoaPhi =vm.policy.nhakhoaPhi;
            vm.policy.sinhmangPhi = postData.sinhmangPhi;


            
            if(vm.policy.ngoaitruChk) {
            	vm.policy.ngoaitru = '1';
            } else {
            	vm.policy.ngoaitru = '0';
            }
            
            if(vm.policy.nhakhoaChk) {
            	vm.policy.nhakhoa = '1';
            } else {
            	vm.policy.nhakhoa = '0';
            }
            
            if(vm.policy.smcnChk) {
            	vm.policy.sinhmang = '1';
            	vm.policy.sinhmangSotienbh = vm.policy.smcnSi;
            } else {
            	vm.policy.sinhmang = '0';
            	vm.policy.sinhmangSotienbh = 0;
            }
            
            if(vm.policy.tncnChk) {
            	vm.policy.tncn = '1';
            	vm.policy.tncnSotienbh = vm.policy.tncnSi;
            } else {
            	vm.policy.tncn = '0';
            	vm.policy.tncnSotienbh = 0;
            }
            
//            vm.policy.nguoidbhCmnd = $rootScope.nguoidbh.cmnd;
//            vm.policy.nguoidbhQuanhe = $rootScope.nguoidbh.quanhe;
//            vm.policy.nguoithCmnd = $rootScope.nguoith.cmnd;
//            vm.policy.nguoithQuanhe = $rootScope.nguoith.quanhe;

            vm.savePolicyBase("BVP", vm.policy);
        }
        
        function openSearchContactForPanel(type) {
            vm.panelType = type;
            vm.openSearchContact();
        }

        function onGetPolicyNumberSuccess(result) {
            vm.policy.gycbhNumber  = result.policyNumber;
            vm.clearResponseError();
        }

        function onGetPolicyNumberError(result) {
            vm.validateResponse(result, 'getPolicyNumber');
        }
        
        function validatorCombo(name) {
  			switch(name) {
	  			case "chuongTrinh":
	  	        	if(!vm.policy.chuongTrinh) {
	  	        		return "Cần lựa chọn chương trình bảo hiểm!";
	  	        	}
	  	            return true;
	  			case "tncnSi":
	  				if(!vm.policy.tncnChk) {
	  	        		return true;
	  	        	}
	  	        	if(!vm.policy.tncnSi) {
	  	        		return "Cần lựa chọn số tiền bảo hiểm tai nạn cá nhân!";
	  	        	}
	  	            return true;
	  			case "smcnSi":
	  				if(!vm.policy.smcnChk) {
	  	        		return true;
	  	        	}
	  	        	if(!vm.policy.smcnSi) {
	  	        		return "Cần lựa chọn số tiền bảo hiểm sinh mạng cá nhân!";
	  	        	}
	  	            return true;
  			}
        }
    }
})();
