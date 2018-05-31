(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactSearchDialogController', ContactSearchDialogController);


    	ContactSearchDialogController.$inject = ['$scope', '$http', '$filter', '$uibModalInstance'];
        function ContactSearchDialogController($scope, $http, $filter, $uibModalInstance) {
        	var vm = this;
        	vm.contactCode;
        	
        	
        	vm.ok = function () {
                $uibModalInstance.close(vm.contactCode);
              };

            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
})();
