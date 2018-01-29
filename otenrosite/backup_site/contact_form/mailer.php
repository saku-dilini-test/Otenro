<?php


$to = "support@otenro.com";

$email = $_POST['email'];
$name = $_POST['name'];
$subject = $_POST['subject'];
$message = $_POST['message'];



    // Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: '.$name .' '.$email . "\r\n";
$headers .= 'Cc: madusanka@simatosolutions.com' . "\r\n";


if(mail($to,$subject,$message,$headers)){

    echo "Mail Sent Successfully. !";

}else{
    http_response_code(500);
}
