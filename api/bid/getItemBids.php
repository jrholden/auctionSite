<?php
include '../database.php';

$data = json_decode(file_get_contents("php://input"), true);

$sql = "SELECT * FROM auction_bids WHERE bids_itemId = $data";
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