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
$email = $data['email'];
$phone = $data['phone'];
$bid = $data['bid'];
$itemNum = $data['itemId'];
echo $itemNum;

$sql = "INSERT INTO auction_bids ".
    "(bids_itemId, bids_name, bids_email, bids_bid, bids_phone)".
    "VALUES".
    "('$itemNum','$name', '$email', '$bid', '$phone')";


$retval = mysqli_query($conn, $sql);
$last_id = $conn->insert_id;
if(!$retval){
    echo "Failed";
}else{

    $sql = "UPDATE auction_items SET items_high_bid = '$last_id', item_price = '$bid', item_high_bidder = '$name' WHERE item_id = $itemNum";

    $retval = mysqli_query($conn, $sql);
    if($retval){
        echo "Donkey balls";
    }else{
        echo "EPIC FAIL BALLZ";
    }

}

mysqli_close($conn);