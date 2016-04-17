(function() {
    'use strict';

    var app = angular.module('karmaEngine');


    app.constant('MESSAGES', {
        USERNAME_REQUIRED: 'Username is required',
        PASSWORD_REQUIRED: 'Password is required',
        API_NOT_VALID_PARAMS: 'API is not having a valid params',
        API_NOT_VALID_NAME: 'API is not having a valid name',
        INVALID_USERID_EMAIL_OR_FILE: 'Please upload a XLSX file or enter a valid userId/Email to continue.',
        ERROR_OCCURED: 'Oops, Something went wrong. Please try again later!',
        ERROR_IN_RESPONSE: 'Error in getting response, please try again.',
        STATUS_UPDATED_SUCCESS : "Status updated successfully",
        NO_RESULTS_FOUND : "No Results Found for the search query",
        INVALID_FILE: "Invalid file format, Please upload a XLSX file."
    });

    app.constant('USER_STATUS', {
        inactive: { code:'0', label:'Inactive'},
        active: { code:'1', label:'Active'},
        temporary: { code:'2', label:'TEMPORARY'},
        resetpass: { code:'3', label:'Reset Password'},
        firstlogon: { code:'4', label:'First Time Migration'},
        lockout: { code:'5', label:'Lockout'}
    });

    app.constant('ENVIRONMENT', {
    	TARGETENV : 'development',
    	AVAILABLEENV : {
        	"QA": "",
            "LOCAL": ""
        },
        HEADER_NAME: {
            ACCEPT: "ACCEPT",
            CONTENT_TYPE:"Content-Type"
        },
    	API : {
    		SEARCH_USER : {
    			path : '/services/GetUserInfo',
    			method: 'POST',
    			json : 'json/search.json'
    		},
    		STATUS_TO_ACTIVE : {
    			path : '/services/ActivateUser',
    			method: 'POST',
    			json : 'json/updateStatus.json'
    		},
    		UPDATE_STATUS : {
    			path : '/services/UpdateUserState',
    			method: 'POST',
    			json : 'json/updateStatus.json'
    		},
    		FETCH_ADDRESS : {
    			path : '/services/GetAddressInfo',
    			method: 'POST',
    			json : 'json/userAddress.json'
    		},
            CHANGE_DB:{
                path : '/services/ChangeDB',
                method: 'POST',
                json : 'json/changeDB.json'
            },
            LOGIN : {
                path : '/j_spring_security_check',
                method: 'POST',
                json : 'json/login.json'
            },
            LOGOUT : {
                path : '/j_spring_security_logout',
                method: 'POST',
                json : 'json/login.json'
            },
            DASHBOARD : {
                path : '',
                method: 'POST',
                json : 'json/dashboardData.json'
            }
    	}
    });

})();
