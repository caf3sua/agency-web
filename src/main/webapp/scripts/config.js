(function () {
    'use strict';
    // EDIT THIS FILE TO SETUP PROJECT
    angular
        .module('app')
        .constant('VERSION', "0.0.1-SNAPSHOT")
        .constant('DEBUG_INFO_ENABLED', true)
        .constant('BUILD_TIMESTAMP', "")
        .constant('API_SERVICE_PREFIX', "api,management")
        .constant('CONSTANT_REMINDER_RANGER_DATE', "30")
        .constant('PAGINATION_CONSTANTS', {
        	"itemsPerPage" : 10
        })
        .constant('API_SERVICE_URL', "https://appuat.baoviet.com.vn:7778")
//        .constant('API_SERVICE_URL', "http://localhost:9090")
;
})();
