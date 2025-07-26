<?php
require_once __DIR__ . '/../models/RatingModel.php';
require_once __DIR__ . '/../config/config.php';

class RatingController {
    private function checkSession() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['user_id'])) {
            header('Location: /login.php');
            exit;
        }
    }
    private $ratingModel;

    public function __construct() {
        $this->ratingModel = new RatingModel();
    }

    public function rateRecipe() {
        $this->checkSession();
        header('Content-Type: application/json');
        $userId = $_SESSION['user_id'];
        $recipeId = $_POST['recipe_id'] ?? null;
        $rating = $_POST['rating'] ?? null;
        $comment = $_POST['comment'] ?? null;

        if (!is_numeric($userId)) {
            http_response_code(400);
            echo json_encode(['error' => 'User not authenticated.']);
            return;
        }
        if (!is_numeric($recipeId)) {
            http_response_code(400);
            echo json_encode(['error' => 'Recipe ID is required and must be numeric.']);
            return;
        }
        if (!is_numeric($rating) || $rating < 1 || $rating > 5) {
            http_response_code(400);
            echo json_encode(['error' => 'Rating must be a number between 1 and 5.']);
            return;
        }
        if (!empty($comment)) {
            $wordCount = str_word_count($comment);
            if ($wordCount < 3 || $wordCount > 100) {
                http_response_code(400);
                echo json_encode(['error' => 'Comment must be between 3 and 100 words.']);
                return;
            }
        }
        $success = $this->ratingModel->rateRecipe($userId, $recipeId, $rating, $comment);
        if ($success) {
            echo json_encode(['message' => 'Recipe rated successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to rate recipe.']);
        }
    }

    public function getRecipeRating($recipeId) {
        $this->checkSession();
        header('Content-Type: application/json');
        if (!is_numeric($recipeId)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid recipe ID.']);
            return;
        }
        $result = $this->ratingModel->getRecipeRating($recipeId);
        echo json_encode($result);
    }
}
?>
