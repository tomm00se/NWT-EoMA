<?php
require_once __DIR__ . '/../../../../controllers/RecipeController.php';

$recipeController = new RecipeController();

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    // Get the JSON payload
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['recipe_id']) || !is_numeric($data['recipe_id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Recipe ID is required and must be numeric in the request body."]);
        exit;
    }

    $recipeId = (int) $data['recipe_id'];
    $recipeController->updateRecipe($recipeId);
    
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
}
