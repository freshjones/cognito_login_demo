(function() {

  'use strict';

  function cognito($http)
  {
    
  		var service = {};

      	service.getHelloWorld = function(lang, activity_path)
      	{ 

      		var url = '/auth/signup';

	        var promise = $http.get(url).then(function(response)
	        { 

	         	return response.data;
	        });

	        return promise;

      	};

      	return service;

  }

  angular.module('factory.cognito', [])
  	.factory('cognito',cognito);

})();