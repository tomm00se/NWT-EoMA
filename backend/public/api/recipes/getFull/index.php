<?php
session_start();
require_once __DIR__ . '/../../../../controllers/RecipeController.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller = new RecipeController();
    $controller->getRecipeById($_GET['id'] ?? null);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>
