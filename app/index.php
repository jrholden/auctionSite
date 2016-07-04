<?php
require 'Slim/Slim.php';
$app = new Slim();
//require 'vendor/autoload.php';
//use Mailgun\Mailgun;

$app->post('/postBid', 'postBid');


function postBid(){
    echo "Hello";
}

$app->get("/", function () {
    echo "<h1>Hello Slim World</h1>";
});

function getConnection() {
	$dbhost="";
	$dbuser="";
	$dbpass="";
	$dbname="";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

$app->run();//run

?>