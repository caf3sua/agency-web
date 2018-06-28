(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProductCommonService', ProductCommonService);

    ProductCommonService.$inject = ['$resource'];

    function ProductCommonService ($resource) {
        var service = $resource('api/agency/product/', {}, {
        	'getPolicyNumber' : {
				method : 'GET',
				url : 'api/agency/common/getPolicyNumber',
				transformResponse : function(data) {
					data = angular.fromJson({
						policyNumber : data
					});
					return data;
				}
			},
			// KCARE
			'getKcarePremium' : {
				method : 'POST',
				url : 'api/agency/product/kcare/premium'
			},
			'createKcarePolicy' : {
				method : 'POST',
				url : 'api/agency/product/kcare/createPolicy'
			},
			// CAR
			'getCarPremium' : {
				method : 'POST',
				url : 'api/agency/product/car/premium'
			},
			'createCarPolicy' : {
				method : 'POST',
				url : 'api/agency/product/car/createPolicy'
			},
			// BVP
			'getBvpPremium' : {
				method : 'POST',
				url : 'api/agency/product/bvp/premium'
			},
			'createBvpPolicy' : {
				method : 'POST',
				url : 'api/agency/product/bvp/createPolicy'
			},
			// KHC
			'getKhcPremium' : {
				method : 'POST',
				url : 'api/agency/product/khc/premium'
			},
			'createKhcPolicy' : {
				method : 'POST',
				url : 'api/agency/product/khc/createPolicy'
			},
			// TNC
			'getTncPremium' : {
				method : 'POST',
				url : 'api/agency/product/tnc/premium'
			},
			'createTncPolicy' : {
				method : 'POST',
				url : 'api/agency/product/tnc/createPolicy'
			},
			// TVC
			'getTvcPremium' : {
                method : 'POST',
                url : 'api/agency/product/tvc/premium'
            },
            'createTvcPolicy' : {
                method : 'POST',
                url : 'api/agency/product/tvc/createPolicy'
            },
            // TVI
            'getTviPremium' : {
                method : 'POST',
                url : 'api/agency/product/tvi/premium'
            },
            'createTviPolicy' : {
                method : 'POST',
                url : 'api/agency/product/tvi/createPolicy'
            },
            // HOME
            'getHomePremium': {url: 'api/agency/product/home/premium', method: 'POST', isArray: false},
            'createHomePolicy': {
            	url: 'api/agency/product/home/createPolicy',  
            	method:'POST'
            },
            // MOTO
            'getMotoPremium' : {
				method : 'POST',
				url : 'api/agency/product/moto/premium'
			},
			'createMotoPolicy' : {
				method : 'POST',
				url : 'api/agency/product/moto/createPolicy'
			},
			// HHVC
			'getHhvcPremium' : {
				method : 'POST',
				url : 'api/agency/product/hhvc/premium'
			},
			'createHhvcPolicy' : {
				method : 'POST',
				url : 'api/agency/product/hhvc/createPolicy'
			}
        });

        return service;
    }
})();
 