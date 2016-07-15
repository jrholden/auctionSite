<?php
/**
 * Created by PhpStorm.
 * User: Corey Weber
 * Date: 2016-07-06
 * Time: 5:10 PM
 */
include '../database.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$price = $data['price'];
$image = $data['image'];
$desc = $data['description'];


$sql = "INSERT INTO auction_items ".
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