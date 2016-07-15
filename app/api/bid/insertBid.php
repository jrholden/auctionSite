<?php
/**
 * Created by PhpStorm.
 * User: Corey Weber
 * Date: 2016-07-06
 * Time: 5:10 PM
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

$data = json_decode(file_get_contents("php://input"), true);
echo $data;
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$bid = $data['bid'];
$itemNum = $data['itemId'];


$sql = "INSERT INTO auction_bids ".
    "(bids_itemId, bids_name, bids_email, bids_bid, bids_phone)".
    "VALUES".
    "('$itemNum','$name', '$email', '$bid', '$phone')";

$retval = mysqli_query($conn, $sql);
if(!$retval){
    echo "Failed";
}else{
    echo "Success";
}

mysqli_close($conn);