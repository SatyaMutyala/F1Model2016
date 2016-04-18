/**
 * @author: Niraj
 */
 (function (){
 	'use strict';

 	angular
	   .module('karmaEngine')
	   .controller('dashBoardCtrl', DashBoardCtrl);

   DashBoardCtrl.$inject = ['$q', '$rootScope', '$scope', '$location', 'MESSAGES', 'messageBox'];

   function DashBoardCtrl($q, $rootScope, $scope, $location, MESSAGES, messageBox){
   	console.log("Dude you 'r in!!");
   }

 })();