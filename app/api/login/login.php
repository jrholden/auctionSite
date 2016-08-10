<?php
/**
 * Created by PhpStorm.
 * User: Jordan
 * Date: 8/1/2016
 * Time: 7:46 PM
 */
require '../jwtStuff/jwtMain.php';
include '../database.php';
$creds = json_decode(file_get_contents("php://input"), true);
$secretKey = "43432323243";
if($creds['from'] === "login") {
    $token = array();
    

    $sql = "SELECT * FROM auction_login";
    $result = $conn->query($sql);
    $realUser = "";
    $realPass = "";

    $data = array();

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            $realUser = $row['login'];
            $realPass = $row["password"];
            $data[] = $row;
        }


    } else {

    }


    $passWord = $creds['passW'];
    $userName = $creds['user'];

    if ($userName === $realUser && $passWord === $realPass) {

        $tokenId = base64_encode(mcrypt_create_iv(32));

        $token = [
            'jti' => $tokenId
        ];
        $jwt = JWT::encode(
            $token,
            $secretKey,
            'HS512'
        );

        $unencodedArray = ['jwt' => $jwt];

        echo json_encode($unencodedArray);
    } else {
        echo "Failed";
    }

}else if($creds['from'] === "admin"){
    $jwt = $creds['toke'];

    if ($jwt) {
        try {
            /*
             * decode the jwt using the key from config
             */

            $token = JWT::decode($jwt, $secretKey, array('HS512'));
           
            echo true;
           


        } catch (Exception $e) {
            header('HTTP/1.0 401 Unauthorized');
            echo false;
            
        }
    }else {
        /*
         * No token was able to be extracted from the authorization header
         */
        header('HTTP/1.0 400 Bad Request');
        echo false;
    }
    
    
    
}else{
    echo false;
}
$conn->close();



?>