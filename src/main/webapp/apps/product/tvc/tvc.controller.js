(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductTvcController', ProductTvcController);

    ProductTvcController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'TvcService', 'toastr', 'ProductCommonService'];

    function ProductTvcController ($scope, $controller, Principal, $state, $rootScope, TvcService, toastr, ProductCommonService) {
    	var vm = this;
    	vm.tvcBaseVM = {
                agreementId: "",
                changePremium: null,
                contactCod: "",
                destinationId: "",
                expiredDate: "",
                gycbhNumber: "",
                inceptionDate: "",
                invoiceInfo: {
                 },
                listTvcAddBaseVM: [
                ],
                loaitien: "",
                netPremium: null,
                paymentMethod:"",
                planId:"",
                policyNumber: "",
                premium: null,
                propserCellphone: "",
                propserName: "",
                propserNgaysinh: "",
                receiveMethod: "",
                receiverUser: {
                    address: "",
                    addressDistrict: "",
                    email: "",
                    mobile: "",
                    name: ""
                },
            soNguoiThamGia: null,
            travelCareId: null,
            travelWithId: "",
            tvcPackage: ""
        };
        vm.premiumTvcVM = {};
        vm.getPremium = getPremium;
        vm.onchangePlan = onchangePlan;
        vm.getPolicyNumber = getPolicyNumber;
        vm.infoPerson = infoPerson;
        vm.onchangeReceiveMethod = false;
        vm.createNewPolicy = createNewPolicy;4
        vm.showChangePremium = showChangePremium;
        vm.isShowChangePremium = false;
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
            getPolicyNumber();

  		})();
        function showChangePremium() {
            if(vm.tvcBaseVM.destinationId != "") {
                return true;
            } else {
                return false;
            }
        }
  		// Properties & function declare

        function getPolicyNumber() {
            ProductCommonService.getPolicyNumber({lineId: 'TVC'}, onGetPolicyNumberSuccess, onGetPolicyNumberError);
        }
        function onGetPolicyNumberSuccess(result) {
            vm.tvcBaseVM.gycbhNumber  = result.policyNumber;
        }

        function onGetPolicyNumberError(result) {
            toastr.error('Get data error!', 'Error');
        }
  		// Function
        function onchangePlan() {
            getPremium();
        }
        function getPremium() {
            vm.premiumTvcVM.destination =  vm.tvcBaseVM.destinationId;
            vm.premiumTvcVM.ngayDi =  vm.tvcBaseVM.inceptionDate;
            vm.premiumTvcVM.ngayVe  =  vm.tvcBaseVM.expiredDate;
            vm.premiumTvcVM.numberOfPerson  =  1;
            vm.premiumTvcVM.planId  =  vm.tvcBaseVM.planId;
            vm.premiumTvcVM.premiumNet  =  0;
            vm.premiumTvcVM.premiumPackage  =  vm.tvcBaseVM.travelWithId;
            vm.premiumTvcVM.premiumTvc  = 0;
            if(vm.premiumTvcVM.premiumDiscount > 0 ){
                vm.premiumTvcVM.premiumDiscount = vm.premiumTvcVM.premiumDiscount;
            }else{
                vm.premiumTvcVM.premiumDiscount  = 0;
            }
            vm.premiumTvcVM.songay  = 0;
            TvcService.getPremium(vm.premiumTvcVM, onGetPremiumSuccess, onGetPremiumError);
        }
        function onGetPremiumSuccess(result) {
            vm.tvcBaseVM.premium  = result.premiumTvc;
            vm.tvcBaseVM.soNguoiThamGia  = result.numberOfPerson;
            vm.tvcBaseVM.netPremium   = result.premiumNet;
            vm.tvcBaseVM.changePremium  = result.premiumDiscount;
            if(result.premiumDiscount > 0){
                vm.isShowChangePremium = true;
                vm.sumPremiumDiscount =  vm.tvcBaseVM.netPremium - vm.tvcBaseVM.premium ;
            }


            // "premiumTvc": 104500,
            //     "premiumNet": 110000,sumPremiumDiscount
        }

        function onGetPremiumError(result) {
            toastr.error('Get data error!', 'Error');
        }
        function infoPerson() {
            vm.tvcBaseVM.listTvcAddBaseVM.push(vm.tvcAddBaseVM);
            vm.tvcAddBaseVM = {};
            console.log(vm.tvcBaseVM);
        }
        function createNewPolicy() {
            if(vm.onchangeReceiveMethod){
                vm.tvcBaseVM.receiveMethod = '1';
            }else{
                vm.tvcBaseVM.receiveMethod = '2';
            }
            vm.tvcBaseVM.invoiceInfo.name = vm.invoiceInfoData.name;
            vm.tvcBaseVM.invoiceInfo.company = vm.invoiceInfoData.company;
            vm.tvcBaseVM.invoiceInfo.taxNo = vm.invoiceInfoData.taxNo;
            vm.tvcBaseVM.invoiceInfo.address = vm.invoiceInfoData.address;
            vm.tvcBaseVM.invoiceInfo.accountNo = vm.invoiceInfoData.accountNo;
            vm.tvcBaseVM.receiverUser.name  = vm.receiverUserData.name;
            vm.tvcBaseVM.receiverUser.address  = vm.receiverUserData.address;
            vm.tvcBaseVM.receiverUser.addressDistrict  = vm.receiverUserData.addressDistrict;
            vm.tvcBaseVM.receiverUser.mobile  = vm.receiverUserData.mobile;
            vm.tvcBaseVM.receiverUser.email  = vm.receiverUserData.email;
            TvcService.createNewPolicy(vm.tvcBaseVM, onGetCreateSuccess, onGetCreateError);
        }
        function onGetCreateSuccess(result) {
        }

        function onGetCreateError(result) {
            toastr.error('Get data error!', 'Error');
        }
    }
})();
