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
  				"beneficiaryIdNumber": "string",
  				"beneficiaryIdNumberD": "string",
  				"beneficiaryName": "string",
  				"beneficiaryNameD": "string",
  				"beneficiaryNgaysinh": "01/05/1982",
  				"beneficiaryNgaysinhD": "01/05/1982",
  				"beneficiaryRelationship": "31",
  				"beneficiaryRelationshipD": "31",
  				"changePremium": 0,
  				"contactCode": "DUC001",
  				"contactDob": "24/04/1988",
  				"contactName": "Tên đó",
  				"gycbhNumber": "ITSOL.KCR.18.127",
  				"insuredIdNumber": "09874564132",
  				"insuredName": "Cũng là Tên",
  				"insuredNgaysinh": "01/05/1982",
  				"insuredRelationship": "32",
  				"insuredSex": "1",
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
  				"benhvienorbacsy": "string",
  				"bvSysdate": "18/05/2018",
  				"chitietdieutri": "string",
  				"chuandoan": "string",
  				"congtybh": "string",
  				"dkdacbiet": "string",
  				"id": "string",
  				"idThamchieu": "string",
  				"ketqua": "string",
  				"khuoctu": "string",
  				"lydodc": "string",
  				"lydoycbt": "string",
  				"masanpham": "string",
  				"ngaybatdau": "18/05/2018",
  				"ngaydieutri": "18/05/2018",
  				"ngayhethan": "18/05/2018",
  				"ngayycbt": "18/05/2018",
  				"questionThamchieu": "string",
  				"sohd": "string",
  				"sotienbh": 0,
  				"sotienycbt": 0
  				}
  				],
  				"netPremium": 0,
  				"planId": "PGM3",
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
  				"thoihanden": "30/04/2018",
  				"thoihantu": "18/05/2018",
  				"totalPremium": 1170000.0
  				};
  		
  		vm.getPremium = getPremium;
  		vm.createPolicy = createPolicy;
  		
  		vm.getPolicyNumber = getPolicyNumber;
  		vm.changeToDate = changeToDate;
  		vm.checkedChangeBill = checkedChangeBill;

  		
  		var ngayKetThuc = "";
  		var tuoi = "";
  		vm.isShowBill1 = false;
  		vm.isShowBill2 = false;
  		vm.isShowBill3 = false;
  		vm.isShowPremium = false;
  		
  		// Initialize
  		
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
