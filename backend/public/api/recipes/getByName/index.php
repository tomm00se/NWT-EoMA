<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../../../../controllers/RecipeController.php';

$recipeController = new RecipeController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['name'])) {
        $recipeController->getRecipeByName($_GET['name']);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Recipe name is required."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
}
