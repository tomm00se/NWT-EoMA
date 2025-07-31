<?php
session_start();
require_once __DIR__ . '/../../../../controllers/RecipeController.php';

$recipeController = new RecipeController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
        $recipeController->getMyRecipes($userId);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized: User not logged in."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
}
