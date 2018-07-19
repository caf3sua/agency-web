(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductPrintedPaperController', ProductPrintedPaperController);

    ProductPrintedPaperController.$inject = ['$rootScope', '$scope', '$stateParams', '$controller', 'Principal', '$state'
    	, 'CommonDialogService'];

    function ProductPrintedPaperController ($rootScope, $scope, $stateParams, $controller, Principal, $state
    		, CommonDialogService) {
        var vm = this;

        vm.policy = {
        		"contactCode": "string",
        		  "imgGcn": null,
        		  "imgGycbh": null,
        		  "imgHd": null,
        		  "maSanPham": "",
        		  "ngayCap": "",
        		  "ngayHieulucDen": "",
        		  "ngayHieulucTu": "",
        		  "phiBaoHiem": "",
        		  "soAnchi": "",
        		  "tenAnchi": "",
        		  "tinhTrangCap": "",
        		  "tongTienTT": ""
        };
        // Properties & function declare
        vm.uploadGcn = uploadGcn;
        vm.uploadGycbh = uploadGycbh;
        vm.uploadHoadon = uploadHoadon;
        
        vm.openSearchAnchi = openSearchAnchi;
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		    
  		    console.log($stateParams.productCode);
			vm.policy.productCode = $stateParams.productCode;
  		})();
  		
  		$scope.$on('selectedAnchiChange', function() {
        	if ($rootScope.selectedAnchi != undefined && $rootScope.selectedAnchi != null) {
        		console.log($rootScope.selectedAnchi);
        		vm.policy.soAnchi = $rootScope.selectedAnchi.ACHI_SO_ANCHI;
        		vm.policy.tenAnchi = $rootScope.selectedAnchi.ACHI_TEN_ANCHI;
        	}
        });
  		
  		// Function
  		function openSearchAnchi() {
  			console.log('openSearchAnchi');
  			CommonDialogService.openSearchAnchiDialog();
  		}
  		
  		
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
