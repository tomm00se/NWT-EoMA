<?php
session_start();
require_once '../../../../config/config.php';
require_once '../../../../models/RecipeModel.php';
require_once '../../../../controllers/RecipeController.php';


$controller = new RecipeController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller->getAllRecipes();
} else {
    echo json_encode(["message" => "Please use the correct HTTP method."]);
}
?>