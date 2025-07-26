<?php
require_once __DIR__ . '/../models/RecipeModel.php';
require_once __DIR__ . '/../config/config.php';

class RecipeController {
    private function checkSession() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['user_id'])) {
            header('Location: /login.php');
            exit;
        }
    }
    
    
    private $recipeModel;

    public function __construct() {
        $this->recipeModel = new RecipeModel();
    }

    public function getAllRecipes() {
        $this->checkSession();
        $recipes = $this->recipeModel->fetchAllRecipes();
        header('Content-Type: application/json');
        echo json_encode($recipes);
    }

    public function getRecipeById($id) {
        $this->checkSession();
        header('Content-Type: application/json');
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid recipe ID.']);
            return;
        }
        $recipe = $this->recipeModel->fetchRecipeById($id);
        if ($recipe) {
            echo json_encode($recipe);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Recipe not found.']);
        }
    }

    public function getRecipeByName($name) {
        $this->checkSession();
        header('Content-Type: application/json');
        
        $validation = $this->validateRecipeName($name);
        if (!$validation['valid']) {
            http_response_code(400);
            echo json_encode(['error' => $validation['error']]);
            return;
        }

        $recipes = $this->recipeModel->fetchRecipeByName($name);
        if ($recipes && count($recipes) > 0) {
            echo json_encode($recipes);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'No recipes found.']);
        }
    }

    public function getFullRecipe($id) {
        $this->checkSession();
        header('Content-Type: application/json');
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid recipe ID.']);
            return;
        }
        $recipe = $this->recipeModel->fetchFullRecipe($id);
        if ($recipe) {
            echo json_encode($recipe);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Recipe not found.']);
        }
    }


    private function validateRecipeName($name) {
        if (empty($name)) {
            return ['valid' => false, 'error' => 'Recipe name is required.'];
        }
        if (strlen($name) < 1 || strlen($name) > 60) {
            return ['valid' => false, 'error' => 'Recipe name must be between 1 and 60 characters.'];
        }
        return ['valid' => true];
    }
}
?>