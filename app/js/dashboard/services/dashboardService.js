
/**
 * dashboardService.js
 * @author: Niraj
 */

(function() {
    "use strict";
    angular.module("karmaEngine")
        .factory('dashboardService', DashBoardService);

    DashBoardService.$inject = ['karmaToolHttp'];
   
    function DashBoardService(http) {

        var dashBoardService = {};
        dashBoardService.getdashBoardData = function(inputParams) {
            var request = {
                apiName : 'DASHBOARD',
                data : inputParams,
                headers: {
                    'ACCEPT': 'text/html'
                }
            };

            return http.execute(request);
        };

        return dashBoardService;
    };
})();