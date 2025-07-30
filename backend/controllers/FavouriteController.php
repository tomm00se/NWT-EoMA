<?php
require_once __DIR__ . '/../services/FavouriteService.php';

class FavouriteController {

    private $service;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) session_start();
        $this->service = new FavouriteService();
        header('Content-Type: application/json');
    }

    private function checkSession() {
        if (!isset($_SESSION['user_id'])) {
            http_response_code(403);
            echo json_encode(['error' => 'Unauthorized']);
            exit;
        }
    }

    public function addFavourite() {
        $this->checkSession();
        $userId = $_SESSION['user_id'];

        $input = json_decode(file_get_contents('php://input'), true);
        $recipeId = $input['recipe_id'] ?? null;

        if (!is_numeric($userId) || !is_numeric($recipeId)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid user or recipe ID.']);
            return;
        }

        try {
            if ($this->service->addFavourite($userId, $recipeId)) {
                echo json_encode(['message' => 'Favourite added successfully.']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to add favourite.']);
            }
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function getFavouritesByUser() {
        $this->checkSession();
        $userId = $_SESSION['user_id'];

        if (!is_numeric($userId)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid user ID.']);
            return;
        }

        $recipes = $this->service->getFavouritesByUser($userId);
        echo json_encode($recipes);
    }

    public function removeFavourite() {
        $this->checkSession();
        $userId = $_SESSION['user_id'];
        $input = json_decode(file_get_contents("php://input"), true);
        $recipeId = $input['recipe_id'] ?? null;

        if (!is_numeric($userId) || !is_numeric($recipeId)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid user or recipe ID.']);
            return;
        }

        try {
            if ($this->service->removeFavourite($userId, $recipeId)) {
                echo json_encode(['message' => 'Favourite removed successfully.']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to remove favourite.']);
            }
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
