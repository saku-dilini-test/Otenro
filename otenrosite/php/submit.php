<?php
    
    
    $to = "support@otenro.com";
    
    $email = $_POST['email'];
    $name = $_POST['name'];
    $subject = 'Contact Iquery ' . $_POST['name'];
    $message = $_POST['message'];
    
    
    
    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    
    // More headers
    $headers .= 'From: '.$name .' '.$email . "\r\n";
    $headers .= 'Cc: ishan@otenro.com' . "\r\n";
    
    if(empty($email) || empty($name) || empty($message)){
        http_response_code(204);
    }
    else{
        if(mail($to,$subject,$message,$headers)){
        
            echo "Mail Sent Successfully. !";
        
        }else{
            http_response_code(500);
        }
    }
    
