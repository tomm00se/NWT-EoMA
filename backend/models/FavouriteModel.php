<?php
require_once __DIR__ . '/../config/config.php';

class FavouriteModel {
   
    private $db;

    public function __construct() {
        $config = new Config();
        $this->db = $config->getPDO();
    }

    public function addFavourite($userId, $recipeId) {
        $stmt = $this->db->prepare("INSERT INTO favourites (user_id, recipe_id) VALUES (?, ?)");
        return $stmt->execute([$userId, $recipeId]);
    }

    public function getFavouritesByUser($userId) {
        $stmt = $this->db->prepare("SELECT r.* FROM recipes r INNER JOIN favourites f ON r.recipe_id = f.recipe_id WHERE f.user_id = ?");
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

     public function removeFavourite($userId, $recipeId) {
        $stmt = $this->db->prepare("DELETE FROM favourites WHERE user_id = ? AND recipe_id = ?");
        return $stmt->execute([$userId, $recipeId]);
    }

    public function recipeExists($recipeId): bool {
    $stmt = $this->db->prepare("SELECT 1 FROM recipes WHERE recipe_id = ?");
    $stmt->execute([$recipeId]);
    return (bool) $stmt->fetchColumn();
}
}
?>
