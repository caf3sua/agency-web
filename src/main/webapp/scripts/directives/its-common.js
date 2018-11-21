(function() {
  'use strict';
  angular
    .module('app')
    .directive('acceptedCharacter', acceptedCharacter)
    .directive('itsAsideMenu', itsAsideMenu);

  	itsAsideMenu.$inject = [];
    function itsAsideMenu() {
    		var directive = {};
        directive.restrict = 'E';
        directive.template = "<li ui-sref-active=\"active\"><a ui-sref=\"app.inbox.list\"><span class=\"nav-text\">Inbox</span></a></li>";

        return directive;
    }
    
    
    acceptedCharacter.$inject = [];
    function acceptedCharacter() {
      var directive = {
          require: 'ngModel',
          link: link
      };
      return directive;
      
      function link(scope, element, attrs, modelCtrl) {
    	  modelCtrl.$parsers.push(function (inputValue) {
    		  /^[a-zA-Z][a-zA-Z\\s]+$/;
              var transformedInput = inputValue ? inputValue.replace(/[^\a-zA-Z0-9_.-]/g,'') : null;

              if (transformedInput!=inputValue) {
                  modelCtrl.$setViewValue(transformedInput);
                  modelCtrl.$render();
              }

              return transformedInput;
          });
      }
    }
    
})();
