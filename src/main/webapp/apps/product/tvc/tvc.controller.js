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
        vm.createNewPolicy = createNewPolicy;
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
            getPolicyNumber();

  		})();

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
            vm.premiumTvcVM.ngayDi =  vm.tvcBaseVM.ngayDi;
            vm.premiumTvcVM.ngayVe  =  vm.tvcBaseVM.ngayVe;
            vm.premiumTvcVM.numberOfPerson  =  1;
            vm.premiumTvcVM.planId  =  vm.tvcBaseVM.planId;
            vm.premiumTvcVM.premiumDiscount  =  0;
            vm.premiumTvcVM.premiumNet  =  0;
            vm.premiumTvcVM.premiumPackage  =  vm.tvcBaseVM.travelWithId;
            vm.premiumTvcVM.premiumTvc  = 0;
            vm.premiumTvcVM.songay  = 0;
            TvcService.getPremium(vm.premiumTvcVM, onGetPremiumSuccess, onGetPremiumError);
        }
        function onGetPremiumSuccess(result) {
            vm.tvcBaseVM.premiumTvc = result.premiumTvc;
            vm.tvcBaseVM.soNguoiThamGia  = result.numberOfPerson;
        }

        function onGetPremiumError(result) {
            toastr.error('Get data error!', 'Error');
        }
        function infoPerson() {
            vm.tvcBaseVM.listTvcAddBaseVM.push(vm.tvcAddBaseVM);
            console.log(vm.tvcBaseVM);
        }
        function createNewPolicy() {
            if(vm.onchangeReceiveMethod){
                vm.tvcBaseVM.receiveMethod = '1';
            }else{
                vm.tvcBaseVM.receiveMethod = '2';
            }
        }
    }
})();
