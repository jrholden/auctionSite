<?php
/* Send an SMS using Twilio. You can run this file 3 different ways:
 *
 * 1. Save it as sendnotifications.php and at the command line, run
 *         php sendnotifications.php
 *
 * 2. Upload it to a web host and load mywebhost.com/sendnotifications.php
 *    in a web browser.
 *
 * 3. Download a local server like WAMP, MAMP or XAMPP. Point the web root
 *    directory to the folder containing this file, and load
 *    localhost:8888/sendnotifications.php in a web browser.
 */

// Step 1: Get the Twilio-PHP library from twilio.com/docs/libraries/php,
// following the instructions to install it with Composer.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER['DOCUMENT_ROOT']."/api/Twilio/TwilioAPI/autoload.php";
echo"im here";
use TwilioAPI\Rest\Client;

// Step 2: set our AccountSid and AuthToken from https://twilio.com/console
$AccountSid = "AC54e4b99cc251a93248a44e1695a24ffd";
$AuthToken = "3f96a2ee662e847a7a0c799b6ee131d2";
echo "im there";

// Step 3: instantiate a new Twilio Rest Client
$client = new Client($AccountSid, $AuthToken);
echo "negro";
// Step 4: make an array of people we know, to send them a message.
// Feel free to change/add your own phone number and name here.
$people = array(
    "+19026296940" => "Penis Muncher"
);


// Step 5: Loop over all our friends. $number is a phone number above, and
// $name is the name next to it
foreach ($people as $number => $name) {

    $sms = $client->account->messages->create(

    // the number we are sending to - Any phone number
        $number,

        array(
            // Step 6: Change the 'From' number below to be a valid Twilio number
            // that you've purchased
            'from' => "+19022006382",

            // the sms body
            'body' => "Hey $name, Penis munching all day bring cocks"
        )
    );

    // Display a confirmation message on the screen
    echo "Sent message to $name";
}