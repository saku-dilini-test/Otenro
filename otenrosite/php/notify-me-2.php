<?php

header('content-type: application/json');

        $o = new stdClass();
        $o->status = 'success';
        echo json_encode($o);

        $email_to = "madusanka@simatosolutions.com"; // Replace by your email address
        $email = $_POST["email"];
        $text = "Congratulations ! A new person wants to be alerted when your site will be online: $email";

        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html; charset=utf-8" . "\r\n";
        $headers .= "From:<madusanka9045@gmail.com>\n";

        mail($email_to, "Message", $text, $headers)


?>
