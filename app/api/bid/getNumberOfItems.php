<?php
/**
 * Created by PhpStorm.
 * User: Corey Weber
 * Date: 2016-07-06
 * Time: 4:36 PM
 */
include '../database.php';

$sql = "SELECT * FROM auction_items";
$result = $conn->query($sql);

//return number of items
echo $result->num_rows;

$conn->close();

?>