(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductTvcController', ProductTvcController);

    ProductTvcController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'TvcService', 'ProductCommonService'];

    function ProductTvcController ($scope, $controller, Principal, $state, $rootScope, TvcService, ProductCommonService) {
    	var vm = this;
    	vm.policy = {
                agreementId: "",
                changePremium: null,
                contactCode: "",
                destinationId: "",
                expiredDate: "",
                gycbhNumber: "",
                inceptionDate: "",
                invoiceInfo: {
                    check: "0",
                 },
                listTvcAddBaseVM: [
                ],
                loaitien: "",
                netPremium: 0,
                paymentMethod:"paymentMethod",
                planId:"",
                policyNumber: "",
                premium: 0,
                propserCellphone: "",
                propserName: "",
                propserNgaysinh: "",
                receiveMethod: "1",
                receiverUser: {
                    address: "",
                    addressDistrict: "",
                    email: "",
                    mobile: "",
                    name: ""
                },
            soNguoiThamGia: 0,
            travelCareId: 1,
            travelWithId: "",
            tvcPackage: ""
        };
        vm.product = {};
        vm.getPremium = getPremium;
        vm.onchangePlan = onchangePlan;
        vm.getPolicyNumber = getPolicyNumber;
        vm.infoPerson = infoPerson;
        vm.onchangeReceiveMethod = false;
        vm.createNewPolicy = createNewPolicy;
        vm.showChangePremium = showChangePremium;
        vm.addOrRemovePerson =addOrRemovePerson
        vm.addNewPerson = addNewPerson;
        vm.removePerson = removePerson;
        vm.isShowChangePremium = false;
        vm.isShowPersonList = false;
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
            getPolicyNumber();
            vm.registerDisableContactInfoValue('vm.policy.premium');

  		})();
        function showChangePremium() {
            if(vm.policy.destinationId != "") {
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
            vm.policy.gycbhNumber  = result.policyNumber;
            vm.clearResponseError();
        }

        function onGetPolicyNumberError(result) {
            vm.validateResponse(result, 'getPolicyNumber');
        }
  		// Function
        function onchangePlan() {
            getPremium();
        }
        function getPremium() {
            vm.product.destination =  vm.policy.destinationId;
            vm.product.ngayDi =  vm.policy.inceptionDate;
            vm.product.ngayVe  =  vm.policy.expiredDate;
            vm.product.numberOfPerson  =  vm.policy.soNguoiThamGia;
            vm.product.planId  =  vm.policy.planId;
            vm.product.premiumNet  =  0;
            vm.product.premiumPackage  =  vm.policy.travelWithId;
            vm.product.premiumTvc  = 0;
            if(vm.product.premiumDiscount > 0 ){
                vm.product.premiumDiscount = vm.product.premiumDiscount;
            }else{
                vm.product.premiumDiscount  = 0;
            }
            vm.product.songay  = 0;
            TvcService.getPremium(vm.product, onGetPremiumSuccess, onGetPremiumError);
        }
        function onGetPremiumSuccess(result) {
            vm.policy.premium  = result.premiumTvc;
            vm.policy.soNguoiThamGia  = result.numberOfPerson;
            vm.policy.netPremium   = result.premiumNet;
            vm.policy.changePremium  = result.premiumDiscount;
            if(result.premiumDiscount > 0){
                vm.isShowChangePremium = true;
                vm.sumPremiumDiscount =  vm.policy.netPremium - vm.policy.premium ;
            }

            vm.clearResponseError();
            // "premiumTvc": 104500,
            //     "premiumNet": 110000,sumPremiumDiscount
        }

        function onGetPremiumError(result) {
            vm.validateResponse(result, 'getPremium');
        }
        function infoPerson() {
            vm.policy.listTvcAddBaseVM.push(vm.tvcAddBaseVM);
            vm.tvcAddBaseVM = {};
            console.log(vm.policy);
        }
        function createNewPolicy() {
            if(vm.product.receiveMethod){
                vm.policy.receiveMethod = '2';
            }else{
                vm.policy.receiveMethod = '1';
            }
            vm.policy.propserName = vm.contactName;
            vm.policy.propserNgaysinh = vm.contactDob;
            vm.policy.propserCellphone  = vm.handPhone;
            vm.policy.tvcPackage = vm.policy.travelWithId;
            vm.policy.policyNumber = vm.policy.gycbhNumber;
            vm.policy.receiverMoible =  vm.receiverUserData.mobile;
            TvcService.createNewPolicy(vm.policy, onGetCreateSuccess, onGetCreateError);
            console.log(vm.policy);
        }
        function onGetCreateSuccess(result) {
            toastr.success('Create Invoice Success!', 'Successful!');
            vm.clearResponseError();
        }

        function onGetCreateError(result) {
            vm.validateResponse(result, 'createPolicy');
        }

        function addOrRemovePerson() {
            if(vm.policy.soNguoiThamGia > 0) {
                vm.isShowPersonList = true;
            } else {
                vm.isShowPersonList = false;
            }
            if(vm.policy.soNguoiThamGia> vm.policy.listTvcAddBaseVM.length) {
                addNewPerson();
            } else if(vm.policy.soNguoiThamGia< vm.policy.listTvcAddBaseVM.length) {
                removePerson();
            }
        }

        function addNewPerson() {
            var lineAdd = vm.policy.soNguoiThamGia- vm.policy.listTvcAddBaseVM.length;
            for (var i=0; i < lineAdd; i++) {
                vm.policy.listTvcAddBaseVM.push({
                    "dob": "",
                    "insuredName": "",
                    "idPasswport": null,
                    "relationship" : "",
            });
            }
        };

        function removePerson() {
            vm.policy.listTvcAddBaseVM.splice(vm.policy.soNguoiThamGia, vm.policy.listTvcAddBaseVM.length)
        };
    }
})();
