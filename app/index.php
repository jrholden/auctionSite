<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');
session_cache_limiter(false);
session_start();
require 'Slim/Slim.php';
$app = new Slim();
//require 'vendor/autoload.php';
//use Mailgun\Mailgun;

$app->get('/getHours', 'getHours');
$app->get('/getTodaysDate', 'getTodaysDate');
$app->get('/getTodaysHours', 'getTodaysHours');
$app->get('/getPrices', 'getPrices');
$app->get('/getPricesNew', 'getPricesNew');
$app->post('/sendMail','sendMail');
$app->run();//run

function getHours(){
    $theMonth = $_REQUEST['month'];
    $sql = "SELECT * FROM cavent_hours WHERE month = $theMonth";

    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $hours = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($hours);

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
function getTodaysDate(){
    $month = date('M');//Get month
    $date = date('j');//get day of month

    echo "<strong>Today:</strong> ".$month." ".$date."";
}
function getTodaysHours(){

    $month = date('n') - 1;//Get month (off by 1)
    $date = date('j');//get day of month

    $sql = "SELECT * FROM cavent_hours WHERE month = $month AND day = $date";//Select todays date

    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $hours = $stmt->fetch();
        $db = null;

        //Check for empty return (off season)
        if(empty($hours))
        {
            echo ("Open For Season May-Sept");//Todays hours
        }
        else
        echo $hours['hours_text'];

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
function getPricesNew(){

    $sql = "SELECT * FROM cavent_prices";

    try{
        $db = getConnection();
        $stmt = $db->query($sql);
        //$prices = $stmt->fetchAll(PDO::FETCH_OBJ);

        while($r = $stmt->fetch()){
             $$r['id'] = $r['price'];
        }
        //strings for table(couldn't escape the ')
        $string1 = "Ripley's Believe It or Not!";
        $string2 = "Mariner's Cove - Real Miniature Golf";
        echo '
            <div style="margin-top: 50px;"class="panel panel-primary">
                <!-- Default panel contents -->
                <div class="panel-heading"><h2>Single Attraction Passes</h2><br><div style="font-size: smaller;"> All prices include tax</div></div>

                <!-- Table -->
                <table class="table">
                    <thead>
                    <tr>
                        <th class = col-lg-3></th>
                        <th  class = "col-lg-3">'.$string1.'</th>
                        <th  class = "col-lg-3">Wax World of the Stars</th>
                        <th  class = "col-lg-3">'.$string2.'</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="font"><strong>Adult</strong> 16+</td>
                        <td>$'.$rip_sin_ad.'</td>
                        <td>$'.$wax_sin_ad.'</td>
                        <td>$'.$golf_sin_ad.'</td>
                    </tr>
                    <tr>
                        <td class="font"><strong>Child</strong> under 16</td>
                        <td>$'.$rip_sin_ch.'</td>
                        <td>$'.$wax_sin_ch.'</td>
                        <td>$'.$golf_sin_ch.'</td>
                    </tr>
                    <tr>
                        <td class="font"><strong>Senior</strong> 65+</td>
                        <td>$'.$rip_sin_se.'</td>
                        <td>$'.$wax_sin_se.'</td>
                        <td>$'.$golf_sin_se.'</td>
                    </tr>
                    <tr>
                        <td class="font"><strong>Family</strong> 4 members</td>
                        <td>$'.$rip_sin_fam.'</td>
                        <td>$'.$wax_sin_fam.'</td>
                        <td>$'.$golf_sin_fam.'</td>
                    </tr>
                    </tbody>
                </table>
                </div>

                <div style="margin-top: 50px; margin-bottom: 50px;" class="panel panel-primary">
                    <!-- Default panel contents -->
                    <div class="panel-heading"><h2>Multi Attraction Passes</h2><h4 style="color: #FFEE00;">Enjoy 2 of 3 Attractions with a Double pass and all 3 with a Triple!</h4><br><div style="font-size: smaller;"> All prices include tax</div></div>

                    <!-- Table -->
                    <table class="table">
                        <thead>
                        <tr>
                            <th class="col-lg-4 font"></th>
                            <th class="col-lg-4 font">Double</th>
                            <th class="col-lg-4 font">Triple</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="font"><strong>Adult</strong> 16+</td>
                            <td>$'.$double_ad.'</td>
                            <td>$'.$triple_ad.'</td>
                        </tr>
                        <tr>
                            <td class="font"><strong>Child</strong> under 16</td>
                            <td>$'.$double_ch.'</td>
                            <td>$'.$triple_ch.'</td>
                        </tr>
                        <tr>
                            <td class="font"><strong>Senior</strong> 65+</td>
                            <td>$'.$double_se.'</td>
                            <td>$'.$triple_se.'</td>
                        </tr>
                        <tr>
                            <td class="font"><strong>Family</strong> 4 members</td>
                            <td>$'.$double_fam.'</td>
                            <td>$'.$triple_fam.'</td>
                        </tr>
                        </tbody>
                    </table>
                </div>';
        $db = null;

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
function getPrices(){

    $sql = "SELECT * FROM cavent_prices";

    try{
        $db = getConnection();
        $stmt = $db->query($sql);
        $prices = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($prices);

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
function sendMail(){
    $name = $_REQUEST['name'];
    $email = $_REQUEST['email'];
    $msg1 = $_REQUEST['message'];

    echo "Thank you ". $name . " for contacting us. You have been sent a copy of your email to ".$email."";

    //the message
    $msg = "Message from: ".$name."\n\n Email: ".$email."\n\n Message: ".$msg1."";

    //if lines are longer than 70 characters wrap
    $msg = wordwrap($msg,70);

    // send emails
    /*mail("adam@maritimefun.com","Cavendish Entertainment Contact Request",$msg, "From: ". $email ."" . "\r\n");
    mail("matt@maritimefun.com","Cavendish Entertainment Contact Request",$msg, "From: ". $email ."" . "\r\n");
    mail("".$email."","Cavendish Entertainment Contact Request",$msg, "From: info@maritimefun.com" . "\r\n");*/
    mail("corey.weber@hotmail.com","Cavendish Entertainment Contact Request",$msg, "From: ". $email ."" . "\r\n");
}
function getConnection() {
	$dbhost="";
	$dbuser="";
	$dbpass="";
	$dbname="";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}
?>