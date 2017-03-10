(function() {

	'use strict';

	angular.module("app", [ 
		'angular-jwt', 
		'ui.router',
		'templates',
		'factory.cognito'
	])
	.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) 
	{

		$urlRouterProvider.otherwise("/");

		$stateProvider

			.state({

				name:'root',
				url:'/',
				abstract:true,
				views:
				{
					'':{
						template:'<div ui-view="main"></div>'
					},
					'navigation@root' : {
						template:'<div>boo</div>',
						controller:function($scope,authService)
						{
							

						}
					},
				}
				
			})

			.state({

				name:'home',
				parent:'root',
				url:'',
				views:{
					
					'main' : {
						templateUrl:'templates/login.tpl.html',
						controller:function($scope, cognito){

							$scope.save = function()
							{
								cognito.getHelloWorld().then(function(data){

									console.log(data);
								});
							};

						}
					},
				}
			});


	}]);
	


})();

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