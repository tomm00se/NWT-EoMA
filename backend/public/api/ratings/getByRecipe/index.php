<?php
require_once __DIR__ . '/../../../../controllers/RatingController.php';

$controller = new RatingController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $recipeId = $_GET['recipe_id'] ?? null;
    if ($recipeId) {
        $controller->getRecipeRating((int)$recipeId);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Recipe ID is required."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
}
