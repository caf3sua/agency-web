(function() {
    'use strict';
    angular
        .module('app')
        .controller('AgreementOtpController', AgreementOtpController);


    	AgreementOtpController.$inject = ['$rootScope', '$scope', '$state', '$http', '$filter', '$uibModalInstance', 'ContactService', '$uibModal', '$ngConfirm'];
        function AgreementOtpController($rootScope, $scope, $state, $http, $filter, $uibModalInstance, ContactService, $uibModal, $ngConfirm) {
        	var vm = this;
        	
        	vm.updateAgreement = updateAgreement;
        	vm.otp = "1";
        	
        	// Implement function
        	function updateAgreement() {
        		$state.go('app.cart');
        		$uibModalInstance.dismiss('cancel');
        	}
        	
        	vm.cancel = function () {
        		$state.go('app.cart');
                $uibModalInstance.dismiss('cancel');
            };
        }
})();
