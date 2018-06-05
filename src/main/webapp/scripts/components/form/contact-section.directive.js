(function() {
    'use strict';

    angular
        .module('app')
        .directive('contactSection', contactSection);
    
    function contactSection () {
        var directive = {
            restrict: 'E',
            scope: {
            	isShowExtendInfo: '=',
                title: '@',
                contactName: '=',
                contactDob: '=',
                contactIdNumber: '=',
                contactRelation: '=',
                openSearchContact: '&'
            },
            templateUrl : 'apps/product/partial/partial.contact.section.html'
        };

        return directive;
    }

})();
