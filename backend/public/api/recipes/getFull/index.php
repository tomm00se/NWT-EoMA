<?php
session_start();
require_once __DIR__ . '/../../../../controllers/RecipeController.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: /login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller = new RecipeController();
    $controller->getFullRecipe($_GET['id'] ?? null);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>
