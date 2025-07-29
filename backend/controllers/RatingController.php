<?php
require_once __DIR__ . '/../services/RatingService.php';

class RatingController {
    private $service;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) session_start();
        $this->service = new RatingService();
        header('Content-Type: application/json');
    }

    public function rateRecipe() {
        $this->checkSession();

        $userId = $_SESSION['user_id'];
        $recipeId = $_POST['recipe_id'] ?? null;
        $rating = $_POST['rating'] ?? null;
        $comment = $_POST['comment'] ?? null;

        if (!is_numeric($recipeId) || !is_numeric($rating)) {
            http_response_code(400);
            echo json_encode(['error' => 'Recipe ID and Rating must be numeric.']);
            return;
        }

        try {
            $success = $this->service->rateRecipe((int)$userId, (int)$recipeId, (int)$rating, $comment);
            if ($success) {
                echo json_encode(['message' => 'Recipe rated successfully.']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to rate recipe.']);
            }
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function getRecipeRating($recipeId) {
        $this->checkSession();

        if (!is_numeric($recipeId)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid recipe ID.']);
            return;
        }

        try {
            $result = $this->service->getRecipeRating((int)$recipeId);
            echo json_encode($result);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch recipe rating.']);
        }
    }

    private function checkSession() {
        if (!isset($_SESSION['user_id'])) {
            http_response_code(403);
            echo json_encode(["error" => "Unauthorized"]);
            exit;
        }
    }
}
