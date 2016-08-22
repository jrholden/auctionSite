<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
/**
 * Created by PhpStorm.
 * User: Corey Weber
 * Date: 2016-07-06
 * Time: 4:36 PM
 */
include '../database.php';

$sql = "SELECT * FROM auction_items";
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
$conn->close();

?>