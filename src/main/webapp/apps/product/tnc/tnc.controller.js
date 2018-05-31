(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductTncController', ProductTncController);

    ProductTncController.$inject = ['$scope', '$controller', 'TncService', '$state', '$rootScope'];

    function ProductTncController ($scope, $controller, TncService, $state, $rootScope) {
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
            "insurancestartdate":"18/05/2018",
            "numbermonth": 0,
            "numberperson": "",
            "premiumPackage": "",
            "premiumdiscount": 0,
            "premiumnet": 0,
            "premiumtnc": 0
        }

        vm.policy = {
            "contactCode":"DUC001",
            "gycbhNumber":"ITSOL.TNC.18.39",
            "insuranceexpireddate":"28/05/2019",
            "insurancestartdate":"29/05/2018",
            "invoiceInfo":{
                "accountNo":"",
                "address":"",
                "check":"0",
                "company":"",
                "name":"",
                "taxNo":""
            },
            "listTncAdd":[],
            "numbermonth":12,
            "numberperson":1,
            "premiumPackage":20000000,
            "premiumPackageplanid":2,
            "premiumdiscount":0,
            "premiumnet":0,
            "premiumtnc":0,
            "receiveMethod":"1",
            "receiverUser":{
                "address":"Hai Bà Trưng",
                "addressDistrict":"HN",
                "email":"string@gmail.com",
                "mobile":"0987456321",
                "name":"Tên nhận"
            }
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

        // Initialize
        init();

        // Function
        function init() {
        }

        function onDobChange() {
            if(vm.product.numberperson > 0 && vm.product.premiumPackage) {
                getPremium();
            }
        }

        function addOrRemovePerson() {
            if(vm.product.numberperson > 0) {
                vm.isShowPersonList = true;
            } else {
                vm.isShowPersonList = false;
            }
            if(vm.product.numberperson > vm.policy.listTncAdd.length) {
                addNewPerson();
            } else if(vm.product.numberperson < vm.policy.listTncAdd.length) {
                removePerson();
            }
        }

        function addNewPerson() {
            var lineAdd = vm.product.numberperson - vm.policy.listTncAdd.length;
            for (var i=0; i < lineAdd; i++) {
                vm.policy.listTncAdd.push({
                    "dob":"",
                    "idPasswport":"",
                    "insuredName":"",
                    "title":"",
                    "yearOld" : 0,
                    "premium" : 0
                });
            }
        };

        function removePerson() {
            vm.policy.listTncAdd.splice(vm.product.numberperson, vm.policy.listTncAdd.length)
        };

        function processComboResult(data, type) {
            console.log(data);
            switch(type){
                case 'tnc-money':
                    getPremium();
                    break;
            }
        }

        function getPremium() {
            var postData = getPostData(false);
            TncService.getPremium(postData, onGetPremiumSuccess, onGetPremiumError);
        }

        function getPostData() {
            var postData = Object.assign({}, vm.product);

            return postData;
        }

        function onGetPremiumSuccess(result) {
            vm.premiumnet = result.premiumnet;
            vm.premiumtnc = result.premiumtnc;
            if(vm.product.numberperson > 0) {
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

            MotoService.createNewPolicy(vm.policy, onCreatePolicySuccess, onCreatePolicyError);
        }
    }
})();
