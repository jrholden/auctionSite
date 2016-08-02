<?php
/**
 * Created by PhpStorm.
 * User: Corey Weber
 * Date: 2016-07-06
 * Time: 6:20 PM
 */
include '../database.php';

$data = json_decode(file_get_contents("php://input"), true);
$itemId = $data['item_id'];
$name = $data['item_name'];
$price = $data['item_price'];
$image = $data['item_image'];
$desc = $data['item_desc'];
$hBid = $data['items_high_bid'];
echo $name;

$sql = "UPDATE auction_items SET item_name = '$name', item_price = '$price', item_image = '$image', item_desc = '$desc', items_high_bid = '$hBid'  WHERE item_id = $itemId";




$retval = mysqli_query($conn, $sql);
if(!$retval){
    echo "Failed";
}else{
    echo "Success";
}

mysqli_close($conn);
