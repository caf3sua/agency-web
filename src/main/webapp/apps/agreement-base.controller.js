// code style: https://github.com/johnpapa/angular-styleguide
// Create by: Nam, Nguyen Hoai - ITSOL.vn

(function() {
    '';
    angular
      .module('app')
      .controller('AgreementBaseController', AgreementBaseController);

    AgreementBaseController.$inject = ['vm', '$state', '$stateParams', '$rootScope', '$scope', '$timeout'
    	, '$ngConfirm'];

    function AgreementBaseController(vm, $state, $stateParams, $rootScope, $scope, $timeout
    		, $ngConfirm){
		vm.message = { name: 'default entry from AgreementBaseController' };

		vm.confirmCancelOrder = confirmCancelOrder;
		vm.confirmEditAgreement = confirmEditAgreement;
		
		function confirmEditAgreement(order) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-edit',
                theme: 'modern',
                type: 'blue',
                content: '<div class="text-center">Bạn chắc chắn sửa hợp đồng ' + order.gycbhNumber + ' này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	editAgreement(order);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
		
		function editAgreement(order) {
  			switch (order.lineId) {
				case 'BVP':
					if (order.createType == "0"){
						$state.go("product.bvp", {id: order.agreementId});
		  			} else {
		  				$state.go("product.printed-paper-edit", {id: order.gycbhNumber});
		  			}
					break;
				case 'CAR':
					if (order.createType == "0"){
						$state.go("product.car", {id: order.agreementId});
		  			} else {
		  				$state.go("product.printed-paper-edit", {id: order.gycbhNumber});
		  			}
					break;
				case 'HOM':
					if (order.createType == "0"){
						$state.go("product.home", {id: order.agreementId});
		  			} else {
		  				$state.go("product.printed-paper-edit", {id: order.gycbhNumber});
		  			}
					break;
				case 'KCR':
					if (order.createType == "0"){
						$state.go("product.kcare", {id: order.agreementId});
		  			} else {
		  				$state.go("product.printed-paper-edit", {id: order.gycbhNumber});
		  			}
					break;
				case 'MOT':
					if (order.createType == "0"){
						$state.go("product.moto", {id: order.agreementId});
		  			} else {
		  				$state.go("product.printed-paper-edit", {id: order.gycbhNumber});
		  			}
					break;
				case 'TNC':
					if (order.createType == "0"){
						$state.go("product.tnc", {id: order.agreementId});
		  			} else {
		  				$state.go("product.printed-paper-edit", {id: order.gycbhNumber});
		  			}
					break;
				case 'KHC':
					if (order.createType == "0"){
						$state.go("product.khc", {id: order.agreementId});
		  			} else {
		  				$state.go("product.printed-paper-edit", {id: order.gycbhNumber});
		  			}
					break;
				case 'TVC':
					if (order.createType == "0"){
						$state.go("product.tnc", {id: order.agreementId});
		  			} else {
		  				$state.go("product.printed-paper-edit", {id: order.gycbhNumber});
		  			}
					break;
				case 'TVI':
					$state.go("product.tvi", {id: order.agreementId});
					if (order.createType == "0"){
						$state.go("product.tvi", {id: order.agreementId});
		  			} else {
		  				$state.go("product.printed-paper-edit", {id: order.gycbhNumber});
		  			}
					break;
				case 'HHV':
					$state.go("product.hhvc", {id: order.agreementId});
					break;
				default:
					break;
			}
  		}
		
		function confirmCancelOrder(gycbhNumber) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-times',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn hủy hợp đồng này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	cancelOrder(gycbhNumber);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
		
		function cancelOrder(number) {
  			console.log('doCancelOrder');
  			OrderService.cancelOrder({gycbhNumber: number}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				searchOrder();
  				toastr.success('Đã hủy đơn hàng với mã: ' + result.gycbhNumber);
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi hủy đơn hàng!");
  			}
  		}
    }
})();
