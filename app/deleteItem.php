<?php


/*DATABASE CONNECTION*/
$dbhost = "107.180.26.160";
$dbuser = "jrholden";
$dbpass = "Google92@";
$dataBase = "AUCTIONTABLES";
// Create connection
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dataBase);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$itemId = $data['item_id'];
//SQL statement to delete specific row
$ sql = "DELETE FROM orders".
        "WHERE item_name = Jordan IS GREAT".
        "limit 1";

$retval = mysqli_query($conn, $sql);
if(!$retval){
    echo "Failed";
}else{
    echo "Success";
}

mysqli_close($conn);

?>