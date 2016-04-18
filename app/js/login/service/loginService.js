/**
 * @author: Niraj
 */
(function() {
    "use strict";
    angular.module("karmaEngine")
        .factory('loginService', LoginService);

    LoginService.$inject = ['karmaToolHttp'];
   
    function LoginService(http) {

        var loginService = {};
        loginService.doLogin = function(inputParams) {
            var request = {
                apiName : 'LOGIN',
                data : inputParams,
                headers: {
                    'ACCEPT': 'text/html'
                }
            };

            return http.execute(request);
        };

        return loginService;
    };
})();