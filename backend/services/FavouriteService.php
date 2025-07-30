<?php
require_once __DIR__ . '/../models/FavouriteModel.php';

class FavouriteService {
    private $model;

    public function __construct() {
        $this->model = new FavouriteModel();
    }

    public function addFavourite($userId, $recipeId) {
    if (!$this->model->recipeExists($recipeId)) {
        throw new Exception("Recipe does not exist.");
    }
    return $this->model->addFavourite($userId, $recipeId);
}

    public function removeFavourite($userId, $recipeId) {
        
        $stmt = (new Config())->getPDO()->prepare("SELECT 1 FROM recipes WHERE recipe_id = ?");
        $stmt->execute([$recipeId]);

        if (!$stmt->fetch()) {
            throw new Exception("Recipe does not exist.");
        }

        return $this->model->removeFavourite($userId, $recipeId);
    }

    public function getFavouritesByUser($userId) {
        return $this->model->getFavouritesByUser($userId);
    }

}