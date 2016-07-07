<?php

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

$name = $data['name'];
$price = $data['price'];
$image = $data['image'];
$desc = $data['description'];


$sql = "INSERT INTO auction_items WHERE item_id = '45' ".
    "(item_name, item_price, item_image, item_desc)".
    "VALUES".
    "('$name', '$price', '$image', '$desc')";

$retval = mysqli_query($conn, $sql);
if(!$retval){
    echo "Failed";
}else{
    echo "Success";
}

mysqli_close($conn);

?>