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

$sql = "SELECT * FROM auction_bids";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	// output data of each row
	while($row = $result->fetch_assoc()) {
		echo $row["bids_id"];
	}
} else {
	echo "0 results";
}
$conn->close();

?>
