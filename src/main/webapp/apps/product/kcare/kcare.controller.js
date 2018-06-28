(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductKcareController', ProductKcareController);

    ProductKcareController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ProductKcareService', 'ProductCommonService', 'DateUtils'];

    function ProductKcareController ($scope, $controller, Principal, $state, $rootScope, ProductKcareService, ProductCommonService, DateUtils) {
        var vm = this;

        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		vm.product = {
  			  "gioiTinh": "0",
  			  "ngayBatDau": "dd/MM/yyyy",
  			  "ngaySinh": "dd/MM/yyyy",
  			  "premiumDiscount": 0,
  			  "premiumKCare": 0,
  			  "premiumNet": 0,
  			  "typeOfKcare": ""
  			};
  		
  		vm.policy = {
  				"beneficiaryIdNumber": "",
  				"beneficiaryIdNumberD": "",
  				"beneficiaryName": "",
  				"beneficiaryNameD": "",
  				"beneficiaryNgaysinh": "",
  				"beneficiaryNgaysinhD": "",
  				"beneficiaryRelationship": "",
  				"beneficiaryRelationshipD": "",
  				"changePremium": 0,
//  				"contactCode": "DUC001",
  				"contactDob": "",
  				"contactName": "",
  				"gycbhNumber": "",
  				"insuredIdNumber": "",
  				"insuredName": "",
  				"insuredNgaysinh": "",
  				"insuredRelationship": "",
  				"insuredSex": "0",
//  				"invoiceInfo": {
//  				"accountNo": "",
//  				"address": "",
//  				"check": "0",
//  				"company": "",
//  				"name": "",
//  				"taxNo": ""
//  				},
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
//  				"receiverUser": {
//  				"address": "Hai Bà Trưng",
//  				"addressDistrict": "HN",
//  				"email": "string@gmail.com",
//  				"mobile": "0988789456",
//  				"name": "string"
//  				},
  				"thoihanden": "",
  				"thoihantu": "",
  				"totalPremium": 0.0
  				};
  		
  		vm.getPremium = getPremium;
  		vm.createPolicy = createPolicy;
  		
  		vm.getPolicyNumber = getPolicyNumber;
  		vm.changeToDate = changeToDate;
  		vm.checkedChangeBill = checkedChangeBill;
  		vm.checkQ3 = checkQ3;
  		vm.checkQ4 = checkQ4;
  		vm.checkQresultCan = checkQresultCan;
  		vm.checkQtypeCancer = checkQtypeCancer;
  		vm.checkQresultTre = checkQresultTre;
  		vm.checkQtreatment = checkQtreatment;
  		vm.onDobChange = onDobChange;

  		
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
            vm.product.ngayBatDau = DateUtils.convertDate(startDate);

            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.ngayKetThuc = DateUtils.convertDate(endDate);
            vm.registerDisableContactInfoValue('vm.product.premiumKCare');
        }
  		
  		function onDobChange() {
            var now = new Date();
            var nowStr = DateUtils.convertDate(now);
            
            var dobStr = vm.product.ngaySinh;
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
  			var type = vm.product.typeOfKcare;
  			
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
  			ProductKcareService.getPremium(vm.product, onGetPremiumSuccess, onGetPremiumError);
  			
  			function onGetPremiumSuccess(data, headers) {
                vm.loading = false;
  				vm.isShowPremium = true;
  				vm.product = data;
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
  		
  		function getPolicyNumber() {
  			console.log('getPolicyNumber');
  			ProductCommonService.getPolicyNumber({lineId: 'KCR'}, onGetPolicyNumberSuccess, onGetPolicyNumberError);
  			
  			function onGetPolicyNumberSuccess(data, headers) {
  				vm.policy.gycbhNumber = data.policyNumber;
  				
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
  				
  				createPolicy();
                vm.clearResponseError();
            }
            function onGetPolicyNumberError(error) {
                vm.validateResponse(error, 'getPolicyNumber');
            }
  		}
  		
  		function createPolicy() {
            vm.loading = true;
  			console.log('createPolicy');
  			// Append contactCode + invoiceInfo + receiverUser
  			vm.appendCommonData(vm.policy);
  			
  			// call base
  			vm.createNewPolicyBase("KCARE", vm.policy);
//  			//debugger
//  			ProductKcareService.createPolicy(vm.policy, onSuccess, onError);
//  			
//  			function onSuccess(data, headers) {
//  				vm.clearResponseError();
//                vm.loading = false;
//  				vm.policy = data;
//  				console.log(vm.policy);
//  				//toastr.success('Create Invoice Success!', 'Successful!');
//  				vm.showCreatePolicySuccessInfo();
//            }
//  			
//            function onError(error) {
//                vm.loading = false;
//                vm.validateResponse(error, 'createPolicy');
//            }
  		}
  		
  		function changeToDate() {
  			var toDate = vm.calculateToDate(vm.product.ngayBatDau);
  			vm.ngayKetThuc = toDate;
  		}
  		
    }
})();
