(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReportCommissionController', ReportCommissionController);

    ReportCommissionController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ReportService'];

    function ReportCommissionController ($scope, $controller, Principal, $state, $rootScope, ReportService) {
    	var vm = this;
        
        angular.element(document).ready(function () {
        });

  		// Properties & function declare
        vm.weekConstant = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  		vm.yearConstant = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  		
  		vm.data = {};
        vm.data.categories = [];
        vm.data.incomeData = [];
        vm.data.paymentData = [];
        vm.report;
        vm.isLoading = false;
        
        vm.isSearchCollapsed = true;
        vm.filterDate = '';
        vm.changeFilterDate = changeFilterDate;
        vm.searchReport = searchReport;
        vm.searchCriterial = {
        		  "fromDate": "",
        		  "periodTime": "",
        		  "toDate": ""
  		};
        
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
                data:['Tuần trước','Dự tính']
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
                    name:'Tuần trước',
                    type:'bar',
                    data:[0, 0, 0, 0, 0, 0, 0],
//                    markPoint : {
//                        data : [
//                            {type : 'max', name: 'Max'},
//                            {type : 'min', name: 'Min'}
//                        ]
//                    },
                    markLine : {
                        data : [
                            {type : 'average', name: 'Average'}
                        ]
                    }
                },
                {
                    name:'Dự tính',
                    type:'bar',
                    data:[0, 0, 0, 0, 0, 0, 0],
//                    markPoint : {
//                        data : [
//                            {name : 'Max', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
//                            {name : 'Min', value : 2.3, xAxis: 11, yAxis: 3}
//                        ]
//                    },
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
  		function resetData() {
  			vm.chartOptions.xAxis[0].data = vm.weekConstant;
	        vm.chartOptions.series[0].data = [1, 2, 3, 4, 5, 6, 7];
	        vm.chartOptions.series[1].data = [7, 6, 5, 4, 3, 2, 1];
	        
  			vm.data = {};
  	        vm.data.categories = [];
  	        vm.data.incomeData = [];
  	        vm.data.paymentData = [];
  	        vm.report = {};
  		}
  		
  		function changeFilterDate(type) {
    		vm.filterDate = type;
    		
    		if (vm.filterDate != 'ENHANCE') {
    			vm.isSearchCollapsed = true;
    			loadData();
    		} else {
    			vm.isSearchCollapsed = false;
    		}
        }

  		function loadData() {
  			resetData();
  			
  			vm.isLoading = true;
  			
  			if (vm.filterDate != 'ENHANCE') {
  				vm.searchCriterial = {
  	        		  "fromDate": "",
  	        		  "periodTime": vm.filterDate,
  	        		  "toDate": ""
  				};
      		} else {
      			vm.searchCriterial.periodTime = "";
      		}
  			
  			ReportService.getReportCommission(vm.searchCriterial, onSearchSuccess, onSearchError);
  			
  			function onSearchSuccess(data) {
//  				loadSummaryReport();
  				vm.isLoading = false;
  				vm.report = data;
  				toastr.success("Dữ liệu đã được cập nhật!");
  				updateChartData(vm.filterDate, data.data);
  			}
  			
  			function onSearchError() {
  				vm.isLoading = false;
  				toastr.error("Lỗi khi tìm kiếm data báo cáo hoa hồng!");
  			}
  		}
  		
  		function updateChartData(type, data) {
  			// Update chart xAxis
    		switch(type) {
	    	    case "WEEK":
	    	    	vm.chartOptions.xAxis[0].data = vm.weekConstant;
	    	        vm.chartOptions.series[0].data = getYaxisData(data);
	    	        vm.chartOptions.series[1].data = getYaxisOtherData(data);
	    	        break;
	    	    case "MONTH":
	    	        vm.chartOptions.xAxis[0].data = getXaxisData(data);
	    	        vm.chartOptions.series[0].data = getYaxisData(data);
	    	        vm.chartOptions.series[1].data = getYaxisOtherData(data);
	    	        break;
	    	    case "YEAR":
	    	    	vm.chartOptions.xAxis[0].data = vm.yearConstant;
	    	        vm.chartOptions.series[0].data = getYaxisData(data);
	    	        vm.chartOptions.series[1].data = getYaxisOtherData(data);
	    	        break;
	    	    case "ENHANCE":
	    	    	vm.chartOptions.xAxis[0].data = getXaxisData(data);
	    	        vm.chartOptions.series[0].data = getYaxisData(data);
	    	        vm.chartOptions.series[1].data = getYaxisOtherData(data);
	    	        break;
	    	    default:
	    	    	break;
	    	}
  		}
  		
  		function getXaxisData(data) {
  			var result = [];
  			angular.forEach(data, function(item) {
  				result.push(item.datePayment);
  			});
  			
  			return result;
  		}
  		
  		function getYaxisData(data) {
  			var result = [];
  			angular.forEach(data, function(item) {
  				result.push(item.totalPremium);
  			});
  			
  			return result;
  		}
  		
  		function getYaxisOtherData(data) {
  			var result = [];
  			angular.forEach(data, function(item) {
  				result.push(Math.floor((Math.random() * 10000000) + 1));
  			});
  			
  			return result;
  		}
  		
  		function searchReport() {
  			console.log('search report,' + vm.searchCriterial);
        	
        	// validate
        	if (vm.searchCriterial.fromDate == '' || vm.searchCriterial.toDate == '') {
        		toastr.error('Không đủ dữ liệu để tìm kiếm!');
        		return;
        	}
        	
        	// Search
        	loadData(); 
  		}
    }
})();

