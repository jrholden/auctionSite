<?php
/**
 * Created by PhpStorm.
 * User: Corey Weber
 * Date: 2016-07-06
 * Time: 5:10 PM
 */
include '../database.php';

// This is the directory where images will be saved


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
$last_id = $conn->insert_id;
if(!$retval){
    echo "Failed";
}else{

    $sql = "SELECT * FROM auction_items WHERE item_id = $last_id LIMIT 1";
    $result = $conn->query($sql);

    $data = array();

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        
        echo json_encode($data);
    } else {
        echo "0 results";
    }
}

mysqli_close($conn);