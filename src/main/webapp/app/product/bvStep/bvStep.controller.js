(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('BvStepController', BvStepController);

    BvStepController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function BvStepController ($scope, Principal, LoginService, $state, $rootScope) {
        var vm = this;
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
                document.getElementById("bv-step-2").className = 'bv-step-2 display-flex OpenStepTwo';
                document.getElementById("bv-step-1").className = 'bv-step-1 display-flex closeStepOne';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  display-flex openStepOne';
                vm.typeArrowOne = "fa-angle-right";
                checkCloseStepOne = true;
            }else{
                document.getElementById("bv-step-1").className = 'bv-step-1 display-flex';
                document.getElementById("bv-step-2").className = 'bv-step-2 display-flex';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  display-flex openStepOne';
                checkCloseStepOne = false;
                vm.typeArrowOne = "fa-angle-left";
            }

        }
        function closeOpenStepTwo(){
            if(checkCloseStepTwo == false){
                // document.getElementById("bv-step-1-content").className = 'bv-step-1 display-flex closeStepOne display-none';
                document.getElementById("bv-step-2").className = 'bv-step-2 display-flex closeStepTwo';
                document.getElementById("bv-step-1").className = 'bv-step-1 display-flex OpenStepOne';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  display-flex openStepOne';
                vm.typeArrowTwo = "fa-angle-right";
                checkCloseStepTwo = true;
            }else{
                document.getElementById("bv-step-1").className = 'bv-step-1 display-flex';
                document.getElementById("bv-step-2").className = 'bv-step-2 display-flex';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  display-flex openStepOne';
                checkCloseStepTwo = false;
                vm.typeArrowTwo = "fa-angle-left";
            }
        }
        function closeOpenStepThree(){
            if(checkCloseStepThree == false){
                // document.getElementById("bv-step-1-content").className = 'bv-step-1 display-flex closeStepOne display-none';
                document.getElementById("bv-step-2").className = 'bv-step-2 display-flex closeStepTwo';
                document.getElementById("bv-step-1").className = 'bv-step-1 display-flex closeStepOne';
                document.getElementById("bv-step-3").className = 'bv-step-3 display-flex openStepOne';
                checkCloseStepThree = true;
                vm.typeArrowThree = "fa-angle-left";
                vm.typeArrowTwo = "fa-angle-right";
                vm.typeArrowOne = "fa-angle-right";

            }else{
                document.getElementById("bv-step-1").className = 'bv-step-1 display-flex';
                document.getElementById("bv-step-2").className = 'bv-step-2 display-flex';
                document.getElementById("bv-step-3").className = 'bv-step-3-default display-flex';
                checkCloseStepThree = false;
                vm.typeArrowThree = "fa-angle-right";
                vm.typeArrowTwo = "fa-angle-left";
                vm.typeArrowOne = "fa-angle-left";
            }
        }
    }
})();
