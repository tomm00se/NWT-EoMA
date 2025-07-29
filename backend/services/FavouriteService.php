<?php
require_once __DIR__ . '/../models/FavouriteModel.php';

class FavouriteService {
    private $model;

    public function __construct() {
        $this->model = new FavouriteModel();
    }

    public function addFavourite($userId, $recipeId) {
        return $this->model->addFavourite($userId, $recipeId);
    }

    public function removeFavourite($userId, $recipeId) {
        return $this->model->removeFavourite($userId, $recipeId);
    }

    public function getFavouritesByUser($userId) {
        return $this->model->getFavouritesByUser($userId);
    }
}