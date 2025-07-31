<?php
require_once __DIR__ . '/../../../../controllers/RecipeController.php';

$controller = new RecipeController();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller->createRecipe();
} else {
    sendResponse405();
}

function sendResponse405() {
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}
