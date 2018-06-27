(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReportIncomeController', ReportIncomeController);

    ReportIncomeController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope'];

    function ReportIncomeController ($scope, $controller, Principal, $state, $rootScope) {
    	var vm = this;

  		// Properties & function declare
  		vm.day = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  		vm.month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  		
  		vm.data = {};
        vm.data.categories = [];
        vm.data.incomeData = [];
        vm.data.paymentData = [];
  		
  		vm.filterDate = 'WEEK';
        vm.changeFilterDate = changeFilterDate;
        
        vm.chartOptions = {
        		grid : {
            		backgroundColor: 'rgba(120,120,120,0.1)'
            	},
        		color: [
        	        '#1790cf','#1bb2d8','#99d2dd','#88b0bb',
        	        '#1c7099','#038cc4','#75abd0','#afd6dd'
        	    ],
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['Doanh thu','Đã thanh toán']
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : []
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'Đã thanh toán',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[]
                    },
                    {
                        name:'Doanh thu',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[]
                    }
                ]
                    
            };
  		
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			changeFilterDate('WEEK');
  		})();
  		
        // Implement function 
        function changeFilterDate(type) {
    		vm.filterDate = type;
    		switch(type) {
	    	    case "WEEK":
	    	    	vm.chartOptions.xAxis[0].data = vm.day;
	    	        vm.chartOptions.series[0].data = [30, 182, 434, 791, 390, 30, 10];
	    	        vm.chartOptions.series[1].data = [1320, 1132, 601, 234, 120, 90, 20];
	    	        break;
	    	    case "MONTH":
	    	    	vm.data.categories = vm.day;
	    	        vm.data.incomeData = [30, 182, 434, 791, 390, 30, 10];
	    	        vm.data.paymentData = [1320, 1132, 601, 234, 120, 90, 20];
	    	        break;
	    	    case "YEAR":
	    	    	vm.chartOptions.xAxis[0].data = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];;
	    	        vm.chartOptions.series[0].data = [30, 182, 434, 791, 390, 30, 10, 30, 182, 434, 791, 390];
	    	        vm.chartOptions.series[1].data = [1320, 1132, 601, 234, 120, 90, 20, 30, 182, 434, 791, 390];
	    	        break;
	    	    case "ENHANCE":
	    	    	vm.data.categories = [];
	    	        vm.data.incomeData = [];
	    	        vm.data.paymentData = [];
	    	        break;
	    	    default:
	    	    	break;
	    	}
        }

    }
})();
