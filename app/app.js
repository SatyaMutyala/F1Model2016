angular.module('karmaEngine', ['ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'ngAnimate'])
	.constant('VERSION', '0.1.0')
	.config(function ($locationProvider, $httpProvider) {	
		$httpProvider.interceptors.push('myHttpInterceptor');
        var spinnerFunction = function (data, headersGetter) {
            document.getElementById('loading').style.display = 'block';
            document.getElementById('loading').style.opacity = 1;
            return data;
        };
        $httpProvider.defaults.transformRequest.push(spinnerFunction);
	}).run(runBlock);
	
	
runBlock.$inject = ["$rootScope", "$location", "apiService"];

function runBlock($rootScope, $location, apiService){
	$rootScope.headerFlag = true;
    $rootScope.$on('$stateChangeStart', function(e, to) {
		if (to.data != undefined && to.data.header != undefined ) {
			$rootScope.headerFlag = to.data.header;
		} else {
			$rootScope.headerFlag = true;
		}
		if ($rootScope.user == undefined || $rootScope.user.username == undefined){
			//$location.path('login');
		}
	});
    apiService.init();
}
