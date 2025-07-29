<?php
require_once __DIR__ . '/../../../../controllers/RecipeController.php';

$controller = new RecipeController();

parse_str($_SERVER['QUERY_STRING'], $params);
$id = $params['id'] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && is_numeric($id)) {
    $controller->updateRecipe($id);
} else {
    sendResponse405();
}

function sendResponse405() {
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed or missing ID"]);
}
