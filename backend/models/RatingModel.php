<?php
require_once __DIR__ . '/../config/config.php';

class RatingModel {
    
    private $db;

    public function __construct() {
        $config = new Config();
        $this->db = $config->getPDO();
    }

    public function rateRecipe($userId, $recipeId, $rating, $comment = null) {
        $stmt = $this->db->prepare("REPLACE INTO ratings (user_id, recipe_id, rating, comment) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$userId, $recipeId, $rating, $comment]);
    }

    public function getRecipeRating($recipeId) {
        $stmt = $this->db->prepare("SELECT AVG(rating) as average_rating, COUNT(*) as total_ratings FROM ratings WHERE recipe_id = ?");
        $stmt->execute([$recipeId]);
        $rating = $stmt->fetch(PDO::FETCH_ASSOC);
        
        //get user comments
        $commentsStmt = $this->db->prepare("SELECT user_id, rating, comment FROM ratings WHERE recipe_id = ? AND comment IS NOT NULL AND comment != ''");
        $commentsStmt->execute([$recipeId]);
        $comments = $commentsStmt->fetchAll(PDO::FETCH_ASSOC);
        return [
            'rating' => $rating ?: ['average_rating' => null, 'total_ratings' => 0],
            'comments' => $comments
        ];
    }


}
?>
