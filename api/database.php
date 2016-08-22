<?php
$dbhost = "45.79.155.147";
$dbuser = "root";
$dbpass = "Google92@";
$dataBase = "AUCTION_TABLES";
// Create connection
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dataBase);
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
