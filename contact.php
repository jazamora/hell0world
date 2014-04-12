<?php
$name = trim(strip_tags($_POST ['name']));
$email = trim(strip_tags($_POST ['email']));
$description = trim(strip_tags($_POST ['description']));

//Validate form if submitted
if($_POST) {
	$errors = 0;
	
	//description is empty
	if (strlen($description)<2){
		$msg = 'Please tell us a little bit about yourself';
		$errors ++;
	}
	
	//Email address not valid
	if (preg_match('/[a-z0-9_\.]+@[a-z0-9\-\.]+[a-z]{2,3}/i', $email) == 0){
		$msg = 'Please enter a valid Email Address';
		$errors ++;
	}
	
	//Name is not valid
	if (strlen($name)<2) {
		$msg = 'Please enter a valid Name';
		$errors ++;
	}
	
	//Attempt to send email
	if ($errors === 0) {
		$emailfrom = "=?UTF-8?B?" . base64_encode ( 'hell0World.org (Mentor Application)' ) . "?=";
		$emailto = "recruiterlinh@gmail.com";
		$subject = "hell0World.org (Mentor Application)";
		
		$headers = 'From: ' . $emailfrom . ' <contact@hell0world.org>' . "\r\n" . 'Reply-To: ' . $email . "\r\n" . 'X-Mailer: PHP/' . phpversion ();
		
		$content = "Name: " . $name . "\r\n";
		$content .= "Email: " . $email . "\r\n";
		$content .= "About Me: " . $description . "\r\n";
		
		if (mail($emailto, $subject, $content, $headers)){
			$msg = "success";
		}else{
			$msg = "Unable to submit form at this time";
		}
	} //End if errors
	echo $msg;
}else{
	echo "No Post";
}
?>