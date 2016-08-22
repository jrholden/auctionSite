<?php
/**
 * Created by PhpStorm.
 * User: Jordan
 * Date: 8/2/2016
 * Time: 8:07 PM
 */

require_once '../PHPMailer-master/PHPMailerAutoload.php';
//PHPMailer Object

$mail = new PHPMailer;
// To support special characters in SMTP mail 
$mail->CharSet = "UTF-8"; 
//Store details in VARS
$adminEmail = "hospicepeiauction@gmail.com";
$adminPass = "teeth4lyfe";
$adminName = "Auction Admin";
$adminSubject = "Hospice PEI Auction";

//get data from post and decode
$data = json_decode(file_get_contents("php://input"), true);

//store details in nice vars
$name = $data['name'];
$email = $data['email'];
$message = $data['message'];

//Enable SMTP debugging.
$mail->SMTPDebug = 2;

//Set PHPMailer to use SMTP.
$mail->isSMTP();

//Set SMTP host name                          
$mail->Host = "smtp.gmail.com";

//Set this to true if SMTP host requires authentication to send email
$mail->SMTPAuth = true;

//Provide username and password     
$mail->Username = $adminEmail;
$mail->Password = $adminPass;

//If SMTP requires TLS encryption then set it
$mail->SMTPSecure = "tls";

//Set TCP port to connect to 
$mail->Port = 587;

//To address and name
$mail->addAddress($adminEmail,$adminName);

//From email address and name
$mail->setFrom($email,$name);

//Address to which recipient will reply
$mail->addReplyTo($email,$name);

//Send HTML or Plain Text email
$mail->isHTML(true);

$mail->Subject = $adminSubject;
$mail->Body = "<i>$message</i>";
$mail->AltBody = "This is the plain text version of the email content";

if(!$mail->send())
{
    echo "Mailer Error: " . $mail->ErrorInfo;
}
else
{
    
    $body = file_get_contents('../emailTemplates/emailConfirm.html');
    //To address and name
    $mail->addAddress($email,$name);
    //From email address and name
    $mail->setFrom($adminEmail,$adminName);
    //Send HTML or Plain Text email
    $mail->isHTML(true);

    $mail->Subject = $adminSubject;
    $mail->Body = $body;
    $mail->AltBody = "This is the plain text version of the email content";
    if(!$mail->send())
    {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
    else
    {
        echo  "Message has been sent Successfully";
    }
}

/*//the message
$msg = "Message from: " . $name . "\n\n Email: " . $email . "\n\n Message: " . $message . "";

//if lines are longer than 70 characters wrap
$msg = wordwrap($msg, 70);
echo $message;

// send emails
mail("jordan_holden@live.ca", "Contact Request", $msg, "From: " . $email . "" . "\r\n");*/
