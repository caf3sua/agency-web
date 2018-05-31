(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductKhcController', ProductKhcController);

    ProductKhcController.$inject = ['$scope', '$controller', 'KhcService', 'DateUtils', '$state', '$rootScope'];

    function ProductKhcController ($scope, $controller, KhcService, DateUtils, $state, $rootScope) {
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
            "insuranceStartDate": "",
            "numberMonth": 12,
            "numberPerson": "",
            "premiumDiscount": 0,
            "premiumKhc": 0,
            "premiumKhcList":[],
            "premiumNet": 0,
            "premiumPackage": ""
        }

        vm.policy = {
            "gycbhNumber":"ITSOL.KHC.18.53",
            "inceptionDate":"29/05/2018",
            "permanentTotalDisablement":1,
            "plan":2,
            "receiveMethod":"1",
            "tlAddcollections":[
                {
                    "address":"địa chỉ",
                    "cellPhone":"0981132145",
                    "city":"HN",
                    "diagnose":"",
                    "dob":"01/05/1982",
                    "emailAdress":"abc@gmail.com",
                    "homePhone":"sdt nhà",
                    "idPasswport":"CMT/MST",
                    "insuredName":"chắc là tên",
                    "premium":58000,
                    "relationship":"",
                    "si":0,
                    "title":"",
                    "tlAddId":"",
                    "tlId":""
                }
            ],
            "userAgent":""
        }

        vm.addOrRemovePerson = addOrRemovePerson;
        vm.onDobChange = onDobChange;
        vm.processComboResult = processComboResult;
        vm.getPremium = getPremium;
        vm.createNewPolicy = createNewPolicy;
        vm.premiumPackageOptions = [
            {id: '20000000', name: '20000000 VND'},
            {id: '30000000', name: '30000000 VND'},
            {id: '40000000', name: '40000000 VND'},
            {id: '50000000', name: '50000000 VND'},
            {id: '60000000', name: '60000000 VND'},
            {id: '70000000', name: '70000000 VND'},
            {id: '80000000', name: '80000000 VND'},
            {id: '90000000', name: '90000000 VND'},
            {id: '100000000', name: '100000000 VND'}
        ];

        vm.isShowPersonList = false;
        vm.isShowPremium = false;
        vm.isShowTotalPremium = false;
        vm.postPremiumKhcListIndex = [];

        // Initialize
        init();

        // Function
        function init() {
            var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.product.insuranceStartDate = DateUtils.convertDate(startDate);

            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.product.insuranceEndDate = DateUtils.convertDate(endDate);
        }

        function onDobChange() {
            if(vm.product.numberPerson > 0 && vm.product.premiumPackage) {
                getPremium();
            }
        }

        function addOrRemovePerson() {
            if(vm.product.numberPerson > 0) {
                vm.isShowPersonList = true;
            } else {
                vm.isShowPersonList = false;
            }
            if(vm.product.numberPerson > vm.product.premiumKhcList.length) {
                addNewPerson();
            } else if(vm.product.numberPerson < vm.product.premiumKhcList.length) {
                removePerson();
            }
        }

        function addNewPerson() {
            var lineAdd = vm.product.numberPerson - vm.product.premiumKhcList.length;
            for (var i=0; i < lineAdd; i++) {
                vm.product.premiumKhcList.push({
                    "dob": "",
                    "insuredName": "",
                    "premium": 0,
                    "yearOld" : 0,
                    "passportId": ""
                });
            }
        };

        function removePerson() {
            vm.product.premiumKhcList.splice(vm.product.numberPerson, vm.product.premiumKhcList.length)
        };

        function processComboResult(data, type) {
            console.log(data);
            switch(type){
                case 'khc-money':
                    getPremium();
                    break;
            }
        }

        function getPremium() {
            var postData = getPostData(false);

            if(postData.premiumKhcList.length > 0) {
                KhcService.getPremium(postData, onGetPremiumSuccess, onGetPremiumError);
            }
        }

        function getPostData() {
            var postData = Object.assign({}, vm.product);

            vm.postPremiumKhcListIndex = [];
            var realPremiumKhcList = [];
            for (var i=0; i < postData.premiumKhcList.length; i++) {
                if(postData.premiumKhcList[i].dob) {
                    vm.postPremiumKhcListIndex.push(i);
                    realPremiumKhcList.push(postData.premiumKhcList[i]);
                }
            }

            postData.premiumKhcList = realPremiumKhcList;
            postData.numberMonth = DateUtils.monthDiff(postData.insuranceStartDate, postData.insuranceEndDate) + 1;
            postData.numberPerson = realPremiumKhcList.length;

            return postData;
        }

        function onGetPremiumSuccess(result) {
            vm.product.premiumNet = result.premiumNet;
            vm.product.premiumKhc = result.premiumKhc;

            for (var i=0; i < vm.postPremiumKhcListIndex.length; i++) {
                vm.product.premiumKhcList[vm.postPremiumKhcListIndex[i]] = result.premiumKhcList[i];
            }

            if(vm.product.numberPerson > 0) {
                vm.isShowPremium = true;
                vm.isShowTotalPremium = true;
            } else {
                vm.isShowPremium = false;
                vm.isShowTotalPremium = false;
            }
        }

        function onGetPremiumError(result) {
            toastr.error('Get data error!', 'Error');
        }

        function createNewPolicy() {
            var postData = getPostData(true);

            vm.policy.chaynoCheck = postData.chaynoCheck;
            vm.policy.chaynoPhi = postData.chaynoPhi;
            vm.policy.chaynoStbh = postData.chaynoStbh;
            vm.policy.gycbhNumber = "ITSOL.MOT.18.31";
            vm.policy.nntxCheck = postData.nntxCheck;
            vm.policy.nntxSoNguoi = postData.nntxSoNguoi;
            vm.policy.nntxStbh = postData.nntxStbh;
            vm.policy.premium = postData.premium;
            if(postData.receiveMethod) {
                vm.policy.receiveMethod = "2";
            } else {
                vm.policy.receiveMethod = "1";
            }
            vm.policy.tndsBbPhi = postData.tndsbbPhi;
            vm.policy.tndsTnNntxPhi = postData.nntxPhi;
            vm.policy.tndsTnPhi = postData.tndstnPhi;
            vm.policy.tndsTnSotien = postData.tndstnSotien;
            vm.policy.tndsbbCheck = postData.tndsbbCheck;
            vm.policy.tongPhi = postData.tongPhi;
            vm.policy.typeOfMotoId = postData.typeOfMoto;

            // NamNH fix: Append contactCode + invoiceInfo + receiverUser
            vm.appendCommonData(vm.policy);

            MotoService.createNewPolicy(vm.policy, onCreatePolicySuccess, onCreatePolicyError);
        }
    }
})();
