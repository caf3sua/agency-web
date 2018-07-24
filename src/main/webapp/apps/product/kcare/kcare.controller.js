(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductKcareController', ProductKcareController);

    ProductKcareController.$inject = ['$scope', '$controller', 'Principal', '$state', 'ProductCommonService', 'DateUtils'];

    function ProductKcareController ($scope, $controller, Principal, $state, ProductCommonService, DateUtils) {
        var vm = this;
        vm.lineId = 'KCR';

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
  				  "gioiTinh": "0",
				  "ngayBatDau": "",
				  "ngaySinh": "",
				  "premiumDiscount": 0,
				  "premiumKCare": 0,
				  "premiumNet": 0,
				  "typeOfKcare": "",
  				// create
  				"beneficiaryIdNumber": "",
  				"beneficiaryIdNumberD": "",
  				"beneficiaryName": "",
  				"beneficiaryNameD": "",
  				"beneficiaryNgaysinh": "",
  				"beneficiaryNgaysinhD": "",
  				"beneficiaryRelationship": "",
  				"beneficiaryRelationshipD": "",
  				"changePremium": 0,
  				"contactDob": "",
  				"contactName": "",
  				"gycbhNumber": "",
  				"insuredIdNumber": "",
  				"insuredName": "",
  				"insuredNgaysinh": "",
  				"insuredRelationship": "",
  				"insuredSex": "0",
  				"lstTinhtrangSKs": [
	  				{
	  				"benhvienorbacsy": "",
	  				"bvSysdate": "",
	  				"chitietdieutri": "",
	  				"chuandoan": "",
	  				"congtybh": "",
	  				"dkdacbiet": "",
	  				"id": "",
	  				"idThamchieu": "",
	  				"ketqua": "",
	  				"khuoctu": "",
	  				"lydodc": "",
	  				"lydoycbt": "",
	  				"masanpham": "",
	  				"ngaybatdau": "",
	  				"ngaydieutri": "",
	  				"ngayhethan": "",
	  				"ngayycbt": "",
	  				"questionThamchieu": "",
	  				"sohd": "",
	  				"sotienbh": 0,
	  				"sotienycbt": 0
	  				},
	  				{
	  				"benhvienorbacsy": "",
	  				"bvSysdate": "",
	  				"chitietdieutri": "",
	  				"chuandoan": "",
	  				"congtybh": "",
	  				"dkdacbiet": "",
	  				"id": "",
	  				"idThamchieu": "",
	  				"ketqua": "",
	  				"khuoctu": "",
	  				"lydodc": "",
	  				"lydoycbt": "",
	  				"masanpham": "",
	  				"ngaybatdau": "",
	  				"ngaydieutri": "",
	  				"ngayhethan": "",
	  				"ngayycbt": "",
	  				"questionThamchieu": "",
	  				"sohd": "",
	  				"sotienbh": 0,
	  				"sotienycbt": 0
	  				}
  				],
  				"netPremium": 0,
  				"planId": "",
  				"policyNumber": "",
  				"q1": "0",
  				"q2": "0",
  				"q3": "0",
  				"q4": "0",
  				"q5": "0",
  				"qresultCan": "0",
  				"qresultTre": "0",
  				"qtreatment": "0",
  				"qtypeCancer": "0",
  				"receiveMethod": "1",
  				"thoihanden": "",
  				"thoihantu": "",
  				"totalPremium": 0.0
  				};
  		
  		vm.getPremium = getPremium;
  		vm.savePolicy = savePolicy;
  		
  		vm.changeToDate = changeToDate;
  		vm.checkedChangeBill = checkedChangeBill;
  		vm.checkQ3 = checkQ3;
  		vm.checkQ4 = checkQ4;
  		vm.checkQresultCan = checkQresultCan;
  		vm.checkQtypeCancer = checkQtypeCancer;
  		vm.checkQresultTre = checkQresultTre;
  		vm.checkQtreatment = checkQtreatment;
  		vm.onDobChange = onDobChange;
        vm.changeNTH = changeNTH;
  		var ngayKetThuc = "";
  		var tuoi = "";
  		vm.isShowBill1 = false;
  		vm.isShowBill2 = false;
  		vm.isShowBill3 = false;
  		vm.isShowPremium = false;
  		vm.isq4 = false;
  		
  		// Initialize
  		init();
  		
  		// Function
        function init() {
            var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.policy.ngayBatDau = DateUtils.convertDate(startDate);

            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.ngayKetThuc = DateUtils.convertDate(endDate);
            vm.registerDisableContactInfoValue('vm.policy.premiumKCare');
            
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
  		
  		function onDobChange() {
            var now = new Date();
            var nowStr = DateUtils.convertDate(now);
            
            var dobStr = vm.policy.ngaySinh;
            // var dobStr = DateUtils.convertDate(dob);
            
            vm.tuoi = DateUtils.yearDiff(dobStr, nowStr);
        }
  		
  		function checkQ3() {
  			var check = vm.policy.q3;
  			
  			if (check == true) {
  		  		vm.policy.qresultCan = false;
  		  		vm.policy.qresultTre = false;
  		  		vm.policy.qtreatment = false;
  		  		vm.policy.qtypeCancer = false;
  			}
  		}
  		
  		function checkQ4() {
  			var check = vm.policy.q4;
  			
  			if (check == true) {
  				vm.isq4 = true;
  			} else {
  				vm.isq4 = false;
  			}
  		}
  		
  		function checkQtreatment() {
  			var check = vm.policy.qtreatment;
  			
  			if (check == true) {
  				vm.policy.q3 = false;
  			} 
  		}
  		
  		function checkQresultTre() {
  			var check = vm.policy.qresultTre;
  			
  			if (check == true) {
  				vm.policy.q3 = false;
  			} 
  		}
  		
  		function checkQtypeCancer() {
  			var check = vm.policy.qtypeCancer;
  			
  			if (check == true) {
  				vm.policy.q3 = false;
  			} 
  		}
  		
  		function checkQresultCan() {
  			var check = vm.policy.qresultCan;
  			
  			if (check == true) {
  				vm.policy.q3 = false;
  			} 
  		}
  		
  		function checkedChangeBill() {
  			var type = vm.policy.typeOfKcare;
  			
  			if (type == "PGM1") {
  				vm.isShowBill1 = true;
  		  		vm.isShowBill2 = false;
  		  		vm.isShowBill3 = false;
  			} else if (type == "PGM2") {
  				vm.isShowBill1 = false;
  		  		vm.isShowBill2 = true;
  		  		vm.isShowBill3 = false;
  			} else if (type == "PGM3") {
  				vm.isShowBill1 = false;
  		  		vm.isShowBill2 = false;
  		  		vm.isShowBill3 = true;
  			} else {
  				vm.isShowBill1 = false;
  		  		vm.isShowBill2 = false;
  		  		vm.isShowBill3 = false;
  			}
  			
  			getPremium();
  		}

  		function getPremium() {
            vm.loading = true;
            ProductCommonService.getKcarePremium(vm.policy, onGetPremiumSuccess, onGetPremiumError);
  			
  			function onGetPremiumSuccess(data, headers) {
                vm.loading = false;
  				vm.isShowPremium = true;
  				vm.policy = data;
  				vm.policy.thoihantu = data.ngayBatDau;
  				vm.policy.thoihanden = vm.ngayKetThuc;
  				vm.policy.changePremium = data.premiumDiscount;
  				vm.policy.netPremium = data.premiumNet;
  				vm.policy.totalPremium = data.premiumKCare;
  				vm.policy.planId = data.typeOfKcare;
                vm.policy.insuredNgaysinh = data.ngaySinh;
                vm.clearResponseError();
  	    	}
  	    	
  	    	function onGetPremiumError(error) {
                vm.loading = false;
  	    		vm.isShowPremium = false;
                vm.validateResponse(error, 'getPremium');
  	    	}
  		}
  		
  		function savePolicy() {
            vm.loading = true;
  			console.log('createPolicy');
            
            if(vm.policy.q1 == false){
                vm.policy.q1 = 0;
            } else {
                vm.policy.q1 = 1;
            }

            if(vm.policy.q2 == false){
                vm.policy.q2 = 0;
            } else {
                vm.policy.q2 = 1;
            }

            if(vm.policy.q3 == false){
                vm.policy.q3 = 0;
            } else {
                vm.policy.q3 = 1;
            }

            if(vm.policy.q4 == false){
                vm.policy.q4 = 0;
            } else {
                vm.policy.q4 = 1;
            }

            if(vm.policy.q5 == false){
                vm.policy.q5 = 0;
            } else {
                vm.policy.q5 = 1;
            }

            if(vm.policy.qresultCan == false){
                vm.policy.qresultCan = 0;
            } else {
                vm.policy.qresultCan = 1;
            }

            if(vm.policy.qresultTre == false){
                vm.policy.qresultTre = 0;
            } else {
                vm.policy.qresultTre = 1;
            }

            if(vm.policy.qtreatment == false){
                vm.policy.qtreatment = 0;
            } else {
                vm.policy.qtreatment = 1;
            }

            if(vm.policy.qtypeCancer == false){
                vm.policy.qtypeCancer = 0;
            } else {
                vm.policy.qtypeCancer = 1;
            }

  			// call base
  			vm.savePolicyBase("KCR", vm.policy);
  		}
  		
  		function changeToDate() {
  			var toDate = vm.calculateToDate(vm.policy.ngayBatDau);
  			vm.ngayKetThuc = toDate;
  		}
  		function changeNTH(data) {
            if(data == true){
                vm.policy.beneficiaryNameD = vm.policy.beneficiaryName ;
                vm.policy.beneficiaryNgaysinhD = vm.policy.beneficiaryNgaysinh;
                vm.policy.beneficiaryIdNumberD = vm.policy.beneficiaryIdNumber;
                vm.policy.beneficiaryRelationshipD = vm.policy.beneficiaryRelationship;
            }else{
                vm.policy.beneficiaryNameD = "" ;
                vm.policy.beneficiaryNgaysinhD = "";
                vm.policy.beneficiaryIdNumberD = "";
                vm.policy.beneficiaryRelationshipD = "";
            }
        }
    }
})();
