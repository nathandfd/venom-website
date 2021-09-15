<?php
$secret_key = "6LcDX6caAAAAANZz14cEQpEENMyiqJYPcE0RGC2Y";

$name = $_POST['name'];
$fname = $_POST['fname'];
$mail = $_POST['mail'];
$object = $_POST['object'];
$msg = $_POST['msg'];
// the message

$obj = "Formulaire contact Venom - ".$object;

$contact = "E-mail : ".$mail;
$text = wordwrap($msg,300);

$text = "Message de ".$fname." ".$name."\n \n".$text."\n \n".$contact;

$header = "From: contact@groupe-venom.fr";

$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = array(
    'secret' => $secret_key,
    'response' => $_POST['g-recaptcha-response']
);

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$decoded_result = json_decode($result);

if ($decoded_result->success){
    mail("nathan.dufaud@gmail.com",htmlspecialchars($obj),htmlspecialchars($text), htmlspecialchars($header));
    echo json_encode(true);

}
else{
    echo json_encode(false);
}
?>