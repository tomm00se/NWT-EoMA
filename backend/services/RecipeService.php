<?php
require_once __DIR__ . '/../models/RecipeModel.php';

class RecipeService {
    private $model;

    public function __construct() {
        $this->model = new RecipeModel();
    }

    public function getAllRecipes() {
        return $this->model->fetchAllRecipes();
    }

    public function getRecipesByUser(int $userId) {
    return $this->model->fetchRecipesByUser($userId);
    }

    public function getFullRecipe($id) {
        return $this->model->fetchFullRecipe($id);
    }

    public function createRecipe($data, $userId) {
        $this->validateRecipeData($data);
        return $this->model->insertRecipe($data, $userId);
    }

    public function updateRecipe($id, $data, $userId) {
        if (!is_numeric($id)) {
            throw new Exception("Invalid recipe ID.");
        }

        //validate userid = recipe user id
        $ownerId = $this->model->getRecipeOwnerId($id);
        if ((int)$ownerId !== (int)$userId) {
            throw new Exception("You are not authorized to modify this recipe.");
        }

        $this->validateRecipeData($data);
        $this->model->updateRecipe($id, $data, $userId);
    }

    public function deleteRecipe($id, $userId) {
        if (!is_numeric($id)) {
            throw new Exception("Invalid recipe ID.");
        }
        
        //validate userid = recipe user id
        $ownerId = $this->model->getRecipeOwnerId($id);
        if ((int)$ownerId !== (int)$userId) {
            throw new Exception("You are not authorized to modify this recipe.");
        }

        $this->model->deleteRecipe($id, $userId);
    }

    private function validateRecipeData($data) {
        if (empty($data['title']) || strlen($data['title']) > 100) {
            throw new Exception("Recipe title is required and must be under 100 characters.");
        }

        if (empty($data['description'])) {
            throw new Exception("Recipe description is required.");
        }

        if (!is_numeric($data['total_time']) || $data['total_time'] < 1) {
            throw new Exception("Total time must be a positive number.");
        }

        if (empty($data['steps']) || !is_array($data['steps'])) {
            throw new Exception("At least one step is required.");
        }

        if (empty($data['ingredients']) || !is_array($data['ingredients'])) {
            throw new Exception("At least one ingredient is required.");
        }

        if (empty($data['categories']) || !is_array($data['categories'])) {
            throw new Exception("At least one category is required.");
        }
    }
}
