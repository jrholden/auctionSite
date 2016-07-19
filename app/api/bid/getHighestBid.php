<?php
/**
 * Created by PhpStorm.
 * User: Corey Weber
 * Date: 2016-07-06
 * Time: 4:36 PM
 */
include '../database.php';

$data = json_decode(file_get_contents("php://input"), true);

$sql = "SELECT * FROM auction_bids WHERE bids_id = $data";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    echo json_encode($result);
} else {
    echo "0 results";
}
$conn->close();

?>