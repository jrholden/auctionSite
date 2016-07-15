<?php
/**
 * Created by PhpStorm.
 * User: Corey Weber
 * Date: 2016-07-06
 * Time: 5:10 PM
 */
include '../database.php';

$data = json_decode(file_get_contents("php://input"), true);
echo $data;
$itemId = $data['itemNum'];
/*$price = $data['price'];
$image = $data['image'];
$desc = $data['description'];*/


$sql = "delete from auction_items where item_id = $data";

$retval = mysqli_query($conn, $sql);
if(!$retval){
    echo "Failed";
}else{
    echo "Success";
}

mysqli_close($conn);