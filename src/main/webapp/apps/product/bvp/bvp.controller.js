(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductBvpController', ProductBvpController);

    ProductBvpController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope'];

    function ProductBvpController ($scope, $controller, Principal, $state, $rootScope) {
    	var vm = this;
        vm.tvc ={
        };
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		vm.product = {
			"chuongTrinh": "",
			"ngaySinh": "01/04/1982",
			"tuoi": 36,
			"ngoaitruChk": false,
			"ngoaitruPhi": 0,
			"tncnChk": false,
			"tncnSi": 0,
			"tncnPhi": 0,
			"smcnChk": true,
			"smcnSi": 0,
			"smcnPhi": 0,
			"nhakhoaChk": false,
			"nhakhoaPhi": 0,
			"thaisanChk": false,
			"thaisanPhi": 0,
			"thoihanbhTu": "14/04/2018",
			"qlChinhPhi": 1315600,
			"phiBH": 0,
			"premiumNet": 0,
			"premiumDiscount": 0,
			"pagencyRole": ""
		}

        vm.policy = {
    		"chuongtrinhBh": "5",
    		"chuongtrinhPhi": 4719000.0,
    		"contactCode": "DUC001",
    		"discount": 0,
    		"expiredDate": "28/05/2018",
    		"files":"string",
    		"gycbhNumber": "ITSOL.BVP.18.43",
    		"hasExtracare": false,
    		"hasNguoinhantien": false,
    		"hasNguoithuhuong": false,
    		"inceptionDate": "29/04/2018",
    		"lstAdd": [
	    		{
		    		"benhvienorbacsy": "",
		    		"chitietdieutri": "",
		    		"chuandoan": "",
		    		"ketqua": "",
		    		"ngaydieutri": ""
	    		},
	    		{
		    		"benhvienorbacsy": "",
		    		"chitietdieutri": "",
		    		"chuandoan": "",
		    		"ketqua": "",
		    		"ngaydieutri": ""
	    		},
	    		{
		    		"benhvienorbacsy": "",
		    		"chitietdieutri": "",
		    		"chuandoan": "",
		    		"ketqua": "",
		    		"ngaydieutri": ""
	    		}
    		],
    		"ngoaitru": "1",
    		"ngoaitruPhi": 4290000.0,
    		"nguoidbhCmnd": "CMND người DBH",
    		"nguoidbhName": "Tên NDBH",
    		"nguoidbhNgaysinh": "23/04/1982",
    		"nguoidbhQuanhe": "30",
    		"nguoinhanCmnd": "CMND người nhận",
    		"nguoinhanName": "Tên người nhận",
    		"nguoinhanNgaysinh": "23/04/1982",
    		"nguoinhanQuanhe": "31",
    		"nguointNgaysinh": "23/04/1982",
    		"nguoithCmnd": "CMND người TH",
    		"nguoithName": "Tên người TH",
    		"nguoithNgaysinh": "23/04/1982",
    		"nguoithQuanhe": "Bà",
    		"nguoiycName": "Tên NYC",
    		"nguoiycNgaysinh": "23/04/1982",
    		"nhakhoa": "0",
    		"nhakhoaPhi": 0,
    		"policyNumber": "string",
    		"policyParent": "string",
    		"q1": "1",
    		"q2": "1",
    		"q3": "1",
    		"receiveMethod": "1",
    		"sinhmang": "1",
    		"sinhmangPhi": 0,
    		"sinhmangPhiSi": 0,
    		"sinhmangSotienbh": 0,
    		"tanggiamPhi": 0,
    		"tanggiamPhiNoidung": "nội dung tăng giảm",
    		"thaisan": "0",
    		"thaisanPhi": 0,
    		"tncn": "0",
    		"tncnPhi": 0,
    		"tncnPhiSi": 0,
    		"tncnSotienbh": 0
		}

        vm.validation = validation;
        vm.addOrRemovePerson = addOrRemovePerson;
        vm.processComboResult = processComboResult;
        vm.getPremium = getPremium;
        vm.createNewPolicy = createNewPolicy;
        vm.insuranceTypeOptions = [
            {id: '1', name: 'Đồng'},
            {id: '2', name: 'Bạc'},
            {id: '3', name: 'Vàng'},
            {id: '4', name: 'Bạch Kim'},
            {id: '5', name: 'Kim Cương'}
        ];

        vm.isShowPersonList = false;
        vm.isShowPremium = false;
        vm.isShowTotalPremium = false;
        vm.isHealthyPerson = false;

        // Initialize
        init();

        // Function
        function init() {
            var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.product.thoihanbhTu = DateUtils.convertDate(startDate);

            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.product.thoihanbhDen = DateUtils.convertDate(endDate);

            // Get gycbhNumber
            ProductCommonService.getPolicyNumber({lineId: 'BVP'}, onGetPolicyNumberSuccess, onGetPolicyNumberError);
        }
        
        function isHealthyPersonChange() {
        	
        }

        function processComboResult(data, type) {
            console.log(data);
            switch(type){
                case 'bvp-insurance-type':
                    getPremium();
                    break;
            }
        }

        function getPremium() {
            var postData = getPostData(false);

            if(postData.chuongTrinh) {
                TncService.getPremium(postData, onGetPremiumSuccess, onGetPremiumError);
            } else {
                vm.product.premiumNet = 0;
                vm.product.phiBH = 0;
            }
        }

        function getPostData() {
            var postData = Object.assign({}, vm.product);
            return postData;
        }

        function onGetPremiumSuccess(result) {
            vm.product.premiumNet = result.premiumNet;
            vm.product.phiBH = result.phiBH;
        }

        function onGetPremiumError(result) {
            toastr.error('Get data error!', 'Error');
        }

        function createNewPolicy() {
            var postData = getPostData(true);

            vm.policy.insuranceexpireddate = postData.insuranceexpireddate;
            vm.policy.insurancestartdate = postData.insurancestartdate;
            vm.policy.numbermonth = postData.numbermonth;
            vm.policy.numberperson = postData.numberperson;
            vm.policy.premiumPackage = postData.premiumPackage;
            vm.policy.premiumPackageplanid = postData.premiumPackage.toString()[0];
            vm.policy.premiumdiscount = postData.premiumdiscount;
            vm.policy.premiumnet = postData.premiumnet;
            vm.policy.premiumtnc = postData.premiumtnc;
            if(postData.receiveMethod) {
                vm.policy.receiveMethod = "2";
            } else {
                vm.policy.receiveMethod = "1";
            }

            TncService.createNewPolicy(vm.policy, onCreatePolicySuccess, onCreatePolicyError);
        }

        function onCreatePolicySuccess(result) {
            toastr.success('Create Invoice Success!', 'Successful!');
        }

        function onCreatePolicyError(result) {
            toastr.error('Create Invoice Error!', 'Error');
        }

        function onGetPolicyNumberSuccess(result) {
            vm.policy.gycbhNumber  = result.policyNumber;
        }

        function onGetPolicyNumberError(result) {
            toastr.error('Get data error!', 'Error');
        }
    }
})();
