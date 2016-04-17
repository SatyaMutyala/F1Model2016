/**
 * @author: Niraj
 */

(function(){
   'use strict';

    angular
    .module('karmaEngine')
    .factory('myHttpInterceptor', ['$q',
        function ($q) {
            return {
                'request': function (config) {
                    document.getElementById('loading').style.display = 'none';
                    document.getElementById('loading').style.opacity = 0;
                    return config;
                },

                'requestError': function (rejection) {
                    document.getElementById('loading').style.display = 'none';
                    document.getElementById('loading').style.opacity = 0;
                    return $q.reject(rejection);
                },

                'response': function (response) {
                    document.getElementById('loading').style.display = 'none';
                    document.getElementById('loading').style.opacity = 0;
                    return response;
                },

                'responseError': function (rejection) {
                    document.getElementById('loading').style.display = 'none';
                    document.getElementById('loading').style.opacity = 0;
                    return $q.reject(rejection);
                }
            };
        }
    ]);
})();