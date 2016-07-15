<?php
/**
 * Created by PhpStorm.
 * User: Corey Weber
 * Date: 2016-07-06
 * Time: 6:20 PM
 * 
 * 
 * todo MUST BE CHANGED TO WORK WITH BIDS
 * 
 * 
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
$itemId = $data['itemNum'];

$name = $data['name'];
$price = $data['price'];
$image = $data['image'];
$desc = $data['description'];


$sql = "UPDATE auction_items SET item_name = $name, item_price = $price, item_image = $image, item_desc = $desc WHERE item_id = $itemId";

$retval = mysqli_query($conn, $sql);
if(!$retval){
    echo "Failed";
}else{
    echo "Success";
}

mysqli_close($conn);
