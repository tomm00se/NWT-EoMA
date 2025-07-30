<?php
require_once __DIR__ . '/../models/RatingModel.php';

class RatingService {
    private $model;

    public function __construct() {
        $this->model = new RatingModel();
    }

    public function rateRecipe(int $userId, int $recipeId, int $rating, ?string $comment): bool {
        if ($rating < 1 || $rating > 5) {
            throw new Exception("Rating must be between 1 and 5.");
        }

        if (!empty($comment)) {
            $wordCount = str_word_count($comment);
            if ($wordCount < 3 || $wordCount > 100) {
                throw new Exception("Comment must be between 3 and 100 words.");
            }
        }

       
        if (!$this->model->recipeExists($recipeId)) {
            throw new Exception("Cannot rate a non-existing recipe.");
        }

        return $this->model->rateRecipe($userId, $recipeId, $rating, $comment);
    }

    public function getRecipeRating(int $recipeId): array {
        return $this->model->getRecipeRating($recipeId);
    }


}
