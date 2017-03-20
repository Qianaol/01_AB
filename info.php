<?php 
use AmoCRM\Handler;
use AmoCRM\Request;

require('vendor/autoload.php');

$api = new Handler('new58cfda0262beb', 'khrypun.dev@gmail.com');
print_r($api->request(new Request(Request::INFO))->result);
?>