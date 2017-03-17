<?php 
use AmoCRM\Handler;
use AmoCRM\Request;

require('vendor/autoload.php');

$api = new Handler('new58b5357d0de5f', 'info@atlant.black');
print_r($api->request(new Request(Request::INFO))->result);
?>