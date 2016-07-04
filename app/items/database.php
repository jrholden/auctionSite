<html>
<head>
    <title>Add New Record in MySQL Database</title>
</head>
<body>
<?php
    
    $dbhost = "107.180.26.160";
    $dbuser = "jrholden";
    $dbpass = "Google92@";
    $dataBase = "AUCTIONTABLES";
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dataBase);
    if(!$conn ) {
        echo "failed dawg";
        echo mysqli_connect_error();
    }else
    {
        echo "Worked dawg";
    }

    echo "get json test";
    $data = json_decode(file_get_contents("php://input"));
    echo $data->name;

    $sql = "INSERT INTO auction_bids ".
        "(bids_name)".
        "VALUES".
        "('$name')";

    mysqli_select_db($dataBase);
    $retval = mysqli_query($conn, $sql);
    if(!$retval){
        echo "Failed";
    }else{
        echo "Success";
    }
mysqli_close($conn);
    
?>
<p>HI</p>
</body>
</html>