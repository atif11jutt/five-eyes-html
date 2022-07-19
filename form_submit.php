<?php


    $to = "atif11jutt@gmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $user_name = $_POST['username'];
    
    $subject = "Form submission";
    
    $message = $user_name . " wrote the following:" . "\n\n" . $_POST['message'];
    

    $headers = "From:" . $from;
    
    mail($to,$subject,$message,$headers);
    
    echo "Mail Sent. Thank you " . $user_name . ", we will contact you shortly.";
    
    // error_reporting(-1);
    // ini_set('display_errors', 'On');
    // set_error_handler("var_dump");

?>