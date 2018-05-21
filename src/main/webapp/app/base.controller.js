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
        vm.closeOpenStepOne = closeOpenStepOne;
        vm.closeOpenStepTwo = closeOpenStepTwo;
        vm.closeOpenStepThree = closeOpenStepThree;

        function closeOpenStepOne(){
            if(checkCloseStepOne == false){
                document.getElementById("bv-step-2").className = 'bv-step-2  col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex widthStep98 display-flex OpenStepTwo';
                document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  display-flex openStepOne';
                vm.typeArrowOne = "fa-angle-right";
                checkCloseStepOne = true;
            }else{
                document.getElementById("bv-step-1").className = 'bv-step-1 col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex widthStep1';
                document.getElementById("bv-step-2").className = 'bv-step-2 col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex widthStep2';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex ';
                checkCloseStepOne = false;
                vm.typeArrowOne = "fa-angle-left";
            }

        }
        function closeOpenStepTwo(){
            if(checkCloseStepTwo == false){
                // document.getElementById("bv-step-1-content").className = 'bv-step-1 display-flex closeStepOne display-none';
                document.getElementById("bv-step-2").className = 'bv-step-2 display-flex closeStepTwo';
                document.getElementById("bv-step-1").className = 'bv-step-1 col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex  widthStep98 OpenStepOne';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  display-flex openStepOne';
                vm.typeArrowTwo = "fa-angle-right";
                checkCloseStepTwo = true;
            }else{
                document.getElementById("bv-step-1").className = 'bv-step-1 col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex widthStep1';
                document.getElementById("bv-step-2").className = 'bv-step-2 col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex widthStep2';
                document.getElementById("bv-step-3").className = 'bv-step-3-default padding0  display-flex ';
                checkCloseStepTwo = false;
                vm.typeArrowTwo = "fa-angle-left";
            }
        }
        function closeOpenStepThree(){
            if(checkCloseStepThree == false){
                // document.getElementById("bv-step-1-content").className = 'bv-step-1 display-flex closeStepOne display-none';
                document.getElementById("bv-step-2").className = 'bv-step-2 display-flex closeStepTwo';
                document.getElementById("bv-step-1").className = 'bv-step-1 display-flex closeStepOne';
                document.getElementById("bv-step-3").className = 'bv-step-3 display-flex openStepOne col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex  widthStep98';
                checkCloseStepThree = true;
                vm.typeArrowThree = "fa-angle-left";
                vm.typeArrowTwo = "fa-angle-right";
                vm.typeArrowOne = "fa-angle-right";

            }else{
                document.getElementById("bv-step-1").className = 'bv-step-1 col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex widthStep1';
                document.getElementById("bv-step-2").className = 'bv-step-2 col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex widthStep2';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex ';
                checkCloseStepThree = false;
                vm.typeArrowThree = "fa-angle-right";
                vm.typeArrowTwo = "fa-angle-left";
                vm.typeArrowOne = "fa-angle-left";
            }
        }
    }
})();
