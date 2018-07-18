(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductPrintedPaperController', ProductPrintedPaperController);

    ProductPrintedPaperController.$inject = ['$scope', '$stateParams', '$controller', 'Principal', '$state', '$rootScope'];

    function ProductPrintedPaperController ($scope, $stateParams, $controller, Principal, $state, $rootScope) {
        var vm = this;

        vm.policy = {};
        // Properties & function declare
        vm.uploadGcn = uploadGcn;
        vm.uploadGycbh = uploadGycbh;
        vm.uploadHoadon = uploadHoadon;
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		    
  		    console.log($stateParams.productCode);
			vm.policy.productCode = $stateParams.productCode;
  		})();
  		
  		// Function
  		function uploadGcn(file, errFiles) {
        	// validate
            if (file) {
            	var fileReader = new FileReader();
            	fileReader.readAsDataURL(file);
            	fileReader.onload = function (e) {
            	  var dataUrl = e.target.result;
            	  var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
            	  console.log(base64Data);
            	};
            }
        }
  		
  		function uploadGycbh(file, errFiles) {
        	// validate
            if (file) {
            	var fileReader = new FileReader();
            	fileReader.readAsDataURL(file);
            	fileReader.onload = function (e) {
            	  var dataUrl = e.target.result;
            	  var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
            	  console.log(base64Data);
            	};
            }
        }
  		
  		function uploadHoadon(file, errFiles) {
        	// validate
            if (file) {
            	var fileReader = new FileReader();
            	fileReader.readAsDataURL(file);
            	fileReader.onload = function (e) {
            	  var dataUrl = e.target.result;
            	  var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
            	  console.log(base64Data);
            	};
            }
        }
    }
})();
