(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReportIncomeController', ReportIncomeController);

    ReportIncomeController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ReportService'];

    function ReportIncomeController ($scope, $controller, Principal, $state, $rootScope, ReportService) {
    	var vm = this;

  		// Properties & function declare
  		vm.weekConstant = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  		vm.yearConstant = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  		
  		vm.isLoading = false;
  		vm.data = {};
        vm.data.categories = [];
        vm.data.incomeData = [];
        vm.data.paymentData = [];
        vm.searchCriterial = {
      		  "fromDate": "",
      		  "periodTime": "",
      		  "toDate": ""
		};
  		
        vm.isSearchCollapsed = true;
        vm.report;
  		vm.filterDate = '';
        vm.changeFilterDate = changeFilterDate;
        vm.searchReport = searchReport;
        
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
                    axisPointer : {            
                        type : 'line',         
                        lineStyle : {          
                            color: '#1790cf',
                            type: 'dashed'
                        },
                        crossStyle: {
                            color: '#1790cf'
                        },
                        shadowStyle : {
                            color: 'rgba(200,200,200,0.3)'
                        }
                    },
                    trigger: 'axis'
                },
                legend: {
                    data:['Của tôi','Của đại lý']
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
                        name:'Của tôi',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[]
                    },
                    {
                        name:'Của đại lý',
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
  		function resetData() {
  			vm.chartOptions.xAxis[0].data = vm.weekConstant;
	        vm.chartOptions.series[0].data = [0, 0, 0, 0, 0, 0, 0];
	        vm.chartOptions.series[1].data = [0, 0, 0, 0, 0, 0, 0];
	        
  			vm.data = {};
  	        vm.data.categories = [];
  	        vm.data.incomeData = [];
  	        vm.data.paymentData = [];
  	        vm.report = {};
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
  			
  			ReportService.getReportIncome(vm.searchCriterial, onSearchSuccess, onSearchError);
  			
  			function onSearchSuccess(result) {
  				loadSummaryReport();
  				vm.isLoading = false;
  				vm.report = result;
  				toastr.success("Dữ liệu đã được cập nhật!");
  				updateChartData(vm.filterDate, result.data);
  			}
  			
  			function onSearchError() {
  				vm.isLoading = false;
  				toastr.error("Lỗi khi tìm kiếm data báo cáo doanh thu!");
  			}
  		}
  		
  		function loadSummaryReport() {
  			ReportService.getReportDashboard(vm.searchCriterial, onSearchSummarySuccess, onSearchSummaryError);
  			
  			function onSearchSummarySuccess(data) {
  				vm.report = data;
  			}
  			
  			function onSearchSummaryError() {
  			}
  		}
  		
  		function updateChartData(type, data) {
  			// Update chart xAxis
    		switch(type) {
	    	    case "WEEK":
	    	    	vm.chartOptions.xAxis[0].data = vm.weekConstant;
	    	        vm.chartOptions.series[0].data = getYaxisData(data);
	    	        vm.chartOptions.series[1].data = getYaxisData(data);
	    	        break;
	    	    case "MONTH":
	    	        vm.chartOptions.xAxis[0].data = getXaxisData(data);
	    	        vm.chartOptions.series[0].data = getYaxisData(data);
	    	        vm.chartOptions.series[1].data = getYaxisData(data);
	    	        break;
	    	    case "YEAR":
	    	    	vm.chartOptions.xAxis[0].data = vm.yearConstant;
	    	        vm.chartOptions.series[0].data = getYaxisData(data);
	    	        vm.chartOptions.series[1].data = getYaxisData(data);
	    	        break;
	    	    case "ENHANCE":
	    	    	vm.chartOptions.xAxis[0].data = getXaxisData(data);
	    	        vm.chartOptions.series[0].data = getYaxisData(data);
	    	        vm.chartOptions.series[1].data = getYaxisData(data);
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
  		
//  		function getYaxisOtherData(data) {
//  			var result = [];
//  			angular.forEach(data, function(item) {
//  				result.push(Math.floor((Math.random() * 10000000) + 1));
//  			});
//  			
//  			return result;
//  		}
  		
        function changeFilterDate(type) {
    		vm.filterDate = type;
    		
    		if (vm.filterDate != 'ENHANCE') {
    			vm.isSearchCollapsed = true;
    			loadData();
    		} else {
    			vm.isSearchCollapsed = false;
    		}
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
