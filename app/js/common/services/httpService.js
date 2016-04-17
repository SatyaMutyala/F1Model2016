(function(window, angular, undefined) {
    'use strict';


/**
 * This module is to inject the core parameters in the request commonly needed in all the request
 * Environments will be injected directly to this service based on the configuration
 *
 */

angular
.module('karmaEngine')
.service('apiService', ['$http', '$q', 'ENVIRONMENT', function ($http, $q, ENVIRONMENT) {

    //expose the methods to get header params
    var _env;
    var _curAPIEndPoint;
    var _setup = false;
    var _upid;
    var _tagetEnv;

 
    /**
     * Returns the header object with mandatory sal headers
     * @param h
     * @returns {{}}
     */
    function getHeaders(h) {
        var n = _env.HEADER_NAME;
        h = h || {};

        if(!h[n.ACCEPT]) {
            h[n.ACCEPT] = 'application/json';
        }
        if(!h[n.CONTENT_TYPE]) {
            h[n.CONTENT_TYPE] = 'application/json';
        }
        return h;
    }
   

    this.init = function () {
        if (_setup) {
            return;
        }
        _env = ENVIRONMENT;

        _tagetEnv = _env.TARGETENV;
        _curAPIEndPoint = _env.AVAILABLEENV[_tagetEnv];
        if (_tagetEnv === 'development') {
            _curAPIEndPoint =  window.location.origin+window.location.pathname;
        }
        _upid = '3';
        _setup = true;
    };


    /**
     *
     * @param a--apiName
     * @param h--headers
     * @param p--parameters
     * @returns {{url: *, headers: *, params: *, method: m}}
     */
    this.getDetails = function (a, h, p) {
        var curApi = '', path = '';

        // this should be caught for non existing path
        try {
            curApi = _env.API[a];
            path = curApi.path;
            if (_tagetEnv === 'development') {
                path = curApi.json;
                curApi.method = 'GET';
            }
        } catch(e){
            console.log("path may be undefined", e, {a:a, h:h, p:p});
        }

        if (path.indexOf('{') !== -1) {
            var r = /(.*?){(.*?)}(.*)/g;
            var match, arr = [], tmp;
            while (match = r.exec(path)) {
                arr.push(match[1]);
                tmp = p[match[2]];
                if (!tmp) {
                    throw match[2] + " param is missing";
                }
                arr.push(tmp);
                r.lastIndex=0;
                path=match[3];
                delete p[match[2]];
            }
            path = arr.join('')+path;
        }

        if (_tagetEnv !== 'development') {
            if (path.indexOf('?') !== -1) {
                path = path + '&upid='+_upid;
            } else {
                path = path + '?upid='+_upid;
            }
        }

        var headers = getHeaders(h);

        return {
            url: _curAPIEndPoint + path,
            headers: headers,
            params: p,
            method: curApi.method
        }
    }

}])
.factory('karmaToolHttp', ['$q', '$http', 'apiService', 'MESSAGES', function ($q, $http, apiSrvc, MESSAGES) {

    //TODO: Expose the method to execute the request and send back promise
    /**
     * {header:{}, params:{},apiName:api_name}
     * @param o
     */
    return {
        /**
         * Returns the promise object triggered from given api
         * @param o
         * {
             * o.apiName //api name corresponds to value in mso-config.json
             * o.headers //headers if an other than common headers
             * o.params //get--map of key value pair, or the params to be part of the req url
             * o.data // post--data to be sent as part of the req body
             *
             * }

         */
        execute: function (o) {

            //frame the url, params and header
            if (!o) {
                throw MESSAGES.API_NOT_VALID_PARAMS;
            }
            if (!o.apiName) {
                throw MESSAGES.API_NOT_VALID_NAME;
            }
            var freq = apiSrvc.getDetails(o.apiName, o.headers, o.params);
            var config = {};
            config.url = freq.url;
            config.headers = freq.headers;
            config.method = freq.method;

            // console.log('freq', freq);
            if (freq.method === 'GET') {
                config.params = o.params;
            } else if (freq.method === "POST") {
                config.data = o.data;
                if(!o.data && o.params){
                    config.data = o.params;
                }
                if(o.data && o.params){
                    config.params = o.params;
                }
            } else if (freq.method === "PUT") {
                config.params = o.params;
                config.data = o.data;
            } else if (freq.method === "DELETE") {
                config.params = o.params;
            }
            // console.log('config', config);
            //TODO: Return the executed success data or failed status code with error data
            var d = $q.defer();
            $http(config).success(function (data, status, headers, config) {
                d.resolve({
                    data: data,
                    status: status
                });
            }).error(function (data, status, headers, config) {

                d.reject(data, status, headers, config);
            });
            return d.promise;
        }
    }
}]);

})(window, window.angular);