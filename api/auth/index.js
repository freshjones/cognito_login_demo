var express = require('express');
var AWS = require('aws-sdk');

var path = require('path');

AWS.config.loadFromPath( path.join(__dirname, '/../config.json') );

var router = express.Router();

router.get('/', function(req, res) 
{


  res.json({'test':1});
});

router.get('/signup', function(req, res) 
{

	var params = {
	  ClientId: '', /* required */
	  Username: '', /* required */
	  Password: '', /* required */
	  UserAttributes: [
	    {
	      Name: 'email', /* required */
	      Value: ''
	    },
	    {
	      Name: 'name', /* required */
	      Value: ''
	    }
	  ],
	  ValidationData: [
	    {
	      Name: 'email', /* required */
	      Value: ''
	    }
	  ]
	};

	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
	cognitoidentityserviceprovider.signUp(params, function(err, data) {
	  
	  if (err) {

	    res.json(err);

	  } else {
	    
	    res.json(data);

	  }

	});
  	

});

module.exports = router;