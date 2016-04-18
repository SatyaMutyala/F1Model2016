/**
 * @author: Niraj
 */
(function() {
    "use strict";
    angular.module("karmaEngine")
        .factory('commonService', CommonService);

    CommonService.$inject = ['karmaToolHttp'];

    function CommonService(http) {

        var commonService = {};
        var username= "";
        commonService.doLogout = function() {
            var request = {
                apiName: 'LOGOUT'
            };

            return http.execute(request);
        };

        commonService.changeDBConnection = function(DBtype) {
            switch (DBtype) {
                case 'qa':
                    DBtype = "QACIS"
                    break;
                case 'prod':
                    DBtype = "PRODCIS"
                    break;
                default:
                    DBtype = "QACIS"
                    break;
            }
            var reqObj= {"dbType": DBtype};
            var request = {
                apiName: 'CHANGE_DB',
                data: reqObj
            };
            return http.execute(request);
        }

        return commonService;
    };
})();