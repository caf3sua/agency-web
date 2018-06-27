(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReportCommissionController', ReportCommissionController);

    ReportCommissionController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope'];

    function ReportCommissionController ($scope, $controller, Principal, $state, $rootScope) {
    	var vm = this;
        
        angular.element(document).ready(function () {
        });

  		// Properties & function declare
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
            	backgroundColor: 'rgba(0,0,0,0.5)',
                axisPointer : {            // åæ ‡è½´æŒ‡ç¤ºå™¨ï¼Œåæ ‡è½´è§¦å‘æœ‰æ•ˆ
                    type : 'line',         // é»˜è®¤ä¸ºç›´çº¿ï¼Œå¯é€‰ä¸ºï¼š'line' | 'shadow'
                    lineStyle : {          // ç›´çº¿æŒ‡ç¤ºå™¨æ ·å¼è®¾ç½®
                        color: '#1790cf',
                        type: 'dashed'
                    },
                    crossStyle: {
                        color: '#1790cf'
                    },
                    shadowStyle : {                     // é˜´å½±æŒ‡ç¤ºå™¨æ ·å¼è®¾ç½®
                        color: 'rgba(200,200,200,0.3)'
                    }
                },
                trigger: 'axis'
            },
            legend: {
                data:['Sale','Market']
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'Sale',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint : {
                        data : [
                            {type : 'max', name: 'Max'},
                            {type : 'min', name: 'Min'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: 'Average'}
                        ]
                    }
                },
                {
                    name:'Market',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    markPoint : {
                        data : [
                            {name : 'Max', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                            {name : 'Min', value : 2.3, xAxis: 11, yAxis: 3}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name : 'Average'}
                        ]
                    }
                }
            ]
          };
        
        // Init controller
  		(function initController() {
  			changeFilterDate('WEEK');
  		})();
          
        // Implement function 
        function changeFilterDate(type) {
      	  vm.filterDate = type;
        }

    }
})();
