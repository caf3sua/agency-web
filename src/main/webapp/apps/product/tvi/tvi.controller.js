(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductTvcController', ProductTvcController);

    ProductTvcController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'TvcService', 'toastr', 'ProductCommonService'];

    function ProductTvcController ($scope, $controller, Principal, $state, $rootScope, TvcService, toastr, ProductCommonService) {
        var vm = this;
        vm.policy = {
            bankId: "",
            changePremium: 0,
            contactCode: "",
            dateOfPayment: "",
            departureId: "",
            destinationId: "1",
            expiredDate: "",
            feeReceive: 0,
            gycbhNumber: "",
            inceptionDate: "",
            invoiceInfo: {},
            listTviAdd: [
            {
                address: "",
                cellPhone: "",
                city: "",
                dayTreatment: "",
                detailTreatment: "",
                diagnose: "",
                dob: "",
                emailAdress: "",
                homePhone: "",
                idPasswport: "",
                insuredName: "",
                nameDoctor: "",
                relationship: "",
                relationshipId: "",
                relationshipName: "",
                resultTreatment: "",
                title: "",
                travaelcareId: "",
                tviAddId: "",
                tviCareId: ""
            }
        ],
            netPremium: 0,
            paymentMethod: "1",
            planId: "",
            policyNumber: "",
            premium: 0,
            propserAddress: "",
            propserCellphone: "",
            propserCmt: "",
            propserEmail: "",
            propserHomephone: "",
            propserId: "",
            propserName: "",
            propserNgaysinh: "",
            propserProvince: "",
            propserTitle: "",
            receiveMethod: "1",
            receiverUser: {
                address: "",
                addressDistrict: "",
                email: "",
                mobile: "",
                name: ""
            },
            soGycbh: "",
            statusPolicyId: "90",
            teamId: "",
            travelWithId: "",
            tviPackage: "",
            userAgent: ""
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
            ProductCommonService.getPolicyNumber({lineId: 'TVI'}, onGetPolicyNumberSuccess, onGetPolicyNumberError);
        }
        function onGetPolicyNumberSuccess(result) {
            vm.policy.gycbhNumber  = result.policyNumber;
        }

        function onGetPolicyNumberError(result) {
            toastr.error('Get data error!', 'Error');
        }
        // Function
        function onchangePlan() {
            getPremium();
        }
        function getPremium() {
            vm.product.destination =  vm.policy.destinationId;
            vm.product.ngayDi =  vm.policy.inceptionDate;
            vm.product.ngayVe  =  vm.policy.expiredDate;
            vm.product.numberOfPerson  =  1;
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


            // "premiumTvc": 104500,
            //     "premiumNet": 110000,sumPremiumDiscount
        }

        function onGetPremiumError(result) {
            toastr.error('Get data error!', 'Error');
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
            vm.policy.invoiceInfo.name = vm.invoiceInfoData.name;
            vm.policy.invoiceInfo.company = vm.invoiceInfoData.company;
            vm.policy.invoiceInfo.taxNo = vm.invoiceInfoData.taxNo;
            vm.policy.invoiceInfo.address = vm.invoiceInfoData.address;
            vm.policy.invoiceInfo.accountNo = vm.invoiceInfoData.accountNo;
            vm.policy.receiverUser.name  = vm.receiverUserData.name;
            vm.policy.receiverUser.address  = vm.receiverUserData.address;
            vm.policy.receiverUser.addressDistrict  = vm.receiverUserData.addressDistrict;
            vm.policy.receiverUser.mobile  = vm.receiverUserData.mobile;
            vm.policy.receiverUser.email  = vm.receiverUserData.email;
            vm.policy.propserName = vm.contactName;
            vm.policy.propserNgaysinh = vm.contactDob;
            vm.policy.propserCellphone  = vm.handPhone;
            vm.policy.contactCode  = vm.contactCode;
            vm.policy.tvcPackage = vm.policy.travelWithId;
            vm.policy.policyNumber = vm.policy.gycbhNumber;
            vm.policy.receiverMoible =  vm.receiverUserData.mobile;
            TvcService.createNewPolicy(vm.policy, onGetCreateSuccess, onGetCreateError);
            console.log(vm.policy);
        }
        function onGetCreateSuccess(result) {
        }

        function onGetCreateError(result) {
            toastr.error('Get data error!', 'Error');
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
                    "idPasswport": 0,
                    "relationship" : "",
                });
            }
        };

        function removePerson() {
            vm.policy.listTvcAddBaseVM.splice(vm.policy.soNguoiThamGia, vm.policy.listTvcAddBaseVM.length)
        };
    }
})();
