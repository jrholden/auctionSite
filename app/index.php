<?php
/*
require 'Slim/Slim.php';
$app = new Slim();
require 'vendor/autoload.php';
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

*/

$dbhost = "107.180.26.160";
$dbuser = "jrholden";
$dbpass = "Google92@";
$dataBase = "AUCTIONTABLES";
// Create connection
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dataBase);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
$body = json_decode(file_get_contents("php://input"), true);

//$body = json_decode($REQUEST_[getBody()], true);
echo($body['name']);

$sql = "INSERT INTO auction_bids ".
	"(bids_name)".
	"VALUES".
	"('$name')";

//mysqli_select_db($dataBase);
$retval = mysqli_query($conn, $sql);
if(!$retval){
	echo "Failed";
}else{
	echo "Success";
}
mysqli_close($conn);

?>
