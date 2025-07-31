<?php
session_start();
require_once __DIR__ . '/../../../../controllers/RecipeController.php';

$recipeController = new RecipeController();

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Parse JSON body
    $input = json_decode(file_get_contents("php://input"), true);
    $recipeId = $input['id'] ?? null;

    if ($recipeId) {
        $recipeController->deleteRecipe($recipeId);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Recipe ID is required."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
}