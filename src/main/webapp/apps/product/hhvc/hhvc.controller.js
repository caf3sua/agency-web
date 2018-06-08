(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductHhvcController', ProductHhvcController);

    ProductHhvcController.$inject = ['$scope', '$controller', 'HhvcService', 'ProductCommonService', '$state', '$rootScope'];

    function ProductHhvcController ($scope, $controller, HhvcService, ProductCommonService, $state, $rootScope) {
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
            "cuocPhi":0,
            "dieuKhoanBaoHiem":"",
            "giaTriHang": "",
            "hanhTrinhVanChuyen":"",
            "laiUocTinh":true,
            "loaiHangHoa":"",
            "loaiTienTe":"VND",
            "loaiTienTeHangHoa":"VND",
            "phuongThucDongGoi":"",
            "phuongThucThanhToan":2,
            "phuongTienVanChuyen":"",
            "premiumDiscount":10,
            "premiumHHVC":0,
            "premiumNet":0,
            "tenHangHoa":""
        }

        vm.policy = {
            "addressNYCBH":"",
            "agentId":"",
            "agentName":"",
            "bankId":"",
            "bankName":"",
            "baovietCompanyId":"1",
            "baovietCompanyName":"1",
            "baovietDepartmentId":"1",
            "baovietDepartmentName":"1",
            "baovietUserId":"1",
            "baovietUserName":"1",
            "basicRate":0,
            "beneficiaryAddr":"HN",
            "beneficiaryDob":"01/01/1981",
            "beneficiaryEmail":"dung@gmail.com",
            "beneficiaryIdentity":"",
            "beneficiaryMst":"",
            "beneficiaryName":"",
            "beneficiaryPhone":"0988789654",
            "blAwbNo":"1",
            "changePremiumContent":"",
            "changePremiumId":"",
            "changePremiumPaContent":"",
            "changePremiumPaId":"",
            "changePremiumPaPremium":0,
            "changePremiumPaRate":0,
            "changePremiumPremium":0,
            "changePremiumRate":0,
            "chkThemLaiUocTinh":true,
            "conditionId":0,
            "contactAddr":"",
            "contactAddresstt":"",
            "contactDob":"01/01/1982",
            "contactEmail":"",
            "contactIdentity":"",
            "contactMst":"",
            "contactName":"",
            "contactPhone":"",
            "containerSerialNo":"",
            "contractNo":"",
            "convey":"",
            "couponsCode":"",
            "couponsValue":0,
            "currencyRate":0,
            "dateOfPayment":"24/04/2018",
            "dateOfRequirement":"24/04/2018",
            "departureDay":"24/04/2018",
            "destination":"",
            "emailNguoiYCBH":"",
            "expectedDate":"29/04/2018",
            "expiredDate":"30/04/2018",
            "feeReceive":0,
            "field1":"Tấn",
            "field2":"2",
            "field3":"",
            "field4":"",
            "field5":"",
            "goodsCategoryId":2,
            "goodsCode":"goodsCode",
            "goodsCost":0,
            "goodsCurrency":"USD",
            "goodsDesc":"",
            "goodsDvt":"",
            "goodsId":0,
            "goodsJourney":0,
            "goodsMeanOfTransportation":0,
            "goodsPackingMethod":0,
            "goodsPaymentCurrency":"USD",
            "goodsPaymentMethod":0,
            "goodsPostage":0,
            "goodsQuantities":0,
            "goodsTransportationMethod":0,
            "goodsWeight":0,
            "gycbhEnVi":"11",
            "hanhTrinhVanChuyen":"1",
            "hhId":"",
            "inceptionDate":"29/05/2018",
            "insuredAddr":"",
            "insuredDob":"01/01/1982",
            "insuredEmail":"",
            "insuredIdentity":"",
            "insuredMst":"",
            "insuredName":"",
            "insuredPhone":"",
            "invoiceNumber":"0987654321",
            "isAdding10Percent":0,
            "journeyNo":"",
            "lcNo":"",
            "loadingPort":"",
            "loadingRateJourney":0,
            "loadingRateTransportation":0,
            "loanAccount":"",
            "maSoThueNYCBH":"",
            "meanOfTransportation":"",
            "mobileNYCBH":"",
            "mucChungTu":"",
            "nameNYCBH":"",
            "netPremium":0,
            "note":"",
            "oldGycbhNumber":"",
            "oldPolicyNumber":"",
            "otherInsuranceAgreements":"",
            "packagingMethod":"",
            "passportNYCBH":"",
            "paymentMenthod":"1",
            "phuongThucDongGoi":"1",
            "phuongThucThanhToan":"1",
            "phuongTienVanChuyen":"1",
            "placeOfPaymentIndemnity":"1",
            "policyNumber":"",
            "policySendDate":"29/05/2018",
            "policyStatus":"",
            "policyStatusName":"",
            "premiumVat":0,
            "productName":"",
            "receiveMethod":"1",
            "renewalsPremium":0,
            "renewalsRate":0,
            "renewalsReason":"",
            "requirementAddr":"",
            "requirementDob":"24/04/2018",
            "requirementEmail":"",
            "requirementIdentity":"",
            "requirementMst":"",
            "requirementName":"",
            "requirementPhone":"",
            "responseDate":"24/04/2018",
            "sendDate":"24/04/2018",
            "soGycbh":"",
            "standardPremium":0,
            "startingGate":"",
            "statusId":"",
            "statusName":"",
            "statusRenewalsId":"",
            "statusRenewalsName":"",
            "teamId":"",
            "teamName":"",
            "totalNetPremium":0,
            "totalPremium":0,
            "totalVat":0,
            "totalbasicPremium":0,
            "unloadingPort":"",
            "userAgent":""
        }

        vm.openSearchContactForPanel = openSearchContactForPanel;
        vm.getRequesterInfo = getRequesterInfo;
        vm.processComboResult = processComboResult;
        vm.getPremium = getPremium;
        vm.createNewPolicy = createNewPolicy;
        vm.itemGroupOptions = [
            {id: '1', name: 'Hàng Bách Hóa (Hàng mới không liệt vào loại dễ vỡ)'},
            {id: '2', name: 'Các chế phẩm nông sản, lâm sản, hải sản, sản phẩm ăn được'},
            {id: '3', name: 'Dược phẩm'},
            {id: '4', name: 'Hàng điện tử, các thiết bị điện tử, máy vi tính'},
            {id: '5', name: 'Máy móc và phụ tùng thông thường'},
            {id: '6', name: 'Vật liệu xây dựng và sản phẩm khai thác mỏ'},
            {id: '7', name: 'Hóa chất và các vật liệu không nguy hiểm khác'},
            {id: '8', name: 'Hàng thủ công Mỹ nghệ'},
            {id: '9', name: 'Hàng cá nhân và đồ dùng gia đình'},
            {id: '10', name: 'Nông sản, rau quả, các sản phẩm thực vật (loại trừ hấp hơi)'},
            {id: '11', name: 'Các sản phẩm từ động vật'},
            {id: '12', name: 'Các sản phẩm đóng chai (dễ vỡ)'},
            {id: '13', name: 'Đồ dễ vỡ'},
            {id: '14', name: 'Tác phẩm nghệ thuật, đồ cổ'},
            {id: '15', name: 'Máy móc và thiết bị siêu trường siêu trọng'},
            {id: '16', name: 'Các sản phẩm từ động vật (hàng đông lạnh)'},
            {id: '17', name: 'Hóa chất và các vật liệu nguy hiểm khác'},
            {id: '18', name: 'Động vật sống (loại trừ ốm chết, chết do bệnh tật)'},
            {id: '19', name: 'Hàng xếp trên boong, hàng cũ'},
        ];
        vm.itemNameOptions = [
            {id: '-1', name: 'Hàng hóa khác'}
        ];
        vm.insuranceTermOptions = [
            {id: '24', name: 'Điều khoản bảo hiểm hàng hóa vận chuyển đường không ( Loại trừ hàng gửi bưu điện ) ngày 1.1.1982(Chỉ bảo hiểm trong trường hợp Tổn thất toàn bộ (total loss only))'},
            {id: '6', name: 'Điều khoản bảo hiểm hàng hóa ( C ) ngày 1.1.1982 ( ICC-1982 )'},
            {id: '7', name: 'Điều khoản bảo hiểm hàng hóa ( C ) ngày 1.1.2009 ( ICC-2009)'},
            {id: '17', name: 'Quy tắc chung về bảo hiểm hàng hóa vận chuyển bằng đường biển (C) (QTCB2004)'},
            {id: '18', name: 'Điều khoản bảo hiểm hàng hóa vận chuyển đường không ( Loại trừ hàng gửi bưu điện ) ngày 1.1.2009(Chỉ bảo hiểm trong trường hợp Tổn thất toàn bộ (total loss only))'},
            {id: '22', name: 'Quy tắc bảo hiểm hàng hóa vận chuyển nội địa - QTND2016'},
            {id: '23', name: 'Quy tắc bảo hiểm hàng hóa vận chuyển nội địa - QTND2016 ( Không bảo hiểm rủi ro phụ )'},
        ];
        vm.shippingWrapTypeOptions = [
            {id: '2', name: 'Hàng đóng container'},
            {id: '3', name: 'Carton'},
            {id: '4', name: 'Hàng chở rời'},
            {id: '5', name: 'Bao'},
            {id: '6', name: 'Kiện gỗ'}
        ];
        vm.shippingWayOptions = [
            {id: '1', name: 'Từ 500 km trở lên'},
            {id: '2', name: 'Dưới 500km'}
        ];
        vm.shippingVehicleOptions = [
            {id: '1', name: 'Vận chuyển đa phương tiện'},
            {id: '2', name: 'Tàu biển'},
            {id: '3', name: 'Sà lan'},
            {id: '5', name: 'Ô tô'},
            {id: '6', name: 'Tàu hỏa'},
            {id: '7', name: 'Máy bay'},
            {id: '4', name: 'Khác (ghe...)'}
        ];
        vm.moneyTypeOptions = [
            {id: 'AUD', name: 'AUD'},
            {id: 'CAD', name: 'CAD'},
            {id: 'CHF', name: 'CHF'},
            {id: 'DKK', name: 'DKK'},
            {id: 'EUR', name: 'EUR'},
            {id: 'GBP', name: 'GBP'},
            {id: 'HKD', name: 'HKD'},
            {id: 'INR', name: 'INR'},
            {id: 'JPY', name: 'JPY'},
            {id: 'KRW', name: 'KRW'},
            {id: 'KWD', name: 'KWD'},
            {id: 'MYR', name: 'MYR'},
            {id: 'NOK', name: 'NOK'},
            {id: 'RUB', name: 'RUB'},
            {id: 'SAR', name: 'SAR'},
            {id: 'SEK', name: 'SEK'},
            {id: 'SGD', name: 'SGD'},
            {id: 'THB', name: 'THB'},
            {id: 'USD', name: 'USD'},
            {id: 'VND', name: 'VND'}
        ];

        vm.isSameRequesterInfoInsured = false;
        vm.isSameRequesterInfoRequirement = false;
        vm.isShowPremium = false;
        vm.isShowExchangeFee = false;

        // Initialize
        init();

        // Function
        function init() {
            // Get gycbhNumber
            ProductCommonService.getPolicyNumber({lineId: 'HHV'}, onGetPolicyNumberSuccess, onGetPolicyNumberError);

            vm.contactRole = "";
        }

        $scope.$on('selectedContactChange', function() {
            if ($rootScope.selectedContact != undefined && $rootScope.selectedContact != null) {
                switch (vm.panelType) {
                    case 'contact':
                        vm.policy.contactName = $rootScope.selectedContact.contactName;
                        vm.policy.contactDob = $rootScope.selectedContact.dateOfBirth;
                        vm.policy.contactEmail = $rootScope.selectedContact.email;
                        vm.policy.contactPhone = $rootScope.selectedContact.handPhone;
                        vm.policy.contactAddr = $rootScope.selectedContact.homeAddress;
                        vm.policy.contactAddresstt = $rootScope.selectedContact.homeAddress;
                        break;
                    case 'insured':
                        vm.policy.insuredName = $rootScope.selectedContact.contactName;
                        vm.policy.insuredDob = $rootScope.selectedContact.dateOfBirth;
                        vm.policy.insuredEmail = $rootScope.selectedContact.email;
                        vm.policy.insuredPhone = $rootScope.selectedContact.handPhone;
                        vm.policy.insuredAddr = $rootScope.selectedContact.homeAddress;
                        vm.policy.insuredAddresstt = $rootScope.selectedContact.homeAddress;
                        break;
                    case 'requirement':
                        vm.policy.requirementName = $rootScope.selectedContact.contactName;
                        vm.policy.requirementDob = $rootScope.selectedContact.dateOfBirth;
                        vm.policy.requirementEmail = $rootScope.selectedContact.email;
                        vm.policy.requirementPhone = $rootScope.selectedContact.handPhone;
                        vm.policy.requirementAddr = $rootScope.selectedContact.homeAddress;
                        vm.policy.requirementAddresstt = $rootScope.selectedContact.homeAddress;
                        break;
                }
            }
        });

        function processComboResult(data, type) {
            console.log(data);
            switch(type){
                case 'hhvc-item-group':
                case 'hhvc-item-name':
                case 'hhvc-insurance-term':
                case 'hhvc-shipping-wrap-type':
                case 'hhvc-shipping-way':
                case 'hhvc-shipping-vehicle':
                case 'hhvc-money-type':
                    getPremium();
                    break;
            }
        }

        function getPremium() {
            var postData = getPostData(false);

            if(postData.loaiHangHoa != 0 && postData.dieuKhoanBaoHiem != 0 && postData.giaTriHang != 0 && postData.phuongThucThanhToan != 0) {
                HhvcService.getPremium(postData, onGetPremiumSuccess, onGetPremiumError);
            }
        }

        function getPostData() {
            var postData = Object.assign({}, vm.product);

            if(postData.dieuKhoanBaoHiem == "") {
                postData.dieuKhoanBaoHiem = 0;
            }
            if(postData.hanhTrinhVanChuyen == "") {
                postData.hanhTrinhVanChuyen = 0;
            }
            if(postData.loaiHangHoa == "") {
                postData.loaiHangHoa = 0;
            }
            if(postData.phuongThucDongGoi == "") {
                postData.phuongThucDongGoi = 0;
            }
            if(postData.phuongTienVanChuyen == "") {
                postData.phuongTienVanChuyen = 0;
            }
            if(postData.tenHangHoa == "") {
                postData.tenHangHoa = 0;
            }

            return postData;
        }

        function onGetPremiumSuccess(result) {
            vm.product.premiumNet = result.premiumNet;
            vm.product.premiumHHVC = result.premiumHHVC;

            vm.isShowPremium = true;
            vm.isShowTotalPremium = true;

            if(result.premiumHHVC > 0) {
                vm.disableContactInfo(false);
            } else {
                vm.disableContactInfo(true);
            }
            vm.clearResponseError();
        }

        function onGetPremiumError(result) {
            vm.validateResponse(result, 'getPremium');
        }

        function createNewPolicy() {
            var postData = getPostData(true);

            if(postData.receiveMethod) {
                vm.policy.receiveMethod = "2";
            } else {
                vm.policy.receiveMethod = "1";
            }

            HhvcService.createNewPolicy(vm.policy, onCreatePolicySuccess, onCreatePolicyError);
        }

        function getRequesterInfo(type) {
            switch (type) {
                case 'insured':
                    vm.policy.insuredName = vm.policy.contactName;
                    vm.policy.insuredDob = vm.policy.contactDob ;
                    vm.policy.insuredEmail = vm.policy.contactEmail;
                    vm.policy.insuredPhone = vm.policy.contactPhone;
                    vm.policy.insuredAddr = vm.policy.contactAddr;
                    vm.policy.insuredAddresstt = vm.policy.contactAddresstt;
                    break;
                case 'requirement':
                    vm.policy.requirementName = vm.policy.contactName;
                    vm.policy.requirementDob = vm.policy.contactDob ;
                    vm.policy.requirementEmail = vm.policy.contactEmail;
                    vm.policy.requirementPhone = vm.policy.contactPhone;
                    vm.policy.requirementAddr = vm.policy.contactAddr;
                    vm.policy.requirementAddresstt = vm.policy.contactAddresstt;
                    break;
            }
        }

        function openSearchContactForPanel(type) {
            vm.panelType = type;
            vm.openSearchContact();
        }

        function onCreatePolicySuccess(result) {
            toastr.success('Create Invoice Success!', 'Successful!');
            vm.clearResponseError();
        }

        function onCreatePolicyError(result) {
            vm.validateResponse(result, 'createPolicy');
        }

        function onGetPolicyNumberSuccess(result) {
            vm.policy.gycbhNumber  = result.policyNumber;
            vm.clearResponseError();
        }

        function onGetPolicyNumberError(result) {
            vm.validateResponse(result, 'getPolicyNumber');
        }
    }
})();
