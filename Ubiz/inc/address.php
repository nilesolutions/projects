<?php

$country = isset($_POST['country']) ? $_POST['country'] : 0;
$region = isset($_POST['region']) ? $_POST['region'] : 0;
$locality = isset($_POST['locality']) ? $_POST['locality'] : 0;
$address = isset($_POST['address']) ? $_POST['address'] : 0;

$data['content'] = '
	<div>'.$country.', '.$region.', '.$locality.', '.$address.'</div>
';

echo json_encode($data);