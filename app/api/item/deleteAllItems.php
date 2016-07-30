<?php
/**
 * Created by PhpStorm.
 * User: Jordan
 * Date: 7/30/2016
 * Time: 9:22 AM
 */

include '../database.php';




$sql = "DELETE FROM auction_items";

$retval = mysqli_query($conn, $sql);
if(!$retval){
    echo "Failed";
}else{
    echo "Success";
}

mysqli_close($conn);


?>