<?php 
$headers = apache_request_headers();        
foreach ($headers as $header => $value) {
 echo "<pre>";
 echo "$header : $value";
 echo "</pre>";
}
?>