(function(window, angular, undefined) {
    'use strict';
    angular
    .module('karmaEngine')
    .service('messageBox', ['$rootScope', '$http', '$timeout', function($rootScope, $http, $timeout) {
            /*$rootScope.alertType = 'success'; //success, danger, warning
            $rootScope.alertMsg = '';
            $rootScope.showMessage = false;*/

            $rootScope.alert = {
                type: 'success', msg: '', showMessage: false
            };

            $rootScope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            $rootScope.$watch($rootScope.isLoading, function (v) {
                if (v) {hideMessage();}
            });
            function showMessage(message, type) {
                window.scrollTo(0,0);
                $rootScope.alert = {
                    "type": type,
                    "msg": message,
                    "showMessage": true
                };
                $timeout(function () {
                    $rootScope.alert.showMessage = false;
                },5000);
            }
            function hideMessage() {
                $rootScope.alert.showMessage = false;
            }
            return {
                showMessage: showMessage,
                hideMessage: hideMessage
            }
        }]);
})(window, window.angular);
