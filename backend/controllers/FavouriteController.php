<?php
require_once __DIR__ . '/../models/FavouriteModel.php';
require_once __DIR__ . '/../config/config.php';

class FavouriteController {
    
    private function checkSession() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['user_id'])) {
            header('Location: /login.php');
            exit;
        }
    }
    private $favouriteModel;

    public function __construct() {
        $this->favouriteModel = new FavouriteModel();
    }

    public function addFavourite() {
        $this->checkSession();
        header('Content-Type: application/json');
        $userId = $_SESSION['user_id'];
        $recipeId = $_POST['recipe_id'] ?? null;
        if (!is_numeric($userId) || !is_numeric($recipeId)) {
            echo $userId;
            echo $recipeId; 
            http_response_code(400);
            echo json_encode(['error' => 'Invalid user or recipe ID.']);
            return;
        }
        $success = $this->favouriteModel->addFavourite($userId, $recipeId);
        if ($success) {
            echo json_encode(['message' => 'Favourite added successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to add favourite.']);
        }
    }

    public function getFavouritesByUser() {
        $this->checkSession();
        header('Content-Type: application/json');
        if (!is_numeric($_SESSION['user_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid user ID.']);
            return;
        }
        $recipes = $this->favouriteModel->getFavouritesByUser($_SESSION['user_id']);
        echo json_encode($recipes);
    }

    public function removeFavourite() {
        $this->checkSession();
        header('Content-Type: application/json');
        $userId = $_SESSION['user_id'];
        $recipeId = $_POST['recipe_id'] ?? null;
        if (!is_numeric($userId) || !is_numeric($recipeId)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid user or recipe ID.']);
            return;
        }
        $success = $this->favouriteModel->removeFavourite($userId, $recipeId);
        if ($success) {
            echo json_encode(['message' => 'Favourite removed successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to remove favourite.']);
        }
    }
}
?>
