var express 	= require('express');
var router 		= express.Router();
var mysql      	= require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node1'
});


connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

var sql = 'SELECT * FROM users';

connection.query(sql, function (error, results) {
	console.log(results);
});


connection.end(function(err) {
 console.log('connection closed!');
});




router.get('/', function(req, res){
	console.log('login page requested!');
	res.render('login/index');
});

router.post('/', function(req, res){
	
	if(req.body.uname == req.body.password){

		//req.session.username = req.body.uname;
		res.cookie('username', req.body.uname);
		res.redirect('/home');
	}else{
		res.send('invalid username/password');
	}
});

module.exports = router;

