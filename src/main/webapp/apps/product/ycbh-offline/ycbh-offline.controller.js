(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductYcbhOfflineController', ProductYcbhOfflineController);

    ProductYcbhOfflineController.$inject = ['$scope', '$stateParams', '$controller', 'Principal', '$state', '$rootScope'];

    function ProductYcbhOfflineController ($scope, $stateParams, $controller, Principal, $state, $rootScope) {
        var vm = this;

        vm.policy = {};
        
        // Properties & function declare
        vm.uploadGycbh = uploadGycbh;
        vm.uploadImgGiamdinh = uploadImgGiamdinh;
        vm.uploadOtherDoc = uploadOtherDoc;
        vm.uploadAnchi = uploadAnchi;
        
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
  		
  		function uploadGycbh(file, errFiles) {
//            vm.f = file;
//            vm.errFile = errFiles && errFiles[0];
        	// validate
            if (file) {
            	var fileReader = new FileReader();
            	fileReader.readAsDataURL(file);
            	fileReader.onload = function (e) {
            	  var dataUrl = e.target.result;
            	  var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
//            	  console.log(base64Data);
            	};
            }
        }
  		
  		function uploadImgGiamdinh(file, errFiles) {
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
  		
  		function uploadOtherDoc(file, errFiles) {
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
  		
  		function uploadAnchi(file, errFiles) {
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
