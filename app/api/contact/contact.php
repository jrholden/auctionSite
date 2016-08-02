<?php
/**
 * Created by PhpStorm.
 * User: Jordan
 * Date: 8/2/2016
 * Time: 8:07 PM
 */

    /*$name = $_REQUEST['name'];
    $email = $_REQUEST['email'];
    $msg1 = $_REQUEST['message'];*/

    $data = json_decode(file_get_contents("php://input"), true);
    
    $name = $data['name'];
    $email = $data['email'];
    $message = $data['message'];

    echo $data;

    //the message
    $msg = "Message from: ".$name."\n\n Email: ".$email."\n\n Message: ".$msg1."";

    //if lines are longer than 70 characters wrap
    $msg = wordwrap($msg,70);

    // send emails
    mail("jordan_holden@live.ca","Contact Request",$msg, "From: ". $email ."" . "\r\n");
