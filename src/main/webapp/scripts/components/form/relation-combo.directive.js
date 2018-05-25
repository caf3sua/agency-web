(function() {
    'use strict';

    angular
        .module('app')
        .directive('relationCombo', relationCombo);
    
    relationCombo.$inject = ['CarService'];

    function relationCombo (CarService) {
        var directive = {
            restrict: 'E',
            scope: {
            	selectedItem: '=ngModel',
            	options: '=',
            	loadRelationFinished: '&onfinished'
            },
            require: 'ngModel',
            template : getTemplate,
            link: linkFunc
        };

        return directive;
        
        function getTemplate(element, attrs, ctrl) {
        	var defaultOption = '';

            switch(attrs.type){
	            case 'car-socho':
	            	defaultOption = "--- Lựa chọn số chỗ/trọng tải xe ---";
	                break;
	            case 'car-tndstn-sotien':
	            	defaultOption = "--- Cần lựa chọn mức trách nhiệm ---";
	                break;
	            case 'car-nntx-sotien':
	            	defaultOption = "--- Cần lựa chọn mức trách nhiệm ---";
	                break;
                case 'car-manufacturer':
                	defaultOption = "--- Cần lựa chọn hãng xe ---";
                    break;
                case 'car-model':
                	defaultOption = "--- Cần lựa chọn dòng xe ---";
                    break;
                case 'car-year':
                	defaultOption = "--- Cần lựa năm sản xuất ---";
                    break;
            }
            
            var template = '<select class="bv-select-box form-control" ng-model="selectedItem" ng-change="changeEvent()">'
                    	 + '<option value="" disabled selected>' + defaultOption + '</option>'
                    	 + '<option ng-repeat="option in options" value="{{option.id}}">{{option.name}}</option>'
                    	 + '</select>';

            return template;
        }

        function linkFunc (scope, element, attrs, ngModel) {
        	scope.changeEvent = function () {
                console.log(scope.selectedItem);
                
                ngModel.$setViewValue(scope.selectedItem);
                
                switch(attrs.type){
	                case 'car-socho':
	                case 'car-tndstn-sotien':
	                case 'car-nntx-sotien':
	                	onSuccess(null);
	                    break;
	                case 'car-manufacturer':
	                	CarService.getCarModel({model : scope.selectedItem}, onSuccess, onError);
	                    break;
	                case 'car-model':
	                	CarService.getMaxManufactureYear({carId : scope.selectedItem}, function(maxYear) {
	                		scope.maxYear = maxYear.max;
	                		CarService.getMinManufactureYear({carId : scope.selectedItem}, function(minYear) {
	                			scope.loadRelationFinished({data : {min : minYear.min, max : scope.maxYear}, type : attrs.type});
		                	}, onError);
	                	}, onError);
	                    break;
	                case 'car-year':
	                	var data = scope.selectedItem.split(":");
	                	CarService.getCarPriceWithYear({year : data[0], carId : data[1]}, onSuccess, onError);
	                    break;
	            }
            }
        	
        	function onSuccess(result) {
        		scope.loadRelationFinished({data : result, type : attrs.type});
        	}
        	
        	function onError(result) {
        		
        	}
        }

    }

})();
