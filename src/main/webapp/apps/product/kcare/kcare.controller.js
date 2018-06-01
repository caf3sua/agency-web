(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductKcareController', ProductKcareController);

    ProductKcareController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ProductKcareService', 'ProductCommonService'];

    function ProductKcareController ($scope, $controller, Principal, $state, $rootScope, ProductKcareService, ProductCommonService) {
        var vm = this;

        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		vm.premium = {
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
  				"contactCode": "DUC001",
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
  		vm.checkQresultCan = checkQresultCan;
  		vm.checkQtypeCancer = checkQtypeCancer;
  		vm.checkQresultTre = checkQresultTre;
  		vm.checkQtreatment = checkQtreatment;

  		
  		var ngayKetThuc = "";
  		var tuoi = "";
  		vm.isShowBill1 = false;
  		vm.isShowBill2 = false;
  		vm.isShowBill3 = false;
  		vm.isShowPremium = false;
  		
  		vm.isCheckQresultCan = false;
  		vm.isCheckQtypeCancer = false;
  		vm.isCheckQresultTre = false;
  		vm.isCheckQtreatment = false;
  		vm.isCheckQ3 = false;
  		
  		// Initialize
  		function checkQ3() {
  			var check = vm.policy.q3;
  			
  			if (check == true) {
  		  		vm.policy.qresultCan = false;
  		  		vm.policy.qresultTre = false;
  		  		vm.policy.qtreatment = false;
  		  		vm.policy.qtypeCancer = false;
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
  			var type = vm.premium.typeOfKcare;
  			
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
  			ProductKcareService.getPremium(vm.premium, onGetPremiumSuccess, onGetPremiumError);
  			
  			function onGetPremiumSuccess(data, headers) {
  				vm.isShowPremium = true;
  				vm.premium = data;
  				vm.policy.thoihantu = data.ngayBatDau;
  				vm.policy.thoihanden = vm.ngayKetThuc;
  				vm.policy.changePremium = data.premiumDiscount;
  				vm.policy.netPremium = data.premiumNet;
  				vm.policy.totalPremium = data.premiumKCare;
  				vm.policy.planId = data.typeOfKcare;
  	    	}
  	    	
  	    	function onGetPremiumError(error) {
  	    		vm.isShowPremium = false;
  	    	}
  		}
  		
  		function getPolicyNumber() {
  			console.log('getPolicyNumber');
  			ProductCommonService.getPolicyNumber({lineId: 'KCR'}, onGetPolicyNumberSuccess, onGetPolicyNumberError);
  			
  			function onGetPolicyNumberSuccess(data, headers) {
  				vm.policy.gycbhNumber = data.policyNumber;
  				createPolicy();
            }
            function onGetPolicyNumberError(error) {
                console.log(error.data.message);
            }
  		}
  		
  		function createPolicy() {
  			console.log('createPolicy');
  			// Append contactCode + invoiceInfo + receiverUser
  			vm.appendCommonData(vm.policy);
  			
  			//debugger
  			ProductKcareService.createPolicy(vm.policy, onSuccess, onError);
  			
  			function onSuccess(data, headers) {
  				vm.policy = data;
  				console.log(vm.policy);
  				toastr.success('Create Invoice Success!', 'Successful!');
            }
  			
            function onError(error) {
            	toastr.error('Create Invoice Error!', 'Error');
            }
  		}
  		
  		function changeToDate() {
  			var toDate = vm.calculateToDate(vm.premium.ngayBatDau);
  			vm.ngayKetThuc = toDate;
  		}
  		
    }
})();
