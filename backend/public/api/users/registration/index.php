<?php
require_once __DIR__ . '../../../../../controllers/UserController.php';

$userController = new UserController();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $userController->register();
  
} else {
    // Optionally, render forms or return a message for GET requests
    echo json_encode(["message" => "Please use the registration or login form."]);
}

function sendResponse405()
{
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}
?>