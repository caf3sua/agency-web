(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductTviController', ProductTviController);

    ProductTviController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ProductCommonService'];

    function ProductTviController ($scope, $controller, Principal, $state, $rootScope, ProductCommonService) {
        var vm = this;
        vm.lineId = 'TVI';
        
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
            paymentMethod: "",
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
            statusPolicyId: "",
            teamId: "",
            travelWithId: "",
            tviPackage: "",
            userAgent: ""
        };
        vm.product = {};
        vm.getPremium = getPremium;
        vm.onchangePlan = onchangePlan;
        vm.infoPerson = infoPerson;
        vm.onchangeReceiveMethod = false;
        vm.savePolicy = savePolicy;
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

        // Function
        function onchangePlan() {
            getPremium();
        }
        function getPremium() {
            vm.loading = true;
            vm.product.destination =  vm.policy.destinationId;
            vm.product.inceptionDate  =  vm.policy.inceptionDate;
            vm.product.expiredDate   =  vm.policy.expiredDate;
            vm.product.numberOfPerson  = vm.product.soNguoiThamGia;
            vm.product.planId  =  vm.policy.planId;
            vm.product.premiumNet  =  0;
            vm.product.premiumPackage  =  vm.policy.travelWithId;
            vm.product.premiumTvi  = 0;
            vm.product.premiumDiscount = 0;
            if(vm.product.premiumPercentDiscount > 0 ){
                vm.product.premiumPercentDiscount = vm.product.premiumPercentDiscount;
            }else{
                vm.product.premiumPercentDiscount  = 0;
            }
            vm.product.numberOfDay   = 0;
            ProductCommonService.getTviPremium(vm.product, onGetPremiumSuccess, onGetPremiumError);
        }
        function onGetPremiumSuccess(result) {
            vm.loading = false;
            vm.policy.premium  = result.premiumTvi;
            vm.policy.soNguoiThamGia  = result.numberOfPerson;
            vm.policy.netPremium   = result.premiumNet;
            vm.policy.changePremium  = result.premiumPercentDiscount;
            if(result.premiumDiscount > 0){
                vm.isShowChangePremium = true;
                vm.sumPremiumDiscount =   result.premiumDiscount ;
            }
            vm.clearResponseError();
            // "premiumTvc": 104500,
            //     "premiumNet": 110000,sumPremiumDiscount
        }

        function onGetPremiumError(result) {
            vm.loading = false;
            vm.validateResponse(result, 'getPremium');
        }
        function infoPerson() {
            vm.policy.listTvcAddBaseVM.push(vm.tvcAddBaseVM);
            vm.tvcAddBaseVM = {};
            console.log(vm.policy);
        }
        function savePolicy() {
            vm.loading = true;
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
            vm.policy.chaynoStbh = 0;
            
            // call base
            vm.savePolicyBase("TVI", vm.policy);
        }

        function addOrRemovePerson() {
            if(vm.product.soNguoiThamGia > 0) {
                vm.isShowPersonList = true;
            } else {
                vm.isShowPersonList = false;
            }
            if(vm.product.soNguoiThamGia> vm.policy.listTviAdd.length) {
                addNewPerson();
            } else if(vm.product.soNguoiThamGia< vm.policy.listTviAdd.length) {
                removePerson();
            }
        }

        function addNewPerson() {
            var lineAdd = vm.product.soNguoiThamGia- vm.policy.listTviAdd.length;
            for (var i=0; i < lineAdd; i++) {
                vm.policy.listTviAdd.push({
                    "address": "",
                    "cellPhone": "",
                    "city": "",
                    "dayTreatment": "",
                    "detailTreatment": "",
                    "diagnose": "",
                    "dob": "",
                    "emailAdress": "",
                    "homePhone": "",
                    "idPasswport": "",
                    "insuredName": "",
                    "nameDoctor": "",
                    "relationship": "",
                    "relationshipId": "",
                    "relationshipName": "",
                    "resultTreatment": "",
                    "title": "",
                    "travaelcareId": "",
                    "tviAddId": "",
                    "tviCareId": ""
                });
            }
        };

        function removePerson() {
            vm.policy.listTviAdd.splice(vm.product.soNguoiThamGia, vm.policy.listTviAdd.length)
        };
    }
})();
