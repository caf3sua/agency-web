// code style: https://github.com/johnpapa/angular-styleguide
// Create by: Nam, Nguyen Hoai - ITSOL.vn

(function() {
    '';
    angular
      .module('pteMagicApp')
      .controller('AgencyBaseController', AgencyBaseController)
        .directive( 'elemReady', ['$parse', function( $parse ) {
            return {
                restrict: 'A',
                link: function( $scope, elem, attrs ) {
                    elem.ready(function(){
                        $scope.$apply(function(){
                            var func = $parse(attrs.elemReady);
                            func($scope);
                        })
                    })
                }
            }
        }]);

    AgencyBaseController.$inject = ['vm', '$scope', '$window', '$compile', '$timeout'];

    function AgencyBaseController(vm, $scope, $window, $compile, $timeout){
		vm.message = { name: 'default entry from PteMagicBaseController' };

		var checkCloseStepOne = false;
        var checkCloseStepTwo = false;
        var checkCloseStepThree = false;
        vm.typeArrowOne = "fa-angle-left";
        vm.typeArrowTwo = "fa-angle-left";
        vm.typeArrowThree = "fa-angle-right";
        vm.closeOpenStep = closeOpenStep;
        function closeOpenStep(type){
            if(type == "step1"){
                document.getElementById("bv-step-1").className = 'bv-step-1  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex widthStep98 display-flex OpenStepOne';
                document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                vm.typeArrowOne = "fa-angle-left";
                vm.typeArrowThree = "fa-angle-right";
                vm.typeArrowTwo = "fa-angle-right";
                checkCloseStepOne = true;
            }else if(type == "step2"){
                document.getElementById("bv-step-2").className = 'bv-step-2  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex  widthStep98 OpenStepTwo';
                document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                vm.typeArrowOne = "fa-angle-right";
                vm.typeArrowThree = "fa-angle-right";
                vm.typeArrowTwo = "fa-angle-left";
            }else if(type == "step3"){
                document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                document.getElementById("bv-step-3").className = 'bv-step-3 display-flex openStepOne col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex  widthStep98';
                vm.typeArrowOne = "fa-angle-right";
                vm.typeArrowThree = "fa-angle-left";
                vm.typeArrowTwo = "fa-angle-right";
            }else{
                document.getElementById("bv-step-1").className = 'bv-step-1 col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex widthStep98';
                // document.getElementById("bv-step-2").className = 'bv-step-2 col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex widthStep2';
                // document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex ';
                checkCloseStepOne = false;
                vm.typeArrowOne = "fa-angle-left";
            }
        }
    }
})();
