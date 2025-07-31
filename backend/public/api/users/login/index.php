<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../../../../controllers/UserController.php';


$userController = new UserController();

$requestUri = rtrim($_SERVER['REQUEST_URI'], '/');

echo $requestUri;


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $userController->login();
    
} else {

    echo json_encode(["message" => "Please use the registration or login form."]);
}

function sendResponse405()
{
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}
?>